import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Title extends Component {
    render() {
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                <button onClick={this.back}>后退</button>
            </div>
        )
    }

    back = () => {
        this.props.history.goBack();
    }
}

export default withRouter(Title);