## 核心概念
## JSX简介
1. JSX嵌入表达式
```
const element = <h1>Hello, {name}</h1>;
<h1>
    Hello, {formatName(user)}!
</h1>
```
2. JSX也是一个表达式  
3. JSX特定属性  
	使用引号将属性值指定为字符串字面量   `const element = <div tabIndex="0"></div>`;  
	使用大括号，将属性值里插入JavaScript表达式 `const element = <img src={user.avatarUrl}></img>;`  
	使用JSX指定子元素，如果标签里没有内容，用 /> 闭合标签  
	JSX防注入攻击，React渲染是默认会进行转译，，所有渲染的内容会被转换为字符串  
    JSX表示对象  
## 元素渲染
1. 将一个元素渲染为DOM
2. 更新已经渲染的元素
3. React只更需要更新的地方，会将元素和它的子元素与之前的状态进行比较，进行必要的更新。

## 组件与Props
1. 
```
class Welcome extends React.Component {
render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
接受唯一带有数据的Props（属性）对象，返回React元素。称为函数组件，本质上为JavaScript函数
```
2. 组件必须大写字母开头  
3. 组合组件  
4. 提取组件  
5. prop的只读性  
>>组件无论是使用函数函数声明还是通过calss声明，都绝不能修改自身的props。  
  纯函数： 函数不会尝试更改入参，多次调用下，相同的入参始终返回相同的结果  
```
纯函数
	function sum(a, b) {
		return a + b;
	}

	非纯函数
	function withdraw(account, amount) {
		account.total -= amount;
	}
```
6. 无状态组件：一个组件无需管理state，只是纯粹的展示

## state与生命周期
1. state组件私有，完全受控于当前组件
2. state
	1. 不能直接修改state
	2. state  props更新可能会是异步更新，不要依赖其更新下一个状态
> // Wrong  
this.setState({  
  counter: this.state.counter + this.props.increment,  
})  
可以解决上述问题  setState可以接受一个函数  
// Correct  
this.setState((state, props) => ({  
  counter: state.counter + props.increment  
}));  
3. 数据向下流动：state 派生的任何数据或 UI 只能影响树中“低于”它们的组件
## 事件处理
1. React 事件的命名采用小驼峰式（camelCase），而不是纯小写

2. JSX传入函数作为事件处理函数，而不是一个字符串
```
	传统的HTML
	<button onclick="activateLasers()">
		Activate Lasers
	</button>

	React
	<button onClick={activateLasers}>
		Activate Lasers
	</button>
```

3. React中不能通过返回false的方式阻止默认事件，显示方式e.preventDefault()

4. React中回调函数的this，class方法不会默认绑定this，如果忘记绑定this指向则为undefined【bind】
```
	onClick={() => this.handleClick()}
	onClick={this.handleClick}
	handleClick = () => {
    	console.log('this is:', this);
  	}
```

5. 向事件处理程序传递参数
```
	<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
	<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
	两种情况React事件对象e都会被传递，箭头函数方式是显式传递，bind方法为隐式传递
```
## 条件渲染
1. 可以使用运算符if或者条件运算符创建元素表现当前状态
2. 元素变量	`<Greeting isLoggedIn={isLoggedIn} />`
3. 与运算符&&
4. 三目运算符
5. 阻止组件渲染  
	```
	render直接返回null，不进行渲染  
	function WarningBanner(props) {  
		if (!props.warn) {  
    	return null;  
  	}  
	<WarningBanner warn={this.state.showWarning} /> 
	```
## 列表与Key
1. 渲染多个组件, 利用map渲染
```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
)

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```
3. 基础列表组件 : 每创建一个元素时，必须包含一个特殊的key属性
```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
4. key
- 1. 帮助react识别哪些元素改变，给数组中每个元素赋上确定的标识
	通常使用数据的id为key
	index可以作为key，如果列表顺序会发生变化，不建议使用索引作为key值，会导致性能变差，可能会引起组件状态问题。
	如果不显式的指定key，react会默认使用索引作为列表项目的值
- 2. key只有放在就近的数组上下文中才有意义，map()方法中需要设定key属性
- 3. 可以在兄弟节点直接必须唯一，可以信息会传递给react，不会传递给组件，	如果组件中需要使用，必须用其他属性名显式传递
- 4. JSX允许在大括号中嵌入任何表达式
```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
        value={number} />
      )}
    </ul>
  );
}
```
## 表单
1. 表单元素  
```
<input>、 <textarea> 和 <select>
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```
2. 受控组件
- React的state成为唯一数据源，渲染表单的React组件，还控制着用户输入过程中的表单发生的操作，。被React以这种方式控制取值的表单输入元素就叫做受控组件。
- 输入值始终由React的state驱动
3. 处理多个输入：可以给每个元素添加name属性，处理函数根据e.target.name执行操作
```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
4. 受控组件输入空值
- 受控组件指定的value，props会阻止用户更改输入，如果指定value，但输入仍可以编辑，可能意外的将value设置成了undefined，null

## 状态提升
1. 将多个组件共用的state向上移动到它们最近共同的父组件中，实现共享state依靠自上而下的数据流
## 组合VS继承
1. 组合
	包含关系
	特例关系
2. 继承
	无需使用继承构建组件





