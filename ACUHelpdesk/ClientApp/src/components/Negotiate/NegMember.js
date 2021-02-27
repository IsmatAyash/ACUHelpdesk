import React from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { OnlineIcon } from "./NegMemberElements";
import { FaRegCheckCircle, FaRegWindowClose } from "react-icons/fa";
import IconButton from "./IconButton";

const NegMember = ({ members, lastMsg, lng, onInvitation }) => {
  return (
    <React.Fragment>
      {members &&
        members.map(
          (
            {
              id,
              memberId,
              memberName,
              avatar,
              onlineStatus,
              memberStatus,
              flag,
            },
            index
          ) => (
            <ListGroup.Item
              as="li"
              className="py-1"
              action
              variant={index % 2 === 0 ? "light" : "secondary"}
              key={memberId}
            >
              <Row className="my-1">
                <Col sm={2}>
                  <Image
                    width="30px"
                    src={avatar}
                    roundedCircle
                    // onError={e => {
                    //   e.target.onerror = null;
                    //   e.target.src = "/images/avatarPlaceholder.png";
                    // }}
                  />
                  <OnlineIcon online={memberStatus} lng={lng} />
                </Col>
                <Col sm={10}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{memberName}</h5>
                    <Image
                      style={{ width: "20px", height: "20px" }}
                      src={`/Images/flags/${flag?.toLowerCase()}.svg`}
                      roundedCircle
                    />
                  </div>
                  <div className="d-flex w-100 justify-content-between">
                    {memberStatus !== "Pending" ? (
                      <small className="text-wrap text-muted">
                        {memberStatus === "Rejected" ? (
                          <h5> رفض المشاركة</h5>
                        ) : (
                          lastMsg
                        )}
                      </small>
                    ) : (
                      <ButtonGroup className="text-left">
                        <IconButton
                          icon={
                            <FaRegCheckCircle
                              style={{ color: "var(--success)" }}
                            />
                          }
                          tooltip="قبول الدعوة"
                          placement="bottom"
                          onAction={() => onInvitation(id, "Accepted")}
                        />
                        <IconButton
                          icon={
                            <FaRegWindowClose
                              style={{ color: "var(--danger)" }}
                            />
                          }
                          tooltip="رفض الدعوة"
                          placement="bottom"
                          onAction={() => onInvitation(id, "Rejected")}
                        />

                        {/* <Button
                          variant="outline-success"
                          size="sm"
                          className="ml-2"
                          onClick={() => onInvitation(id, "Accepted")}
                        >
                          <FaRegCheckCircle className="ml-1" />
                          قبول
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onInvitation(id, "Rejected")}
                        >
                          <FaRegWindowClose className="ml-1" />
                          رفض
                        </Button> */}
                      </ButtonGroup>
                    )}
                    <small className="text-muted">3 days ago</small>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          )
        )}
      ;
    </React.Fragment>
  );
};

export default NegMember;
