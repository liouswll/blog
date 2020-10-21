## Vue-router
`https://juejin.im/post/6844903874533261325#heading-0`
### router和route  https://www.cnblogs.com/shaozhu520/p/11298805.html
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

## 动态路由匹配
```
const User = {
    template: '<div>User</div>'
}

const router = new VueRouter({
    routers: [
        // 动态路径参数 以冒号开头
        {path: '/user/:id', conponent: User}
    ]
})
```
>/suer/foo和/user/bar都将映射到相同的路由，并用同一个模板渲染。可以利用**this.$route.params.id**获取值。此处id是冒号后面的值，只要跟params后面的属性一样就能取到。
1. 你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中。例如：

|模式|匹配路径|this.$route.params|
|--|--|--|
|/user/:username|/user/evan|{username: 'evan'}|
|/user/:username/post/:post_id|/user/evan/post/123|{username: 'evan', post_id: '123'}|

>除了route.params外，route对象还提供了：route.query(如果url中有查询参数)，route.hash。

## 响应路由参数变化
**使用路由参数时，从/user/foo导航到/user/bar,原来的组件实例会被复用，**两个路由都使用同个组件，比起销毁，复用则显得更加高效。不过也意味着**组件生命周期钩子不会被点用**
1. 复用组件时，相对路由参数做出响应的话，可以简单的watch（监测变化）$route对象：
```
const user = {
    template: '...',
    watch: {
        '$route'(to, from){
            // 对路由做出响应
        }
    }
}
```
2. 使用2.2中的beforeRouteUpdate导航守卫：
```
const User = {
    template: '...',
    beforeRouteUpdate(to, from, next){
        // react to route changes
        // do not forget to call next()
    }
}
```

## 捕获所有路由和404 Not Foundluyu路由。
1. 常规参数只会被/分割的url片段中的字符。如果想匹配任意路径，可以使用通佩符(*)
```
{
    // 会匹配所有路径
    path: '*'
}
{
    // 匹配所有以`/user-`开头的路径
    path: '/user-*'
}
```
>当使用通配符路由时，请确保路由的顺序是正确的，*含通配符的路由应该放到最后面。路由{path: '*'}常用于客户端 404 错误。如果你使用了History 模式，请确保正确配置你的服务器。

2. 当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch参数。它包含了URL通过通配符被匹配的部分：
```
// 给出一个路由：{path: '/user-*'}
this.$router.push('/user-admin')
this.$route.params.pathMatch   // 'admin'

// 给出一个理由
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

## 嵌套路由
```
const router = new VueRouter({
    routers: [
        {path: '/user/:id', component: User,
            children: [
                {
                    //   当/user/:id/profile匹配成功，
                    //   UserProfile 会被渲染在User的<router-view>中

                    path: 'profile',
                    component: UserProfile
                },
                {
                    //   当/user/:id/posts匹配成功，
                    //   UserPosts会被渲染在User的<router-view>中

                    path: 'posts',
                    component: UserPosts
                }
            ]
        }
    ]
})
```
基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个空的子路由：
```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
            //    当 /user/:id 匹配成功，
            //    UserHome 会被渲染在 User 的 <router-view> 中
            {   
                path: '', 
                component: UserHome
            },

            // ...其他子路由
       ]
    }
  ]
})
```


## 命名路由
1. 通过命名标识一个路由，创建Router实例的时候，在routes配置中设置名称。
```
const router = new VueRouter({
    routes: [
        {
            path: '/user/:userId',
            name: 'user',
            compoent: User
        }
    ]
})
```
2. 要链接到一个命名路由，可以给router-link的to属性传一个对象：
```
<router-link :to="{name: 'user', params: "{userId: 123}"}">user</router-link>
```

3. 和调用router.push()情况差不多
```
router.push({name: 'suer', params: { userId: 123 }})
```
两种方式都可以导向/user/123路径

## 重定向和别名
1. 重定向通过routes配置，下面从/a重定向到/b
```
const router = new VueRouter({
    routes: [
        {
            path: '/a',
            redirect: '/b'
        }
    ]
})
```
2. 重定向的目标也可以是个命名路由
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

3. 甚至是一个方法，动态返回重定向目标：
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```
>注意导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。在下面这个例子中，为 /a 路由添加一个 beforeEach 或 beforeLeave 守卫并不会有任何效果。

4. 别名
/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```


## 路由组件传参
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。使用 props 将组件和路由解耦
```
const User = {
   props: [id],
   template: '<div>UserId: {{id}}</div>'
}

const router = new VueRouter({
    routes: [
        {
            path: '/user/:id',
            component: User,
            props: true
        },
        // 对于包含命名视图的路由，必须为每个命名视图添加props选项
        {
            path: '/user/:id',
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: false }
        }
    ]
})
```