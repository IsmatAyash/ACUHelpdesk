import React, { useState, useEffect } from "react";
import { Modal, Button, Form, FormGroup } from "react-bootstrap";
import { MdSave, MdCancel } from "react-icons/md";
import DropdownTreeSelectHOC from "./HOC";
import "./Multiselect.css";
// import { data } from "./data";

const data = [
  {
    label: "التعريفة الجمركية الموحدة",
    value: "00 01 02",
    checked: true,
    children: [
      {
        label: "الفضاء ",
        value: "00 01 02",
        children: [
          { label: "اللجان المعنية بمفاوضات الاتحاد الجمركي العربي" },
          { label: "لجمة التنفيذ والمتابعة" },
          { label: "الى الفضاء الخاص من خلال" },
        ],
      },
      {
        label: "الاسكوا",
        children: [
          { label: "تحديد المتفاوض الرئيسي " },
          { label: "بهذه العملية من خلال مراحل " },
        ],
      },
      {
        label: "المستخدم ",
        children: [
          { label: "تحديد المتفاوض الرئيسي " },
          { label: "بهذه العملية من خلال مراحل " },
          { label: "اللجان المعنية بمفاوضات الاتحاد الجمركي العربي" },
          { label: "لجمة التنفيذ والمتابعة" },
          { label: "الى الفضاء الخاص من خلال" },
        ],
      },
      {
        label: "الدولة",
        children: [
          { label: "" },
          { label: "الاسكوا، جامعة الدول العربية" },
          { label: "تفاوضية: مثلا لبنان: يتم تحديد " },
          { label: "الدخول الى المجال الخاص لدولة " },
        ],
      },
      {
        label: "المرحلة الأولى",
        children: [
          { label: "تحديد المتفاوض الرئيسي " },
          { label: "بهذه العملية من خلال مراحل " },
          { label: "اللجان المعنية بمفاوضات الاتحاد الجمركي العربي" },
          { label: "لجمة التنفيذ والمتابعة" },
          { label: "الى الفضاء الخاص من خلال" },
        ],
      },
    ],
  },
];

const onChange = (currentNode, selectedNodes) => {
  console.log("path::", currentNode.path);
  console.log(selectedNodes);
};

const NegNew = props => {
  const { onClose, lng } = props;

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Submit clicked");
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={lng === "ar" ? "text-right" : "text-left"}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>زيادة منصة مفاوضات</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <FormGroup>
              <DropdownTreeSelectHOC
                data={data}
                onChange={onChange}
                className="bootstrap-demo"
              />
            </FormGroup>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={onClose}
              className="text-right"
            >
              <MdCancel className="mx-2" />
              إلغاء
            </Button>
            <Button variant="primary" type="submit" className="text-right">
              <MdSave className="mx-2" /> حفظ المعلومات
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NegNew;
