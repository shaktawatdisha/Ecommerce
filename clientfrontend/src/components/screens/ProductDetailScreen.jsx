import React, { useEffect } from "react";
import { Row, Col, Container, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { productDetail } from "../../redux/actions/productActions";

const ProductDetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(productDetail(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          <Col md={6}>
            {/* Placeholder image since product_images is not provided */}
            <img src="placeholder-image-url" alt={product?.name} style={{ width: '100%' }} />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Brand: {product?.brand}</ListGroup.Item>
              <ListGroup.Item>Description: {product?.description}</ListGroup.Item>
              <ListGroup.Item>Price: Rs {product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Stock Quantity: {product?.stock_quantity > 0 ? product.stock_quantity : 'Out of Stock'}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product?.status ? 'Available' : 'Unavailable'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    disabled={product?.stock_quantity === 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {/* Product Variants Section */}
      {product?.variants?.length > 0 && (
        <Row className="mt-4">
          <Col>
            <h4>Available Variants</h4>
            <ListGroup>
              {product.variants.map((variant) => (
                <ListGroup.Item key={variant.id}>
                  <Row>
                    <Col>Color: {variant.color || 'N/A'}</Col>
                    <Col>Size: {variant.size || 'N/A'}</Col>
                    <Col>Price: Rs {variant.price}</Col>
                    <Col>Stock: {variant.stock_quantity > 0 ? 'Available' : 'Out of Stock'}</Col>
                    <Col>
                      <Button
                        variant="primary"
                        disabled={variant.stock_quantity === 0}
                        onClick={() => {/* Add to Cart logic for specific variant */}}
                      >
                        Add to Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetailScreen;
