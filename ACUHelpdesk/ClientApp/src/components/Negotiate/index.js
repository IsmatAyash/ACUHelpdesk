import React, { useState, useEffect, useContext, useRef } from "react";
import { IoAttach, IoPaperPlane, IoHappyOutline } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { Card, Spinner } from "react-bootstrap";
import { NegContainer, NegRow, NegMemberCol } from "./NegMemberElements";
import { Discussion, DiscussionBody, MessageItem } from "./DiscussionElement";
import NegListGroup from "./NegListGroup";
import {
  getNegotiations,
  deleteNegotiation,
  postNegotiation,
  updateNegotiation,
  getNegotiation,
  getAvatars,
} from "../../services/negService";
import { updateMember } from "../../services/memberService";
import { UserContext } from "../../services/UserContext";
import DisHeader from "./DisHeader";
import NegNew from "./NegNew";
import NegClose from "./NegClose";
import ConfirmDialog from "../common/ConfirmDialog";
import { toast } from "react-toastify";
import Chat from "./Chat";

const Negotiate = () => {
  const { user, setUser } = useContext(UserContext);
  const [negs, setNegs] = useState([]);
  const [neg, setNeg] = useState({ id: -1 });
  const [members, setMembers] = useState([]);
  const [discussions, setDiscussions] = useState([]);
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
    setDiscussions(n.discussions);
  };

  useEffect(() => {
    let isSubscribed = true;
    async function getNegs() {
      const { data } = await getNegotiations(user.userId);
      const { data: avatars } = await getAvatars();
      setUser({ ...user, avatars });
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
      discussions: neg.discussions || neg.negotiationDiscussions,
      createdBy: neg.negCreatedBy || user.fullName,
    };
  };

  const mapProductToModel = products => {
    const pp = [...products];
    return neg.id === 0
      ? pp.map(p => ({
          productId: p.value,
        }))
      : pp.map(p => ({
          id: p.id,
          productId: p.productId,
          tariff: p.tariff,
          remarks: p.remarks,
          negotiationId: p.negotiationId,
        }));
  };

  const mapMemberToModel = members => {
    const mm = [...members];
    return neg.id === 0
      ? mm.map(m => ({
          userId: m.value,
          memberStatus: "Pending",
        }))
      : mm.map(m => ({
          id: m.id,
          userId: m.userId,
          isLeader: m.isLeader,
          actionAt: m.actionAt,
          memberStatus: m.memberStatus,
          onlineStatus: m.onlineStatus,
          notified: m.notified,
          negotiationId: m.negotiationId,
        }));
  };

  const handleSubmit = async (e, formData, modelProd, modelMemb) => {
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
      negotiationProducts: mapProductToModel(modelProd),
      negotiationMembers: mapMemberToModel(modelMemb),
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
              addIcon={<MdAddCircle style={{ fontSize: 22 }} />}
              imageSrc={user.avatarSrc}
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
                negHeader={neg}
                onInitiateClose={handleInitiateClose}
              />
            </Card.Header>
            {neg.id !== -1 && <Chat discussions={discussions} neg={neg} />}
          </Card>
        </NegMemberCol>
        <NegMemberCol lng={lng} md={3}>
          <NegListGroup
            lng={lng}
            imageSrc="/images/membersImage.svg"
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
