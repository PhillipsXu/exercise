import { Component } from 'react';

export default class Demo extends Component {
    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.number}</h1>
                <button onClick={this.btnHandler}>点击➕1</button>
            </div>
        )
    }

    state = {
        number: 0
    }

    /* setState的使用
    1. 对象式：this.setState({状态对象}, [callback])
    2. 函数式：this.setState((state, props) => {return{状态对象}}, [callback])
    对象式是简写（语法糖）
    如果新状态不依赖原状态，则用对象式；反之则使用函数式
    */
    btnHandler = () => {
        this.setState(
            (state, props) => {
                return {
                    number: state.number + props.a
                }
            }, () => {
                console.log(this.state);
            }
        )
    }
}
