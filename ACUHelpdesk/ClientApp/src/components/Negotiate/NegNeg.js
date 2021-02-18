import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { OnlineIcon } from "./NegMemberElements";

const NegNeg = ({ title, createdAt, avatar, lng, status, statusColor }) => {
  return (
    <Row className="my-1">
      <Col sm={2}>
        <Image width="20px" src={avatar} roundedCircle />
      </Col>
      <Col sm={10}>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{title}</h5>
          <small className="text-muted">{createdAt}</small>
        </div>
        <h6
          style={{ fontWeight: "bold", color: statusColor }}
          className="text-wrap text-muted"
        >
          {status}
        </h6>
      </Col>
    </Row>
  );
};

export default NegNeg;
