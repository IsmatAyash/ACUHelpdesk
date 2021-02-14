import React from "react";
import { Card } from "react-bootstrap";

const NewsCard = ({ text, img, label }) => {
  return (
    <>
      <Card style={{ width: "100%", height: "20rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{label}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewsCard;
