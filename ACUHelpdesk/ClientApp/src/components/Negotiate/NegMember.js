import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { OnlineIcon } from "./NegMemberElements";

const NegMember = ({ name, lastMsg, avatar, lng, online }) => {
  return (
    <Row className="my-1">
      <Col sm={2}>
        <Image width="30px" src={avatar} roundedCircle />
        <OnlineIcon online={online} lng={lng} />
      </Col>
      <Col sm={10}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{name}</h5>
          <small className="text-muted">3 days ago</small>
        </div>
        <small className="text-wrap text-muted">{lastMsg}</small>
      </Col>
    </Row>
  );
};

export default NegMember;
