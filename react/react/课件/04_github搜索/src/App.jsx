import { Component } from 'react';
import axios from 'axios';
import Top from './Top';
import Content from './Content';

export default class App extends Component {
    render() {
        return (
            <div>
                <Top getUserList={this.getUserList} />
                <Content state={this.state} />
            </div>
        )
    }

    state = {
        userList: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }

    getUserList = (keyword) => {
        this.setState({
            isFirst: false,
            isLoading: true
        })
        axios({
            method: 'GET',
            url: `https://api.github.com/search/users?q=${keyword}`
        }).then(response => {
            this.setState({
                userList: response.data.items,
                isLoading: false
            })
        }).catch(err => {
            this.setState({
                isLoading: false,
                err: err
            })
            console.log(err);
        })
    }
}
