import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Banner from "../Routes/Banner/index";
import DashBoard from "../Routes/DashBoard/index";
import Feed from "../Routes/Feed/index";
import Question from "../Routes/Question/index";
import TagIcon from "../Routes/TagIcon/index";
import SearchTag from "../Routes/SearchTag/index";
import TagMap from "../Routes/TagMap/index";
import UserList from "../Routes/UserList/index";
import TagList from "../Routes/TagList/index";
import ProductList from "../Routes/ProductList/index";
import PostList from "../Routes/PostList/index";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={DashBoard} />
      <Route path="/banner" component={Banner} />
      <Route path="/feed" component={Feed} />
      <Route path="/question" component={Question} />
      <Route path="/tagicon" component={TagIcon} />
      <Route path="/searchtag" component={SearchTag} />
      <Route path="/tagmap" component={TagMap} />
      <Route path="/taglist" component={TagList} />
      <Route path="/userlist" component={UserList} />
      <Route path="/productlist" component={ProductList} />
      <Route path="/postList" component={PostList} />
      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default AppRouter;
