import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Routes from "./Routes";
import SideBar from "./SideBar";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1006;
  min-width: 64px;
  background: #db3d44;
  -webkit-transition: min-width 0.2s;
  -moz-transition: min-width 0.2s;
  -o-transition: min-width 0.2s;
  -ms-transition: min-width 0.2s;
  transition: min-width 0.2s;
`;

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <Routes />
          <SidebarWrapper>
            <SideBar />
          </SidebarWrapper>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};
