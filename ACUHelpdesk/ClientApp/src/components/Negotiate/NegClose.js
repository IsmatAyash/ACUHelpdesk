import React, { useState, useEffect } from "react";
import { Modal, Button, Table, ButtonGroup } from "react-bootstrap";
import { MdSave, MdCancel, MdEdit, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getNegProducts,
  updateNegProducts,
} from "../../services/negprodService";

const NegClose = props => {
  const [prods, setProds] = useState([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [cols, setCols] = useState({ tariff: 0, remarks: "" });

  useEffect(() => {
    async function getNegProds() {
      const { data } = await getNegProducts(props.negId);
      setProds(data);
    }
    getNegProds();
  }, []);

  const onEdit = ({ id, currentCol }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setCols(currentCol);
  };

  const handleUpdate = async () => {
    try {
      await updateNegProducts(props.negId, prods);
      toast.success("لقد تم تعديل التعرفة بنجاح");
      getNegProducts();
    } catch (ex) {
      toast.error("Data not saved, something went wrong");
    }
  };

  const onSave = ({ id, newCol }) => {
    const prodscopy = [...prods];
    const index = prodscopy.findIndex(p => p.id === id);
    prodscopy[index].tariff = newCol.newTariff;
    prodscopy[index].remarks = newCol.newRemarks;
    setProds(prodscopy);
    onCancel();
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    // reset the unit price state value
    setCols({ tariff: 0, remarks: "" });
  };
    console.log('Products', prods);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-right"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          تحديد التعرفة الموافق عليها
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>السلعة</th>
              <th>التعرفة المتفق عليها</th>
              <th>ملاحظات</th>
              <th>إجرائات</th>
            </tr>
          </thead>
          <tbody>
            {prods.map(prod => (
              <tr key={prod.id}>
                <td>{prod.productCode} - {prod.productDescriptionAR}</td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === prod.id ? (
                    <input
                      value={cols.tariff}
                      onChange={event =>
                        setCols({ ...cols, tariff: event.target.value })
                      }
                    />
                  ) : (
                    prod.tariff
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === prod.id ? (
                    <input
                      value={cols.remarks}
                      onChange={event =>
                        setCols({ ...cols, remarks: event.target.value })
                      }
                    />
                  ) : (
                    prod.remarks
                  )}
                </td>
                <td>
                  {inEditMode.status && inEditMode.rowKey === prod.id ? (
                    <ButtonGroup>
                      <Button
                        variant="success"
                        className="ml-1"
                        onClick={() =>
                          onSave({
                            id: prod.id,
                            newCol: {
                              newTariff: cols.tariff,
                              newRemarks: cols.remarks,
                            },
                          })
                        }
                      >
                        <MdSave className="ml-2" />
                        حفظ
                      </Button>

                      <Button
                        variant="secondary"
                        style={{ marginLeft: 8 }}
                        onClick={() => onCancel()}
                      >
                        <MdCancel className="ml-2" />
                        إلغاء
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() =>
                        onEdit({
                          id: prod.id,
                          currentCol: {
                            tariff: prod.tariff,
                            remarks: prod.remarks,
                          },
                        })
                      }
                    >
                      <MdEdit className="ml-2" />
                      تعديل
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          <MdClose className="ml-2" />
          إغلاق
        </Button>
        <Button variant="success" onClick={handleUpdate}>
          <MdSave className="ml-2" />
          حفظ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NegClose;
