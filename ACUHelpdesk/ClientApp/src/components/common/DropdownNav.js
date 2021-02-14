import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const DropdownNav = ({ onItemSelect, items, child, text }) => {
  const lng = localStorage.getItem("i18nextLng");

  const ddTitle = () => (
    <>
      {child}
      {"   "}
      {/* {text} */}
    </>
  );

  return (
    <NavDropdown title={ddTitle()} id="collasible-nav-dropdown">
      <NavDropdown.ItemText
        style={{ textAlign: lng === "ar" ? "right" : "left" }}
      >
        {text}
      </NavDropdown.ItemText>
      <NavDropdown.Divider />
      {items.map(item =>
        item.option === "divider" ? (
          <NavDropdown.Divider />
        ) : (
          <NavDropdown.Item
            key={item.id}
            as={Link}
            onClick={() => onItemSelect(item.id)}
            to={item.id}
            style={{ textAlign: lng === "ar" ? "right" : "left" }}
          >
            {item.option}
          </NavDropdown.Item>
        )
      )}
    </NavDropdown>
  );
};

export default DropdownNav;
