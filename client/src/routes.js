import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import BookView from './components/Book/BookView';
import Login from './containers/Admin/login';
import Layout from './hoc/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books/:id" exact component={BookView} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Layout>
  )
}

export default Routes;