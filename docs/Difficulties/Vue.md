## vue2.x到vue3.x

#### 双向绑定
- **vue2.x** 通过Object.defineproperty重定义data中的属性get和set方法，从而劫持data中的set和get操作。存在问题：
   1. 实例创建后添加的属性监听不到，数据劫持是在数据初始化的过程中执行。具体在beforeCreate和Create生命周期内完成，可以通过$set解决后续天骄监听属性的问题。
   2. defineProperty()无法监听数组的变化，当直接用index设置数组项是不会被检测出来的，如：`this.showData[1] = {a:1}`。当然也能用$set解决。通过下面八种方法操作数组，Vue能检测到数据变化，分别为：push()、pop()、shift()、unshift()、splice()、sort()、reverse()

 - **vue3.x** 采用Proxy和Reflect实现双向绑定，它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。我们可以这样认为，Proxy是Object.defineProperty的全方位加强版。
   1. Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。Object.defineProperty不能做的Proxy还能做。
   2. Proxy作为新标准，得到了各大浏览器厂商的大力支持，性能持续优化。唯一的不足就是兼容性的问题，而且无法通过polyfill解决。
## vue3 Proxy
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

## vue3 Vue.set
- Vue.set( target, key, value )  
target：要更改的数据源(可以是对象或者数组)  
key：要更改的具体数据  
value ：重新赋的值  

## vue3 
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

## Vue中的ref $refs
1. ref 被用来给元素或者子组件注册引用信息。引用信息将会注册在父组件的$refs上对象上。  
普通的DOM元素上，那就指向DOM元素。子组件上，指向组件实例。

2. $refs 一个对象，持有已注册过ref的所有子组件。


## Vue异步DOM更新（含ref）
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

## nextTick基本使用（及时取到先要数据）
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

## 插槽
https://juejin.im/post/6864570298767769607#heading-10


## 动态组件和异步组件
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

## keep-alive是vue一个内置组件（主要就是要实现组件缓存）
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

## 混入
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
## onRef 子组件向父组件传递数据
`https://www.jianshu.com/p/c3e31d62bf76`
1. 父组件：
```
<InsureCustomerInfo
    dataSource={info}
    onRemoveData={this.onRemoveDat
    flag={flag}
    onRef={(ref) => { this.cus = ref }}
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