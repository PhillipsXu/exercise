import React, { Component } from 'react';
import './index.scss';

export default class Top extends Component {
    render() {
        return (
            <div className="top">
                <p>Search Github Users</p>
                <input type="text" placeholder="entenr the name" ref={this.input} />
                <button onClick={this.getData}>Search</button>
            </div>
        )
    }

    input = React.createRef();

    getData = () => {
        let { value } = this.input.current;
        if (value.trim() !== '') {
            this.props.getUserList(value);
            this.input.current.value = '';
        }
    }
}