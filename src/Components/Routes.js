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
import ShopList from "../Routes/ShopList/index";
import TagList from "../Routes/TagList/index";
import ProductList from "../Routes/ProductList/index";
import PostList from "../Routes/PostList/index";
import EventList from "../Routes/EventList/index";
import ClassManagement from "../Routes/ClassManagement/index";
import TagManagement from "../Routes/TagManagement/index";
import CreateShop from "../Routes/CreateShop/index";
import CreateClass from "../Routes/CreateClass/index";
import CreateTag from "../Routes/CreateTag/index";
import ShopDetail from "../Routes/ShopDetail/index";
import CreateProduct from "../Routes/CreateProduct/index";
import ProductDetail from "../Routes/ProductDetail/index";
import CreateEvent from "../Routes/CreateEvent/CreateEventContainer";

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
      <Route path="/taginfo/:tagId" component={TagManagement} />
      <Route path="/createtag" component={CreateTag} />
      <Route path="/classinfo/:classId" component={ClassManagement} />
      <Route path="/createclass" component={CreateClass} />
      <Route path="/userlist" component={UserList} />
      <Route path="/shoplist" component={ShopList} />
      <Route path="/productlist" component={ProductList} />
      <Route path="/postList" component={PostList} />
      <Route path="/eventlist" component={EventList} />
      <Route path="/createshop" component={CreateShop} />
      <Route path="/shopdetail/:shopId" component={ShopDetail} />
      <Route path="/createproduct" component={CreateProduct} />
      <Route path="/productdetail/:productId" component={ProductDetail} />
      <Route path="/createevent" component={CreateEvent} />
      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default AppRouter;
