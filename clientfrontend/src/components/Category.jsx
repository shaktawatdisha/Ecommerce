import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const Category = ({ sCategory }) => {

  const productImage = sCategory.image?.[0]?.image_url || "/images/default_product_image.png";

  return (
    <Card className="my-4 p-3 rounded shadow-sm">
      <Link to={`category/${sCategory.id}`}>
        <div className="image-container">
          <Card.Img
            src={productImage}
            alt={sCategory.name || "Category"}
            className="product-img"
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`category/${sCategory.id}`}>
          <Card.Title as="div" className="text-center">
            <strong>{sCategory.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Category;
