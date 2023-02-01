import { Component } from 'react';
import './index.css';

export default class A extends Component {
    render() {
        return (
            <div className='A'>
                <h3>A组件</h3>
                <B render={()=><C name="TOM"/>}></B>
            </div>
        )
    }
}

class B extends Component {
    render() {
        return (
            <div className='B'>
                <h3>B组件</h3>
                {
                    this.props.render()
                }
            </div>
        )
    }
}

class C extends Component {
    render() {
        return (
            <div className='C'>
                <h3>C组件</h3>
                <h3>name:{this.props.name}</h3>
            </div>
        )
    }
}
