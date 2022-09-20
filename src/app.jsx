import React from 'react';
import { Layout, Menu } from 'antd';
import './index.less'
import { routerConfig } from './router/index'
import store from './store'
import { observer } from 'mobx-react';
import Router from './router/router'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function App() {
  const handleClickMenuItem = (el) => {
    store.changeMenu(el)
  }

  return <>
    <Layout className="layout">
      <Sider className="slide">
        <Menu mode="inline" theme="dark" >
          {
            routerConfig.map(item => item.children ?
              <SubMenu key={item.path} title={item.title}>
                {
                  item.children.map(el => <Menu.Item onClick={() => handleClickMenuItem(el)} key={el.path}>
                    {el.title}
                  </Menu.Item>
                  )
                }
              </SubMenu>
              :
              <Menu.Item key={item.path} onClick={() => handleClickMenuItem(item)}>
                {item.title}
              </Menu.Item>
            )
          }
        </Menu>
      </Sider>
      <Layout>
        <Header></Header>
        <Content>
          <Router menu={store.menu} />
        </Content>
      </Layout>
    </Layout>
  </>
}

export default observer(App);