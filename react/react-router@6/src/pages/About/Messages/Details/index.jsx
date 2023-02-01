import React from 'react';
// import { useMatch, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import qs from 'querystring';

export default function Details() {
    // params接收参数方式1
    // let { content } = useParams();
    // content = window.decodeURIComponent(atob(content));
    // params接收参数方式2
    // const x = useMatch('/about/messages/details/:content');

    // search接收参数方式1
    // let [search, setSearch] = useSearchParams();
    // let content = window.decodeURIComponent(atob(search.get('content')));
    // search接收参数方式2
    // let x = useLocation();
    // let { content } = qs.parse(x.search.slice(1));
    // content = window.decodeURIComponent(atob(content));

    // state接收参数方式
    let { state: { content } } = useLocation();
    content = window.decodeURIComponent(atob(content));

    return (
        <div>
            <p>Details组件</p>
            <p>content：{content}</p>
        </div>
    )
}
