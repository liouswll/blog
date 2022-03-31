## 1. vue2.x到vue3.x

#### 双向绑定
- **vue2.x** 通过Object.defineproperty重定义data中的属性get和set方法，从而劫持data中的set和get操作。存在问题：
   1. 实例创建后添加的属性监听不到，数据劫持是在数据初始化的过程中执行。具体在beforeCreate和Create生命周期内完成，可以通过$set解决后续天骄监听属性的问题。
   2. defineProperty()无法监听数组的变化，当直接用index设置数组项是不会被检测出来的，如：`this.showData[1] = {a:1}`。当然也能用$set解决。通过下面八种方法操作数组，Vue能检测到数据变化，分别为：push()、pop()、shift()、unshift()、splice()、sort()、reverse()

 - **vue3.x** 采用Proxy和Reflect实现双向绑定，它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。我们可以这样认为，Proxy是Object.defineProperty的全方位加强版。
   1. Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。Object.defineProperty不能做的Proxy还能做。
   2. Proxy作为新标准，得到了各大浏览器厂商的大力支持，性能持续优化。唯一的不足就是兼容性的问题，而且无法通过polyfill解决。
## 2. vue3 Proxy
- 理解为在对象之前设置一个“拦截”，当该对象被访问的时候，都必须经过这层拦截。意味着你可以在这层拦截中进行各种操作。比如你可以在这层拦截中对原对象进行处理，返回你想返回的数据结构。
```
- 基础
const p = new Proxy(target, handler);
target： 所要拦截的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
handler：一个对象，定义要拦截的行为
const p = new Proxy({}, {
    get(target, propKey) {
        return '哈哈，你被我拦截了';
    }
});
console.log(p.name);
// 哈哈，你被我拦截了


- Proxy是用来操作对象的。代理的目的是为了拓展对象的能力。
const p = new Proxy({}, {
    set(target, propKey, value) {
        if (propKey === 'name') {
            throw new TypeError('name属性不允许修改');
        }
        // 不是 name 属性，直接保存
        target[propKey] = value;
    }
});
p.name = 'proxy';
// TypeError: name属性不允许修改
p.a = 111;
console.log(p.a); // 111
```

## 3. vue3 Vue.set
- Vue.set( target, key, value )  
target：要更改的数据源(可以是对象或者数组)  
key：要更改的具体数据  
value ：重新赋的值  

## 4. vue3 
- 示例 参考资料https://juejin.im/post/5e13ecbe6fb9a04846508ab2
```
<body>
    <div id="app"></div>
</body>
<script src="./index.js"></script>


const { reactive } = Vue
var App = {
  template: `
    <div class="container">
         {{message}}
    </div>`,
  setup() {
  	const state = reactive({message: "Hello World!!!"})
	return {
		...state
	}
  }
}
Vue.createApp().mount(App, '#app')

```
- OptionApi => Composition API  
setup, reactive等函数
- setup
    ```
    const { reactive } = Vue
    let App = {
    template: `
        <div class="container">
            <input v-model="state.value"/>{{state.value}}
        </div>`,
    setup() {
        const state = reactive({ value: '' })
        return { state }
    }
    }
    Vue.createApp().mount(App, '#app')

     setup实际上是一个组件的入口，它运行在组件被实例化时候，props 属性被定义之后，实际上等价于 2 版本的beforeCreate 和 Created 这两个生命周期。

     setup接受两个参数，第一个参数是props， 另一个参数是context，所以大家在使用2.0时习惯的在this下获取属性的方式 ，在 vue3.0 中，变成了：
     setup(props, ctx) {
        console.log(props, ctx)
    }

    - 传值
    let Child = {
        template: `<div>{{title}}</div>`,
        setup(props, context) {
            console.log(props)
        }
    }
    let App = {
        template: `
            <div class="container">
                <Child title="test props"/>
            </div>`,
        components: { Child }
    }
    Vue.createApp().mount(App, '#app')


    ```
