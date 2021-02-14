import React, { useContext } from "react";
import { Container } from "react-bootstrap";

const Publicspace = () => {
  const lng = localStorage.getItem("i18nextLng");

  return (
    <Container fluid style={{ textAlign: lng === "ar" ? "right" : "left" }}>
      Here is the public area
    </Container>
  );
};

export default Publicspace;
