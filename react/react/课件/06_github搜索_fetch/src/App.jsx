import { Component } from 'react';
import Top from './Top';
import Content from './Content';

export default class App extends Component {
    render() {
        return (
            <div>
                <Top />
                <Content />
            </div>
        )
    }
}
