import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

class Title extends Component {
    render() {
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                <Button onClick={this.back} shape="round" block>后退</Button>
            </div>
        )
    }

    back = () => {
        this.props.history.goBack();
    }
}

export default withRouter(Title);