import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import {
  MdSave,
  MdCancel,
  MdSubject,
  MdFingerprint,
  MdTextFields,
} from "react-icons/md";
import { validate, validateProperty } from "../common/Form/validation";
import _, { rest } from "lodash";
import DropdownTreeSelectHOC from "./HOC";
import RenderInput from "./../common/Form/RenderInput";
import RenderSelect from "../common/Form/RenderSelect";
import { useTranslation } from "react-i18next";
import { getProducts } from "../../services/productService";
import { userService } from "../../services/userService";
import { postNegotiation } from "../../services/negService";
import { UserContext } from "../../services/UserContext";
import Container from "./DropdownContainer";
import Schema from "./negnewschema";
import { toast } from "react-toastify";
import "./BootStrap.css";
import { members } from "./NegData";

const initialValues = {
  negName: "",
  negSubject: "",
  negPassCode: "",
};

const NegNew = props => {
  const { onClose, lng, show } = props;
  const { user } = useContext(UserContext);
  const [prods, setProds] = useState([]);
  const [membs, setMembs] = useState([]);
  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialValues);

  const { t } = useTranslation();

  const schema = Schema();

  const options = [
    { id: 1, text: "التعريفة الجمركية الموحدة" },
    { id: 2, text: "آليات التعويض والتضامن" },
    { id: 3, text: "آليات المرونة" },
  ];

  const handleProducts = (currentNode, selectedNodes) => {
    const nodes = [...selectedNodes];
    setProducts(nodes);
  };

  const handleMembers = (currentNode, selectedNodes) => {
    const nodes = [...selectedNodes];
    setMembers(nodes);
  };

  // const onChange = (currentNode, selectedNodes) => {
  //   console.log("path::", currentNode.path);
  //   console.log("Selected Nodes", selectedNodes);
  //   console.log("Current Node", currentNode);
  //   selectedProds.push(currentNode);
  //   console.log("selectedProds", selectedProds);
  //   setFormData({
  //     ...formData,
  //     products: selectedNodes,
  //   });
  // };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log("name, values", name, value);
    const errorMsg = validateProperty(name, value, schema);
    if (errorMsg) setErrors({ ...errors, [name]: errorMsg });
    else delete errors[name];

    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData(initialValues);
    setProducts([]);
    setMembers([]);
    setErrors({});
  };

  useEffect(() => {
    async function getHSD() {
      try {
        const { data: prods } = await getProducts();
        setProds(prods);
      } catch (ex) {
        toast.error("لم يتم قرأة السلع بنجاح!!");
      }
    }
    getHSD();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    async function getMembers() {
      try {
        const items = await userService.getMembers();
        const mapped = _.chain(items.data)
          .groupBy(c => c.country)
          .map((children, country) => ({ label: country, children }))
          .value();
        setMembs(mapped);
      } catch (ex) {
        toast.error("لم تتم العملية بنجاح!!");
      }
    }
    getMembers();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const negotiation = {
      negSubject,
      negName,
      userId: user.userId,
      negotiationProducts: products.map(product => ({
        productId: product.value,
      })),
      negotiationMembers: members.map(member => ({ userId: member.value })),
    };

    console.log("neg to send", negotiation);

    try {
      await postNegotiation(negotiation);
      toast.success("لقد تم حفظ هذه المفاوضات بنجاح");
      resetForm();
      setErrors({});
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ ...errors, message: ex.response.data.message });
        toast.error(`Something has failed ,${ex.response.data.message}`);
      }
    }

    console.log("negotiation to post", negotiation);
  };

  const { negName, negSubject, negPassCode } = formData;

  const loading = () => {
    return (
      <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </>
    );
  };

  console.log("formData", formData);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={lng === "ar" ? "text-right" : "text-left"}
        show={show}
        onHide={onClose}
      >
        <Form onSubmit={handleSubmit}>
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
                  children={<MdTextFields color="gray" />}
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
                  children={<MdSubject color="gray" />}
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
                {isLoading ? (
                  loading()
                ) : (
                  <Container
                    data={prods}
                    onChange={handleProducts}
                    className="bootstrap-demo"
                    texts={{
                      placeholder: t("negnew.productsplaceholder"),
                    }}
                  />
                )}
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
