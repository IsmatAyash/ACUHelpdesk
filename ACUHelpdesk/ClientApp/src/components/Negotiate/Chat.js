import React, { useState, useEffect, useContext, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { joinNeg } from "../../services/neghubService";
import Message from "./Message";
import { IoAttach, IoPaperPlane, IoHappyOutline } from "react-icons/io5";
import { UserContext } from "../../services/UserContext";
import { postMessage } from "./../../services/neghubService";
import { Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

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
      .withUrl("https://localhost:44376/hubs/neg")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceivedMessage", message => {
      const updatedChat = [...lastChat.current];
      setChat([...updatedChat, { ...message, avatar: user.avatarSrc }]);
      setMsg({ ...msg, message: "", messageType: "Text" });
    });

    async function startConn() {
      try {
        await connection.start();
        const cid = await connection.invoke("getConnId");
        await joinNeg(cid, neg.id);
        if (isSubscribed) setConnId(cid);
      } catch (ex) {
        console.log("Connection failed: ", ex);
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

  //   const sendMessage = async (e, action) => {
  //     e.preventDefault();
  //     if (action === "Attach") {
  //       console.log("Here we handle attachments");
  //     } else {
  //       try {
  //         const { data: retMsg } = await postDiscussion({
  //           ...msg,
  //           senderId: user.userId,
  //           negotiationId: negId,
  //         });
  //         setChat([...chat, { ...retMsg, avatar: user.avatarSrc }]);
  //         setMsg({ ...msg, message: "", messageType: "Text" });
  //       } catch (ex) {
  //         toast.error("لم يتم حفظ الرسالة الأخيرة بنجاح");
  //       }
  //     }
  //   };

  return (
    <>
      <Card.Body
        style={{ overflow: "auto", textAlign: "right", paddingBottom: "1rem" }}
      >
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
