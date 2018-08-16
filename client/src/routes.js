import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import BookView from './components/Book/BookView';
import Login from './containers/Admin/login';
import Layout from './hoc/Layout';
import Auth from './hoc/Auth';
import User from './components/Admin';
import UserPosts from './components/Admin/userPosts';
import AddBook from './containers/Admin/AddBook';
import EditBook from './containers/Admin/EditBook';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/user" exact component={Auth(User)} />
        <Route path="/books/:id" exact component={Auth(BookView)} />
        <Route path="/books/:id/edit" exact component={Auth(EditBook)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user/posts" exact component={Auth(UserPosts)} />
        <Route path="/user/add/books" exact component={Auth(AddBook)} />
      </Switch>
    </Layout>
  )
}

export default Routes;