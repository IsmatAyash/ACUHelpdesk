import React, { useState, useContext } from "react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { userService } from "../../services/userService";
import { validate, validateProperty } from "../common/Form/validation";
import RenderInput from "../common/Form/RenderInput";
import { useTranslation } from "react-i18next";
import Schema from "./loginschema";
import { UserContext } from "../../services/UserContext";
import { toast } from "react-toastify";
import {
  FormCtr,
  FormRow,
  FormCol,
  Logo,
  FormH,
  FormForm,
  FormButton,
  TextLink,
  Text,
} from "./SigninElements";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { t } = useTranslation();

  const schema = Schema();

  const handleChange = e => {
    const { name, value } = e.target;
    const errorMsg = validateProperty(name, value, schema);
    if (errorMsg) setErrors({ ...errors, [name]: errorMsg });
    else delete errors[name];

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validate(formData, schema);
    setErrors(errors || {});
    if (errors) return;

    try {
      const usr = await userService.login(email, password);
      if (usr) setUser(usr);
      history.push("/");
      console.log("In Login user response", usr);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ ...errors, message: ex.response.data.message });
        toast.error(`${t("login.invalidcredentials")}`);
      }
    }
  };

  console.log("context user in login", user);

  const { email, password } = formData;
  return (
    <FormCtr fluid>
      <FormRow>
        <FormCol>
          <Logo src="/images/logo.png" alt="logo" />
          <FormH>{t("login.header")}</FormH>
          <FormForm noValidate onSubmit={handleSubmit}>
            <RenderInput
              name="email"
              type="email"
              placeholder={t("login.emailplaceholder")}
              value={email}
              onChange={handleChange}
              children={<FaUserAlt color="gray" />}
              validity="invalid"
              errMsg={errors.email}
            />
            <RenderInput
              name="password"
              type="password"
              placeholder={t("login.passwordplaceholder")}
              value={password}
              onChange={handleChange}
              children={<FaLock color="gray" />}
              validity="invalid"
              errMsg={errors.password}
            />
            <FormButton
              disabled={validate(formData, schema)}
              variant="success"
              type="submit"
            >
              {t("login.login")}
            </FormButton>
            <Text>
              <TextLink to="/login">{t("login.forgotpassword")}</TextLink>|
              <TextLink to="/register">{t("login.register")}</TextLink>
            </Text>
          </FormForm>
        </FormCol>
      </FormRow>
    </FormCtr>
  );
};

export default Login;
