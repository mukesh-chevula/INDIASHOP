import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          >
            IndiaShop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <Nav.Link onClick={() => (window.location.href = "/cart")}>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item
                    onClick={() => (window.location.href = "/profile")}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log-Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => (window.location.href = "/login")}>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item
                    onClick={() => (window.location.href = "/admin/userlist")}
                  >
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() =>
                      (window.location.href = "/admin/productlist")
                    }
                  >
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => (window.location.href = "/admin/orderlist")}
                  >
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
