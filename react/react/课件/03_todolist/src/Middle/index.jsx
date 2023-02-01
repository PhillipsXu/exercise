import { Component } from 'react';
import './index.scss';
import Item from '../Item';

export default class Middle extends Component {
  render() {
    return (
      <div className="middle">
        <ul>
          {
            this.props.todos.map(e => {
              return <Item
                todo={e}
                key={e.id}
                getChecked={this.props.getChecked}
                delItem={this.props.delItem} />
            })
          }
        </ul>
      </div>
    )
  }
}
