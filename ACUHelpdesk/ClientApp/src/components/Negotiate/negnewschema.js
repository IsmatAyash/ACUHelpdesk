import Joi from "joi";
import { useTranslation } from "react-i18next";

const Schema = () => {
  const { t } = useTranslation();

  const schema = Joi.object({
    negName: Joi.string()
      .required()
      .messages({
        "string.base": `${t("genericmsg")}`,
        "any.required": `${t("genericmsg")}`,
        "string.empty": `${t("genericmsg")}`,
      }),
    negSubject: Joi.string()
      .required()
      .messages({
        "string.base": `${t("genericmsg")}`,
        "any.required": `${t("genericmsg")}`,
        "string.empty": `${t("genericmsg")}`,
      }),
    products: Joi.string()
      .required()
      .messages({
        "string.base": `${t("genericmsg")}`,
        "any.required": `${t("genericmsg")}`,
        "string.empty": `${t("genericmsg")}`,
      }),
    members: Joi.string()
      .required()
      .messages({
        "string.base": `${t("genericmsg")}`,
        "any.required": `${t("genericmsg")}`,
        "string.empty": `${t("genericmsg")}`,
      }),
    negPassCode: Joi.string()
      .required()
      .messages({
        "string.base": `${t("genericmsg")}`,
        "any.required": `${t("genericmsg")}`,
        "string.empty": `${t("genericmsg")}`,
      }),
  });
  return schema;
};

export default Schema;
