import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

export default class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/search" component={ Search } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
