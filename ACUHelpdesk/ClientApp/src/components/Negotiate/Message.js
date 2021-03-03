import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import styled from "styled-components";

const MsgListItem = styled.li`
  display: inline-block;
  clear: both;
  margin: 5px;
  width: calc(100% - 20px);
  font-size: 0.9em;

  &:first-child {
    margin-top: auto;
  }
`;

const MsgImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  vertical-align: top;

  &.sent {
    float: right;
    margin: 6px 0 0 8px;
  }

  &.replies {
    float: left;
    margin: 6px 8px 0 0;
  }
`;

const MsgText = styled.p`
  display: inline-block;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  line-height: 130%;

  &.sent {
    background: #008000;
    color: #f5f5f5;
    float: right;
  }

  &.replies {
    background: #f5f5f5;
    float: left;
  }
`;

const MsgTimestamp = styled.small`
  font-weight: bold;

  &.sent {
    float: left;
  }

  &.replies {
    float: right;
  }
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.2rem;
  font-size: 0.9em;
  margin-right: 0.9rem;
  /* margin-left: 5px;
  margin-bottom: 5px; */

  &:first-child {
    margin-top: auto;
  }
`;

const Message = ({ type, msg, avatar, sentAt }) => {
  return (
    <>
      <MsgListItem>
        <span>
          <MsgImg src={avatar} alt="avatar in message" className={type} />
          <MsgText className={type}>{msg}</MsgText>
        </span>
        <MsgTimestamp className={type}>
          {new Date(sentAt).toLocaleString("ar-LB")}
        </MsgTimestamp>
      </MsgListItem>
    </>
  );
};

export default Message;
