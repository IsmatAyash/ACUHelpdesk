import React from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { infos } from "./NegInfoData";

const NegInfo = props => {
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
          بعض البيانات الآساسية
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table borderless hover size="sm">
          <thead style={{ border: "1px solid" }}>
            <tr>
              <th>البيانات الخاصة التي سيتم توفيرها للمفاوضين </th>
              <th>لبنان</th>
              <th>الأردن</th>
              <th>متوسط الدول العربية </th>
            </tr>
          </thead>
          <tbody>
            {infos.map(info =>
              info.id === 4 ? (
                <td key={info.id} style={{ height: 30 }}></td>
              ) : (
                <tr key={info.id}>
                  <td>{info.description}</td>
                  <td className="text-center">X</td>
                  <td className="text-center">X</td>
                  <td className="text-center">{info.value}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>إغلاق</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NegInfo;
