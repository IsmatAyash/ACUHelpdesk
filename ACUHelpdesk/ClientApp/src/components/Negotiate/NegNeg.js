import React, { useContext } from "react";
import { Row, Col, ListGroup, Badge, ButtonGroup } from "react-bootstrap";
import IconButton from "./IconButton";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { UserContext } from "./../../services/UserContext";

const NegNeg = ({ negs, onItemSelect, onAction }) => {
  const { user } = useContext(UserContext);
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
        negs.map(({ id, title, status, createdAt, createdBy }, index) => (
          <ListGroup.Item
            as="li"
            className="py-2"
            action
            variant={index % 2 === 0 ? "light" : "secondary"}
            key={index}
            onClick={() => onItemSelect(id)}
          >
            <Row className="ml-2 text-right">
              <Col sm={10}>
                <h6 className="mb-1">{title}</h6>
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
                {createdBy === user.fullName && (
                  <ButtonGroup className="ml-1" size="small">
                    <IconButton
                      icon={<RiEdit2Fill />}
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
                )}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </>
  );
};

export default NegNeg;
