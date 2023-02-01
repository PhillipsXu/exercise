import { PureComponent } from 'react';
import './index.css';

export default class A extends PureComponent {
    render() {
        console.log('A---render');
        return (
            <div className="A">
                <h3>A组件</h3>
                <h3>name:{this.state.name}</h3>
                <button onClick={this.changeName}>点击</button>
                <h3>{this.state.students}</h3>
                <button onClick={this.addStu}>点击</button>
                <B name={this.state.name} />
            </div>
        )
    }

    state = {
        name: 'Tom',
        students: ['Tony', 'May', 'Bruce']
    }

    changeName = () => {
        this.setState({ name: 'Jack' })
    }

    addStu = () => {
        if (!this.state.students.some(e => e === 'Ali')) {
            this.setState({ students: ['Ali', ...this.state.students] })
        }
    }
}

class B extends PureComponent {
    render() {
        console.log('B---render');
        return (
            <div className="B">
                <h3>B组件</h3>
                <h3>name:{this.props.name}</h3>
            </div>
        )
    }
}