- reactive  
 在Vue3中，我们可以把数据经过 reactive 加工变成响应式的对象，用于模版的渲染数据， 当然Vue的向下兼容 还是允许我们使用data的方式实现  
    ```
    const { reactive, toRefs } = Vue
    let App = {
    template: `
        <div class="container">
            count: {{count}}
            <button @click="handlerCountAdd"> Click ++ </button>
        </div>`,
        setup() {
            const state = reactive({ count: 0 })
            const handlerCountAdd = () => {
                state.count++
            }
            return { ...toRefs(state), handlerCountAdd }
        }
    }
    Vue.createApp().mount(App, '#app')
    ```
- toRefs  
1. 先说下 ref ，vue3提供的ref让我们有机会创建单个的响应式的对象，在setup函数中return出去之后，在模板中可直接访问
    ```
    const App = {
    template: `
        <div class="container">
            {{value}}     
        </div>`,
    setup() {
        const value = ref(1)
        return { value }
    }
    }
    Vue.createApp().mount(App, '#app')
    ```
2. 那上文提到的 reactive创建的响应式对象 在模板中访问的话，则需要state.xxx。，vue3提供的toRefs正是为我们解决这个问题的，toRefs把一组的响应式对象拆成单个的响应式对象，就能够在模板中直接访问了。
    ```
    const App = {
    template: `
        <div class="container">
            {{value}}
            // {{state.value}} 不使用toRefs
        </div>`,
    setup() {
        const state = reactive({ value: 'reactive' })
        return toRefs(state)
    }
    }
    Vue.createApp().mount(App, '#app')
    ```

- computed 计算属性
```
反转字符串 demo
let App = {
  template: `
    <div class="container">
        value: <input v-model="value"/>
        <br/>
        rvalue: {{rvalue}}
    </div>`,
  setup() {
    const state = reactive({
      value: '',
      rvalue: computed(() =>
        state.value
          .split('')
          .reverse()
          .join('')
      )
    })
    return toRefs(state)
  }
}
Vue.createApp().mount(App, '#app')

```
- 数据响应式 effect和watch
effect和watch都可以监听到咱们数据的变化  
effect 在响应式数据变化的时候就会执行，执行次数根据响应式数据的个数来决定  
watch则点击一次 ，只会触发执行一次
```
let App = {
  template: `
    <div class="container">
        <button @click="handlerCountAdd"> Click ++ </button>
    </div>`,
  setup() {
    const state = reactive({ count: 0, value: 1 })
    const r = ref(1)
    const s = ref(1)
    const t = ref(1)
    const handlerCountAdd = () => {
      r.value *= 1
      s.value *= 2
      t.value *= 3
    }
    watch([r, s, t], val => {
      console.log('watch', val)
    })
    //effect(() => {
    //  console.log('effect', [r.value, s.value, t.value])
    //})
    return { handlerCountAdd }
  }
}
Vue.createApp().mount(App, '#app')

```

## 5. Vue中的ref $refs
1. ref 被用来给元素或者子组件注册引用信息。引用信息将会注册在父组件的$refs上对象上。  
普通的DOM元素上，那就指向DOM元素。子组件上，指向组件实例。

2. $refs 一个对象，持有已注册过ref的所有子组件。


## 6. Vue异步DOM更新（含ref）
```
(ref $refs示例)
<template>
  <div id="app">
    <ul ref="ul">
      <li v-for="(item, index) in arr" :key="index">{{item}}</li>
    </ul>
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3, 4],
    };
  },
  methods: {
    add() {
      this.arr.push(Math.random());
      this.arr.push(Math.random());
      this.arr.push(Math.random());
      console.log(this.arr);
      console.log(this.$refs.ul.childNodes.length);
    },
  },
};
</script>

//  7 4
//  10 7
即使打印添加在后面，数据已经放进arr中，但是vue没有把新增的渲染进来，此时的DOM还是原来的li节点。
同步渲染的那种效果。我们就是希望能够及时拿到先要的数据该怎么做呢（nextTick基本使用）
```

