import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

export const NegContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #27ae60; */
  height: 100vh;
`;

export const NegRow = styled(Row)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 95%;
  height: 92vh;
  min-width: 360px;
  max-width: 1300px;
  min-height: 300px;
  max-height: 720px;
  background: #e6eaea;
`;

export const NegMemberCol = styled(Col)`
  padding: 2px;
  height: 91vh;
`;

export const NegTopButtons = styled.i`
  margin-top: 10px;
  font-size: 25px;
  color: grey;
  margin-left: 10px;
  transition: 0.3s;

  &:hover {
    color: $green;
    cursor: pointer;
  }
`;

export const NegMemberCard = styled(Card)`
  width: 100%;
  padding: 0 !important;
  height: 91vh;
`;

export const NegMemberListGroup = styled(ListGroup)`
  text-align: ${({ lng }) => (lng === "ar" ? `right;` : `left;`)};
  overflow-y: auto;
  height: 75vh;
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #ebebeb;
  cursor: pointer;
`;

export const OnlineIcon = styled.span`
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  top: 0.2em;
  ${({ lng }) => (lng === "ar" ? `right: 0.4em;` : `left: 0.4em;`)}
  border: 1px solid white;
  ${({ online }) =>
    online
      ? `background-color: #4cd137;`
      : `background-color: #c23616 !important;
  `}
`;

export const NegIconButton = styled.i`
  margin-top: 10px;
  font-size: 25px;
  color: grey;
  margin-left: 10px;
  transition: 0.3s;

  &:hover {
    color: var(--success);
    cursor: pointer;
  }
`;
