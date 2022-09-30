import React from 'react';
import { Layout } from 'antd';
import './index.less'
import { observer } from 'mobx-react';

function App() {
  return <>
    <Layout className="layout">
      hello world react
    </Layout>
  </>
}

export default observer(App);