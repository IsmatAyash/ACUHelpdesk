import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { UserContext } from "../../services/UserContext";
import { FaHome } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import DropdownNav from "../../components/common/DropdownNav";
import "./Menubar.css";

const StyledDropDownItem = styled(NavDropdown.Item)`
  text-align: ${({ lng }) => (lng === "ar" ? "left" : "right")};
  text-decoration: none;
`;

const Menubar = ({ onSelect }) => {
  const { user } = useContext(UserContext);

  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");
  const lngStyle = lng === "ar" ? "ml-auto" : "mr-auto";

  const [expanded, setExpanded] = useState(false);
  const adminItems = [
    { id: "/register", option: `${t("menubar.users")}` },
    { id: "/countries", option: `${t("menubar.countries")}` },
    { id: "/createpasscode", option: `${t("menubar.createpasscode")}` },
  ];

  const icon = () => (
    <>
      <FaHome
        style={{ marginLeft: "10px", verticalAlign: "middle", marginBottom: 5 }}
      />
    </>
  );

  const navlinks = [
    { id: 1, path: "/", label: `${t("menubar.home")}`, icon: true },
    { id: 2, path: "/socecocab", label: `${t("menubar.socecocab")}` },
    {
      id: 3,
      path: "/spcomm",
      label: `${t("menubar.spcomm.spcomm")}`,
      dditems: [
        {
          idd: 4,
          option: `${t("menubar.spcomm.maincom")}`,
          eventKey: "mainreps",
        },
        {
          idd: 5,
          option: `${t("menubar.spcomm.execcom")}`,
          eventKey: "execreps",
        },
        {
          idd: 6,
          option: `${t("menubar.spcomm.othercom")}`,
          eventKey: "othercom",
        },
        { idd: 7, option: "divider" },
        {
          idd: 8,
          option: `${t("menubar.spcomm.customcom")}`,
          eventKey: "customreps",
        },
        {
          idd: 9,
          option: `${t("menubar.spcomm.tariffcom")}`,
          eventKey: "tariffreps",
        },
      ],
    },
    { id: 10, path: "/reports", label: `${t("menubar.reports")}` },
    {
      id: 11,
      path: "/meetings",
      label: `${t("menubar.meetings.meetings")}`,
      dditems: [
        {
          idd: 12,
          option: `${t("menubar.meetings.formalmeetings")}`,
          path: "/meetings/formalmeetings",
        },
        {
          idd: 13,
          option: `${t("menubar.meetings.upcomingmeetings")}`,
          path: "/meetings/upcomingmeetings",
        },
      ],
    },
  ];

  const handleSelect = opt => {
    setExpanded(false);
  };

  const handleClick = e => {
    setExpanded(false);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      expanded={expanded}
      className="justify-content-space-between"
      style={{
        textAlign: lng === "ar" ? "right" : "left",
        fontSize: 16,
        padding: 5,
      }}
    >
      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "expanded")}
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={lngStyle} onSelect={onSelect} defaultActiveKey="/">
          {navlinks.map(navlink =>
            !navlink.dditems ? (
              <NavLink
                key={navlink.id}
                exact
                className="nav-item nav-link ml-2"
                to={navlink.path}
                onClick={e => handleClick(e)}
              >
                {navlink.icon && icon()}
                {navlink.label}
              </NavLink>
            ) : (
              <NavDropdown
                key={navlink.id}
                title={navlink.label}
                id="collasible-nav-dropdown"
                className="ml-2"
              >
                {navlink.dditems.map(dditem =>
                  dditem.option === "divider" ? (
                    <NavDropdown.Divider key={dditem.id} />
                  ) : (
                    <NavDropdown.Item
                      key={dditem.id}
                      as={Link}
                      to={navlink.path}
                      eventKey={`${dditem.eventKey}/${dditem.option}`}
                      style={{ textAlign: lng === "ar" ? "right" : "left" }}
                      onClick={() => setExpanded(false)}
                    >
                      {dditem.option}
                    </NavDropdown.Item>
                  )
                )}
              </NavDropdown>
            )
          )}
          {user && (
            <>
              <NavLink
                exact
                className="nav-item nav-link"
                activeClassName="bg-success"
                to="/negotiation"
                onClick={() => setExpanded(false)}
              >
                {t("menubar.negotiation")}
              </NavLink>
              <NavLink
                exact
                className="nav-item nav-link"
                activeClassName="bg-success"
                to="/products"
                onClick={() => setExpanded(false)}
              >
                {t("menubar.products")}
              </NavLink>
            </>
          )}
        </Nav>
        {user && user.role === "Admin" && (
          <Nav className={lng === "ar" ? "mr-auto" : "ml-auto"}>
            <DropdownNav
              menuAlign="right"
              onItemSelect={opt => handleSelect(opt)}
              items={adminItems}
              text={user.fullName}
              child={<MdSettings color="white" />}
            />
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menubar;
