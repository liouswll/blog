## 介绍
- 概念：构建用户界面的渐进式框架
- 声明式渲染
```
声明式渲染数据
<div id="app">
  {{ message }}
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```
- 绑定元素attribute v-bind:title="message"
- 条件与循环  
  1. 切换元素是否显示：v-if="seen"
  2. 循环数组：v-for="todo in todos"
  3. 处理用户输入
        ```
        时间监听器（调用vue中的方法）
            v-on:click="reverseMessage"
        双向绑定
            v-model="message"
        ```
  4. 组件化应用构建
		component注册组件
		v-bind 指令将待办项传到循环输出的每个组件中




## vue实例
#### 创建vue实例
- var vm = new Vue({})
#### 数据方法
- 数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的
- 使用 Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。Object.freeze(obj)



#### Vue 实例属性与方法
- 有前缀 $，以便与用户定义的属性区分开来
    ```
    1. 
    $data   $el
    // $watch 是一个实例方法
    2. 
    vm.$watch('a', function (newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
    })
    ```



#### 实例生命周期钩子
- 初始化过程，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。
- 生命周期钩子的 this 上下文指向调用它的 Vue 实例。不要在选项属性或回调上使用箭头函数，
>比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。



#### 生命周期
- 生命周期
    ```
	beforeCreated：el 和 data 并未初始化

    created:完成了 data 数据的初始化，el没有

	beforeMount：完成了 el 和 data 初始化   虚拟DOM占位

    mounted ：完成挂载

	beforeUpdate

	updated

	beforeDestroy
	    钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用

	destroyed
    	钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    ```
- 编译加载顺序： render函数选项 > template选项 > outer HTML
    ```
    <body>
    <div id="app">
        <!--html中修改的-->
        <h1>{{message + '这是在outer HTML中的'}}</h1>
    </div>
    </body>
    <script>
    var vm = new Vue({
        el: '#app',
        template: "<h1>{{message +'这是在template中的'}}</h1>", //在vue配置项中修改的
        data: {
        message: 'Vue的生命周期'
        }
    </script>
        ew Vue({
        el: '#app',
        render: function(createElement) {
            return createElement('h1', 'this is createElement')
        }
    })
    ```



## 模板语法
- 插值
	1. v-once
	    一次性的插值，当数据改变时，插值处的内容不会更新  
		`<span v-once>这个将不会改变: {{ msg }}</span>`
	2. v-html
		输出HTML代码  
		![vHtml](../.vuepress/public/vHtml.png)
	3. attribute
    4. JavaScript表达式： 表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。
        ```
        <!-- 这是语句，不是表达式 -->
        {{ var a = 1 }}

        <!-- 流控制也不会生效，请使用三元表达式 -->
        {{ if (ok) { return message } }}
        ```
- 指令
	1. 参数
        >一些指令接受一个参数，在指令之后用冒号表示  
        `v-bind:href="url"  `
        `<a v-on:click="doSomething">...</a>`
	2. 动态参数
        > `<a v-bind:[attributeName]="url"> ... </a>`  
        如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。
	3. 修饰符
		>`<form v-on:submit.prevent="onSubmit">...</form>`  
		修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
- 缩写
```
v-bind
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>


v-on
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```



