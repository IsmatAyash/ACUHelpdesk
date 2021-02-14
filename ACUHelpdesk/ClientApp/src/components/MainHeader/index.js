import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  FormControl,
  Button,
  Form,
  Nav,
  InputGroup,
} from "react-bootstrap";
import LangFlag from "./LangFlag";
import { useTranslation } from "react-i18next";
import { UserContext } from "./../../services/UserContext";
import DropdownNav from "../common/DropdownNav";
import { Link } from "react-router-dom";
import { FaSearch, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const MainHeader = () => {
  const { user } = useContext(UserContext);
  const lng = localStorage.getItem("i18nextLng");
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const lngStyle = lng === "ar" ? "ml-sm-2" : "mr-sm-2";

  const handleSearch = e => {
    // handle search here
  };

  const userItems = [
    { id: "/profile", option: `${t("menubar.profile")}` },
    { id: "/signout", option: `${t("menubar.logout")}` },
  ];

  const handleItemSelect = opt => {
    // setExpanded(false);
  };

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container fluid className="pt-1 mb-2">
      <Row
        className="justify-content-sm-between"
        style={{ borderBottom: "3px solid gray" }}
      >
        <Col sm={4}>
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <Button variant="success" size="sm">
                  <FaSearch onClick={e => handleSearch(e)} />
                </Button>
              </InputGroup.Prepend>
              <FormControl
                type="text"
                placeholder={t("menubar.search")}
                aria-describedby="basic-addon1"
                size="sm"
              />
            </InputGroup>{" "}
            {/* <Button size="sm" variant="outline-success" onClick={handleSearch}>
              <FaSearch />
            </Button>
            <FormControl
              size="sm"
              type="text"
              placeholder={t("menubar.search")}
              className={lngStyle}
            /> */}
          </Form>
        </Col>
        <Col sm={4} className="justify-content-center text-sm-center">
          <LangFlag
            lng={lng}
            flag="/images/arab.jpg"
            lang={t("menubar.arabic")}
            onLang={() => changeLanguage("ar")}
          />
          <LangFlag
            lng={lng}
            flag="/images/usa.svg"
            lang={t("menubar.english")}
            onLang={() => changeLanguage("en")}
          />
          <LangFlag
            lng={lng}
            flag="/images/france.svg"
            lang={t("menubar.french")}
            onLang={() => changeLanguage("fr")}
          />
        </Col>
        <Col sm={4}>
          <Form inline className="justify-content-end">
            {!user ? (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-success"
                  size="sm"
                  className={lng === "ar" ? "ml-2" : "mr-2"}
                >
                  <span>
                    <FaSignInAlt className={lng === "ar" ? "ml-2" : "mr-2"} />
                    {t("menubar.login")}
                  </span>
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-success"
                  size="sm"
                >
                  <span>
                    <FaUserPlus className={lng === "ar" ? "ml-2" : "mr-2"} />
                    {t("menubar.signup")}
                  </span>
                </Button>
              </>
            ) : (
              user && (
                <Nav className={lngStyle}>
                  <DropdownNav
                    menuAlign="right"
                    onItemSelect={opt => handleItemSelect(opt)}
                    items={userItems}
                    text={user.fullName}
                    child={
                      <Image
                        // src={`/images/flags/${user.alpha2}.svg`}
                        src={user.avatarSrc}
                        alt="menu name"
                        width="20"
                        height="20"
                        className="d-inline-block"
                        roundedCircle
                      />
                    }
                  />
                </Nav>
              )
            )}
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-sm-between">
        <Col sm={1}>
          <Image
            src="/images/logo.png"
            fluid
            width="100"
            height="100"
            className="pt-3"
          />
        </Col>
        <Col sm={10} className="text-center pt-4">
          <Row className="justify-content-sm-center mt-1 mb-4">
            <h3>{t("title")}</h3>
          </Row>
        </Col>
        <Col sm={1}>
          <Image
            src="/images/escwaLogo.png"
            fluid
            width="100"
            height="100"
            className="pt-2"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MainHeader;
