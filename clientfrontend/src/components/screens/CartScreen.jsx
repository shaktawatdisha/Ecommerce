import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row, Image, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../../redux/actions/cartActions';  
import { Link } from 'react-router-dom';
import { addOrder } from '../../redux/actions/orderActions';


const CartScreen = () => {
  const dispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(50);
  const [grandTotal, setGrandTotal] = useState(0)

  const cartItems = useSelector((state) => state.fetchFromCart);
  const { loading, error, products } = cartItems || { loading: false, error: null, products: [] };
  // console.log("products", products[0].product.images[0].image_url)
  console.log("products", products[0])
  const itemss = products[0]


  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    console.log("usedispatch me issue hai")
    if (products.length > 0) {
      let tempSubtotal = 0;
      products.forEach((item) => {
        tempSubtotal += item.product.price * item.quantity;  
      });

      const tempDiscount = (tempSubtotal * 0.05);  
      const tempSubtotalAfterDiscount = tempSubtotal - tempDiscount;

      const tempGrandTotal = tempSubtotalAfterDiscount + shippingCharges;

      setSubtotal(tempSubtotal);
      setDiscount(tempDiscount);
      setGrandTotal(tempGrandTotal);
    }
  }, [products, shippingCharges]);

  const handleQuantityChange = (itemId, newQuantity, maxQuantity) => {
    if (newQuantity <= maxQuantity) {
    } else {
      alert(`The maximum quantity available is ${maxQuantity}`);
    }
  };

  const removeCartProduct = (item) => {
    console.log("remove product from cart", item.id)
    dispatch(removeFromCart(item.id));
  };

  const handleOrder = (()=>{
    console.log("place order")
    const orderItems = products.map((item) => ({
      product: item.product.id,
      product_variant: item.product_variant?.id,
      product_name: item.product.name,
      color: item.product.color,
      size: item.product.size,
      price: item.product.price,
      quantity: item.quantity,
      total_amount: (item.product.price * item.quantity).toFixed(2),
    }));

    // Prepare order details
    const orderDetails = {
      discount_amount: discount.toFixed(2),
      sub_total: subtotal.toFixed(2),
      shipping_amount: shippingCharges.toFixed(2),
      grand_total: grandTotal.toFixed(2),
      status: "placed",
      payment_status: "paid",
      payment_type: "upi", 
      payment_transaction_id: null,
      order_items: orderItems,
    };
    
    dispatch(addOrder(orderDetails))
  })


  return (
    <Container>
      <h1 className='mt-3'>Shopping Cart</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : products.length === 0 ? (
        <h2>Your cart is empty!</h2>
      ) : (
        <>
        
        <Row className="text-center mt-5 mb-4">
            <Col md={2} style={{ fontWeight: "bold" }}>Product Image</Col>
            <Col md={3} style={{ fontWeight: "bold" }}>Product</Col>
            <Col md={2} style={{ fontWeight: "bold" }}>Price</Col>
            <Col md={2} style={{ fontWeight: "bold" }}>Quantity</Col>
            <Col md={2} style={{ fontWeight: "bold" }}>Total</Col>
            <Col md={1}></Col>
        </Row>
        

        <ListGroup variant='flush'>
          {products.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row className='text-center'>
                <Col md={2}>
                  <Image
                    src={
                      item.product.images && item.product.images.length > 0
                        ? item.product.images[0].image_url
                        : "/images/default_product_image.png"
                    }
                    alt={item.product.name || "Product Image"}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product.id}`}>
                    {item.product_variant ? `${item.product.name} (${item.product.color}, ${item.product.size})` : item.product.name}
                  </Link>
                </Col>
                <Col md={2}>${item.product.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value), item.product.stock_quantity)}
                  >
                    {[...Array(item.product.stock_quantity).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  ${item.product.price * item.quantity}
                </Col>
                <Col md={1}>
                  <Button className="btn-block btn-danger" type="button" onClick={removeCartProduct(item.product.id)}>Remove</Button>
                  {/* onClick={removeCartProduct(item.id)} */}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="d-flex justify-content-end mt-5">
        <div className="card bg-light mb-2" style={{ maxWidth: "20em"}}>
          <div className="card-header">Total</div>
          <div className="card-body">
            <p className="card-text">Discount: <span  style={{ fontWeight: "bold" }}>5%</span></p>
            <p className="card-text">Sub Total: <span  style={{ fontWeight: "bold" }}>$ {subtotal}</span></p>
            <p className="card-text">Shipping Charges: <span  style={{ fontWeight: "bold" }}>{shippingCharges}</span></p>
            <p className="card-text">Grand Total: <span style={{ fontWeight: "bold" }}>$ {grandTotal}</span></p>
            <div className="d-grid gap-2">
              <Button className="btn-block btn-success" type="button" onClick={handleOrder}>Order</Button> 
              {/* Need to do a payment process and after the confirmation of the payment then process order else not but du
              to login issue in razor i am skipping the payment process here and jump straight to order */}
            </div>
          </div>
        </div>
        </div>
        </>
        
      )}
    </Container>
  );
};

export default CartScreen;
