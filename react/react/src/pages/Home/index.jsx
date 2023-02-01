import { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import './index.scss';
import Messages from './Messages';
import News from './News';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <ul className="nav nav-tabs">
          <li><NavLink to="/home/messages">Messages</NavLink></li>
          <li><NavLink to="/home/news">News</NavLink></li>
        </ul>
        <div>
          <Switch>
            <Route path="/home/messages" component={Messages}></Route>
            <Route path="/home/news" component={News}></Route>
            <Redirect to="/home/messages"></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
}
