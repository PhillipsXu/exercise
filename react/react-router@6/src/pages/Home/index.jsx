import React, { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const [sum, setSum] = useState(0);

  return (
    <Fragment>
      <h3>Home组件</h3>
      {sum === 5 ? <Navigate to="/about" /> : <h4>当前求和为：{sum}</h4>}
      <button onClick={() => setSum(sum + 1)}>点击+1</button>
    </Fragment>
  )
}
