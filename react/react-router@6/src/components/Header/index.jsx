import React, { Fragment } from 'react';
import { useNavigate, useInRouterContext, useNavigationType } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    const back = () => {
        navigate(-1)
    }

    const forward = () => {
        navigate(1)
    }

    // 返回一个布尔值,表示是否处于路由环境中
    console.log(useInRouterContext());

    // 返回当前导航的类型，表示用户是如何来到当前页面的 POP、PUSH、REPLACE
    console.log(useNavigationType());

    return (
        <Fragment>
            <div className="page-header">
                <h2>React Router 6 Demo</h2>
            </div>
            <button onClick={back}>后退</button>
            <button onClick={forward}>前进</button>
        </Fragment>
    )
}
