import React, { useState, useEffect } from "react";
import { FaLock, FaUserAlt, FaCriticalRole } from "react-icons/fa";
import { getCountries } from "../../services/countryService";
import { userService as auth } from "../../services/userService";
import {
  FormCtr,
  FormRow,
  FormCol,
  Logo,
  FormH,
  FormForm,
  FormButton,
} from "./SigninElements";
import { validate, validateProperty } from "../common/Form/validation";
import RenderInput from "../common/Form/RenderInput";
import RenderSelect from "./../common/Form/RenderSelect";
import { useTranslation } from "react-i18next";
import Schema from "./registerschema";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    avatar: "",
  });
  const history = useHistory();
  const { t } = useTranslation();
  const schema = Schema();

  useEffect(() => {
    async function getC() {
      const { data: countries } = await getCountries();
      setCountries(countries);
    }
    getC();
  }, []);

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
      console.log("Data to register", formData);
      const response = await auth.register(formData);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      history.push("/");
      toast.success(`${t("register.registration")}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ ...errors, message: ex.response.data.message });
        toast.error(`${t("register.alreadyexist")}`);
      }
    }
  };

  const { email, password, country } = formData;

  return (
    <FormCtr fluid>
      <FormRow>
        <FormCol>
          <Logo src="/images/logo.png" alt="logo" />
          <FormH>{t("register.header")}</FormH>
          <FormForm noValidate onSubmit={handleSubmit}>
            <RenderInput
              name="email"
              type="email"
              placeholder={t("register.emailplaceholder")}
              value={email}
              onChange={handleChange}
              children={<FaUserAlt color="gray" />}
              errMsg={errors.email}
            />
            <RenderInput
              name="password"
              type="password"
              placeholder={t("register.passwordplaceholder")}
              value={password}
              onChange={handleChange}
              children={<FaLock color="gray" />}
              errMsg={errors.password}
            />
            <RenderSelect
              value={country}
              name="role"
              placeholder="Select Role ..."
              options={countries}
              onChange={handleChange}
              children={<FaCriticalRole color="gray" />}
              errMsg={errors.role}
            />
            <FormButton
              disabled={validate(formData, schema)}
              variant="success"
              type="submit"
            >
              {t("register.register")}
            </FormButton>
          </FormForm>
        </FormCol>
      </FormRow>
    </FormCtr>
  );
};

export default Profile;
