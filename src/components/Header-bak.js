import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SiteHeader = styled.div`
  padding: 0px;
  height: 100px;
`;

const Navul = styled.div`
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0px;
  align-items: center;
`;

const Navli = styled.div`
  padding: 12px;
  width: 100px;
  margin: 16px;
  height: 44px;
  font-size: 32px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const P = styled.p``;

function Header({ handleLogout }) {
  const navigate = useNavigate();
  const [useHam, setUseHam] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleHam = (e) => {
    setUseHam(!useHam);
    setHasOpened(true);
    setIsClosing(true);
    setTimeout(function () {
      setIsClosing(false);
    }, 1000);
  };

  return (
    <SiteHeader>
      <Navul>
        <Navli onClick={() => navigate("/home")}>
          <P>Home</P>
        </Navli>
        <Navli name="Threads" onClick={() => navigate("/threads")}>
          <P>Threads</P>
        </Navli>
        <Navli name="Contact" onClick={() => navigate("/contact")}>
          <P>Contact</P>
        </Navli>
        <Navli name="About" onClick={() => navigate("/about")}>
          <P>About</P>
        </Navli>
        <Navli name="Logout" onClick={() => handleLogout()}>
          <P>Logout</P>
        </Navli>
      </Navul>
    </SiteHeader>
  );
}

export default Header;
