import React, { useState } from "react";

import logo from "../assets/logo.svg";

import styled from "styled-components";

export default function ScrollToTop() {
  const [scrollState, setScrollState] = useState(false);

  window.addEventListener("scroll", () => {
    window.pageYOffset > 200 ? setScrollState(true) : setScrollState(false);
  });

  const toTop = () => {
    window.scroll({ top: 0 });
  };

  return (
    <ToTop scrollState={scrollState}>
      <img src={logo} alt="" onClick={toTop} />
    </ToTop>
  );
}

const ToTop = styled.div`
  display: ${({ scrollState }) => (scrollState ? "block" : "none")};
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  z-index: 999 !important;

  img {
    width: 35px;
    height: 35px;
    background-color: rgb(243, 111, 9);
    border-radius: 50%;
    padding: 0.3rem;
    cursor: pointer;
  }

  /* responsive section */
  @media screen and (max-width: 450px) {
    bottom: 1.5rem;
    right: 1rem;
  }
`;
