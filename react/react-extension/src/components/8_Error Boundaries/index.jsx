import { Component, PureComponent } from 'react';

export class ErrorBoundary extends Component {
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children
    }

    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        console.warn(error);
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.warn(error, errorInfo);
    }
}

export class Demo extends Component {
    render() {
        return (
            <div>
                <h3>Demo组件</h3>
                <A />
            </div>
        )
    }
}

class A extends PureComponent {
    render() {
        return (
            <div style={{ height: '500px', border: '1px solid #ccc' }}
                onMouseMove={this.mouseHandler}
            >
                <h3>当前x坐标：{this.state.x}</h3>
                <h3>当前y坐标：{this.state.y}</h3>
            </div>
        )
    }

    state = {
        x: 0,
        y: 0
    }

    mouseHandler = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
}
