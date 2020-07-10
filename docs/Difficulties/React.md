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


## React复用状态逻辑的解决方案
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

##### 装饰者模式
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
