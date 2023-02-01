import React from 'react';
import { app } from '../../index';

export default function Demo(props) {
    const [number, setNumber] = React.useState(0);

    function btnHandler() {
        // 1.
        // setNumber(number + 1);
        // 2.
        setNumber(number => number + 1)
    }

    function unmount() {
        app.unmount();
    }

    // 相当于componentDidMount、componentDidUpdate、componentWillUnmount钩子
    React.useEffect(() => {
        let timer = setInterval(() => {
            setNumber(number => number + 1);
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [number])

    const input = React.useRef();

    function showData() {
        console.log(input.current.value);
    }

    return (
        <div>
            <h3>当前求和为：{number}</h3>
            <button onClick={btnHandler}>点击+1</button>
            <button onClick={unmount}>卸载</button>
            <br />
            <input type="text" ref={input} />
            <button onClick={showData}>点击展示数据</button>
        </div>
    )
}