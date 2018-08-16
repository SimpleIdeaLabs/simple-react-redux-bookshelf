import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import BookView from './components/Book/BookView';
import Login from './containers/Admin/login';
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import User from './components/Admin';
import AddBook from './containers/Admin/AddBook';
import UserPosts from './components/Admin/userPosts';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/user" exact component={Auth(User)} />
        <Route path="/books/:id" exact component={Auth(BookView)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user/add/book" exact component={Auth(AddBook)} />
        <Route path="/user/posts" exact component={Auth(UserPosts)} />
      </Switch>
    </Layout>
  )
}

export default Routes;