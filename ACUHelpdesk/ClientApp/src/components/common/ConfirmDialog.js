import React, { useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledHeader = styled(Modal.Header)`
  &.close {
    margin: 0;
    font-size: medium;
  }
`;

const ConfirmDialog = props => {
  const { onConfirm, onCancel, showConfirm } = props;
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showConfirm}
        className="text-right"
      >
        <StyledHeader closeButton onClick={props.onCancel}>
          <Modal.Title id="contained-modal-title-vcenter">
            تأكيد العملية
          </Modal.Title>
        </StyledHeader>
        <Modal.Body>هل أنت متأكد من محو هذه المعلومات من ؟</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            <MdCancel className="ml-2" />
            كلا
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            <MdCheckCircle className="ml-2" />
            نعم
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDialog;
