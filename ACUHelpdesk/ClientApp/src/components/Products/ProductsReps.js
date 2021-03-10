import React from "react";
import { Media, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProductsReps = ({ img, title, bodyText }) => {
  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");
  const lngStyle = lng === "ar" ? "ml-5" : "mr-5";

  return (
    <Media>
      <Media as="li">
        <img
          width={150}
          height={150}
          className={lngStyle}
          src={img}
          alt={title}
        />
        <Media.Body>
          <h5>{title}</h5>
          <p>{bodyText}</p>
          <div className="mb-3">
            <Button as={Link} to="/" variant="success">
              {t("home.events.learnMore")}
            </Button>
          </div>
        </Media.Body>
      </Media>
    </Media>
  );
};

export default ProductsReps;
