import Joi from "joi";
import { useTranslation } from "react-i18next";

const Schema = () => {
  const { t } = useTranslation();

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com", "net","org"] } })
      .required()
      .messages({
        "string.base": `${t("login.emailerrmsg")}`,
        "any.required": `${t("login.emailerrmsg")}`,
        "string.empty": `${t("login.emailerrmsg")}`,
        "string.email": `${t("login.emailerrmsg")}`,
      }),
  });
  return schema;
};

export default Schema;
