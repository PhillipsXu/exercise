import { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class index extends Component {
    render() {
        return (
            <NavLink activeClassName="active" className="list-group-item" {...this.props} />
        )
    }
}
