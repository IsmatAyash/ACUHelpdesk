import React, { useState } from "react";
import Schema from "./createpasscodeschema";
import { userService } from "../../services/userService";
import { RiMailSendFill } from "react-icons/ri";
import { validate, validateProperty } from "../common/Form/validation";
import RenderInput from "../common/Form/RenderInput";
import { toast } from "react-toastify";
import {
  FormCtr,
  FormRow,
  FormCol,
  FormH,
  FormForm,
  FormButton,
  Text,
} from "../Signin/SigninElements";
import { FormCtrl, FormGrp } from "../../components/common/Form/FormElements";
import { useTranslation } from "react-i18next";

const CreatePasscode = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
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
      const { data: usr } = await userService.negPassCode(formData.email);
      setFormData({
        ...formData,
        fullName: usr.fullName,
        negPassCode: usr.negPassCode,
      });
      toast.success(`${t("createpasscode.passcodegenerated")}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ ...errors, message: ex.response.data.message });
        toast.dark(
          "هذا البريد الإلكتروني ليس مؤكد، لا يمكن إرسال كلمة سر قبل تأكيد البريد الإلكتروني ✋"
        );
      }
    }
  };

  return (
    <FormCtr fluid>
      <FormRow>
        <FormCol>
          <FormH style={{ marginTop: "10px" }}>
            {t("createpasscode.header")}
          </FormH>
          <FormForm noValidate onSubmit={handleSubmit}>
            <RenderInput
              name="email"
              type="email"
              placeholder={t("createpasscode.emailplaceholder")}
              value={formData.email}
              onChange={handleChange}
              children={<RiMailSendFill color="gray" />}
              validity="invalid"
              errMsg={errors.email}
            />
            <FormGrp>
              <FormCtrl
                type="text"
                size="small"
                value={formData.fullName}
                readOnly
              />
            </FormGrp>
            <FormGrp>
              <FormCtrl
                type="text"
                size="small"
                value={formData.negPassCode}
                readOnly
              />
            </FormGrp>
            {formData.negPassCode && (
              <Text>{t("createpasscode.passcodegenerated")}</Text>
            )}
            <FormButton
              disabled={validate(formData, schema)}
              variant="success"
              type="submit"
            >
              {t("createpasscode.generate")}
            </FormButton>
          </FormForm>
        </FormCol>
      </FormRow>
    </FormCtr>
  );
};

export default CreatePasscode;
