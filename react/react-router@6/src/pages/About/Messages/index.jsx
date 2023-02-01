import React from 'react';
import { useState } from 'react';
import { Link, Outlet, useNavigate, useResolvedPath } from 'react-router-dom';

export default function Messages() {
  const [messages] = useState([
    { id: '001', title: '消息1', content: '锄禾日当午' },
    { id: '002', title: '消息2', content: '汗滴禾下土' },
    { id: '003', title: '消息3', content: '谁知盘中餐' },
    { id: '004', title: '消息4', content: '粒粒皆辛苦' },
  ])

  const navigate = useNavigate();
  const btnHandler = item => {
    navigate('details', {
      replace: false,
      state: {
        content: window.btoa(encodeURIComponent(item.content))
      }
    });
  }

  // 解析当前路径或输入路径的path、hash、search信息
  console.log(useResolvedPath());

  return (
    <div>
      <h5>Messages组件</h5>
      <ul>
        {
          messages.map(item => {
            return (
              <li key={item.id}>
                {/* <Link to={`details/${window.btoa(encodeURIComponent(item.content))}`}>{item.title}</Link> */}
                {/* <Link to={`details/?content=${window.btoa(encodeURIComponent(item.content))}`}>{item.title}</Link> */}
                <Link
                  to='details'
                  state={{ content: window.btoa(encodeURIComponent(item.content)) }}
                >
                  {item.title}
                </Link>
                <button onClick={() => btnHandler(item)}>查看详情</button>
              </li>
            )
          })
        }
      </ul>
      <Outlet />
    </div>
  )
}
