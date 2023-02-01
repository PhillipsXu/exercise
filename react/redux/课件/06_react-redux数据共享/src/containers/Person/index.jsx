import { Component, createRef } from 'react';
import { Input, Button } from 'antd';
import { nanoid } from 'nanoid';

import { connect } from 'react-redux';
import { addPersonAction } from '../../redux/actions/person';

class Person extends Component {
  render() {
    return (
      <div>
        <Input type="text" ref={this.name} placeholder="请输入姓名" style={{ width: 'auto' }} />
        <Input type="text" ref={this.age} placeholder="请输入年龄" style={{ width: 'auto' }} />
        <Button onClick={this.addPerson}>添加</Button>
        <ul>
          {
            this.props.personList.map(e => {
              return <li key={e.id}>姓名：{e.name} -- 年龄：{e.age}</li>
            })
          }
        </ul>
      </div>
    )
  }

  name = createRef();
  age = createRef();

  addPerson = () => {
    const name = this.name.current.input.value;
    if (name.trim() === '') {
      return console.warn('姓名不能为空');
    }
    const age = this.age.current.input.value;
    const reg = /\d/g;
    if (age.trim() === '') {
      return console.warn('年龄不能为空');
    } else if (!reg.test(age)) {
      return console.warn('请输入数字');
    } else if (age <= 0) {
      return console.warn('年龄输入错误');
    }
    const data = { id: nanoid(), name, age };
    this.props.addPersonAction(data);
    this.name.current.input.value = '';
    this.age.current.input.value = '';
  }
}

export default connect(
  state => ({ personList: state.personList }),
  {
    addPersonAction
  }
)(Person);
