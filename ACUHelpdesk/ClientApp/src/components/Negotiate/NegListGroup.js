import React from "react";
import {
  Card,
  Image,
  Button,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { MdSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import NegMember from "./NegMember";
import {
  NegMemberListGroup,
  NegMemberCard,
  NegIconButton,
} from "./NegMemberElements";
import NegNeg from "./NegNeg";

const NegListGroup = ({
  lng,
  addIcon,
  data,
  memb,
  onItemSelect,
  onAction,
  placement,
  tooltip,
  onInvitation,
  title,
  imageSrc,
}) => {
  const { t } = useTranslation();

  const lngAlign = lng === "ar" ? " text-right" : " text-left";

  return (
    <NegMemberCard border="success">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Image src={imageSrc} width="40px" roundedCircle />
          <h5 className="text-center mt-3">{title}</h5>
          <span>
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={<Tooltip id={`tooltip-${placement}`}>{tooltip}</Tooltip>}
            >
              <NegIconButton onClick={() => onAction("newGroup")}>
                {addIcon}
              </NegIconButton>
            </OverlayTrigger>
          </span>
        </div>
      </Card.Header>
      {!memb && (
        <div className="d-flex p-2">
          <Button size="sm" variant="outline-success" className="mx-1">
            <MdSearch />
          </Button>
          <FormControl
            size="sm"
            type="text"
            placeholder={t("menubar.search")}
            className={lngAlign}
          />
        </div>
      )}
      <Card.Body className="p-0 m-0">
        {memb ? (
          <NegMemberListGroup as="ul" lng={lng}>
            <NegMember
              members={data}
              lng={lng}
              lastMsg="أخر رسالة تدون هنا"
              onInvitation={onInvitation}
            />
          </NegMemberListGroup>
        ) : (
          <NegMemberListGroup as="ul" lng={lng}>
            <NegNeg
              negs={data}
              onItemSelect={onItemSelect}
              onAction={onAction}
            />
          </NegMemberListGroup>
        )}
      </Card.Body>
    </NegMemberCard>
  );
};

export default NegListGroup;
