export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/practice/index',
    'pages/dashboard/index',
    'pages/community/index',
    'pages/profile/index',
    'pages/category/index',
    'pages/pledge-detail/index',
    'pages/post/index',
    'pages/wallet/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#333',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/practice/index',
        text: '刷题'
      },
      {
        pagePath: 'pages/dashboard/index',
        text: '数据看板'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的'
      }
    ]
  }
})
