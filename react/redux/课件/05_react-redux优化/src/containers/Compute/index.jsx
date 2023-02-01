import { Component, createRef } from 'react';
import './index.scss';
import { Button, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import {
    incrementAction,
    decrementAction,
    incrementAsyncAction
} from '../../redux/action';

class Compute extends Component {
    render() {
        let { delay } = this.state;
        let { number } = this.props;
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
                    {number}
                </Typography.Title>
                <br />
                <select ref={this.select}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <Button icon={<PlusOutlined />} onClick={this.btnHandler('increment')}></Button>
                <Button icon={<MinusOutlined />} onClick={this.btnHandler('decrement')}></Button >
                <Button icon={<PlusOutlined />} disabled={number % 2 === 0} onClick={this.btnHandler('increment')}>奇数增加</Button>
                <Button icon={<PlusOutlined />} loading={delay} onClick={this.btnHandler('asyncIncrement')}>异步增加</Button>
            </div >
        )
    }

    state = {
        delay: false
    }

    select = createRef();

    btnHandler = type => {
        return () => {
            const { value } = this.select.current;
            switch (type) {
                case 'increment':
                    this.props.incrementAction(parseInt(value));
                    break;
                case 'decrement':
                    this.props.decrementAction(parseInt(value));
                    break;
                case 'asyncIncrement':
                    this.setState({ delay: true });
                    const time = 1000;
                    this.props.incrementAsyncAction(parseInt(value), time);
                    setTimeout(() => {
                        this.setState({ delay: false });
                    }, time);
                    break;
                default:
                    break;
            }
        }
    }
}

// 简写 自动执行dispatch
export default connect(
    state => ({ number: state }),
    {
        incrementAction,
        decrementAction,
        incrementAsyncAction
    })(Compute);