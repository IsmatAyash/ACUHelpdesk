import React from "react";
import { Card } from "react-bootstrap";

const NewsCard = ({ text, img, label }) => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={img} className="img-fluid img-thumbnail" />
        <Card.Body>
          <Card.Title>{label}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default NewsCard;
