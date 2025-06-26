import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Card, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {login} from '../../redux/actions/userActions'

const LoginScreen = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const location = useLocation()
  const dispatch = useDispatch()
  const redirect = location.search?location.search.split("=")[1]:"/"

  const userLogin = useSelector((state) => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(()=>{
    if (userInfo){
      navigate('/')
    }
  }, [userInfo, redirect])


  const submitHandle = (e) => {
    e.preventDefault()
    dispatch(login(email, pass))
    navigate('/')
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
              Login
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandle}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <i class="fa-solid fa-envelope"></i> Email Address
                  </Form.Label>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label>
                    <i class="fa-solid fa-lock"></i> Password
                  </Form.Label>
                  <Form.Control type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                </Form.Group>

                <br />
                <div className="d-grid gap-2">
                  <button className="btn btn-md btn-success" type="submit">
                    Login
                  </button>
                </div>
              </Form>
              <Row className="py-3">
                  <Col>
                  New User? 
                  <Link to={"/signup"}> Signup</Link>
                  </Col>
                </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  </>
  )
}

export default LoginScreen