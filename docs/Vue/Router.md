## Vue-router
`https://juejin.im/post/6844903874533261325#heading-0`
###  一 编程式导航
>`<router-link :to="">`创建a标签来定义导航，还可借助router的实例方法。

|声明式|编码式|
|--|--| 
|`<router-link :to=".."`|`router.push(...)`|

>使用router.push的方法，这个方法**会向history栈中添加一个新的记录，当用户点击后退时，则回到之前的url**

```
该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如:
// 字符串
router.push('home')

// 对象
router.push({path: 'home'})

// 命名的路由
router.push({name: 'user', params: {userid: 123}})

// 带参数查询，变成/register?plan=private
router.push({path: 'user', query: { plan:'private'}})

```
>提供的params，path会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
```
const userId = '123'
router.push({name: 'user', params: {userId}})  // ->  /user/123
router.push({path: `/user/${userId}`}) // -> /user/123

// params不生效  ×
router.push({path: `/user`, params: {userId}})
```
>同样也适用于router-link组件的to属性
```
<router-link :to="{name: 'user', params: {userId: 123}}">User</router-link>
或者
router.push({name: 'user', params: {userId: 123})
```

### 二 router.replace(location, onComplete?, onAbort?)
1. 和router.push像，不同的是不会向history添加新纪录，而和它的方法名一样——替换掉当前history记录。
2. router.go(n)，参数为整数，意思在history记录中向前或者后退多少步。类似window.history.go(n)。
```

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)

```
