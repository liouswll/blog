## 无障碍辅助功能
	为开发无障碍网站提供了指南
	语义化的HTML
		语义化的HTML被破坏时，可以使用React Fragment来组合各个组件。
	开发辅助
		无障碍规则，可以在根目录中创建 .eslintrc文件
## 代码分割
	打包 Webpack，Rollup 或 Browserify 
	代码分割是由webpack，rolllup，browerify，打包器支持的一类技术，能够创建多个包并在运行时动态加载
	import引入
		注意点： 当使用babel时，确保babel能够动态解析import语法，而不是将其转换
	React.lazy
		函数能让你像渲染常规组件一样处理动态引入
			- import OtherComponent from './OtherComponent';

			- React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。

            - 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）

			- const OtherComponent = React.lazy(() => import('./OtherComponent'));
	异常捕获边界
		如果模块加载失败，出发错误可以使用。
	基于路由的代码分割
	命名导出
		默认支持导出，如果想引入的模块用命名导出，创建一个中间模块。
## Context
1. 提供了一个无需为每层组件手动添加props，就能在组件树之间进行数据传递的方法  
2. 设计目的：为了共享那些对于一个组件树而言的是‘全局’的数据  
3. 使用
    - 为当前theme创建一个context const ThemeContext = React.createContext('light');
    - 使用 .Provider将当前的theme传递给一下组件树
    ```
    <ThemeContext.Provider value="dark">
        <Toolbar />
    </ThemeContext.Provider>
    ```
    - 指定contextType读取当前的theme context，React会向上寻找到最近的theme Provider使用其值
    ```
    class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。

    static contextType = ThemeContext;
    render() {
        return <Button theme={this.context} />;
    }
    }
    ```
4. 使用场景：应用于很多不同层级组件需要访问同样的数据  
	在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新
5. API
    ```
	1. React.createContext
		创建一个Context对象，当react渲染到订阅这个context对象的组件时，组件会从里自身最近的那个匹配provider中读取context的值。当组件没哟传value时，会使用默认的defaultValue。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
		const MyContext = React.createContext(defaultValue);

	2. Context.Provider
		费组件订阅 context 的变化， Provider 接收一个 value 属性，传递给消费组件，一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。通过新旧值检测确定变化。使用了与 Object.is 相同的算法。
		<MyContext.Provider value={/* 某个值 */}>

	3. Calss.contextType
		使用 this.context 来消费最近 Context 上的那个值,在任何生命周期中都可以访问this.context
        class MyClass extends React.Component {
        static contextType = MyContext;
        render() {
            let value = this.context;
            /* 基于这个值进行渲染工作 */
         }
        }

	4. Context.Consumer
		订阅context的变更
		<MyContext.Consumer>
            {value => /* 基于 context 值进行渲染*/}
        </MyContext.Consumer>

    5. Context.displayName
        context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。
        const MyContext = React.createContext(/* some value */);
        MyContext.displayName = 'MyDisplayName';

        <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
        <MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
    ```
## 错误边界
	组件内的 JavaScript 错误会导致 React 的内部状态被破坏，并且在下一次渲染时 产生 可能无法追踪的 错误
## Refs转发
	将 ref 自动地通过组件传递到其一子组件
## Fragments
	一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。