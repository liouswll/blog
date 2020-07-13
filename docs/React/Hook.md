## Hook
- React Hooks要解决的问题是状态共享，这里的状态共享是指只共享状态逻辑复用，并不是指数据之间的共享  

- React Hook 
```
import { useState } from 'React';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```
- React State
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

```
**在React Hook中，class Example组件变成了函数式组件，但是这个函数式组件却拥有的自己的状态，同时还可以更新自身的状态。这一切都得益于useState这个Hook，useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并**


## React Hook
- 动机：在组件之间复用状态逻辑很难，复杂组件变得难以理解，难以理解的 class。  
- 语法：
```
import React, { useState } from 'React';
const [count, setCount] = useState(0);

等价于
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
  };
}
```
- useState参数  
传入了0作为useState的参数，这个参数的数值会被当成count初始值。当然此参数**不限于传递数字以及字符串，可以传入一个对象当成初始的state**。如果state需要储存多个变量的值，那么调用多次useState即可
- useState返回值  
返回值为：当前 state 以及更新 state 的函数，这与 class 里面 this.state.count 和 this.setState 类似，唯一区别就是你需要成对的获取它们。看到[count, setCount]很容易就能明白这是ES6的解构数组的写法。相当于以下代码
    ```
    let _useState = useState(0);// 返回一个有两个元素的数组
    let count = _useState[0];// 数组里的第一个值
    let setCount = _useState[1];// 数组里的第二个值
    ```
- 读取状态值  
以前`<p>You clicked {this.state.count} times</p>`  
现在`<p>You clicked {count} times</p>`  

- 更新状态
```
以前
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
 </button>

现在
<button onClick={() => setCount(count + 1)}>
    Click me
</button>

```

#### 声明多个state变量
- 一个组件中多次使用state hook
```
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```
React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的
 
#### Hook 规则
1. 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
2. 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。
>这两条规则出现的原因是，我们可以在单个组件中使用多个State Hook 或 Effect Hook，React 靠的是 Hook 调用的顺序来知道哪个 state 对应哪个useStat

#### Effect Hook使用 -> Effect在组件渲染后执行即可
- 用法：
```
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```
>如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

#### 清除副作用  
有时候对于一些副作用，我们是需要去清除的，比如我们有个需求需要轮询向服务器请求最新状态，那么我们就需要在卸载的时候，清理掉轮询的操作。
```
  常规
  componentDidMount() {
    this.pollingNewStatus()
  }

  componentWillUnmount() {
    this.unPollingNewStatus()
  }

  react hook
  useEffect(() => {
      pollingNewStatus()
      //告诉React在每次渲染之前都先执行cleanup()
      return function cleanup() {
        unPollingNewStatus()
      };
    });

useEffect其实是每次渲染之前都会去执行cleanup(),而componentWillUnmount只会执行一次
```

#### Effect性能优化
- useEffect其实是每次更新都会执行，在某些情况下会导致性能问题。那么我们可以通过跳过 Effect 进行性能优化。在class组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决
```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
- 在Effect中，我们可以通过增加Effect的第二个参数即可，如果没有变化，则跳过更新
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新

```