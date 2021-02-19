import React, { useState, useEffect } from "react";
import { IoAttach, IoPaperPlane, IoHappyOutline } from "react-icons/io5";
import { MdGroupAdd, MdAddCircle } from "react-icons/md";
import {
  Container,
  Col,
  Card,
  Button,
  Form,
  Row,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { NegContainer, NegRow, NegMemberCol } from "./NegMemberElements";
import { useTranslation } from "react-i18next";
import NegListGroup from "./NegListGroup";
import { getNegotiations } from "../../services/negService";
import DisHeader from "./DisHeader";
import NegNew from "./NegNew";

const Negotiate = () => {
  const [data, setData] = useState([]);
  const [negs, setNegs] = useState([]);
  const [members, setMembers] = useState([]);
  const [negHeader, setNegHeader] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const lng = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();

  const lngAlign = lng === "ar" ? " text-right" : " text-left";

  const handleAction = action => {
    console.log("action clicked", action);
  };

  const handleItemSelect = id => {
    const filtered = data.filter(n => n.id === id)[0];
    setMembers(filtered.members);
    setNegHeader(filtered);
  };

  useEffect(() => {
    async function getNegs() {
      const { data } = await getNegotiations();
      setData(data);
      const result = data.map(d => ({
        id: d.id,
        subject: d.negSubject,
        title: d.negName,
        status: d.negStatus,
        createdAt: d.negCreatedAt,
        initiatedAt: d.negInitiatedAt,
        products: d.products,
        createdBy: d.negCreatedBy,
      }));
      setNegs(result);
    }
    getNegs();
  }, []);

  return (
    <NegContainer fluid>
      {show && <NegNew onClose={handleClose} lng={lng} show />}

      <NegRow
        className="justify-content-between"
        style={{ textAlign: lng === "ar" ? "text-right" : "text-left" }}
      >
        <NegMemberCol md={3}>
          <NegListGroup
            lng={lng}
            onItemSelect={handleItemSelect}
            onNew={handleShow}
            onClose={handleClose}
            show={show}
            addIcon={<MdAddCircle />}
            data={negs}
            mem={false}
            placement="bottom"
            tooltip="زيادة منصة للمفاوضات"
          />
        </NegMemberCol>
        <NegMemberCol md={6}>
          <Card style={{ height: "91vh" }}>
            <Card.Header className="d-flex text-right p-0 m-0" as="h6">
              <DisHeader negHeader={negHeader} />
            </Card.Header>
            <Card.Body style={{ overflowY: "auto", textAlign: "right" }}>
              <Card.Text style={{ float: "left" }}>
                تحديد الدولة التي ستطلق عملية تفاوضية: مثلا لبنان: يتم تحديد
                المتفاوض الرئيسي للدولة المعنية من خلال كتاب رسمي اما للجامعة
                والاسكوا ليتم مده بكلة سر تمكنه من الدخول
              </Card.Text>
              <Card.Text style={{ float: "right" }}>
                تحديد الدولة التي ستطلق عملية تفاوضية: مثلا لبنان: يتم تحديد
                المتفاوض الرئيسي للدولة المعنية من خلال كتاب رسمي اما للجامعة
                والاسكوا ليتم مده بكلة سر تمكنه من الدخول
              </Card.Text>
              <Card.Text style={{ float: "left" }}>
                تحديد الدولة التي ستطلق عملية تفاوضية: مثلا لبنان: يتم تحديد
                المتفاوض الرئيسي للدولة المعنية من خلال كتاب رسمي اما للجامعة
                والاسكوا ليتم مده بكلة سر تمكنه من الدخول
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Form>
                <Form.Row>
                  <Col sm={1}>
                    <Button variant="light" disabled>
                      <IoHappyOutline size="medium" />
                    </Button>
                  </Col>
                  <Col sm={1}>
                    <Button variant="light">
                      <IoAttach size="medium" />
                    </Button>
                  </Col>
                  <Col sm={9}>
                    <Form.Control placeholder="مضمون الرسالة" />
                  </Col>
                  <Col sm={1}>
                    <Button variant="light" className="cid-text-direction-rtl">
                      <IoPaperPlane size="medium" />
                    </Button>
                  </Col>
                </Form.Row>
              </Form>{" "}
            </Card.Footer>
          </Card>
        </NegMemberCol>
        <NegMemberCol lng={lng} md={3}>
          <NegListGroup
            lng={lng}
            addIcon={<MdGroupAdd />}
            data={members}
            mem={true}
          />
        </NegMemberCol>
      </NegRow>
    </NegContainer>
  );
};

export default Negotiate;
