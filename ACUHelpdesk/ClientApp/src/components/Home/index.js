import React from "react";
import { Container, Row, Carousel } from "react-bootstrap";
import { intros, sections } from "./HomeData";

const Home = () => {
  const lng = localStorage.getItem("i18nextLng");

  return (
    <Container
      fluid
      className="p-2"
      style={{ textAlign: lng === "ar" ? "right" : "left" }}
    >
      <Carousel>
        {intros.map(intro => (
          <Carousel.Item
            interval={intro.interval}
            key={intro.id}
            style={{
              backgroundSize: "cover",
              width: "100%",
              height: "400px",
              backgroundPosition: "center",
              backgroundImage: intro.img,
            }}
          >
            <Carousel.Caption
              style={{
                color: !intro.lightBg && "black",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <h3>{lng === "ar" ? intro.label : intro.labelEN}</h3>
              <p>{lng === "ar" ? intro.text : intro.textEN}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {sections.map(sec => (
        <Row className="py-5" key={sec.id}>
          <Container>
            <h1>{lng === "ar" ? sec.title : sec.titleEN}</h1>
            <p className="lead">
              {lng === "ar" ? sec.subtitle : sec.subtitleEN}
            </p>
            <p>{lng === "ar" ? sec.text : sec.textEN}</p>
          </Container>
        </Row>
      ))}
    </Container>
  );
};

export default Home;
