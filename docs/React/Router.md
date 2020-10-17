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