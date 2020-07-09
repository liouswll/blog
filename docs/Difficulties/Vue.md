## vue2.x到vue3.x

#### 双向绑定
- **vue2.x** 通过Object.defineproperty重定义data中的属性get和set方法，从而劫持data中的set和get操作。存在问题：
   1. 实例创建后添加的属性监听不到，数据劫持是在数据初始化的过程中执行。具体在beforeCreate和Create生命周期内完成，可以通过$set解决后续天骄监听属性的问题。
   2. defineProperty()无法监听数组的变化，当直接用index设置数组项是不会被检测出来的，如：`this.showData[1] = {a:1}`。当然也能用$set解决。通过下面八种方法操作数组，Vue能检测到数据变化，分别为：push()、pop()、shift()、unshift()、splice()、sort()、reverse()

 - **vue3.x** 采用Proxy和Reflect实现双向绑定，它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。我们可以这样认为，Proxy是Object.defineProperty的全方位加强版。
   1. Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。Object.defineProperty不能做的Proxy还能做。
   2. Proxy作为新标准，得到了各大浏览器厂商的大力支持，性能持续优化。唯一的不足就是兼容性的问题，而且无法通过polyfill解决。