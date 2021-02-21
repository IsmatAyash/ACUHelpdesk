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
import { getNegnewdata } from "../../services/negService";
import { UserContext } from "../../services/UserContext";
import Container from "./DropdownContainer";
import Schema from "./negnewschema";
import { toast } from "react-toastify";
import "./BootStrap.css";

const initialValues = {
  negName: "",
  negSubject: "",
  negPassCode: "",
  products: [],
  members: [],
};

let selectedProds = [];
let selectedMembs = [];

const NegNew = props => {
  const { onClose, lng, show } = props;
  const { user } = useContext(UserContext);
  const [prods, setProds] = useState([]);
  const [membs, setMembs] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialValues);
  const [selP, setSelP] = useState([{}]);

  const { t } = useTranslation();

  const schema = Schema();

  const options = [
    { id: 1, text: "التعريفة الجمركية الموحدة" },
    { id: 2, text: "آليات التعويض والتضامن" },
    { id: 3, text: "آليات المرونة" },
  ];

  const handleProducts = (currentNode, selectedNodes) => {
    // selectedProds = [];
    // selectedProds.push(selectedNodes);
    // console.log("Selected Prods", selectedProds);
    console.log(currentNode);
    setSelP([...selP, currentNode]);
    console.log("selP", selP);

    setFormData({
      ...formData,
      negName: "Ismat",
      products: [5],
    });
    console.log("on change products executed", formData.products);

    // console.log("onChange::", currentNode, selectedNodes);
  };

  const handleMembers = (currentNode, selectedNodes) => {
    // selectedMembs = [];
    // selectedMembs.push(selectedNodes);
    // console.log("Selected Membs", selectedMembs);
    console.log(currentNode);

    setFormData({
      ...formData,
      members: [...formData.members, currentNode.value],
    });
    console.log("on change members executed", formData.members);

    // setFormData({ ...formData, members: currentNode });
    // console.log("onChange::", currentNode, selectedNodes);
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

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("Submit clicked before", formData);
    // const cloneProd = [...selectedProds];
    // console.log("Cloned Prods", cloneProd);
    // setFormData({
    //   ...formData,
    //   products: [...selectedProds],
    //   members: [...selectedMembs],
    // });
    toast.success("لقد تم حفظ هذه المفاوضات بنجاح");
    console.log("Submit clicked", formData);
  };

  // console.log("Products", !products && products);
  // console.log("Members", !members && members);
  // console.log("formData memb", formData.members);
  // console.log("formData prod", formData.products);

  const { negName, negSubject, negPassCode, members, products } = formData;

  const loading = () => {
    return (
      <>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </>
    );
  };

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
            <Button variant="primary" type="submit" className="text-right">
              <MdSave className="mx-2" /> حفظ المعلومات
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default NegNew;
