import React from "react";
import styled from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const NegIconButton = styled.i`
  margin-top: 0;
  margin-left: 10px;
  transition: 0.3s;

  &:hover {
    color: var(--success);
    cursor: pointer;
  }

  & > svg {
    font-size: large;
  }
`;

const IconButton = ({ icon, tooltip, placement, onAction }) => {
  return (
    <>
      <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={<Tooltip id={`tooltip-${placement}`}>{tooltip}</Tooltip>}
      >
        <NegIconButton onClick={onAction}>{icon}</NegIconButton>
      </OverlayTrigger>
    </>
  );
};

export default IconButton;
