import React from "react";
import { Container, Row, Col, Carousel, Image } from "react-bootstrap";
import { intros, sections } from "./HomeData";
import { useTranslation } from "react-i18next";
import NewsCard from "./NewsCard";

const Home = () => {
  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");

  return (
    <Container
      className="p-2"
      style={{ textAlign: lng === "ar" ? "right" : "left" }}
    >
      <Carousel>
        {intros.map(intro => (
          <Carousel.Item interval={intro.interval} key={intro.id}>
            <NewsCard img={intro.img} />
            <Carousel.Caption>
              <h3>{intro.label}</h3>
              <p>{intro.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {sections.map(sec => (
        <Row className="py-5" key={sec.id}>
          <Container>
            <h1>{sec.title}</h1>
            <p className="lead">{sec.subtitle}</p>
            <p>{sec.text}</p>
          </Container>
        </Row>
      ))}
    </Container>
  );
};

export default Home;
