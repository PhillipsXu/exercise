import { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div>404</div>
        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.history.goBack();
        }, 3000);
    }
}