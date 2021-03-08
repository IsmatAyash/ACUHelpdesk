import Joi from "joi";
import { useTranslation } from "react-i18next";

const Schema = () => {
  const { t } = useTranslation();

  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .messages({
        "string.base": `${t("register.firstnameerrmsg")}`,
        "any.required": `${t("register.firstnameerrmsg")}`,
        "string.empty": `${t("register.firstnameerrmsg")}`,
      }),
    lastName: Joi.string()
      .required()
      .messages({
        "string.base": `${t("register.lastnameerrmsg")}`,
        "any.required": `${t("register.lastnameerrmsg")}`,
        "string.empty": `${t("register.lastnameerrmsg")}`,
      }),
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net", "org"] } })
      .required()
      .messages({
        "string.base": `${t("register.emailerrmsg")}`,
        "any.required": `${t("register.emailerrmsg")}`,
        "string.empty": `${t("register.emailerrmsg")}`,
        "string.email": `${t("register.emailerrmsg")}`,
      }),
    countryId: Joi.number()
      .required()
      .messages({
        "number.base": `${t("register.countryerrmsg")}`,
        "any.required": `${t("register.countryerrmsg")}`,
      }),
    password: Joi.string()
      .required()
      .messages({
        "string.base": `${t("login.passworderrmsg")}`,
        "any.required": `${t("login.passworderrmsg")}`,
        "string.empty": `${t("login.passworderrmsg")}`,
      }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  });
  return schema;
};

export default Schema;
