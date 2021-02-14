import React from "react";
import { Row, Col, Figure, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  HeaderLine,
  TextWrapper,
  TitleLine,
  TextBody,
  InfoContainer,
} from "./ReportsElements";

const ReportsInfo = ({
  lightbg,
  lightTitle,
  lightDesc,
  img,
  alt,
  imgStart,
  headerLine,
  titleLine,
  textBody,
  buttonLabel,
}) => {
  const imgPlacement = imgStart ? "flex-row-reverse" : null;
  const lng = localStorage.getItem("i18nextLng");

  return (
    <>
      <InfoContainer fluid className="pt-3" lightbg={lightbg} lng={lng}>
        <Row className={imgPlacement}>
          <Col sm={6}>
            <TextWrapper>
              <HeaderLine>{headerLine}</HeaderLine>
              <TitleLine lightTitle={lightTitle}>{titleLine}</TitleLine>
              <TextBody lightDesc={lightDesc}>{textBody}</TextBody>
              <Button
                as={Link}
                to="/"
                variant={lightbg ? "outline-dark" : "outline-success"}
              >
                {buttonLabel}
              </Button>
            </TextWrapper>
          </Col>
          <Col sm={6}>
            <Figure className="p-2">
              <Figure.Image className="img-fluid rounded" alt={alt} src={img} />
            </Figure>
          </Col>
        </Row>
      </InfoContainer>
    </>
  );
};

export default ReportsInfo;
