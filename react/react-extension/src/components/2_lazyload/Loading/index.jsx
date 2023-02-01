import { Component } from 'react';

export default class Loading extends Component {
    render() {
        return (
            <div>
                <img src={this.props.src} alt="" />
            </div>
        )
    }
}
