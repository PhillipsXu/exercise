import { Component } from 'react';
import qs from 'querystring';

export default class Detail extends Component {
  render() {
    let { id, title } = qs.parse(this.props.location.search.slice(1));
    id = window.atob(id);
    title = window.decodeURIComponent(atob(title));
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
