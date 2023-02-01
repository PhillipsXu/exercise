import React, { Component } from 'react';
import './index.scss';
import PubSub from 'pubsub-js';

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

    getData = async () => {
        let { value } = this.input.current;
        if (value.trim() !== '') {
            PubSub.publish('getInfo', {
                isFirst: false,
                isLoading: true
            })
            // promise风格
            // fetch(`https://api.github.com/search/users?q=${value}`, { method: 'GET' }
            // ).then(
            //     response => response.json()
            // ).then(
            //     data => {
            //         PubSub.publish('getInfo', {
            //             userList: data.items,
            //             isLoading: false
            //         })
            //     }
            // ).catch(
            //     err => {
            //         PubSub.publish('getInfo', {
            //             isLoading: false,
            //             err: err
            //         })
            //         console.warn(err);
            //     }
            // )
            // async await风格
            try {
                const response = await fetch(`https://api.github.com/search/users?q=${value}`, { method: 'GET' });
                const data = await response.json();
                PubSub.publish('getInfo', {
                    userList: data.items,
                    isLoading: false
                })
            } catch (err) {
                PubSub.publish('getInfo', {
                    isLoading: false,
                    err: err
                })
                console.warn(err);
            }

            this.input.current.value = '';
        } else {
            return alert('内容不可为空！')
        }
    }
}