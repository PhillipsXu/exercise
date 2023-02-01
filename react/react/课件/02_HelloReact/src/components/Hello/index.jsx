import { Component } from "react";
import hello from './index.module.css';

export default class Hello extends Component {
    render() {
        return (
            <h2 className={hello.hello}>Hello,React!</h2>
        )
    }
}
