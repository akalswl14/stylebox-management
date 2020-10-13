import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Banner from '../Routes/Banner/Banner';
import DashBoard from '../Routes/DashBoard/DashBoard';
import Feed from '../Routes/Feed/Feed';
import Question from '../Routes/Question/Question';
import TagIcon from '../Routes/TagIcon/TagIcon';
import SearchTag from '../Routes/SearchTag/SearchTag';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={DashBoard} />
      <Route path='/banner' component={Banner} />
      <Route path='/feed' component={Feed} />
      <Route path='/question' component={Question} />
      <Route path='/tagicon' component={TagIcon} />
      <Route path='/searchtag' component={SearchTag} />
      <Redirect path='*' to='/' />
    </Switch>
  );
};

export default AppRouter;