## 7. nextTick基本使用（及时取到先要数据）
1. vue的全局还有实例中提供了nextTickAPI，用法：首先接受一个回调函数，即这个回调会在**DOM更新后执行**
```
add() {
      this.arr.push(Math.random());
      this.arr.push(Math.random());
      this.arr.push(Math.random());
      console.log(this.arr);

      this.$nextTick(() => {
        console.log(this.$refs.ul.childNodes.length);
      });

    },
// 7 7 
// 10 10
```

## 8. 插槽
https://juejin.im/post/6864570298767769607#heading-10


## 9. 动态组件和异步组件
1. component元素绑定一个is属性实现。
```
<template>
  <div id="app">
    <ul @click="change">
      <li>test01</li>
      <li>test02</li>
      <li>test03</li>
    </ul>

    <div class="zhan"></div>

    <component :is="componentId"></component>
  </div>
</template>
<script>
import Test01 from "./components/test01";
import Test02 from "./components/test02";
import Test03 from "./components/test03";
export default {
  data() {
    return {
      componentId: "Test01",
    };
  },
  methods: {
    change(e) {
      this.componentId = e.target.innerText;
    },
  },
  components: {
    Test01,
    Test02,
    Test03,
  },
};
</script>
```
2. 异步加载组件
```
  components: {
    Test01:()=>import('./components/test01'),//返回的是promise
    Test02:()=>import('./components/test02'),
    Test03:()=>import('./components/test03'),
  },
```

## 10.keep-alive是vue一个内置组件（主要就是要实现组件缓存）
1. keep-alive缓存，用`<keep-alive>`标签将动态目标包裹。
```
 <keep-alive>
      <component :is="componentId"></component>
    </keep-alive>
```
2. 有三个属性
 - include 字符串或者正则表达式。只有名称匹配的组件**会被缓存。**
 - exclude 字符串或者正则表达式。名称匹配的组件**不会被缓存。**
 - max 数字。最多可以缓存多少组件实例。
 
```
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。
```

3. 
```
我们最终的目的就是储存组件，那么我们就要考虑使用什么数据结构保存、在什么时候创建这个创建结构、传过来的三个属性值变化了我们在哪个钩子里做处理、keep-alive组件销毁之后，所有存储的组件也要进行销毁
  1. create钩子创建储存数据结构。  
  2. mounted钩子执行完就完成挂载，钩子在额更新钩子后面，再次触发，可以拿到新传过来的三个属性的值。
  3. mounted () {
      this.$watch('include', val => {
          pruneCache(this, name => matches(val, name))
      })
      this.$watch('exclude', val => {
          pruneCache(this, name => !matches(val, name))
      })
  }
  pruneCache这个函数，就是把以储存的组件，根据include或exclude的最新变化进行判断是否还需要储存，不需要剔除缓存对象中
  4. destory 把缓存中所有组件都销毁。
```

## 11. 混入
1. 混入提供了一种非常灵活的方式，来分发vue组件中可复用功能。一个混入的对象可以包含任意组件的对象。
```
<template>
  <div>test01</div>
</template>
<script>
const mixin = {
  created() {
    console.log('混进来的')
  },
};
export default {
  mixins: [mixin],
 
  created() {
    console.log('组件上的')
  },
};
</script>

```
## 12. onRef 子组件向父组件传递数据
`https://www.jianshu.com/p/c3e31d62bf76`
1. 父组件：
```
<InsureCustomerInfo
    dataSource={info}
    onRemoveData={this.onRemoveDat
    flag={flag}
    onRef={(ref) => { this.cus = ref }} // 获取整个Child元素
/>


 handleCancelEdit = () => {
        const cus = this.cus;
        const fam = this.fam;
        const con = this.con;
        const cusForm = cus.props.form;
        const famForm = fam.props.form;
        const conForm = con.props.form;
        cusForm.resetFields();
        famForm.resetFields();
        conForm.resetFields();
        this.setState({
            flag: true
        });
    }
```
2. 子组件
```
    componentDidMount() {
        const { onRef } = this.props;
        onRef && onRef(this);
    }
```


