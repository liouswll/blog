## 前端路由规则
`https://juejin.im/post/6883729053027844109#heading-5`
### Url中的hash
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


### Html5中的history
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
### react-Router介绍
1. React-Router版本4开始，路由不在集中在一个包管理。react-router是router的核心部分代码，react-router-dom适用于浏览器。react-router-native是用于原生应用。目前是使用的都是V5。安装react-router-dom会自动帮助我们安装react-router依赖。

### Router的基本使用 react-router主要API提供的一些组件，
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

                    <Route exact path="/" component = {Home}    >
                    <Route exact path="/" component =Profile{abut}>
                    <Route exact path="/Profile" component = {Profile}>
                </BrowserRouter>
            </div>
        )
    }
}
```

