import React from "react";
import {
  MdGroupAdd,
  MdMessage,
  MdPersonAdd,
  MdAdd,
  MdDelete,
  MdSettings,
  MdMenu,
} from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import "./Negotiation.scss";

const members = [
  {
    id: 1,
    avatarSrc: "/images/ismat.jpg",
    name: "عصمت العياش",
    textMuted: "التفاوض مفتاح الحلول",
    time: "00:32",
  },
  {
    id: 2,
    avatarSrc: "/images/layale.jpg",
    name: "ليال باسيل",
    textMuted: "بيي راح مع العسكر",
    time: "00:35",
  },
  {
    id: 3,
    avatarSrc: "/images/flags/lb.svg",
    name: "داروين عيسى",
    textMuted: "التفاوض من أجل التفاوض",
    time: "10:35",
  },
  {
    id: 4,
    avatarSrc: "/images/flags/ly.svg",
    name: "منير",
    textMuted: "مهما يا دهر تشيب",
    time: "13:35",
  },
];

const Negotiation = () => {
  const lng = localStorage.getItem("i18nextLng");
  const memberStyle = lng === "ar" ? "border-left" : "border-right";
  const negoStyle = lng === "ar" ? "border-right" : "border-left";

  return (
    <Container fluid>
      <Row className="no-gutters">
        <Col md={3} className={memberStyle}>
          <div className="settings-tray">
            <img
              className="profile-image"
              src="/images/ismat.jpg"
              alt="Profile img"
            />
            <span className="settings-tray--left">
              <i>
                <MdGroupAdd />
              </i>
              <i>
                <MdDelete />
              </i>
            </span>
          </div>
          <div className="search-box">
            <div className="input-wrapper">
              <i className="material-icons">search</i>
              <input placeholder="Search here" type="text" />
            </div>
          </div>
          {members.map(member => (
            <>
              <div
                key={member.id}
                className="friend-drawer friend-drawer--onhover"
              >
                <div className="text text-right">
                  <h6>{member.name}</h6>
                  <p className="text-muted">{member.textMuted}</p>
                </div>
                <span className="time text-muted small">{member.time}</span>
              </div>
              <hr />
            </>
          ))}
        </Col>
        <Col md={6}>
          <div className="settings-tray">
            <div className="friend-drawer no-gutters friend-drawer--grey">
              <img
                className="profile-image"
                src="/images/flags/lb.svg"
                alt="profile image in the middle"
              />
              <div className="text text-right">
                <h6>Robo Cop</h6>
                <p className="text-muted">
                  Layin' down the law since like before Christ...
                </p>
              </div>
              <span className="settings-tray--right">
                <i>
                  <MdSettings />
                </i>
                <i>
                  <MdMenu />
                </i>
                <i>
                  <MdMessage />
                </i>
              </span>
            </div>
          </div>
          <div className="chat-panel">
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-3 offset-md-9">
                <div className="chat-bubble chat-bubble--right">
                  Hello dude!
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-3 offset-md-9">
                <div className="chat-bubble chat-bubble--right">
                  Hello dude!
                </div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-3">
                <div className="chat-bubble chat-bubble--left">Hello dude!</div>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-md-3 offset-md-9">
                <div className="chat-bubble chat-bubble--right">
                  Hello dude!
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="chat-box-tray">
                  <i className="material-icons">sentiment_very_satisfied</i>
                  <input type="text" placeholder="Type your message here..." />
                  <i className="material-icons">mic</i>
                  <i className="material-icons">send</i>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3} className={negoStyle}>
          <div className="settings-tray">
            <img
              className="profile-image"
              src="/images/ismat.jpg"
              alt="Profile img"
            />
            <span className="settings-tray--right">
              <i>
                <MdPersonAdd />
              </i>
              <i>
                <MdDelete />
              </i>
            </span>
          </div>
          <div className="search-box">
            <div className="input-wrapper">
              <i className="material-icons">search</i>
              <input placeholder="Search here" type="text" />
            </div>
          </div>
          {members.map(member => (
            <>
              <div className="friend-drawer friend-drawer--onhover">
                <img
                  className="profile-image"
                  src={member.avatarSrc}
                  alt={member.name}
                />
                <div className="text text-right">
                  <h6>{member.name}</h6>
                  <p className="text-muted">{member.textMuted}</p>
                </div>
                <span className="time text-muted small">{member.time}</span>
              </div>
              <hr />
            </>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Negotiation;
