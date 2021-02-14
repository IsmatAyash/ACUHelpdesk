import styled from "styled-components";
import { FormControl, FormGroup } from "react-bootstrap";

export const FormCtrl = styled(FormControl)`
  border: 1px solid lightgray;
  border-radius: 4px;
  height: 40px;
  width: 89%;

  ::placeholder,
  ::-webkit-input-placeholder {
    font-style: italic;
  }
`;

export const FormGrp = styled(FormGroup)`
  margin-bottom: 30px;
`;
