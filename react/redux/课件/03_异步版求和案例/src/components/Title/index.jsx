import { Component } from 'react';
import { Typography } from 'antd';

export default class Title extends Component {
  render() {
    const { Title } = Typography;
    return (
      <div>
        <Title level={1} style={{ margin: '10px' }}>Redux Demo</Title>
      </div>
    )
  }
}
