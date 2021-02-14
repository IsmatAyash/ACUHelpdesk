import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { repData } from "./SpcommData";
import SpcReps from "./SpcReps";
import { HeaderLabel } from "./SpcommElements";

const Spcomm = ({ comReps }) => {
  const [reps, setReps] = useState([]);

  const comreps = comReps.toString().split("/");
  const eventKey = comreps[0];
  const title = comreps[1];

  const lng = localStorage.getItem("i18nextLng");

  useEffect(() => {
    setReps(repData(eventKey));
  }, [eventKey]);

  console.log("Setreps value", reps);

  return (
    <Container
      className="p-2"
      style={{ textAlign: lng === "ar" ? "right" : "left" }}
    >
      <Row>
        <Col>
          <HeaderLabel>{title}</HeaderLabel>
          <ul className="list-unstyled">
            {reps.map(rep => (
              <SpcReps key={rep.id} {...rep} />
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Spcomm;
