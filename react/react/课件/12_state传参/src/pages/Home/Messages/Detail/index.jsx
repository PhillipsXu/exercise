import { Component } from 'react';

export default class Detail extends Component {
  render() {
    const { id, title } = this.props.location.state;
    const { content } = this.state.contentList.find(e => e.id === id);
    return (
      <ul>
        <li>id：{id}</li>
        <li>title：{title}</li>
        <li>content：{content}</li>
      </ul>
    )
  }

  state = {
    contentList: [
      {
        id: '001',
        content: '1234'
      },
      {
        id: '002',
        content: '5678'
      },
      {
        id: '003',
        content: '9010'
      },
      {
        id: '004',
        content: '1112'
      }
    ]
  }
}
