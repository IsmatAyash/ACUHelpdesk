import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Meetings = () => {
  return (
    <Container fluid>
      <Row
        className="justify-content-center align-items-top text-right p-5"
        style={{ minHeight: "100vh" }}
      >
        <Col>
          <h5>
            رزنامة الاجتماعات الفنية ذات العلاقة بمفاوضات الاتحاد الجمركي العربي
            والتي تم تصنيفها في مجموعتين
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Meetings;