## 13. Vue组件之间的数据传递
1. 若子组件给父组件传值，可使用 $emit 方法
2. 祖孙组件之间可以使用 provide 和 inject 方式跨层级传值，允许一个祖先组件向其所有子孙后代。
3. 若子组件使用 $emit('say') 派发事件，父组件可使用 @say 监听
4. 若父组件给子组件传值，子组件可通过 props 接受数据

## 14. Props校验
1. js为弱类语言，可使用type为Props进行**类型**或者**默认值**的指定。 
2. 设置：type 可设置为 `String Number Boolean Array Object Date Function Symbol`
3. 设置为自定义函数
4. 设置为自定义的构造函数

## 15. key值的使用
1. v-for，如果不使用key，value会默认使用一种"就地复用"的策略进行更新。在一些情况下会导致渲染的不正确。
2. v-router，会遇到 /path/:id，这样只改变id号的场景，但是渲染的是不同的组件。**由于router-view是复用的，单纯的改变id号是不会刷新router-view**。
```
解决方法
为每个router-view添加不同的key，让vue每次切换路由的参数的时候，认为是不同的组件从而得到更新

<router-view :key = 'key'></router-view>

实际上对所有的DOM，Vue都可能会采取复用策略，遇到渲染顺序不准确的，可以向key方向考虑。
```


## 16. hookEvent的使用
`https://juejin.im/post/6872128694639394830#heading-7`
1. hookEvent模板式的注入声明周期函数钩子。
```
加载list需要很长时间，中间加载loading
<List @hook:updated= 'handleTableUpdated'></List>
```
2. 组件销毁的新方式
```
旧
mounted(){
  this.thirdPartyPlugin = thirdPartyPlugin()
},

beforeDestroy(){
  this.thirdPartyPlugin.destroy()
}
```

```
新
mounted(){
  const this.thirdPartyPlugin = thirdPartyPlugin()
  this.$on('hook:beforeDestory', () => {
    this.thirdPartyPlugin.destory();
  })
}

```


## 18. v-loader中的scoped
1. 当`<style>`标签有scoped时.css只作用于当前元素，通过使用PostCss转换。会添加专属的[data-v-f3f3eg9]
```
<style scoped>
.example{           // .example[data-v-f3f3eg9]{
  coloe: red;
}
</style>

<template>
  <div calss = "example"> hi </div>             //<div calss = "example"  data-v-f3f3eg9> hi </div>     
</template>
```



## 19. 动态指令参数
```
<template>
  <button @[someEvent] = 'handSomeEvent()'></button>
</template>

<script>
  data(){
    return{
      someEvent:someCondition ? "Click" : "dblclick"
    }
  },
  methods:{
    handSomeEvent(){

    }
  }
</script>

```

## 20. watch immediate  
1. 组件中watch一个值，进行一些页面初始化或者更新操作，如this.getDetails()
```
watch(){
  id:{
    handler(newVuale){
      this.getDetail(newValue)
    }
  }
}
watch 在最初绑定的时候是不会执行的，要等到id改变时才执行监听，这可能会导致第一次渲染出错。


想watch中声明了id后立即执行handler方法，可以加上immediate：true
watch(){
  id:{
    handler(newValue){
      this.getDetail(newValue)
    }
  },
  // watch中声明了id后，立即执行handler方法。
  immediate:true
}
```

## 21. v-cloak解决页面闪烁问题
1. 页面数据模板中的数据都是异步获取的，在网络不好的情况下，会出现闪烁的效果。影像用户体验。
2. v-cloak保持在元素上直到关联实例结束编译。利用特性，结合css规则`[v-cloak]{dispaly: none}`，一起使用就可以隐藏掉未编译好的Mustache标签，直到实例完毕。
```
// template中
<div class="#app">
  <p>{{value.name}}</p>
</div>

// css中
[v-cloak]{
  display: none
}
```
> 需要注意，虽然解决了闪烁的问题，但这段时间内如果什么都不处理的话，会直接白屏，这并不是我们想要的效果，我们应该加一个 loading 或者骨架屏的效果，提升用户体验。


