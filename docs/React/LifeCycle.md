
## 生命周期
1. 生命周期
- 加载阶段	Mouting
- 更新阶段	Updating
- 卸载阶段	Unmounting
3. 旧生命周期
- Mounting(加载阶段)
- constructor()	加载时调用一次，可以初始化state
- getDefaultProps()	设置初始的props，也可以设置组件的默认属性
- getInitialState()		初始化state，可以直接在constructor中定义this.state
- componentWillMount()	组件加载时使用，整个生命周期只调用一次，此时可以修改state
- render()	创建虚拟DOM，进行diff算法，更新DOM树
- componentDidMount()	组件渲染调用，只调用一次。

- Updating(更新阶段)
- componentWillReceiveProps(nextProps)	组件加载时不调用，只有在接受新的props时调用
- shouldComponentUpdate(nextProps, nextState)	组件接收到新的props，state时调用。return true时会更新Dom（进行Diff算法），return false 能阻止更新（不调用render）
- componentWillUpdate()	组件加载时不调用，只有更新是才调用，此时可以修改state
- render()	创建虚拟DOM，进行diff算法，更新DOM树
- componentDidUpdate() 	组价加载时不调用，更新完成后调用

- Unmounting(卸载阶段)
- componentWillUnmount()	组件渲染之后掉用，只调用一次
**新旧图示生命周期**
4. 新生命周期
-Mounting(加载阶段)
```
construntor()	加载时调用一次，初始化state

getDerivedStateFormProps(props, state)	
组件每次被render的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；
每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

render() react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

componentDidMount()  组件渲染之后调用，只调用一次

```
- Updating(更新)
```
getDerivedStateFormProps(props, state)	
组件每次被render的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；
每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state；配合componentDidUpdate，可以覆盖componentWillReceiveProps的所有用法

shouldComponentUpdate(nextProps, nextState) 组件接受到新的Props或者state时调用，return true时会更新，return false时不更新
render() react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行

getSnapshotBeforeUpdate(prevProps, prevState) update发生的时候，在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法

componentDidUpdate  组件加载时不调用，组件更新完成后调用
```
- Unmounting（卸载阶段）
组件渲染之后调用，只调用一次
- Error Handling(错误处理)
componentDidCatch(error，info)  任何一处的javascript报错会触发