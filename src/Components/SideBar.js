import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Route } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { AiFillSetting, AiFillHome, AiFillTags } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { BiCalendarEvent } from "react-icons/bi";

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
                <NavItem eventKey="userlist">
                  <NavText>UserList</NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey="tagmap">
                <NavIcon>
                  <AiFillTags size="24" color="#fff" style={style} />
                </NavIcon>
                <NavText>Tag Management</NavText>
                <NavItem eventKey="tagmap">
                  <NavText>Tag Map</NavText>
                </NavItem>
                <NavItem eventKey="taglist">
                  <NavText>Tag List</NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey="productlist">
                <NavIcon>
                  <FaProductHunt size="24" color="#fff" style={style} />
                </NavIcon>
                <NavText>Product Management</NavText>
                <NavItem eventKey="productlist">
                  <NavText>Product List</NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey="postlist">
                <NavIcon>
                  <BsFilePost size="24" color="#fff" style={style} />
                </NavIcon>
                <NavText>Post Management</NavText>
                <NavItem eventKey="postlist">
                  <NavText>Post List</NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey="eventlist">
                <NavIcon>
                  <BiCalendarEvent size="24" color="#fff" style={style} />
                </NavIcon>
                <NavText>Event Management</NavText>
                <NavItem eventKey="eventlist">
                  <NavText>Event List</NavText>
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
