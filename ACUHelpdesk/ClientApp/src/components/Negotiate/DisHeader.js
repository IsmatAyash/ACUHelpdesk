import React from "react";
import styled from "styled-components";
import {
  Badge,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const BadgeTag = styled(Badge)`
  padding: 6px;
  font-size: 12px;
  margin: 3px 3px;
  transition: 0.3s;
  border: 1px solid gray;

  &:hover {
    background-color: var(--success);
    cursor: pointer;
  }
`;

const DisHeader = ({ negHeader }) => {
  const {
    negName: title,
    negSubject: subject,
    negCreatedBy: createdBy,
    negInitiatedAt: initiatedAt,
    products,
  } = negHeader;
  return (
    <Container style={{ minHeight: "12vh" }}>
      <Row
        className="justify-content-center pt-1"
        style={{ backgroundColor: "green", color: "white" }}
      >
        <h5>{title}</h5>
      </Row>
      <Row className="py-2">
        <Col sm={4} className="border">
          <strong>{subject}</strong>
        </Col>
        <Col sm={4} className="border">
          <h6>
            <strong>المسؤول :</strong> {createdBy}
          </h6>
        </Col>
        <Col sm={4} className="border">
          <strong>تاريخ الأطلاق: </strong>
          {initiatedAt &&
            new Date(initiatedAt).toLocaleDateString("ar-LB", {
              dateStyle: "medium",
            })}
        </Col>
      </Row>
      <Row>
        <div>
          <strong>السلع:</strong>{" "}
          {products &&
            products.map(p => (
              <OverlayTrigger
                key={p.productCode}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-${p.productCode}`}>
                    {p.productDescriptionAR}
                  </Tooltip>
                }
              >
                <BadgeTag variant="light">{p.productCode}</BadgeTag>
              </OverlayTrigger>
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default DisHeader;
