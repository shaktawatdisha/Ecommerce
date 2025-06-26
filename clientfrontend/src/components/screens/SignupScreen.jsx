import React, { useEffect, useState } from "react";
import { Row, Col, Form, Card, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from '../../redux/actions/userActions'

const SignupScreen = () => {
  const navigate = useNavigate()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [cpass, setCPass] = useState('')

  const dispatch = useDispatch()
  const location = useLocation()
  const redirect = location.search?location.search.split("=")[1]:"/"

  const userSignup = useSelector((state) => state.userSignup)
  const {error, loading, userInfo} = userSignup

  useEffect(()=>{
    if (userInfo){
      navigate('/signup')
    }
  }, [userInfo, redirect])

  const submitHandle = (e) => {
    e.preventDefault()
    dispatch(signup(fname, lname, email, pass))
    navigate('/login')
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
          <h1 className='text-center mb-4'><i class="fa-solid fa-bag-shopping"></i> ShopCart</h1>
            <Card>
              <Card.Header as="h1" className="text-center bg-black text-light">
                Signup
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandle}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <i class="fa-solid fa-user"></i> First Name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Firstname" value={fname} onChange={(e)=>{setFname(e.target.value)}}/>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <i class="fa-solid fa-user"></i> Last Name
                    </Form.Label>
                    <Form.Control type="text" placeholder="Lastname" value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <i class="fa-solid fa-envelope"></i> Email Address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label>
                      <i class="fa-solid fa-lock"></i> Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label>
                      <i class="fa-solid fa-lock"></i> Confirm Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Password" value={cpass} onChange={(e)=>{setCPass(e.target.value)}}/>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2">
                    <button className="btn btn-md btn-success" type="submit">
                      Signup
                    </button>
                  </div>
                </Form>
                
                <Row className="py-3">
                  <Col>
                  Already User? 
                  <Link to={"/login"}> Login</Link>
                  </Col>
                </Row>
                
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupScreen;
