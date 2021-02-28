import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { postInvitation } from "../../services/negService";
import { toast } from "react-toastify";
import { Card, Row } from "react-bootstrap";

const Invitation = ({ history }) => {
  const MemberStatus = {
    Verifying: "Verifying",
    Failed: "Failed",
  };
  const location = useLocation();

  const [memberStatus, setMemberStatus] = useState(MemberStatus.Verifying);

  useEffect(() => {
    const { Id, selection } = queryString.parse(location.search);
    async function verify() {
      try {
        await postInvitation({ Id, selection });
        toast.success(
          "لقد تم قبول الدعوة وتفعلها، يمكن المشاركة بالحوار مباشرة"
        );
        history.push("login");
      } catch (ex) {
        setMemberStatus(MemberStatus.Failed);
      }
    }
    // remove token from url to prevent http referer leakage
    history.replace(location.pathname);
    verify();
  }, [history, location.pathname, location.search, memberStatus.Failed]);

  function getBody() {
    switch (memberStatus) {
      case MemberStatus.Verifying:
        return <div>يتم معالجة الرد...</div>;
      case MemberStatus.Failed:
        return (
          <div>
            لم يتم قبول وتفعيل الدعوة بنجاح، يمكن التفيل من خلال صفحة المفاوضات
            بعد الدخول الناجح إلى التطبيق
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <Row className="text-right justify-content-center align-items-center">
      <Card>
        <Card.Header>
          <h4>
            دعوة إلى حوار من خلال منصة تسهيل مفاوضات الإتحاد الجمركي العربي
          </h4>
        </Card.Header>
        <Card.Body>{getBody()}</Card.Body>
      </Card>
    </Row>
  );
};

export default Invitation;
