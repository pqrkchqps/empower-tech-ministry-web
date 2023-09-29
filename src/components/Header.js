import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../images/empower-logo.png";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";

const Logo = styled.img`
  width: 100px;
  height: 100px;
  display: inline-block;
  float: left;
  padding-left: 20px;
`;

const Nav = styled.nav`
  width: calc(100% - 120px);
  display: inline-block;
`;

function Header() {
  const { user, isLoggedIn, unloadUser } = useContext(AuthContext);
  const [useHam, setUseHam] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleClick = (e) => {
    setUseHam(!useHam);
    setHasOpened(true);
    setIsClosing(true);
    setTimeout(function () {
      setIsClosing(false);
    }, 1000);
  };

  return (
    <header
      className={(useHam ? "responsive " : "") + (hasOpened ? "opened" : "")}
    >
      <Logo src={logo} />
      <Nav>
        <ul
          className={
            (useHam ? "responsive " : "") +
            (hasOpened ? "opened " : "") +
            (isClosing ? "closing" : "")
          }
        >
          <Link to="/">
            <li>
              <p>Home</p>
            </li>
          </Link>
          <Link to="/talk">
            <li>
              <p>Talk</p>
            </li>
          </Link>
          <Link to="/contact">
            <li>
              <p>Contact</p>
            </li>
          </Link>
          <Link to="/about">
            <li>
              <p>About</p>
            </li>
          </Link>
          {isLoggedIn && (
            <>
              <li>
                <p>Hello, {user.username}</p>
              </li>
              {user.type === "admin" && (
                <Link to="/articles/new">
                  <li>
                    <p>Add Article</p>
                  </li>
                </Link>
              )}
              <li onClick={unloadUser}>
                <p>Logout</p>
              </li>
            </>
          )}
        </ul>
        <FaBars className="icon" onClick={handleClick} />
      </Nav>
    </header>
  );
}

export default Header;
