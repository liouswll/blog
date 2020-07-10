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

## 生命周期对比
|vue2 | vue3 |
|--- |---|
|beforeCreate |setup(替代)|
|created |setup(替代)|
|beforeMount |onBeforeMount|
|mounted |onMounted|
|beforeUpdate |onBeforeUpdate|
|updated |onBeforeUpdate|
|beforeDestroy |onUnmounted|
|destroyed  |onUnmounted|
|errorCaptured  |onErrorCaptured|

