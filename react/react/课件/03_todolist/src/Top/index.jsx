import React, { Component } from 'react';
import './index.scss';
import { getID } from '../utils';

export default class Top extends Component {
  render() {
    return (
      <div className="top">
        <input type="text" id="ipt" placeholder="请输入内容" ref={this.input} onKeyUp={this.confirm} />
        <button className="confirm" onClick={this.btnConfirm}>确认</button>
      </div>
    )
  }

  input = React.createRef();

  confirm = (e) => {
    if (e.keyCode !== 13) return
    if (e.target.value.trim() === '') return alert('内容不能为空！')
    const { getContent } = this.props;
    getContent({ id: getID(), content: e.target.value, done: false });
    e.target.value = '';
  }

  btnConfirm = () => {
    const { getContent } = this.props;
    getContent({ id: getID(), content: this.input.current.value, done: false });
    this.input.current.value = '';
  }
}
