import React, { useState, useEffect, useContext } from "react";
import { IoAttach, IoPaperPlane, IoHappyOutline } from "react-icons/io5";
import { MdGroupAdd, MdAddCircle } from "react-icons/md";
import { Col, Card, Button, Form } from "react-bootstrap";
import { NegContainer, NegRow, NegMemberCol } from "./NegMemberElements";
import NegListGroup from "./NegListGroup";
import {
  getNegotiations,
  deleteNegotiation,
  postNegotiation,
  updateNegotiation,
} from "../../services/negService";
import { UserContext } from "../../services/UserContext";
import DisHeader from "./DisHeader";
import NegNew from "./NegNew";
import ConfirmDialog from "../common/ConfirmDialog";
import { toast } from "react-toastify";
import { getProducts } from "./../../services/productService";
import { userService } from "../../services/userService";

const Negotiate = () => {
  const { user } = useContext(UserContext);
  const [negs, setNegs] = useState([]);
  const [prods, setProds] = useState([]);
  const [membs, setMembs] = useState([]);
  const [neg, setNeg] = useState({});
  const [members, setMembers] = useState([]);
  const [negHeader, setNegHeader] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [negIdToDel, setNegIdToDel] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const lng = localStorage.getItem("i18nextLng");

  const handleAction = async (action, id, status) => {
    switch (action) {
      case "editGroup":
        if (status !== "Completed") {
          setNeg(negs.filter(n => n.id === id)[0]);
          setShow(true);
        } else {
          toast.warning("لا يمكن تعديل المفاوضات المبرمة");
        }
        break;
      case "delGroup": {
        setNegIdToDel({ id, status });
        setShowConfirm(true);
        break;
      }
      default: {
        try {
          const { data: prods } = await getProducts();
          setProds(prods);
          const { data: membs } = await userService.getMembers();
          setMembers(membs);
          setNeg({
            id: 0,
            negName: "",
            negSubject: "",
            negPassCode: "",
            products: prods,
            members: membs,
          });
          setShow(true);
        } catch (ex) {
          toast.error("لم تتم قرأة السلع والأعضاء بنجاح!!");
        }
        break;
      }
    }
    console.log("neg populated to pass to form", neg);
  };

  const handleNegDelete = async () => {
    // optimistic deletion
    const originalNegs = negs;
    const filteredNegs = originalNegs.filter(n => n.id !== negIdToDel.id);
    setNegs(filteredNegs);

    try {
      await deleteNegotiation(negIdToDel.id);
      toast.error("لقد تم محو المفاوضات المعنية");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("لم تتم عملية المحو بنجاح");

      setNegs({ negs: originalNegs });
    }
    setShowConfirm(false);
  };

  const handleItemSelect = id => {
    const filtered = negs.filter(n => n.id === id)[0];
    populateMembers(filtered);
  };

  const populateMembers = n => {
    setMembers(n.members);
    setNegHeader(n);
  };

  useEffect(() => {
    let isSubscribed = true;
    async function getNegs() {
      const { data } = await getNegotiations();
      if (isSubscribed) setNegs(data.map(d => mapToViewModel(d)));
    }
    getNegs();
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    setNegs([...negs, mapToViewModel(neg)]);
    populateMembers(neg);
  }, [neg]);

  const mapToViewModel = neg => {
    return {
      id: neg.id,
      subject: neg.negSubject,
      title: neg.negName,
      status: neg.negStatus,
      createdAt: neg.negCreatedAt,
      initiatedAt: neg.negInitiatedAt,
      products: neg.products,
      members: neg.members,
      createdBy: neg.negCreatedBy,
    };
  };

  const handleSubmit = async (e, formData, products, members) => {
    const { negSubject, negName } = formData;
    e.preventDefault();
      const negotiation = {
      id: neg.id,
      negSubject,
      negName,
      negCreatedAt: neg.id === 0 ? new Date.now : neg.createdAt,
      userId: user.userId,
      negotiationProducts: products.map(product => ({
        productId: product.value,
      })),
      negotiationMembers: members.map(member => ({ userId: member.value })),
      };

      console.log('data to be updated',negotiation)

    try {
      if (neg.id !== 0) {
        const { data: neg } = await updateNegotiation(negotiation);
        setNeg(neg);
        toast.success("لقد تم تعديل هذه المفاوضات بنجاح");
      } else {
        const { data: neg } = await postNegotiation(negotiation);
        setNeg(neg);
        toast.success("لقد تم تعريف هذه المفاوضات بنجاح");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // setErrors({ ...errors, message: ex.response.data.message });
        toast.error(`Something has failed ,${ex.response.data.message}`);
      }
    }
    setNeg({});
    setShow(false);
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
          data={neg}
        />
      )}
      {showConfirm && (
        <ConfirmDialog
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => handleNegDelete()}
          status={negIdToDel.status}
          msg={
            negIdToDel.status === "Completed" || negIdToDel.status === "Active"
              ? "لا يمكن محو المفاوضات الجارية أو المبرمة"
              : "هل أنت متأكد من محو هذه المعلومات من ؟"
          }
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
            // onNew={handleShow}
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
