import React from "react";
import { FormGrp, FormCtrl } from "./FormElements";
import { InputGroup, Form } from "react-bootstrap";

const RenderInput = ({
  name,
  placeholder,
  type,
  onChange,
  errMsg,
  children,
  value,
  validity,
}) => {
  return (
    <FormGrp controlId={name}>
      <InputGroup>
        {children && (
          <InputGroup.Prepend>
            <InputGroup.Text>{children}</InputGroup.Text>
          </InputGroup.Prepend>
        )}
        <FormCtrl
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          isInvalid={errMsg}
        />
        <Form.Control.Feedback type={validity}>{errMsg}</Form.Control.Feedback>
      </InputGroup>
    </FormGrp>
  );
};

export default RenderInput;
