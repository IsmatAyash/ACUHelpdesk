import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import styled from "styled-components";

const MsgListItem = styled.li`
  display: inline-block;
  clear: both;
  margin: 5px;
  width: calc(100% - 25px);
  font-size: 0.9em;
`;

const MsgImg = styled.img`
  width: 22px;
  height: 22px;
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
  max-width: 350px;
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

const Message = ({ type }) => {
  return (
    <>
      <MsgListItem>
        <MsgImg
          src="http://emilcarlsson.se/assets/mikeross.png"
          alt="msg avatar"
          className={type}
        />
        <MsgText className={type}>
          تحديد الدولة التي ستطلق عملية تفاوضية: مثلا لبنان: يتم تحديد المتفاوض
          الرئيسي للدولة المعنية من خلال كتاب رسمي اما للجامعة والاسكوا ليتم مده
          بكلة سر تمكنه من الدخول
        </MsgText>
        <small>{new Date().toLocaleString("ar-LB")}</small>
      </MsgListItem>
    </>
  );
};

export default Message;
