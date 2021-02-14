import styled from "styled-components";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const FormCtr = styled(Container)`
  background: #ccc;
`;

export const FormRow = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormCol = styled(Col)`
  justify-content: center;
  background: var(--light);
  border-radius: 8px;
  max-width: 500px;
`;

export const Logo = styled.img`
  display: block;
  width: 20%;
  margin: 1rem auto;
`;

export const FormH = styled.h5`
  text-align: center;
`;

export const FormForm = styled(Form)`
  margin: 20px;
  max-width: 450px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  padding: 20px 20px;
  border-radius: 4px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9); */

  @media screen and (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormButton = styled(Button)`
  padding: 10px 0;
  border: none;
  border-radius: 4px;
  color: #f7f7f7;
  font-size: 20px;
  cursor: pointer;
`;

export const Text = styled.span`
  margin-top: 0.5rem;
  text-align: center;
  color: #000;
  font-size: 14px;
`;

export const TextLink = styled(Link)`
  color: #000;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    color: #01bf71;
    transition: 0.3s ease-out;
  }
`;
