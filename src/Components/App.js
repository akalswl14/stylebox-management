import React from 'react';
import styled from 'styled-components';
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
    <>
      <GlobalStyles />
      <Router>
        <>
          <Wrapper>
            <Routes />
            <SideBar />
          </Wrapper>
        </>
      </Router>
    </>
  );
};
