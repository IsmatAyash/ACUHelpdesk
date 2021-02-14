import styled from "styled-components";
import { Container } from "react-bootstrap";

export const InfoContainer = styled(Container)`
  color: #fff;
  max-width: 100%;
  background-color: ${({ lightbg }) => (lightbg ? "#f7f8fa" : "#010606")};
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;

export const HeaderLine = styled.div`
  color: #01bf71;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const TitleLine = styled.h1`
  margin-bottom: 24px;
  font-size: 44px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightTitle }) => (lightTitle ? "#f7f8fa" : "#010606")};

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const TextBody = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightDesc }) => (lightDesc ? "#010606" : "#fff")};
`;

export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;

export const Img = styled.img`
  width: 100%;
  margin: 0 0 10px 0;
  padding-right: 0;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
