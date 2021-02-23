import React from "react";
import { FormGrp, FormCtrl } from "./FormElements";
import { InputGroup, Form } from "react-bootstrap";

const RenderSelect = ({
  options,
  name,
  children,
  errMsg,
  value,
  onChange,
  defvalue,
  fieldname,
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
          as="select"
          custom
          name={name}
          value={value}
          onChange={onChange}
        >
          <option>{defvalue}</option>
          {options.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt[fieldname]}
            </option>
          ))}
        </FormCtrl>
        <Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
      </InputGroup>
    </FormGrp>
  );
};

export default RenderSelect;
