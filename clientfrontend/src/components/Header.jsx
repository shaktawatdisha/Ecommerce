import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const {error, loading, userInfo} = userLogin

  
  const handleLogout = () => {
    console.log("logout ")
    dispatch(logout())
    navigate('/login')
  }

  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg bg-primary bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <LinkContainer to="/">
            <Nav.Link className="navbar-brand">ShopCart</Nav.Link>
          </LinkContainer>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <LinkContainer to="/">
                  <Nav.Link className="nav-link active">Home <i class="fa-solid fa-house"></i></Nav.Link>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/cart">
                  <Nav.Link className="nav-link active">Cart <i class="fa-solid fa-cart-shopping"></i></Nav.Link>
                </LinkContainer>
              </li>
              <NavDropdown title="User" id="new-user-dropdown">
                {!userInfo ? (
                  <>
                    <LinkContainer to="/login">
                      <NavDropdown.Item>Login</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <NavDropdown.Item>Sign Up</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/logout">
                      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to="/logout">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </LinkContainer>
                )}
              </NavDropdown>
            <li className="nav-item">
                <LinkContainer to="/wishlist">
                  <Nav.Link className="nav-link active"><i class="fa-solid fa-heart"></i></Nav.Link>
                </LinkContainer>
              </li>
            {/* <div>
            <LinkContainer to="/user">
                  <Nav.Link className="nav-link"><i class="fa-regular fa-user mx-3"></i></Nav.Link>
            </LinkContainer>
            </div> */}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
