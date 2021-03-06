import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { MdSave, MdCancel, MdFingerprint } from "react-icons/md";
import { validateProperty } from "../common/Form/validation";
import RenderInput from "./../common/Form/RenderInput";
import RenderSelect from "../common/Form/RenderSelect";
import { useTranslation } from "react-i18next";
import { getProducts } from "../../services/productService";
import { userService } from "../../services/userService";
import Container from "./DropdownContainer";
import Schema from "./negnewschema";
import { toast } from "react-toastify";
import "./BootStrap.css";

const NegNew = props => {
  const { onClose, lng, show, doSubmit, user, neg } = props;
  const [prods, setProds] = useState([]);
  const [membs, setMembs] = useState([]);
  const [products, setProducts] = useState(neg.products || []);
  const [members, setMembers] = useState(neg.members || []);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    negName: neg.title || "",
    negSubject: neg.subject || "",
    negPassCode: "",
    negCreatedBy: neg.createdBy || "",
    negStatus: neg.negStatus || "Pending",
  });

  const { t } = useTranslation();

  const schema = Schema();

  const options = [
    { id: "التعريفة الجمركية الموحدة", text: "التعريفة الجمركية الموحدة" },
    { id: "آليات التعويض والتضامن", text: "آليات التعويض والتضامن" },
    { id: "آليات المرونة", text: "آليات المرونة" },
  ];

  const handleProducts = (currentNode, selectedNodes) => {
    if (neg.id === 0) {
      const nodes = [...selectedNodes];
      setProducts(nodes);
    } else {
      const node = { ...currentNode };
      let ppCopy = [...products];
      if (node.checked)
        ppCopy = [...ppCopy, { productId: node.value, negotiationId: neg.id }];
      else ppCopy = ppCopy.filter(pp => pp.productId !== node.value);

      setProducts(ppCopy);
    }
  };

  const handleMembers = (currentNode, selectedNodes) => {
    if (neg.id === 0) {
      const nodes = [...selectedNodes];
      setMembers(nodes);
    } else {
      const node = { ...currentNode };
      let mmCopy = [...members];
      if (node.checked)
        mmCopy = [...mmCopy, { userId: node.value, negotiationId: neg.id }];
      else mmCopy = mmCopy.filter(mm => mm.userId !== node.value);

      setMembers(mmCopy);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log("name, values", name, value);
    const errorMsg = validateProperty(name, value, schema);
    if (errorMsg) setErrors({ ...errors, [name]: errorMsg });
    else delete errors[name];

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    async function getHSD() {
      try {
        const { data: prods } = await getProducts(neg.id);
        setProds(prods);
      } catch (ex) {
        toast.error("لم يتم قرأة السلع بنجاح!!");
      }
    }
    getHSD();
  }, [neg.id]);

  useEffect(() => {
    async function getMembers() {
      try {
        const { data: items } = await userService.getMembers(neg.id);
        setMembs(items);
      } catch (ex) {
        toast.error("لم تتم العملية بنجاح!!");
      }
    }
    getMembers();
  }, [neg.id]);

  const { negName, negSubject, negPassCode } = formData;

  return (
    <>
      <div>Passed</div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={lng === "ar" ? "text-right" : "text-left"}
        show={show}
        onHide={onClose}
      >
        <Form onSubmit={e => doSubmit(e, formData, products, members)}>
          <Modal.Header style={{ backgroundColor: "green", color: "white" }}>
            <Col>
              <Modal.Title>{t("negnew.header")}</Modal.Title>
            </Col>
            <Col>
              <Modal.Title style={{ float: "left" }}>
                <h5>{user && user.fullName}</h5>
                <small>{user && user.email}</small>
              </Modal.Title>
            </Col>
          </Modal.Header>
          <Modal.Body>
            <Form.Row className="align-items-center">
              <Col sm={6} className="my-1">
                <RenderInput
                  name="negName"
                  type="text"
                  placeholder={t("negnew.negnameplaceholder")}
                  value={negName}
                  onChange={handleChange}
                  // children={<MdTextFields color="gray" />}
                  validity="invalid"
                  errMsg={errors.negName}
                />
              </Col>

              <Col sm={6} className="my-1">
                <RenderSelect
                  value={negSubject}
                  name="negSubject"
                  fieldname="text"
                  defvalue={t("negnew.negsubjectplaceholder")}
                  options={options}
                  onChange={handleChange}
                  // children={<MdSubject color="gray" />}
                  validity="invalid"
                  errMsg={errors.negSubject}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label>{t("negnew.productsplaceholder")}</Form.Label>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Container
                  data={prods}
                  onChange={handleProducts}
                  className="bootstrap-demo"
                  texts={{
                    placeholder: t("negnew.productsplaceholder"),
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Label>{t("negnew.membersplaceholder")}</Form.Label>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Container
                  data={membs}
                  onChange={handleMembers}
                  className="bootstrap-demo"
                  texts={{ placeholder: t("negnew.membersplaceholder") }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="align-items-center">
              <RenderInput
                name="negPassCode"
                type="text"
                placeholder={t("negnew.passcodeplaceholder")}
                value={negPassCode}
                onChange={handleChange}
                children={<MdFingerprint color="gray" />}
                validity="invalid"
                errMsg={errors.negPassCode}
              />
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={onClose}
              className="text-right"
            >
              <MdCancel className="mx-2" />
              إلغاء
            </Button>
            <Button
              disabled={negPassCode !== user.negPassCode}
              variant="primary"
              type="submit"
              className="text-right"
            >
              <MdSave className="mx-2" /> حفظ المعلومات
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NegNew;
