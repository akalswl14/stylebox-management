import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Theme from '../Styles/Theme';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from '../Styles/GlobalStyles';
import Routes from './Routes';
import SideBar from './SideBar';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`;

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <Routes />
          <SideBar />
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};
