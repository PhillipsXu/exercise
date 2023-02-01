import React, { Component } from 'react';
import './index.css';

const MyContext = React.createContext();

export default class A extends Component {
    render() {
        return (
            <div className="A">
                <h3>A组件</h3>
                <h3>name:{this.state.name}</h3>
                <MyContext.Provider value={this.state}>
                    <B state={this.state} />
                </MyContext.Provider>
            </div>
        )
    }

    state = {
        name: 'TOM'
    }
}

class B extends Component {
    render() {
        return (
            <div className="B">
                <h3>B组件</h3>
                <h3>name:{this.props.state.name}</h3>
                <C />
            </div>
        )
    }
}

// 类式组件使用context
/* class C extends Component {
    static contextType = MyContext;
    render() {
        return (
            <div className="C">
                <h3>C组件</h3>
                <h3>name:{this.context.name}</h3>
            </div>
        )
    }
} */

// 函数式组件使用context
function C() {
    return (
        <div className="C">
            <h3>C组件</h3>
            <h3>
                <MyContext.Consumer>
                    {
                        value => {
                            return `name:${value.name}`
                        }
                    }
                </MyContext.Consumer>
            </h3>
        </div>
    )
}