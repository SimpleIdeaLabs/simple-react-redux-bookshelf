import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import BookView from './components/Book/BookView';
import Login from './containers/Admin/login';
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import User from './components/Admin';
import AddReview from './containers/Admin/addReview';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/user" exact component={Auth(User)} />
        <Route path="/books/:id" exact component={Auth(BookView)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user/add/review" exact component={Auth(AddReview)} />
      </Switch>
    </Layout>
  )
}

export default Routes;