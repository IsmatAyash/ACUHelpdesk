import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import NewsCard from "./NewsCard";
import { news, events } from "./HomeData";
import EventsMedia from "./EventsMedia";
import { useTranslation } from "react-i18next";
import { HeaderLabel } from "./HomeElements";
import TestPage from "./TestPage";

const Home = () => {
  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");

  return (
    <Container
      className="p-2"
      style={{ textAlign: lng === "ar" ? "right" : "left" }}
    >
      <TestPage />
      <Row>
        <Col>
          <HeaderLabel>{t("home.events.header")}</HeaderLabel>
          <ul className="list-unstyled">
            {events.map(event => (
              <EventsMedia key={event.id} {...event} />
            ))}
          </ul>
        </Col>
        <Col>
          <HeaderLabel>{t("home.news.header")}</HeaderLabel>
          <Carousel>
            {news.map(n => (
              <Carousel.Item interval={n.interval} key={n.id}>
                <NewsCard text={n.text} img={n.img} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
