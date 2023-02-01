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
                <li key={e.id}><Link to={`/home/messages/detail/${e.id}/${e.title}`}>{e.title}</Link></li>
              )
            })
          }
        </ul>
        <hr />
        <div>
          <Switch>
            <Route path="/home/messages/detail/:id/:title" component={Detail}></Route>
          </Switch>
        </div>
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
}
