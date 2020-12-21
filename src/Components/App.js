import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Routes from "./Routes";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

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

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <Routes isLoggedIn={isLoggedIn} />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
          {isLoggedIn && (
            <SidebarWrapper>
              <SideBar />
            </SidebarWrapper>
          )}
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};
