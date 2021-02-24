import React from "react";
import { Row, Col, ListGroup, Badge, ButtonGroup } from "react-bootstrap";
import IconButton from "./IconButton";
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
        negs.map(({ id, title, status, createdAt }, index) => (
          <ListGroup.Item
            as="li"
            className="py-1"
            action
            variant={index % 2 === 0 ? "light" : "secondary"}
            key={index}
            onClick={() => onItemSelect(id)}
          >
            <Row className="my-1 text-right">
              <Col sm={10}>
                <h6 className="mb-1">{title}</h6>
                <Badge
                  variant={statusColor(status)}
                  style={{ float: "right", marginRight: 0 }}
                >
                  {status}-{id}
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
                    onAction={() => onAction("editGroup", id, status)}
                  />
                  <IconButton
                    icon={<MdDelete style={{ color: "red" }} />}
                    tooltip="إلغاء منصة للمفاوضات"
                    placement="top"
                    onAction={() => onAction("delGroup", id, status)}
                  />
                </ButtonGroup>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </>
  );
};

export default NegNeg;
