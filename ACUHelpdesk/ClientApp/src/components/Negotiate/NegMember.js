import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { OnlineIcon } from "./NegMemberElements";

const NegMember = ({ name, lastMsg, avatar, lng, online }) => {
  return (
    <Row>
      <Col sm={2}>
        <Image width="30px" src={avatar} roundedCircle />
        <OnlineIcon online={online} lng={lng} />
      </Col>
      <Col sm={10}>
        <h6 style={{ fontWeight: "bold" }}>{name}</h6>
        <p className="text-wrap" style={{ fontSize: 12 }}>
          {lastMsg}
        </p>
      </Col>
    </Row>
  );
};

export default NegMember;
