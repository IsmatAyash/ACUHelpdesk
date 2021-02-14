import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaLock,
  FaMailBulk,
  FaRegUser,
  FaRegFlag,
  FaRegSave,
} from "react-icons/fa";
import * as userService from "../../services/userService";
import { getCountries } from "../../services/countryService";
import { validate, validateProperty } from "../common/Form/validation";
import RenderInput from "../common/Form/RenderInput";
import RenderSelect from "./../common/Form/RenderSelect";
import { useTranslation } from "react-i18next";
import Schema from "./registerschema";
import { toast } from "react-toastify";
import { Container, Form, Image, Col, Row, Button } from "react-bootstrap";

const defaultAvatarSrc = "/images/avatarPlaceholder.png";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  countryId: 0,
  password: "",
  confirmPassword: "",
  avatar: "",
  avatarSrc: defaultAvatarSrc,
  avatarFile: null,
};

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const defaultAvatarSrc = "/images/avatarPlaceholder.png";
  const [values, setValues] = useState(initialValues);
  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");
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
    const errorMsg =
      name !== "confirmPassword" ? validateProperty(name, value, schema) : null;
    if (errorMsg) setErrors({ ...errors, [name]: errorMsg });
    else delete errors[name];

    setValues({ ...values, [name]: value });
  };

  const showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let avatarFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setValues({ ...values, avatarFile, avatarSrc: x.target.result });
      };
      reader.readAsDataURL(avatarFile);
    } else {
      setValues({
        ...values,
        avatarFile: null,
        avatarSrc: defaultAvatarSrc,
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    document.getElementById("avatar-loader").value = null;
    setErrors({});
  };

  const handleSubmit = async e => {
    console.log("clicked form data", values);
    e.preventDefault();

    const errors = validate(values, schema, { allowUnknown: true });
    setErrors(errors || {});
    if (errors) {
      console.log("errors:", errors);
      toast.error("Something has not got validated");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatarFile", values.avatarFile);
    formData.append("countryId", values.countryId);
    formData.append("avatar", values.avatar);

    console.log("appended form Data", formData);

    try {
      await userService.register(formData);
      toast.success(`${t("register.registration")}`);
      resetForm();
      setErrors({});
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ ...errors, message: ex.response.data.message });
        toast.error(`Something has failed ,${ex.response.data.message}`);
      }
    }
  };

  const {
    email,
    firstName,
    lastName,
    countryId,
    avatarSrc,
    password,
    confirmPassword,
  } = values;

  return (
    <Container fluid>
      <Row className="justify-content-center m-4">
        <Form
          onSubmit={handleSubmit}
          style={{
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.9)",
            padding: "20px 20px",
            width: "50%",
          }}
        >
          <h4 style={{ textAlign: "center" }}>{t("register.header")}</h4>

          <Form.Row className="align-items-center">
            <Col sm={6} className="my-1">
              <RenderInput
                name="firstName"
                type="text"
                placeholder={t("register.firstnameplaceholder")}
                value={firstName}
                onChange={handleChange}
                children={<FaRegUser color="gray" />}
                validity="invalid"
                errMsg={errors.firstName}
              />
            </Col>

            <Col sm={6} className="my-1">
              <RenderInput
                name="lastName"
                type="text"
                placeholder={t("register.lastnameplaceholder")}
                value={lastName}
                onChange={handleChange}
                children={<FaRegUser color="gray" />}
                validity="invalid"
                errMsg={errors.lastName}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <RenderSelect
                value={countryId}
                name="countryId"
                fieldname={lng === "ar" ? "nameAR" : "name"}
                defvalue={t("register.countryplaceholder")}
                options={countries}
                onChange={handleChange}
                children={<FaRegFlag color="gray" />}
                validity="invalid"
                errMsg={errors.country}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={12}>
              <RenderInput
                name="email"
                type="email"
                placeholder={t("register.emailplaceholder")}
                value={email}
                onChange={handleChange}
                children={<FaMailBulk color="gray" />}
                validity="invalid"
                errMsg={errors.email}
              />
            </Col>
          </Form.Row>
          <Form.Row className="align-items-center">
            <Col sm={6} className="my-1">
              <RenderInput
                name="password"
                type="text"
                placeholder={t("register.passwordplaceholder")}
                value={password}
                onChange={handleChange}
                children={<FaLock color="gray" />}
                validity="invalid"
                errMsg={errors.password}
              />
            </Col>

            <Col sm={6} className="my-1">
              <RenderInput
                name="confirmPassword"
                type="text"
                placeholder={t("register.passwordplaceholder")}
                value={confirmPassword}
                onChange={handleChange}
                children={<FaLock color="gray" />}
                validity="invalid"
                errMsg={errors.confirmPassword}
              />
            </Col>
          </Form.Row>

          <Form.Row className="justify-content-center">
            <Form.Group
              as={Col}
              controlId="formGridAvatar"
              style={{ textAlign: lng === "ar" ? "right" : "left" }}
            >
              <Form.File
                id="avatar-uploader"
                label={t("register.chooseavatar")}
                data-browse={t("register.chooseavatar")}
                accept="image/*"
                onChange={showPreview}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="formGridAvatarSrc"
              className="text-center"
            >
              <Image src={avatarSrc} roundedCircle width="100rem" />
            </Form.Group>
          </Form.Row>
          <Form.Row className="justify-content-start">
            <Button
              // disabled={validate(values, schema)}
              variant="success"
              type="submit"
              style={{ textAlign: lng === "ar" ? "right" : "left" }}
            >
              <FaRegSave className={lng === "ar" ? "ml-2" : "mr-2"} />
              {t("register.register")}
            </Button>
          </Form.Row>
        </Form>
        {/* </Col> */}
      </Row>
    </Container>
  );
};

Register.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  country: PropTypes.number,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
};

export default Register;
