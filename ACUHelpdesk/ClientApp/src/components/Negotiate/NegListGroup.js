import React from "react";
import { Card, ListGroup, Image, Button, FormControl } from "react-bootstrap";
import IconButton from "./IconButton";
import { MdDelete, MdSearch } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import NegMember from "./NegMember";
import {
  NegMemberListGroup,
  NegMemberListGroupItem,
  NegMemberCard,
} from "./NegMemberElements";

const members = [
  {
    id: 1,
    name: "ليال باسيل",
    image: "/images/layale.jpg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
  },
  {
    id: 2,
    name: "عصمت العياش",
    image: "/images/ismat.jpg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
    online: true,
  },
  {
    id: 3,
    name: "مارون عبود",
    image: "/images/flags/lb.svg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
  },
  {
    id: 4,
    name: "فليمون وهبي",
    image: "/images/avatarPlaceholder.png",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
    online: true,
  },
  {
    id: 5,
    name: "عصمت العياش",
    image: "/images/ismat.jpg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
    online: true,
  },
  {
    id: 6,
    name: "مارون عبود",
    image: "/images/flags/lb.svg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
  },
  {
    id: 7,
    name: "فليمون وهبي",
    image: "/images/avatarPlaceholder.png",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
    online: true,
  },
  {
    id: 8,
    name: "عصمت العياش",
    image: "/images/ismat.jpg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
    online: true,
  },
  {
    id: 9,
    name: "مارون عبود",
    image: "/images/flags/lb.svg",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
  },
  {
    id: 10,
    name: "فليمون وهبي",
    image: "/images/avatarPlaceholder.png",
    lastmsg: "المتفاوض الرئيسي للدولة المعنية من خلال",
    online: true,
  },
];

const NegListGroup = ({ lng, onAction, addIcon }) => {
  const { t } = useTranslation();

  const lngAlign = lng === "ar" ? " text-right" : " text-left";

  return (
    <NegMemberCard border="success">
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Image src="/images/ismat.jpg" width="40px" roundedCircle />
          <span>
            <IconButton
              icon={addIcon}
              tooltip="زيادة منصة للمفاوضات"
              placement="bottom"
              onAction={() => onAction("addGroup")}
            />
            <IconButton
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
            />
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
        <NegMemberListGroup as="ul" lng={lng}>
          {members.map(member => (
            <ListGroup.Item
              as="li"
              className="py-1"
              action
              variant={member.id % 2 === 0 ? "light" : "secondary"}
              key={member.id}
            >
              <NegMember
                name={member.name}
                lastMsg={member.lastmsg}
                avatar={member.image}
                lng={lng}
                online={member.online}
              />
            </ListGroup.Item>
          ))}
        </NegMemberListGroup>
      </Card.Body>
    </NegMemberCard>
  );
};

export default NegListGroup;
