import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { mainprods } from "./ProductsData";
import ProductsReps from "./ProductsReps";
import { HeaderLabel } from "./ProductsElements";

const Products = () => {
    const lng = localStorage.getItem("i18nextLng");

    return (
        <Container
            className="p-2"
            style={{ textAlign: lng === "ar" ? "right" : "left" }}
        >
            <Row>
                <Col>
                    <HeaderLabel>تصنيف السلع حسب مستويات</HeaderLabel>
                    <ul className="list-unstyled">
                        {mainprods.map(prod => (
                            <ProductsReps key={prod.id} {...prod} />
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;
