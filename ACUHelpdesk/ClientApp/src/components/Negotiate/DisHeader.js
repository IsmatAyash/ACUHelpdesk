import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {
  Badge,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import {
  MdInfoOutline,
  MdPlayCircleOutline,
  MdTextFields,
} from "react-icons/md";
import { UserContext } from "../../services/UserContext";
import NegInfo from "./NegInfo";

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

const DisHeader = ({ negHeader, onInitiateClose, onEnterResult }) => {
  const [infoShow, setInfoShow] = useState(false);
  const {
    id,
    title,
    subject,
    createdBy,
    initiatedAt,
    products,
    status,
  } = negHeader;
  const { user } = useContext(UserContext);

  useEffect(() => {}, [status]);
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
        <Col>
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
        </Col>
      </Row>
      <Row className="justify-content-end py-2 pl-2">
        <Button
          size="sm"
          className="ml-1"
          variant="outline-success"
          disabled={
            user.fullName !== createdBy ||
            status === "Completed" ||
            status === "Cancelled"
          }
          onClick={() => onInitiateClose(id, status)}
        >
          <MdPlayCircleOutline className="ml-1" />
          {status === "Active" ? "إبرام المفاوضات" : "إطلاق المفاوضات"}
        </Button>
        <Button
          className="ml-1"
          size="sm"
          variant="outline-success"
          onClick={onEnterResult}
          disabled={
            user.fullName !== createdBy ||
            status === "Completed" ||
            status === "Cancelled"
          }
        >
          <MdTextFields className="ml-1" />
          إدخال النتائج
        </Button>
        <Button
          size="sm"
          variant="outline-info"
          onClick={() => setInfoShow(true)}
        >
          <MdInfoOutline className="ml-1" />
          معلومات
        </Button>
        <NegInfo show={infoShow} onHide={() => setInfoShow(false)} />
      </Row>
    </Container>
  );
};

export default DisHeader;
