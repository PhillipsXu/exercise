import { Component, createRef } from 'react';
import './index.scss';
import { Button, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

export default class Compute extends Component {
    render() {
        let { delay } = this.state;
        return (
            <div className="Compute">
                <Typography.Title
                    level={3}
                    style={{ display: 'inline-block', marginTop: 0 }}
                >
                    当前求和为：
                </Typography.Title>
                <Typography.Title
                    code
                    level={3}
                    style={{ display: 'inline-block', marginTop: 0 }}
                >
                    {this.props.number}
                </Typography.Title>
                <br />
                <select ref={this.select}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <Button icon={<PlusOutlined />} onClick={this.increment}></Button>
                <Button icon={<MinusOutlined />} onClick={this.decrement}></Button >
                <Button disabled={this.props.number % 2 === 0} onClick={this.oddIncrement}>奇数增加</Button>
                <Button loading={delay} onClick={this.asyncHnandler}>异步增加</Button>
            </div >
        )
    }

    state = {
        delay: false
    }

    select = createRef();

    increment = () => {
        const { value } = this.select.current;
        this.props.increment(parseInt(value));
    }

    decrement = () => {
        const { value } = this.select.current;
        this.props.decrement(parseInt(value));
    }

    oddIncrement = () => {
        const { value } = this.select.current;
        if (this.props.number % 2 !== 0) {
            this.props.increment(parseInt(value));
        }
    }

    asyncHnandler = () => {
        this.setState({ delay: true });
        const { value } = this.select.current;
        const time = 2000;
        this.props.incrementAsync(parseInt(value), time);
        setTimeout(() => {
            this.setState({ delay: false });
        }, time);
    }
}
