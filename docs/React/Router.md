## 前端路由规则
`https://juejin.im/post/6883729053027844109#heading-5`
### 一 Url中的hash
1. Url的hash也就是锚点（#），本质上是改变window.location的href属性。可以直接复制location.hash改变url，但是**页面不会刷新。**
```
const routerViewOne = doucument.querySelector('.router-view')
window.addEventListener('hashChange', () => {
    switch(window.loctiona.hash){
        case '#/home'
            routerViewOne.innerHtml = '首页'
            break;
        case '#/about'
            routerViewOne.innerHtml = '关于'
            break;
        default:
            routerViewOne.innerHtml = ''
            break;
    }
})
```
> hash的优势是兼容性更强，老版IE中也可运行。缺陷`#/`显得不想真是路径名


### 二 Html5中的history
1. history接口是Html5新增，有六种模式**改变Url而不刷新页面**方法：

| API | 作用 |
| -- | -- |
|replaceState|提还原来的路径|
|pushState|使用新路径|
|popState|路径的回退|
|go|向前或向后改变路径|
|forword|向前改变路径|
|back|向后改变路径|

## react-Router
### 一 react-Router介绍
1. React-Router版本4开始，路由不在集中在一个包管理。react-router是router的核心部分代码，react-router-dom适用于浏览器。react-router-native是用于原生应用。目前是使用的都是V5。安装react-router-dom会自动帮助我们安装react-router依赖。

### 二 Router的基本使用 react-router主要API提供的一些组件，
1. BrowserRouter或HashRouter组件
- Router中包含了对路径改变时候的监听，并且会将相应的路径传递给子组件
- BrowserRouter使用了history模式
- HashRouter使用了hash模式

2. Link和NavLink
- 跳转使用Link最后会被渲染成a链接
- NavLink是在Link基础之上增加了一些样式属性
- to属性: link组件中最重要的属性, 用于设置跳转到的路径

3. Route组件用于路径的匹配
- path(属性)：用户设置匹配到的路径
- component(属性)：设置到匹配名的后面，渲染组件。
- exact(属性)：精准匹配，只有精准匹配到完全一样的路径，才会渲染对应的组件。
```
import { BorwserRouter, Link, Route }  from 'react-router-dom'
export default class App extends PureComponent {
    render(){
        return (
            <div>
                <BrowserRouter>
                    <Link to="/">主页</Link>
                    <Link to="/about">关于</Link>
                    <Link to="profile">我的</Link>     

                    <Route exact path="/" component = {Home} />
                    <Route exact path="/" component =Profile{abut} />
                    <Route exact path="/Profile" component = {Profile} />
                </BrowserRouter>
            </div>
        )
    }
}
```

### 三 NavLink组件的使用
```
需求： 路径选中时使用NavLink组件来替代Link组件

activeStyle: 活跃时（匹配时）的样式
activeClassName: 活跃时添加的class
exact: 是否精准匹配

<NavLink exact to="/"  activeClassName =  "link-active">主页</NavKlink>

<NavLink to="/about" activeStyle={{ color: 'red', fontsize: '35px'}}>关于</NavLink>

```

### 四 Switch组件应用
1. 使用场景：只要有一个path匹配上了对应的组件，后续就不会在进行匹配了。
2. 路由规则：
```
<Route exact path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/profile" component={Profile} />
<Route path="/:id" component={User} />
<Route path component={NotMatch} />

如/about匹配的同时，/:userid也会被匹配到，最后的NoMath组件总是被匹配到。    
```
- 原因： react-router中只要是路径被匹配到的Route对应的组件都会渲染。
- 使用Switch包裹，只匹配第一个，后面不再匹配。
```
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/profile" component={Profile} />
    <Route path="/:id" component={User} />
    <Route path component={NotMatch} />
</Switch>
```
### 五 Redirect重定向
`<Redirect to='/login' />`

## react-router补充
1. 路由嵌套
```
/home 
/home/news
```
2. 手动路由跳转withRouter
>目前实现跳转主要通过Link，NavLink跳转，通过js代码跳转。
- 获取history对象  
`方式一： 如果该组件通过路由跳转，可以从props属性中获取history,location,match  `
```
方式二： APP组件中获取到history对象，需要使用whithRouter**高阶组件**  
APP组件必须包裹在BrowserRouter或者HashRouter内
APP组件必须使用WithRouter高组件包裹

// 1.不使用Link组件或者NavLink组件实现跳转
joinTo() {
    // 1. 使用的history是通过Route组件传递。
    // 2. 通过Route传递的history对象来实现路径跳转
    this.props.history.push('/about/join')
}

// app.js
jumpToProduct(){
    this.props.history.push('/product')
}
```
3. 参数传递： 动态路由传递， search传递参数， Link中to传入对象。
- 动态路由传递
```
将path在Route匹配时写成/detail/:id，那么/detail/abc、/detail/123都可以匹配到该Route，并且进行显示

// APP.js
<NavLink to={`/detail/${id}`}>详情</NavLink>

<Route path='/detail/:id' component={detail} />

// detail.js
获取动态路由传递的id参数
<h2>Detail: {match.params.id}</h2>
```

- search传递参数
```
在Link或NavLink组件通过to属性传递query string

<NavLink to={`/detail2?name=asd&age=18`}>详情2（通过search传参）</NavLink>
// search获取传递的query
<h2>Detail2: {this.props.location}</h2>
```

- Link中的to属性直接传递一个对象
```
// app.js
<NavLink 
    to={{
        pathname: '/detail',
        search: '?name=abc',
        state: info
    }}
>进入详情</NavLink>

// detail.js
console.log(this.props.location)
```

## react-router-config
### 一 react-router-config基本配置
>目前我们所有的路由定义都是直接使用Route组件，并且添加属性来完成的 但是这样的方式会让路由变得非常混乱
```
- 将所有的路由配置放到一个地方进行集中管理，使用: react-router-config来完成
- 安装react-router-config  yarn add react-router-config  配置路由映射关系数组

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/profile', component: Profile },
  { path: '/detail/:id', component: Detail },
]
// app.js
import { renderRoutes } from 'react-router-config'
import routes from './router'
    render() {
        // ...
        { renderRoutes(routes) }
    }
// about.js
```
### 二 嵌套子路由配置映射关系
```
在路由嵌套中配置路由映射关系
const routes = [
  {
    path: '/about',
    component: About,
    route: [
      { 
          path: '/about', 
          component: AboutHistory, 
          exact: true 
      },
      {
        path: '/about/join',
        component: AboutJoin,
      },
    ]
  }
]
// about.js ( 在被Route渲染的组件中: 使用props取出route )
  render() {
     { renderRoutes(this.props.route.route) }
  }

```