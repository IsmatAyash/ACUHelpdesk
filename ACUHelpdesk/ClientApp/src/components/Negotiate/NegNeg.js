import React from "react";
import { Row, Col, Image, ListGroup, Badge } from "react-bootstrap";

const NegNeg = ({ negs, onItemSelect }) => {
  const statusColor = status => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Completed":
        return "info";
      case "Canceled":
        return "danger";
      default:
        return "success";
    }
  };
  return (
    <React.Fragment>
      {negs &&
        negs.map(({ id, subject, status, createdAt }) => (
          <ListGroup.Item
            as="li"
            className="py-1"
            action
            variant={id % 2 === 0 ? "light" : "secondary"}
            key={id}
            onClick={() => onItemSelect(id)}
          >
            <Row className="my-1 text-right">
              <Col sm={2}>
                <Image width="15px" src="/images/flags/lb.svg" roundedCircle />
              </Col>
              <Col sm={10}>
                <h6 className="mb-1">{subject}</h6>
                <Badge
                  variant={statusColor(status)}
                  style={{ float: "right", marginRight: 0 }}
                >
                  {status}
                </Badge>
                <small className="text-muted" style={{ float: "left" }}>
                  {new Date(createdAt).toLocaleString("ar-LB", {
                    dateStyle: "medium",
                  })}
                </small>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </React.Fragment>
  );
};

export default NegNeg;
