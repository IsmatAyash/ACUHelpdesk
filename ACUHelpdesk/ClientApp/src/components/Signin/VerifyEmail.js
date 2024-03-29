import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";

const VerifyEmail = ({ history }) => {
  const EmailStatus = {
    Verifying: "Verifying",
    Failed: "Failed",
  };
  const location = useLocation();

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    const { passcode } = queryString.parse(location.search);
    console.log(passcode);
    async function verify() {
      try {
        await userService.verifyEmail(passcode);
        toast.success("Verification successful, you can now login.");
        history.push("login");
      } catch (ex) {
        setEmailStatus(EmailStatus.Failed);
      }
    }
    // remove token from url to prevent http referer leakage
    history.replace(location.pathname);
    verify();
  }, [history, location.pathname, location.search, EmailStatus.Failed]);

  function getBody() {
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your account using the{" "}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
      default:
        return <></>;
    }
  }

  return (
    <Card className="text-right">
      <Card.Header>Verify Email</Card.Header>
      <Card.Body>{getBody()}</Card.Body>
    </Card>
  );
};

export default VerifyEmail;
