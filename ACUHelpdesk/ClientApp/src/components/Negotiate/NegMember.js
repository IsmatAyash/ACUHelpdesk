import React, { useContext } from "react";
import { Row, Col, Image, ListGroup, ButtonGroup } from "react-bootstrap";
import { OnlineIcon } from "./NegMemberElements";
import { FaRegCheckCircle, FaRegWindowClose } from "react-icons/fa";
import IconButton from "./IconButton";
import { UserContext } from "./../../services/UserContext";

const NegMember = ({ members, lastMsg, lng, onInvitation }) => {
  const { user } = useContext(UserContext);

  const formatStatus = (actionat, memberstatus) => {
    return actionat
      ? `${memberstatus} ${Math.floor(
          Math.abs(new Date() - new Date(actionat)) / (1000 * 60 * 60 * 24)
        )} days ago`
      : memberstatus;
  };

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
              actionAt,
            },
            index
          ) => (
            <ListGroup.Item
              as="li"
              className="py-1"
              action
              variant={index % 2 === 0 ? "light" : "secondary"}
              key={id}
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
                      style={{ width: 20, height: 20 }}
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
                      memberId === user.userId && (
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
                        </ButtonGroup>
                      )
                    )}
                    <small className="text-muted">
                      {formatStatus(actionAt, memberStatus)}
                    </small>
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
