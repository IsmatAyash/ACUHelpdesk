import React from "react";
import {
  Card,
  ListGroup,
  Image,
  Button,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import IconButton from "./IconButton";
import { MdDelete, MdSearch } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import NegMember from "./NegMember";
import {
  NegMemberListGroup,
  NegMemberListGroupItem,
  NegMemberCard,
  NegIconButton,
} from "./NegMemberElements";
import NegNeg from "./NegNeg";

const NegListGroup = ({
  lng,
  onNew,
  addIcon,
  data,
  mem,
  onItemSelect,
  onAction,
  placement,
  tooltip,
  user,
}) => {
  const { t } = useTranslation();

  const lngAlign = lng === "ar" ? " text-right" : " text-left";

  return (
    <NegMemberCard border="success">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Image src="/images/ismat.jpg" width="40px" roundedCircle />
          <span>
            <OverlayTrigger
              key={placement}
              placement={placement}
              overlay={<Tooltip id={`tooltip-${placement}`}>{tooltip}</Tooltip>}
            >
              <NegIconButton onClick={onNew}>{addIcon}</NegIconButton>
            </OverlayTrigger>

            {/* <IconButton
              icon={addIcon}
              tooltip="زيادة منصة للمفاوضات"
              placement="bottom"
              onNew={onNew}
            /> */}
            {/* <IconButton
              icon={<RiEdit2Fill />}
              tooltip="تعديل منصة للمفاوضات"
              placement="bottom"
              onAction={() => onAction("editGroup")}
            />
            <IconButton
              icon={<MdDelete />}
              tooltip="إلغاء منصة للمفاوضات"
              placement="bottom"
              onAction={() => onAction("delGroup")}
            /> */}
          </span>
        </div>
      </Card.Header>
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
      <Card.Body className="p-0">
        {mem ? (
          <NegMemberListGroup as="ul" lng={lng}>
            <NegMember members={data} lng={lng} lastMsg="مرحبا يا أحلى عالم" />
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
