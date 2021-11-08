import { observer } from 'mobx-react';
import { routerConfig } from './index'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
const Router = (props) => {
  let routerOptions = [];
  const initOption = (data) => {
    data.forEach(item => {
      if (item.children) {
        initOption(item.children)
      } else {
        item.type === 'router' && routerOptions.push(item)
      }
    })
  }
  initOption(routerConfig)

  const { menu } = props;
  return <>
    {
      menu.type === 'iframe' && <iframe width='100%' height='100%' src={menu.path}></iframe>
    }
    {
      menu.type === 'router' &&
      <Switch>
        {routerOptions.map(item => <Route
          path={item.path}
          exact={item.path === '/'}
          key={item.path + 'route'}
          render={() => <item.component {...item}></item.component>}
        ></Route>)
        }
      </Switch>
    }
  </>
}

export default observer(Router)