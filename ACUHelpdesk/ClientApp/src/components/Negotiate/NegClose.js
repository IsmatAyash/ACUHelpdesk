import React from "react";
import { products } from "./ProdData";
import { Modal, Button } from "react-bootstrap";
// import BootstrapTable from "react-bootstrap-table-next";
// import cellEditFactory from "react-bootstrap-table2-editor";

const columns = [
  {
    dataField: "id",
    text: "رقم السلعة",
  },
  {
    dataField: "name",
    text: "اسم السلعة",
  },
  {
    dataField: "price",
    text: "التعرفة",
  },
];

const NegClose = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-right"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          تحديد التعرفة الموافق عليها
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <BootstrapTable
          keyField="id"
          data={products}
          columns={columns}
          cellEdit={{ mode: "click" }}
        /> */}
        {/* <BootstrapTable
          keyField="id"
          data={products}
          columns={columns}
          cellEdit={cellEditFactory({ mode: "click" })}
        /> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>إغلاق</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NegClose;
