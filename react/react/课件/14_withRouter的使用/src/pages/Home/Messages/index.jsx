import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './index.scss';
import Detail from './Detail';

export default class Messages extends Component {
  render() {
    return (
      <div>
        <ul className="message-list">
          {
            this.state.messageList.map(e => {
              return (
                <li key={e.id}>
                  <Link replace to={{ pathname: '/home/messages/detail', state: { id: e.id, title: e.title } }}>{e.title}</Link>
                  <button onClick={this.pushRoute(e.id, e.title)}>push</button>
                  <button onClick={this.replaceRoute(e.id, e.title)}>replace</button>
                </li>
              )
            })
          }
        </ul>
        <hr />
        <div>
          <Switch>
            <Route path="/home/messages/detail" component={Detail}></Route>
          </Switch>
        </div>
        <button onClick={this.forward}>前进</button>
        <button onClick={this.back}>后退</button>
        <button onClick={this.go}>跳转</button>
      </div>
    )
  }

  state = {
    messageList: [
      {
        id: '001',
        title: '消息1'
      },
      {
        id: '002',
        title: '消息2'
      }, {
        id: '003',
        title: '消息3'
      }, {
        id: '004',
        title: '消息4'
      }
    ]
  }

  pushRoute = (id, title) => {
    return () => {
      this.props.history.push({ pathname: '/home/messages/detail', state: { id, title } })
    }
  }

  replaceRoute = (id, title) => {
    return () => {
      this.props.history.replace({ pathname: '/home/messages/detail', state: { id, title } })
    }
  }

  forward = () => {
    this.props.history.goForward();
  }

  back = () => {
    this.props.history.goBack();
  }

  go = () => {
    this.props.history.go(-2);
  }
}
