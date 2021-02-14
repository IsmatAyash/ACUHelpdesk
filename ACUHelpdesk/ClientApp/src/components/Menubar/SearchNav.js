import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

const SearchNav = ({ onSearch }) => {
  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");
  const lngStyle = lng === "ar" ? "ml-sm-4 rtl" : "mr-sm-4";

  return (
    <>
      <InputGroup>
        <InputGroup.Prepend>
          <Button variant="success">
            <FaSearch onClick={e => onSearch(e)} />
          </Button>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder={t("menubar.search")}
          aria-describedby="basic-addon1"
          className={lngStyle}
        />
      </InputGroup>{" "}
    </>
  );
};

export default SearchNav;
