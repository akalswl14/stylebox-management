import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Route } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { AiFillSetting, AiFillHome } from "react-icons/ai";

const SideBar = () => {
  const style = {
    fontSize: "1.75em",
    marginTop: "12px",
  };
  return (
    <Route
      render={({ location, history }) => (
        <React.Fragment>
          <SideNav
            onSelect={(selected) => {
              const to = "/" + selected;
              if (location.pathname !== to) {
                history.push(to);
              }
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  <AiFillHome size="24" color="#fff" style={style} />
                </NavIcon>
                <NavText>DashBoard</NavText>
              </NavItem>
              <NavItem eventKey="tagicon">
                <NavIcon>
                  <AiFillSetting size="24" color="#fff" style={style} />
                </NavIcon>
                <NavText>Setting</NavText>
                <NavItem eventKey="tagicon">
                  <NavText>TagIcon</NavText>
                </NavItem>
                <NavItem eventKey="searchtag">
                  <NavText>SearchTag</NavText>
                </NavItem>
                <NavItem eventKey="banner">
                  <NavText>Banner</NavText>
                </NavItem>
                <NavItem eventKey="question">
                  <NavText>Question</NavText>
                </NavItem>
                <NavItem eventKey="feed">
                  <NavText>Feed</NavText>
                </NavItem>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </React.Fragment>
      )}
    />
  );
};

export default SideBar;
