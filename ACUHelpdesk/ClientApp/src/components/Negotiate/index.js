import React, { useState, useEffect, useContext } from "react";
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
import {
  getNegotiations,
  deleteNegotiation,
  postNegotiation,
} from "../../services/negService";
import { UserContext } from "../../services/UserContext";
import DisHeader from "./DisHeader";
import NegNew from "./NegNew";
import ConfirmDialog from "../common/ConfirmDialog";
import { toast } from "react-toastify";
import { userService } from "./../../services/userService";

const Negotiate = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [negs, setNegs] = useState([]);
  const [members, setMembers] = useState([]);
  const [negHeader, setNegHeader] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [negIdToDel, setNegIdToDel] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const lng = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();

  const lngAlign = lng === "ar" ? " text-right" : " text-left";

  const handleAction = (action, id) => {
    if (action === "delGroup") {
      setNegIdToDel(id);
      setShowConfirm(true);
    } else {
      console.log("editing here");
    }
  };

  const handleNegDelete = async () => {
    const originalNegs = negs;
    const filteredNegs = originalNegs.filter(n => n.id !== negIdToDel);
    setNegs(filteredNegs);
    console.log("filtered negs in index negotiate", filteredNegs);

    try {
      await deleteNegotiation(negIdToDel);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("لقد تم محو المفاوضات المعنية");

      setNegs({ negs: originalNegs });
    }
    setShowConfirm(false);
  };

  const handleItemSelect = id => {
    const filtered = data.filter(n => n.id === id)[0];
    populateMembers(filtered);
  };

  const populateMembers = neg => {
    setMembers(neg.members);
    setNegHeader(neg);
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

  const handleSubmit = async (
    e,
    { negSubject, negName },
    products,
    members
  ) => {
    e.preventDefault();
    const negotiation = {
      negSubject,
      negName,
      userId: user.userId,
      negotiationProducts: products.map(product => ({
        productId: product.value,
      })),
      negotiationMembers: members.map(member => ({ userId: member.value })),
    };

    console.log("neg to send", negotiation);

    try {
      const { data: neg } = await postNegotiation(negotiation);
      setNegs({ ...negs, neg });
      populateMembers(neg);
      toast.success("لقد تم حفظ هذه المفاوضات بنجاح");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // setErrors({ ...errors, message: ex.response.data.message });
        toast.error(`Something has failed ,${ex.response.data.message}`);
      }
    }

    console.log("negotiation to post", negotiation);
    setShow(false);
  };

  const mapToViewModel = neg => {
    return {
      id: neg.id,
      subject: neg.negSubject,
      title: neg.negName,
      status: neg.negStatus,
      createdAt: neg.negCreatedAt,
      initiatedAt: neg.negInitiatedAt,
      products: neg.products,
      createdBy: neg.negCreatedBy,
    };
  };

  return (
    <NegContainer fluid>
      {show && (
        <NegNew
          onClose={handleClose}
          doSubmit={handleSubmit}
          user={user}
          lng={lng}
          show
        />
      )}
      {showConfirm && (
        <ConfirmDialog
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => handleNegDelete()}
          lng={lng}
          showConfirm
        />
      )}

      <NegRow
        className="justify-content-between"
        style={{ textAlign: lng === "ar" ? "text-right" : "text-left" }}
      >
        <NegMemberCol md={3}>
          <NegListGroup
            lng={lng}
            onItemSelect={handleItemSelect}
            onAction={handleAction}
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
