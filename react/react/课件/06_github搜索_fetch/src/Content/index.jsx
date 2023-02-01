import { Component } from 'react';
import './index.scss';
import PubSub from 'pubsub-js';

export default class index extends Component {
    render() {
        let { userList, isFirst, isLoading, err } = this.state;
        return (
            <div className="main">
                {
                    isFirst ? <h2>Welcome to Github!</h2> :
                    isLoading ? <h2>Loading...</h2> :
                    err ? <h2>{err.message}</h2> :
                    userList.map(e => {
                        return (
                            <div className="box" key={e.id}>
                                <a href={e.html_url} target="_blank" rel="noreferrer">
                                    <img src={e.avatar_url} alt="head_photo" />
                                </a>
                                <p>{e.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    state = {
        userList: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }

    componentDidMount() {
        this.token = PubSub.subscribe('getInfo', (_, info) => {
            this.setState(info);
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }
}
