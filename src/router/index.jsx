import Demo from '@pages/demo'
export const routerConfig = [
  { title: '首页', path: '/demo', component: Demo, type: 'router' },
  { title: 'nav1', path: 'http://remons.cn:8001/demo', type: 'iframe' },
  {
    title: 'subNav',
    path: 'subNav',
    children: [
      { title: 'subNav1', path: 'http://remons.cn:8001/demo1', type: 'iframe' }
    ]
  }
]