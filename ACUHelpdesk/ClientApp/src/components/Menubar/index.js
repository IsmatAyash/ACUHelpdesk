import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { UserContext } from "../../services/UserContext";
import {
  FaHome,
  FaHandsHelping,
  FaUniversity,
  FaFileContract,
  FaTasks,
  FaLayerGroup,
} from "react-icons/fa";
import { GiRoundTable } from "react-icons/gi";
import { MdSettings } from "react-icons/md";
import DropdownNav from "../../components/common/DropdownNav";
import "./Menubar.css";

const Menubar = ({ onSelect }) => {
  const { user } = useContext(UserContext);

  const { t } = useTranslation();

  const lng = localStorage.getItem("i18nextLng");
  const lngStyle = lng === "ar" ? "ml-auto" : "mr-auto";

  const [expanded, setExpanded] = useState(false);
  const adminItems = [
    { id: "/users", option: `${t("menubar.users")}` },
    { id: "/countries", option: `${t("menubar.countries")}` },
    { id: "/createpasscode", option: `${t("menubar.createpasscode")}` },
  ];

  const iconStyle = lng === "ar" ? "ml-2 mb-1" : "mr-2 mb-1";

  const icon = idx => {
    switch (idx) {
      case 1:
        return <FaHome className={iconStyle} />;
      case 2:
        return <FaUniversity className={iconStyle} />;
      case 3:
        return (
          <>
            <FaLayerGroup className={iconStyle} /> {t("menubar.spcomm.spcomm")}
          </>
        );
      case 11:
        return (
          <>
            <GiRoundTable className={iconStyle} />
            {t("menubar.meetings.meetings")}
          </>
        );
      case 10:
        return <FaFileContract className={iconStyle} />;
      case 14:
        return <FaHandsHelping className={iconStyle} />;
      case 15:
        return <FaTasks className={iconStyle} />;
      default:
        break;
    }
  };

  const navlinks = [
    { id: 1, path: "/", label: `${t("menubar.home")}` },
    { id: 2, path: "/socecocab", label: `${t("menubar.socecocab")}` },
    {
      id: 3,
      path: "/spcomm",
      label: icon(3),
      dditems: [
        {
          id: 4,
          option: `${t("menubar.spcomm.maincom")}`,
          eventKey: "mainreps",
        },
        {
          id: 5,
          option: `${t("menubar.spcomm.execcom")}`,
          eventKey: "execreps",
        },
        {
          id: 6,
          option: `${t("menubar.spcomm.othercom")}`,
          eventKey: "othercom",
        },
        { id: 7, option: "divider" },
        {
          id: 8,
          option: `${t("menubar.spcomm.customcom")}`,
          eventKey: "customreps",
        },
        {
          id: 9,
          option: `${t("menubar.spcomm.tariffcom")}`,
          eventKey: "tariffreps",
        },
      ],
    },
    { id: 10, path: "/reports", label: `${t("menubar.reports")}` },
    {
      id: 11,
      path: "/meetings",
      label: icon(11),
      dditems: [
        {
          id: 12,
          option: `${t("menubar.meetings.formalmeetings")}`,
          path: "/meetings/formalmeetings",
        },
        {
          id: 13,
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
        padding: 0,
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
                className="nav-item nav-link nav-links px-4"
                to={navlink.path}
                onClick={e => handleClick(e)}
              >
                {icon(navlink.id)}
                {navlink.label}
              </NavLink>
            ) : (
              <NavDropdown
                key={navlink.id}
                title={navlink.label}
                id="collasible-nav-dropdown"
                className="nav-links"
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
                className="nav-item nav-link nav-links px-4"
                activeClassName="bg-success"
                to="/negotiation"
                onClick={() => setExpanded(false)}
              >
                {icon(14)}
                {t("menubar.negotiation")}
              </NavLink>
              <NavLink
                exact
                className="nav-item nav-link nav-links px-4"
                activeClassName="bg-success"
                to="/products"
                onClick={() => setExpanded(false)}
              >
                {icon(15)}
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
