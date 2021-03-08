import React, { useState, useEffect, useContext, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { joinNeg } from "../../services/neghubService";
import Message from "./Message";
import { IoAttach, IoPaperPlane, IoHappyOutline } from "react-icons/io5";
import { UserContext } from "../../services/UserContext";
import { postMessage } from "./../../services/neghubService";
import { Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import _ from "lodash";
import styled from "styled-components";

const Chat = ({ discussions, neg }) => {
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState(discussions);
  const [connId, setConnId] = useState("");
  const [msg, setMsg] = useState({
    message: "",
    messageType: "Text",
  });

  const lastChat = useRef(null);

  lastChat.current = chat;

  useEffect(() => {
    setChat(discussions);
  }, [discussions]);

  useEffect(() => {
    let isSubscribed = true;

    const connection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_HUB_URL}/neg`)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceivedMessage", message => {
      const updatedChat = [...lastChat.current];

      setChat([
        ...updatedChat,
        {
          ...message,
          avatar: _.find(user.avatars, { userId: message.senderId }).avatar,
        },
      ]);
      setMsg({ ...msg, message: "", messageType: "Text" });
    });

    async function startConn() {
      try {
        await connection.start();
        const cid = await connection.invoke("getConnId");
        await joinNeg(cid, neg.id);
        if (isSubscribed) setConnId(cid);
        toast.success("  لقد تم وصلكم بهذه المفاوضات بنجاح.");
      } catch (ex) {
        toast.error("لم تتم عملية وصلكم بهذه المفاوضات بنجاح، حاول من جديد ");
      }
    }
    startConn();

    return () => (isSubscribed = false);
  }, []);

  const onKeyUp = e => {
    if (e.charCode === 13) {
      sendMessage(e, "Send");
    }
  };

  const sendMessage = async (e, action) => {
    e.preventDefault();
    if (action === "Attach") {
      console.log("Here we handle attachments");
    } else {
      try {
        await postMessage({
          ...msg,
          senderId: user.userId,
          negotiationId: neg.id,
        });
      } catch (ex) {
        toast.error("لم يتم حفظ الرسالة الأخيرة بنجاح");
      }
    }
  };

  const ChatBody = styled.div`
    background: #eee;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    max-height: 69vh;
    overflow: auto;
    > * {
      &:first-child {
        margin-top: auto;
      }
    }
  `;

  return (
    <>
      <Card.Body
        className="m-0 p-0"
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          maxHeight: "100%",
        }}
      >
        <ChatBody>
          {chat &&
            chat.map(ch => (
              <Message
                key={ch.id}
                type={ch.senderId === user.userId ? "sent" : "replies"}
                msg={ch.message}
                avatar={ch.avatar}
                sentAt={ch.sentAt}
              />
            ))}
        </ChatBody>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Form onSubmit={e => sendMessage(e, "Send")}>
          <Form.Row>
            <Col sm={1}>
              <IoHappyOutline style={{ fontSize: 22, marginTop: 7 }} />
            </Col>
            <Col sm={1}>
              <Button onClick={e => sendMessage(e, "Attach")} variant="link">
                <IoAttach style={{ fontSize: 22 }} />
              </Button>
            </Col>
            <Col sm={9}>
              <Form.Control
                placeholder="مضمون الرسالة"
                name="message"
                value={msg.message}
                onKeyUp={e => onKeyUp(e)}
                onChange={e => setMsg({ ...msg, message: e.target.value })}
                disabled={neg.status !== "Active"}
              />
            </Col>
            <Col sm={1}>
              <Button type="submit" variant="link">
                <IoPaperPlane
                  style={{
                    color: "green",
                    fontSize: 22,
                  }}
                />
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Card.Footer>
    </>
  );
};

export default Chat;
