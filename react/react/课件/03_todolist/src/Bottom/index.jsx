import { Component } from 'react';
import './index.scss';

export default class index extends Component {
  render() {
    return (
      <div className="bottom">
        <input
          type="checkbox"
          onChange={this.changeHandler}
          checked={this.getDone() === this.props.todos.length && this.props.todos.length != 0} />
        <span>已完成 {this.getDone()} / 全部 {this.props.todos.length}</span>
        <button onClick={this.delHandler}>清除已完成任务</button>
      </div>
    )
  }

  getDone = () => {
    return this.props.todos.filter(e => {
      return e.done === true
    }).length
  }

  changeHandler = (e) => {
    this.props.allChecked(e.target.checked);
  }

  delHandler = () => {
    this.props.delDone();
  }
}
