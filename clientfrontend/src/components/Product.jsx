import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addWishItem } from "../redux/actions/wishlistActions";
import { addToCart } from "../redux/actions/cartActions";

const Product = ({ sProduct }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    dispatch(addWishItem(sProduct));
    alert(`${sProduct.name} added to wishlist!`);
  };

  const handleAddToCart = () => {
    console.log("sproduct detail", sProduct)
    dispatch(addToCart(sProduct));
    alert(`${sProduct.name} added to cart`);
  };

  const productImage = sProduct.image?.[0]?.image_url || "/images/default_product_image.png";

  return (
    <Card className="my-4 p-3 rounded shadow-sm">
      <Link to={`product/${sProduct.id}`}>
        <div className="image-container">
          <Card.Img
            src={productImage}
            alt={sProduct.name || "Product"}
            className="product-img"
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`product/${sProduct.id}`}>
          <Card.Title as="div" className="text-center">
            <strong>{sProduct.name}</strong>
          </Card.Title>
        </Link>
        <div className="d-flex justify-content-around mt-3">
          <Button variant="primary" size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button variant="secondary" size="sm" onClick={handleAddToWishlist}>
            Favourites
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
