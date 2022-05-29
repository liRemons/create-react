import { observer } from 'mobx-react';
import { routerConfig } from './index';
import { Switch, Route } from 'react-router-dom';
const Router = (props) => {
  let routerOptions = [];
  const initOption = (data) => {
    data.forEach((item) => {
      if (item.children) {
        initOption(item.children);
      } else {
        item.type === 'router' && routerOptions.push(item);
      }
    });
  };
  initOption(routerConfig);

  const onLoad = () => {
    const iframe = document.querySelector('iframe');
    iframe.contentWindow.postMessage({ data: 'remons' }, '*');
    // 子页面
    window.addEventListener('message', (e) => {
      console.log(e);
    });
  };

  const { menu } = props;
  console.log(props);

  return (
    <>
      {menu.type === 'iframe' && (
        <iframe
          width='100%'
          onLoad={onLoad}
          height='100%'
          src={menu.path}
        ></iframe>
      )}
      {menu.type === 'router' && (
        <Switch>
          {routerOptions.map((item) => (
            <Route
              path={item.path}
              exact={item.path === '/'}
              key={item.path + 'route'}
              render={() => <item.component {...item}></item.component>}
            ></Route>
          ))}
        </Switch>
      )}
    </>
  );
};

export default observer(Router);