## 计算属性与侦听器
- 计算属性computed：
 1. 对于复杂的逻辑计算。计算属性是基于它们的响应式依赖进行缓存的，只有在响应式依赖发生改变时，才会重新求值。
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```
2. setter
- 侦听属性watch： 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的


## class与style绑定
- 绑定HTML CSS
	1. 对象语法  
			`v-bind:class="{ active: isActive, 'text-danger': hasError }"`
	2. 数组语法
        ```
        <div v-bind:class="[activeClass, errorClass]"></div>
        data: {
            activeClass: 'active',
            errorClass: 'text-danger'
        }
        ```
		三元表达式
		`<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>`

	3. 组件上使用  
	自定义组件上使用 class 属性时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。
        ```
        Vue.component('my-component', {
            template: '<p class="foo bar">Hi</p>'
        })
        ```
- 绑定内联样式
	1. 绑定到对象上
        ```
		<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
        data: {
            activeColor: 'red',
            fontSize: 30
        }
        

        <div v-bind:style="styleObject"></div>
        data: {
            styleObject: {
                color: 'red',
                fontSize: '13px'
            }
        }
        ```
	2. 数组语法 `<div v-bind:style="[baseStyles, overridingStyles]"></div>`
	3. 自动添加前缀
	4. 多重值  
		`<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>`  
        这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
## 条件渲染
- v-if
    ```
    v-if
    v-eles必须在v-if或者v-if-else后面
    <div v-if="type === 'A'">
    A
    </div>
    <div v-else-if="type === 'B'">
    B
    </div>
    <div v-else-if="type === 'C'">
    C
    </div>

    <div v-else>
    Not A/B/C
    </div>
    复用已有元素而不是从头开始渲染，如果不要复用则添加key
    ```
- v-show    
	不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display
- v-if与v-show
	1. v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
	2. v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
	3. 相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
	4. 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
    5. v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。
## 列表渲染
- v-for
    ```
	数组
	<ul id="example-2">
        <li v-for="(item, index) in items">
            {{ parentMessage }} - {{ index }} - {{ item.message }}
        </li>
    </ul>
    var example2 = new Vue({
    el: '#example-2',
    data: {
        parentMessage: 'Parent',
        items: [
        { message: 'Foo' },
        { message: 'Bar' }
        ]
    }
    })


    对象
    <div v-for="(value, name, index) in object">
        {{ index }}. {{ name }}: {{ value }}
    </div>
    new Vue({
    el: '#v-for-object',
    data: {
        object: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
        }
    }
    })
    ```
- 维护更新状态
	1. 数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似 Vue 1.x 的 track-by="$index"。  
    这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
	2. 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性
        ```
        <div v-for="item in items" v-bind:key="item.id">
        <!-- 内容 -->
        </div>
        ```
- 数组更新检测
	1. 变异方法  
    Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：push() pop() shift() unshift() splice() sort()reverse()你可以打开控制台，然后对前面例子的 items 数组尝试调用变异方法。比如 example1.items.push({ message: 'Baz' })。
	2. 替换数组  
	非变异 (non-mutating method) 方法，例如 filter()、concat() 和 slice()。它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：
        ```
        example1.items = example1.items.filter(function (item) {
            return item.message.match(/Foo/)
        })
        ```
      你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。


- 显示过滤/排序后的结果: 计算属性或者方法
- v-for使用值范围
	```
    会把模板重复对应次数。
	<div>
       <span v-for="n in 10">{{ n }} </span>
    </div>
    
    '12345678910'
     ```

- `<template> `上使用 v-for
- v-if和v-for： v-for拥有更高的优先级，有条件地跳过循环的执行，那么可以将 v-if 置于外层元素
    ```
    <ul v-if="todos.length">
        <li v-for="todo in todos">
            {{ todo }}
        </li>
    </ul>
    <p v-else>No todos left!</p>
    ```

- 组件中使用v-for


## 事件处理
- v-on 指令监听 DOM 事件  
	`<button v-on:click="counter += 1">Add 1</button>`
- 事件处理方法
    ```
		<button v-on:click="greet">Greet</button>

		var example2 = new Vue({
        el: '#example-2',
        data: {
            name: 'Vue.js'
        },
        // 在 `methods` 对象中定义方法
        methods: {
            greet: function (event) {
                // `this` 在方法里指向当前 Vue 实例
                alert('Hello ' + this.name + '!')

                // `event` 是原生 DOM 事件
                if (event) {
                    alert(event.target.tagName)
                }
            }
        }
        })
    ```

- 内联处理器中的方法
	1. 内联处理器中的方法
    ```
        <div id="example-3">
        <button v-on:click="say('hi')">Say hi</button>
        <button v-on:click="say('what')">Say what</button>
        </div>
        new Vue({
        el: '#example-3',
        methods: {
            say: function (message) {
            alert(message)
            }
        }
        })
    ```
    2. 内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：
	```
    	<button v-on:click="warn('Form cannot be submitted yet.', $event)">
            Submit
        </button>
        // ...
        methods: {
            warn: function (message, event) {
                // 现在我们可以访问原生事件对象
                if (event) {
                    event.preventDefault()
                }
                alert(message)
            }
        }
    ```
## 修饰器
	- v-on 提供了事件修饰符。  
			事件修饰符  
			按钮修饰符  
			系统修饰键  
	- 在HTML中监听事件
			Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上  
			扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。  
			因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。  
			当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。
## 表单输入绑定
- v-model基础语法
	1. 文本
	    ```
        <input v-model="message" placeholder="edit me">
        ```
	2. 多行文本
		```
        <textarea v-model="message" placeholder="add multiple lines"></textarea>
        ```	
	3. 复选框
        ```
		1. 单个
			<input type="checkbox" id="checkbox" v-model="checked">
            <label for="checkbox">{{ checked }}</label>    //  true  false	
		2. 多个
			<div id='example-3'>
                <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
                <label for="jack">Jack</label>
                <input type="checkbox" id="john" value="John" v-model="checkedNames">
                <label for="john">John</label>
                <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
                <label for="mike">Mike</label>
                <br>
                <span>Checked names: {{ checkedNames }}</span>
            </div>
            new Vue({
            el: '#example-3',
            data: {
                checkedNames: []
            }
            })
            Jack  John  Mike
            Checked names: [ "Jack", "John", "Mike" ]
        ```
	4. 单选按钮
        ```
        <div id="example-4">
            <input type="radio" id="one" value="One" v-model="picked">
            <label for="one">One</label>
            <br>

            <input type="radio" id="two" value="Two" v-model="picked">
            <label for="two">Two</label>
            <br>

            <span>Picked: {{ picked }}</span>
        </div>
        new Vue({
            el: '#example-4',
            data: {
                picked: ''
            }
        })
        One
        Two
        Picked: One
        ```
		5. 选择框
        ```
        <div id="example-5">
            <select v-model="selected">
                <option disabled value="">请选择</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <span>Selected: {{ selected }}</span>
        </div>
        new Vue({
            el: '...',
            data: {
                selected: ''
            }
        })
        ```
		6. 多选框
        ```
        <div id="example-6">
            <select v-model="selected" multiple style="width: 50px;">
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <br>
            <span>Selected: {{ selected }}</span>
        </div>
        new Vue({
            el: '#example-6',
            data: {
                selected: []
            }
        })
        ABC
        Selected: [ "A" ]
        ```
- v-mode值绑定
	1. 值绑定
        ```
        <!-- 当选中时，`picked` 为字符串 "a" -->
        <input type="radio" v-model="picked" value="a">

        <!-- `toggle` 为 true 或 false -->
        <input type="checkbox" v-model="toggle">

        <!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
        <select v-model="selected">
            <option value="abc">ABC</option>
        </select>
        
        值绑定到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串
        ```
    2. 复选框
        ```
        <input
            type="checkbox"
            v-model="toggle"
            true-value="yes"
            false-value="no"
        >
        ```
    3. 单选按钮
		```
        <input type="radio" v-model="pick" v-bind:value="a">
        // 当选中时
        vm.pick === vm.a
        ```
	4. 选择框选项
        ```
        <select v-model="selected">
            <!-- 内联对象字面量 -->
        <option v-bind:value="{ number: 123 }">123</option>
        </select>
        // 当选中时
        typeof vm.selected // => 'object'
        vm.selected.number // => 123
        ```
- 修饰符
```
.lazy
input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >

.number
子主题 1自动将用户的输入值转为数值类型
<input v-model.number="age" type="number">
这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。

.trim
自动过滤用户输入的首尾空白字符
<input v-model.trim="msg">
和组件配合使用v-model
```
## 组件基础
- data必须是一个函数  
- 父组件传值子组件 props  
- 子组件传值父组件 方法  
- 单个根元素