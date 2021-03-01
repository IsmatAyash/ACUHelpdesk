import React, { useState, useEffect, useContext } from "react";
import { IoAttach, IoPaperPlane, IoHappyOutline } from "react-icons/io5";
import { MdGroupAdd, MdAddCircle } from "react-icons/md";
import { Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { NegContainer, NegRow, NegMemberCol } from "./NegMemberElements";
import NegListGroup from "./NegListGroup";
import {
  getNegotiations,
  deleteNegotiation,
  postNegotiation,
  updateNegotiation,
  getNegotiation,
} from "../../services/negService";
import { updateMember } from "../../services/memberService";
import { UserContext } from "../../services/UserContext";
import DisHeader from "./DisHeader";
import NegNew from "./NegNew";
import NegClose from "./NegClose";

import ConfirmDialog from "../common/ConfirmDialog";
import { toast } from "react-toastify";

const Negotiate = () => {
  const { user } = useContext(UserContext);
  const [negs, setNegs] = useState([]);
  const [neg, setNeg] = useState({});
  const [members, setMembers] = useState([]);
  const [negHeader, setNegHeader] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const [negIdToDel, setNegIdToDel] = useState({});
  const [isloading, setIsloading] = useState(true);
  const [mode, setMode] = useState("");

  const handleClose = () => setShow(false);

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
        setNeg({ id: 0 });
        setShow(true);
        break;
      }
    }
  };

  const handleNegDelete = async () => {
    // optimistic deletion
    const originalNegs = negs;
    const filteredNegs = originalNegs.filter(n => n.id !== negIdToDel.id);
    setNegs(filteredNegs);
    setMembers(filteredNegs.members);

    try {
      await deleteNegotiation(negIdToDel.id);
      toast.error("لقد تم محو المفاوضات المعنية");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("لم تتم عملية المحو بنجاح");

      setNegs(originalNegs);
      setMembers(originalNegs.members);
    }
    setShowConfirm(false);
  };

  const handleItemSelect = id => {
    const filtered = negs.filter(n => n.id === id)[0];
    populateMembers(filtered);
    setNeg(filtered);
  };

  const populateMembers = n => {
    setMembers(n.members);
    setNegHeader(n);
  };

  useEffect(() => {
    let isSubscribed = true;
    async function getNegs() {
      const { data } = await getNegotiations();
      setIsloading(false);
      if (isSubscribed) setNegs(data.map(d => mapToViewModel(d)));
    }
    getNegs();
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (mode === "add") {
      if (isSubscribed) setNegs([...negs, neg]);
    } else {
      if (isSubscribed) updateNegs(neg);
    }
    populateMembers(neg);
    return () => (isSubscribed = false);
  }, [mode]);

  const updateNegs = ng => {
    let negscopy = [...negs];
    negscopy = negscopy.filter(n => n.id !== ng.id);
    negscopy = [...negscopy, ng];
    setNegs(negscopy);
  };

  const mapToViewModel = neg => {
    return {
      id: neg.id,
      subject: neg.negSubject,
      title: neg.negName,
      status: neg.negStatus,
      createdAt: neg.negCreatedAt,
      initiatedAt: neg.negInitiatedAt,
      products: neg.products || neg.negotiationProducts,
      members: neg.members || neg.negotiationMembers,
      createdBy: neg.negCreatedBy || user.fullName,
    };
  };

  const handleSubmit = async (e, formData, products, members) => {
    const { negSubject, negName, negStatus } = formData;
    const currDate = new Date();
    e.preventDefault();
    const negotiation = {
      id: neg.id,
      negSubject,
      negName,
      negStatus,
      negCreatedAt: neg.id === 0 ? currDate : neg.createdAt,
      negInitiatedAt: neg.id === 0 ? currDate : neg.intiatedAt,
      userId: user.userId,
      negotiationProducts: products.map(product => ({
        productId: product.value,
      })),
      negotiationMembers: members.map(member => ({ userId: member.value })),
    };

    try {
      if (neg.id !== 0) {
        doUpdate(negotiation, false);
      } else {
        const { data: newNeg } = await postNegotiation(negotiation);
        const { data } = await getNegotiation(newNeg.id);
        setNeg(mapToViewModel(data[0]));
        setMode("add");
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

  const doUpdate = async (negotiation, initiate) => {
    await updateNegotiation(negotiation, initiate);
    const { data: updatedNeg } = await getNegotiation(negotiation.id);
    setNeg(mapToViewModel(updatedNeg[0]));
    setMode("edit");
    if (initiate) toast.success("لقد تم إطلاق المفاوضات بنجاح، بالتوفيق");
    else toast.success("لقد تم تعديل هذه المفاوضات بنجاح");
  };

  const handleInvitation = async (id, answer) => {
    try {
      const membscopy = [...members];
      let member = membscopy.filter(m => m.id === id);
      member = { ...member[0], memberStatus: answer };
      await updateMember(member);
      const membs = [...members];
      const index = membs.findIndex(x => x.id === id);
      membs[index] = {
        ...membs[index],
        memberStatus: answer,
        actionAt: new Date(),
      };
      setMembers(membs);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(`لم يتم التعديل ,${ex.response.data.message}`);
      }
    }
  };

  const handleInitiateClose = (id, status) => {
    switch (status) {
      case "Pending": {
        const negotiation = {
          id: id,
          negInitiatedAt: new Date(),
          negStatus: "Active",
        };
        doUpdate(negotiation, true);
        break;
      }
      case "Active":
        setCloseShow(true);
        break;
      default:
        break;
    }
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
          neg={neg}
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
      {closeShow && (
        <NegClose
          negId={neg.id}
          show={closeShow}
          onHide={() => setCloseShow(false)}
        />
      )}

      <NegRow
        className="justify-content-between"
        style={{ textAlign: lng === "ar" ? "text-right" : "text-left" }}
      >
        <NegMemberCol md={3}>
          {isloading ? (
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ height: "80vh" }}
            >
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <NegListGroup
              lng={lng}
              onItemSelect={handleItemSelect}
              onAction={handleAction}
              onClose={handleClose}
              show={show}
              addIcon={<MdAddCircle style={{ fontSize: "16px" }} />}
              data={negs}
              memb={false}
              placement="bottom"
              tooltip="زيادة منصة للمفاوضات"
              title="ألمفاوضات"
            />
          )}
        </NegMemberCol>
        <NegMemberCol md={6}>
          <Card style={{ height: "91vh" }}>
            <Card.Header className="d-flex text-right p-0 m-0" as="h6">
              <DisHeader
                negHeader={negHeader}
                onInitiateClose={handleInitiateClose}
              />
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
            // addIcon={<MdGroupAdd />}
            data={members}
            memb={true}
            onInvitation={handleInvitation}
            title="الأعضاء المشاركين"
          />
        </NegMemberCol>
      </NegRow>
    </NegContainer>
  );
};

export default Negotiate;
