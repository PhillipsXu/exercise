import React from 'react';
import { NavLink, Outlet, useOutlet } from 'react-router-dom';

export default function About() {

  // 展示嵌套的下属路由组件（只展示已挂载的）
  console.log(useOutlet());

  return (
    <div>
      <h3>About组件</h3>
      <ul className="nav nav-tabs">
        <li>
          <NavLink className="list-group-item" to="news">news</NavLink>
          <NavLink className="list-group-item" to="messages">messages</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
