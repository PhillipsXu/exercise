import React, { Component } from 'react';
import './index.scss';
import PubSub from 'pubsub-js';
import axios from 'axios';

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
            PubSub.publish('getInfo', {
                isFirst: false,
                isLoading: true
            })
            axios({
                method: 'GET',
                url: `https://api.github.com/search/users?q=${value}`
            }).then(response => {
                PubSub.publish('getInfo', {
                    userList: response.data.items,
                    isLoading: false
                })
            }).catch(err => {
                PubSub.publish('getInfo', {
                    isLoading: false,
                    err: err
                })
                console.log(err);
            })
            this.input.current.value = '';
        } else {
            return alert('内容不可为空！')
        }
    }
}