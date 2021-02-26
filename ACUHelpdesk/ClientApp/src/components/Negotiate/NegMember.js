import React from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { OnlineIcon } from "./NegMemberElements";

const image = require("../../images/avatarPlaceholder.png");

const NegMember = ({ members, lastMsg, lng }) => {
  return (
    <React.Fragment>
      {members &&
        members.map(
          ({ memberId, memberName, avatar, onlineStatus, flag }, index) => (
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
                  <OnlineIcon online={onlineStatus} lng={lng} />
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
                    <small className="text-wrap text-muted">{lastMsg}</small>
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
