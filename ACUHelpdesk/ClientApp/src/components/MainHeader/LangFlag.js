import React from "react";
import { Button, Image } from "react-bootstrap";

const LangFlag = ({ flag, lang, onLang, lng }) => {
  return (
    <Button size="sm" variant="link" onClick={onLang}>
      <Image
        src={flag}
        width="25"
        height="20"
        className={lng === "ar" ? "ml-1 mb-1" : "mr-1 mb-1"}
      />
      {lang}
    </Button>
  );
};

export default LangFlag;
