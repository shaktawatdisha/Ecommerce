import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const WishlistItem = ({ item, removeWishItem }) => {
  console.log("item", item)




  return (
    <Container>
      <Row>
        <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
          <Card className="my-3 p-3 rounded">
            <Link to={`product/${item.product}`}>
              <Card.Img src={item.primary_image} />
            </Link>
            <Card.Body>
              <Link to={`product/${item.product}`}>
                <Card.Title as="div">
                  <strong>{item.name}</strong>
                </Card.Title>
              </Link>
            </Card.Body>
            <div class="d-grid gap-2">
              <button class="btn btn-lg btn-primary" type="button">
                Add to Cart
              </button>
              <button type="button" class="btn btn-lg btn-primary" onClick={removeWishItem}>
                Remove
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WishlistItem;