## 22. v-once v-pre
1. v-once 渲染元素或者组件一次。重新渲染的话，元素/组件及其所有子节点会被视为**静态内容**跳过。
2. v-pre  决定要不要跳过这个元素和子元素的编译。

## 23. 表单输入控制
1. 表单修饰符
```
.number 自动将用户输入转化为数值类型
<input v-model.number = "age"  type = "number" />

.trim 自动过滤用户输入的首尾空白字符
<input v-model.trim = "msg"/>
```

2. change事件
```
<imput v-model="value2" type="text" @change="inputChange(value2)" />

metho: {
  inputChange(val){
    if(!val) return ''
    val = val.toString()
    this.value2 = val.charAt(0).toUpperCase()+val.slice(1)
  }
}
```

3. filter过滤器
```
<input v-model="value1" type="text" />

vue.filter('capitalize', function(value){
  if(!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

watch: {
  value1(val){
    this.value1 = this.$option.filters.capitalize(val)
  }
}
```

4. 自定义指令
声明一个全局指令
```

```

## 24. 事件：特殊变量$event
1. 原生事件：绑定事件后，传入除了原生对象之外的参数。监听原生DOM事件，方法以原生事件对象为唯一参数（默认值）。想在内联处理器中访问原始的dom事件（同时想传其他参数），可以使用$event传入。
`https://juejin.im/post/6872128694639394830#heading-17`
```
<input v-model = "value1" @change = "inputChange('hellow', $event)" />

methods: {
  inputChange(msg, e){
    console.log(msg, e)
  }
}
```

2. 自定义事件：$event是从子组件中捕获的值。监听el-input的传递过来值的同时，传递其他的参数。
```
<el-input
  v-model = "value2"
  @change = "change($event, 'hellow')"
  placeholder = "Input sonething here"
/>

methods: {
  change(e, val){
    console.log("evevt is " + e); // el-input 输入的值
    console.log(val) // hellow
  }
}
```

## 25. vue的双向绑定
>https://segmentfault.com/a/1190000019722065  示例
![vue-Observer](../.vuepress/public/vue-Observer.png)
- 利用 Object.defineProperty() 对数据进行劫持，设置一个监听器 Observer，用来监听数据对象的属性，如果属性上发生变化了，交由 Dep 通知订阅者 Watcher 去更新数据，最后指令解析器 Compile 解析对应的指令，进而会执行对应的更新函数，从而更新视图，实现了双向绑定。
```
Observer (数据劫持)
Dep (发布订阅)
Watcher (数据监听)
Compile (模版编译)
```

## 26. 单元测试
`https://www.jianshu.com/p/ba76cfcac72c`

## 27. vue实现组件递归（嵌套自身）
`https://blog.csdn.net/weixin_43245095/article/details/109504127`
```
// 递归组件 demo.vue   自己调用自己
<template>
  <div>
    <div v-for="(item, index) in treeData" :key="index">
      <p>{{ item.title }}</p>
      <div class="children" v-if="item.children">
     <!-- 嵌套自身 -->
        <Demo :treeData="item.children"></Demo>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Demo",
  props: ["treeData"],
  data() {
    return {};
  },
  created() {},
};
</script>
<style  scoped>
.children {
  padding-left: 10px;
}
</style>

```

```
父组件调用demo.vue
<demo :treeData="treeData" ></demo>
//   模拟递归
      treeData: [
        {
          title: "递归层1",
          children: [
            {
              title: "递归层1-1",
              children: [
                {
                  title: "递归层1-1-1",
                },
                {
                  title: "递归层1-2-1",
                  children: [
                    {
                      title: "递归层1-2-1-1",
                    },
                    {
                      title: "递归层1-2-1-2",
                    },
                  ],
                },
              ],
            },
            {
              title: "递归层1-2",
            },
          ],
        },
      ],


```