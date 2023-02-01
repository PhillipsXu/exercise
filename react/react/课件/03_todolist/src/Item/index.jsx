import { Component } from 'react';
import './index.scss';

export default class Item extends Component {
  render() {
    const { flag } = this.state;
    const { id, content, done } = this.props.todo;
    return (
      <li className="item"
        onMouseEnter={this.mouseHandler(true)}
        onMouseLeave={this.mouseHandler(false)}
        style={{ backgroundColor: flag ? '#ddd' : '#fff' }}>
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={this.changeHandler(id)} />
          <span>{content}</span>
        </label>
        <button 
        style={{ display: flag ? 'block' : 'none' }}
        onClick={this.btnHandler(id)}>删除</button>
      </li>
    )
  }

  state = {
    flag: false
  }

  mouseHandler = (flag) => {
    return () => this.setState({ flag })
  }

  changeHandler = (id) => {
    return (e) => {
      this.props.getChecked(id, e.target.checked)
    }
  }

  btnHandler = (id) => {
    return () => {
      this.props.delItem(id);
    }
  }
}