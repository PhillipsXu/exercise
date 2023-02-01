import { Component } from 'react';
import { getID } from './utils';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

export default class App extends Component {
    render() {
        return (
            <div>
                <Top getContent={this.getContent} />
                <Middle
                    todos={this.state.todos}
                    getChecked={this.getChecked}
                    delItem={this.delItem} />
                <Bottom
                    todos={this.state.todos}
                    allChecked={this.allChecked}
                    delDone={this.delDone} />
            </div>
        )
    }

    state = {
        todos: [
            { id: getID(), content: '抽烟', done: true },
            { id: getID(), content: '喝酒', done: true },
            { id: getID(), content: '烫头', done: true },
            { id: getID(), content: '吃饭', done: false },
            { id: getID(), content: '睡觉', done: false },
            { id: getID(), content: '打豆豆', done: false }
        ]
        // todos: JSON.parse(localStorage.getItem('todos')) || []
    }

    getContent = (data) => {
        const { todos } = this.state;
        const newTodos = [data, ...todos];
        this.setState({
            todos: newTodos
        })
        // localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    getChecked = (id, flag) => {
        const { todos } = this.state;
        const newTodos = todos.map(e => {
            if (e.id === id) {
                return { ...e, done: flag }
            } else {
                return e
            }
        })
        this.setState({
            todos: newTodos
        })
        // localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    delItem = (id) => {
        const { todos } = this.state;
        const newTodos = todos.filter(e => {
            return e.id !== id
        })
        this.setState({
            todos: newTodos
        })
        // localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    allChecked = (flag) => {
        const { todos } = this.state;
        const newTodos = todos.map(e => {
            e.done = flag
            return e
        })
        this.setState({
            todos: newTodos
        })
        // localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    delDone = () => {
        const { todos } = this.state;
        const newTodos = todos.filter(e => {
            return !e.done
        })
        this.setState({
            todos: newTodos
        })
        // localStorage.setItem('todos', JSON.stringify(newTodos));
    }
}
