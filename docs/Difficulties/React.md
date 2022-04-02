## 1. Hook
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


## 2. React复用状态逻辑的解决方案
- Mixin -> 高阶组件 -> Render Props -> Hook
####  Mixin到高阶组件
- Mixin继承看作是通过扩展收集功能的一种途径。.我们定义的每一个新的对象都有一个原型，从中它可以继承更多的属性，原型可以从其他对象继承而来，但是更重要的是，能够为任意数量的对象定义属性，我们可以利用这一事实来促进功能重用。
    >缺点
    不同mixin可能会相互依赖，耦合性太强，导致后期维护成本过高  
    mixin中的命名可能会冲突，无法使用同一命名的mixin  
    mixin即使开始很简单，它们会随着业务场景增多，时间的推移产生滚雪球式的复杂化  

#### 高阶组件
- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式
- 高阶组件可以看做是装饰者模式(Decorator Pattern)在React的实现。装饰者模式: 动态将职责附加到对象上，若要扩展功能，装饰者提供了比继承更具弹性的代替方案。

#### 装饰者模式
1. 装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。
2. 这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。
- **高阶组件动态给其他组件增加日志打印功能**
```
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

```
#### Render Props
-  React 组件之间使用一个值为函数的 prop 共享代码的简单技术。
- 具有 Render Props 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。
```
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}
——————————————————————————————————————————————————————
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}
————————————————————————————————————————————————————
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```
简写如下
```
Class  Mouse extends React.component{
   ...
   {this.props.render(this.state)}
   ...
}

......
<Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
```
在使用Mouse组件的时候，通过一个render属性，传递一个可用组件Cat给父组件Mouse，而在Mouse组件中，可以将本身的state对象传递给Cat组件，Cat组件中的mouse属性的值与Mouse父组件中的state相同。**简单来说就是父组件可以将自己的state传递给子组件，而子组件可以根据父组件的state对象，来进行render**


#### React Hook
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

##### 声明多个state变量
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
 
##### Hook 规则
1. 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
2. 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。
>这两条规则出现的原因是，我们可以在单个组件中使用多个State Hook 或 Effect Hook，React 靠的是 Hook 调用的顺序来知道哪个 state 对应哪个useStat

##### Effect Hook使用 -> Effect在组件渲染后执行即可
- 用法：
```
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```
>如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

##### 清除副作用  
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

##### Effect性能优化
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




## 3. Antd design for React 
#### input同时


## 4. react render执行流程
`https://www.jianshu.com/p/021736302706`


## 5. React-diffing算法
`https://juejin.cn/post/6988446977541275661?from=main_page`
1. 虚拟DOM->真是DOM，会通过diffing算法进行比较，如果已经渲染过一次再进行渲染，会对相同的key值节点进行比较，如果内容相同，会复用原来的真实DOM。


## 6. 父组件点击子组件执行
```
import React, {Component} from 'react';

export default class Parent extends Component {
    render() {
        return(
            <div>
                <Child onRef={this.onRef} />
                <button onClick={this.click} >click</button>
            </div>
        )
    }

    onRef = (ref) => {
        this.child = ref
    }

    click = (e) => {
        this.child.myName()
    }

}

class Child extends Component {
    componentDidMount(){
        this.props.onRef(this)
    }

    myName = () => alert('xiaohesong')

    render() {
        return ('woqu')
    }
}

```

## 7 Conponent和PureConponent区别
