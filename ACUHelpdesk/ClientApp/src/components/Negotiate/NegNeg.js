import React from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Badge,
  ButtonGroup,
} from "react-bootstrap";
import IconButton from "./IconButton";
import { Container } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const NegNeg = ({ negs, onItemSelect, onAction }) => {
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
    <>
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
              <Col sm={2}>
                <ButtonGroup className="mt-0 ml-2" size="small">
                  <IconButton
                    icon={<RiEdit2Fill style={{ color: "black" }} />}
                    tooltip="تعديل منصة للمفاوضات"
                    placement="top"
                    onAction={() => onAction("editGroup", id)}
                  />
                  <IconButton
                    icon={<MdDelete style={{ color: "red" }} />}
                    tooltip="إلغاء منصة للمفاوضات"
                    placement="top"
                    onAction={() => onAction("delGroup", id)}
                  />
                </ButtonGroup>
                {/* <Image width="15px" src="/images/flags/lb.svg" roundedCircle /> */}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </>
  );
};

export default NegNeg;
