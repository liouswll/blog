## Event时间中的监听事件
- W3C规范中定义了3个事件阶段，依次是捕获阶段、目标阶段、冒泡阶段。
```
element.addEventListener(event, function, useCapture)

//event : （必需）事件名，支持所有DOM事件 。

//function：（必需）指定要事件触发时执行的函数。

//useCapture：（可选）指定事件是否在捕获或冒泡阶段执行。true，捕获。false，冒泡。默认false。

//注：IE8以下不支持。

<input type="button" value="click me" id="btn1">

<script>
document.getElementById("btn1").addEventListener("click",hello);
function hello(){
    alert("hello world!");
}
</script>
```


- 可以解除相应的绑定
```
<input type="button" value="click me" id="btn5">

<script>
var btn5 = document.getElementById("btn5");
btn5.addEventListener("click",hello1);//执行了
btn5.addEventListener("click",hello2);//不执行
btn5.removeEventListener("click",hello2);

function hello1(){
    alert("hello 1");
}
function hello2(){
    alert("hello 2");
}
</script>

```



- IE
```
element.attachEvent(event, function)
//event：（必需）事件类型。需加“on“，例如：onclick。
 
//function：（必需）指定要事件触发时执行的函数。
 
<input type="button" value="click me" id="btn2">
 
<script>
document.getElementById("btn2").attachEvent("onclick",hello);
function hello(){
    alert("hello world!");
}
</script>
```


- 事件委托： 事件委托就是利用冒泡的原理，把事件加到父元素或祖先元素上，触发执行效果。提高JavaScript性能。事件委托可以显著的提高事件的处理速度，减少内存的占用。


## instanceof，hasOwnProperty，in的用法
1. instanceof
- 通过使用instanceof操作符，可以确定一个**对象是否是特定构造函数的实例**，返回true或false。
instanceof只适用于构造函数创建返回的复杂对象和实例。
>任何时间判断一个对象（复杂值）是否是Object的实例时，它都将返回true，因为所有对象都继承自Object()构造函数。  
>instanceof使用场景，判断在一个继承关系中实例是否属于它的父类。
```
// 实例
let oSon = new oFather();
console.log(oSon instanceof oFather); // true

// 继承
let nFather = function () {};
nFather.prototype = new oFather();
nFather.construction = nFather;
console.log(nFather.firstName); // undefined
console.log(nFather.prototype.lastName); // qian
console.log(nFather instanceof oFather); // false
console.log(new nFather() instanceof nFather); // true

// 相对于Object来说
console.log('123' instanceof Object); // false
console.log(new String('123') instanceof Object); // true 构造出来的实例
console.log(null instanceof Object); // false
```

2. in, hasOwnProperty
- in操作符可以检查一个对象的属性，包括来自原型链的属性
- hasOwnProperty()方法可以检查来自非原型链属性的对象

- 实际项目中经常使用for...in...来遍历对象中可枚举的属性，但是for...in...常常把原型obj.prototype.xxx中的属性也列举出来，所以在循环的时候可以加上hasOwnProperty()方法判断下。
```
function obj0 () {
    this.name = 'mazey',
    this.age = '24'
};
obj0.prototype.gender = 'male';
let obj1 = new obj0();

// 打印所有可枚举属性
for (let key in obj1) {
    console.log(key); // name age gender 从原型链上继承下来的属性也会被打印出来
}

// 过滤掉原型链上的属性
for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
        console.log(key); // name age
    }
}
```

## JS阻止冒泡和取消默认事件(默认行为)

- js冒泡和捕获是事件的两种行为，使用event.stopPropagation()起到阻止捕获和冒泡阶段中当前事件的进一步传播。
>w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true
```
var el = window.document.getElementById("a");
el.onclick = function (e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.stopPropagation) {
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    }
    else {
        //否则，我们需要使用IE的方式来取消事件冒泡 
        window.event.cancelBubble = true;
        return false;
    }
}
```
- 使用event.preventDefault()可以取消默认事件
```
var el = window.document.getElementById("a");
el.onclick = function (e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if (e && e.preventDefault) {
        //阻止默认浏览器动作(W3C) 
        e.preventDefault();
    }
    else {
        //IE中阻止函数器默认动作的方式 
        window.event.returnValue = false;
        return false;
    }
}
```

>冒泡事件：比如我们点击了一个元素然后从它本身开始一层一层向上的父元素都做出反应直到根元素  
默认事件：像a标签的点击跳转和页面鼠标右键单击弹出菜单等都是默认事件

## 分割子串
- 不以使用正则表达式来替代子串，使用子串构建正则时，有可能有特殊字符
```
const s = 'foo foo foo'
s.replce(/foo/g, 'bar')


// 期待结果: 'AhelloX hello3 '
'hello. helloX hello3 '.replace(new RegExp('hello. ', 'g'), 'A')
// 返回结果 "AAA"

方法一
'hello. hello. hello. '.split('hello. ').join('A')
"AAA"

方法二
String.prototype.replaceAll()
'aabbcc'.replaceAll('b', '.'); 
// 'aa..cc'
```


## EventLoop-宏队列和微队列及其执行顺序
#### EventLoop事件循环机制： 浏览器或者node的一种解决JavaScript单线程运行时不会阻塞的一种机制，也就是异步原理。
- 宏任务队列可以有多个，微任务队列只有一个；主线程上的任务就是第一个宏任务，即刚进来时候的 script； 
```
宏队列（macrotask，也叫tasks）：能够建立宏任务的有
setTimeout
setInterval 
setImmediate (Node独有) 
requestAnimationFrame (浏览器独有) 
I/O UI rendering (浏览器独有)。

微队列（microtask，也叫jobs）： 能够建立微任务的有
process.nextTick (Node独有) 
Promise 
Object.observe 
MutationObserve 

当有一个宏任务队列执行完毕后，会执行微任务队列中的全部内容，然后执行另一个宏任务，如此反复
```
- 执行过程
1. 首先js会执行非异步操作的执行栈中的任务；
2. 执行栈中所有任务全部执行完毕后会在宏队列(宏队列中的任务执行先进先出策略)中取出队列顶部的任务放到执行栈中；
3. 在执行当前macrotask任务时，如果发现有microtask(微队列)，直接将任务放到微队列(微队列同样执行先进先出策略)中，等待当前宏队列任务执行完毕后执行。
4. 执行完当前栈顶的宏队列任务后，不会接着执行下面的宏队列任务，而是接着执行微队列中的任务，直到所有微队列任务全部执行完毕，再执行下一个宏队列任务。
5. 直到所有宏队列任务执行完毕，微队列任务执行完毕。

>marcotask 的本质是浏览器多个线程之间通信的一个消息队列；在 chrome 里，每个页面都对应一个进程，该进程又有多个线程，比如 js 线程、渲染线程、io 线程、网络线程、定时器线程等等，这些线程之间的通信是通过向对象的任务队列中添加一个任务（postTask） 来实现的；

>浏览器的各种线程都是常驻线程，他们运行在一个 for 死循环里面，每个线程都有属于自己的若干任务队列，线程自己或者其它线程都可能通过 postTask 向这些任务队列添加任务，这些线程会不断的从自己的任务队列中取出任务执行，或者把处于睡眠状态直到设定的时间或者是有人 postTask 的时候把它唤醒；

>microtask 是确确实实存在的一个队列，microtask 是属于当前线程的，而不是其他线程 postTask 过来的任务。只是延迟执行了而已，比如 Promise.then、mutationObserve 都属于这种情况；

## Promise
1. 
- 出现原因： 根据上一个请求执行下一步请求，产生回调地狱
    ```
    请求1(function(请求结果1){
        请求2(function(请求结果2){
            请求3(function(请求结果3){
                请求4(function(请求结果4){
                    请求5(function(请求结果5){
                        请求6(function(请求结果3){
                            ...
                        })
                    })
                })
            })
        })
    })
    ```
- 缺点  
    代码臃肿。  
    可读性差。  
    耦合度过高，可维护性差。  
    代码复用性差。   
    容易滋生 bug。  
    只能在回调里处理异常 
2. 
- Promise： 异步编程解决方案（ promise有三种状态：pending(等待态)，resolved（fulfiled）(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。）
```
new Promise(resolve => {
  setTimeout(() => {
    resolve('hello')
  }, 2000)
}).then(res => {
  console.log(res)
})
```

```
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello')
    }, 2000)
  }).then(val => {
    console.log(val) //  参数val = 'hello'
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('world')
      }, 2000)
    })
  }).then(val => {
    console.log(val) // 参数val = 'world'
  })
```

```
// promise完成后then()
let pro = new Promise(resolve => {
   setTimeout(() => {
     resolve('hello world')
   }, 2000)
 })
 setTimeout(() => {
   pro.then(value => {
   console.log(value) // hello world
 })
 }, 2000)
```

```
// Promise 状态的不可逆性
var p1 = new Promise(function(resolve, reject){
  resolve("success1");
  resolve("success2");
});

var p2 = new Promise(function(resolve, reject){
  resolve("success");
  reject("reject");
});

p1.then(function(value){
  console.log(value);
});

p2.then(function(value){
  console.log(value);
});

输出 success1 success
```

```
// 链式调用
var p = new Promise(function(resolve, reject){
  resolve(1);
});
p.then(function(value){               //第一个then
  console.log(value);
  return value*2;
}).then(function(value){              //第二个then
  console.log(value);
}).then(function(value){              //第三个then
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){              //第四个then
  console.log(value);
  return Promise.reject('reject');
}).then(function(value){              //第五个then
  console.log('resolve: '+ value);
}, function(err){
  console.log('reject: ' + err);
})
打印
1
2
undefined
"resolve"
"reject: reject"
```

```
// then方法后接err   
promiseDemo.then((result) => {
  console.log(result)
}, (result) => {
  console.log(result)
})

// .catch  等价于上述的err
promiseDemo.then((result) => {
  console.log(result)
}).catch((result) => {
  console.log(result)
})

promiseDemo.then((result) => {
  console.log(result)
})   //只接收成功状态
promiseDemo.catch((result) => {
  console.log(result)
})    // 只接收失败状态，可以看成第三种的简写形式
promiseDemo.then(null, (result) => {
  console.log(result)
})   //只接收失败状态
```
- **promise setTimeout（宏任务异步） console执行顺序**  
console -> promise -> setTimeout



## axios请求
#### get请求 一般多用于获取数据
- 不带参数     　　
1. 方式一: axios({ methods: 'get', url: '/ulr' })  
2. 方式二: axios.get('/url')  
- 带参数
    ```
    1. 方式一: axios.get('/url', {params: {id: 12}})  //请求的地址实际为localhost:8080/url?id=12
    2. 方式二: axios({
                   methods: 'get',
                   url: 'url',
                   params: {
                        id:12
                   }
               })
    ```
#### post请求 主要提交表单数据和上传文件
```
let data = {}
方式一:  axios.post('/url',data,config)
 
方式二:  axios({
    methods: 'post',
    url: '/url',
    data: data,
    
    url: '连接地址 path参数直接放里面',
    method: 'post 默认是 get',
    params: '必须是一个无格式对象 query参数',
    data: '是作为请求主体被发送的数据 body参数',

})　　　　
其中data可以有两种格式form-data(图片上传,文件上传)，applicition/json（目前比较流行）上面两种方法都是 appliction/json格式如下为: form-data
let formData = new FormData()
let data = {id: 12}
for (let key in data) {
    formData.append(key, data[key]) //创建form-data格式数据
}
axios({
    methods: 'post',
    url: '/url',
    data: formData
})
该请求发出之后可以在浏览器中查看此次请求的request header里面content-type: 为 form-data形式
 ```
- 请求完成后可跟.then方法
```
- get
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

- post
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });  
```


## polyfill
- 要抚平不同浏览器之间对js实现的差异。比如，html5的storage(session,local), 不同浏览器，不同版本，有些支持，有些不支持。

## node-gyp（工具包编译代码）
https://www.cnblogs.com/wangyuxue/p/11218113.html


## 防抖-节流
#### 防抖 debounce 
- 以免把一次事件误认为多次，敲键盘就是一个每天都会接触到的防抖操作。
- 场景  
登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖  
调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖  
文本编辑器实时保存，当无任何更改操作一秒后进行保存  
```
「防抖重在清零 clearTimeout(timer)

function debounce (f, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f(...args)
    }, wait)
  }
}

```

#### 节流 throttle
- 控制事件发生的频率，如控制为1s发生一次，甚至1分钟发生一次。与服务端(server)及网关(gateway)控制的限流 (Rate Limit) 类
- 场景  
scroll 事件，每隔一秒计算一次位置信息等  
浏览器播放事件，每个一秒计算一次进度信息等  
input 框实时搜索并发送请求展示下拉列表，没隔一秒发送一次请求 (也可做防抖)  
```
节流重在开关锁 timer=null

function throttle (f, wait) {
  let timer
  return (...args) => {
    if (timer) { return }
    timer = setTimeout(() => {
      f(...args)
      timer = null
    }, wait)
  }
}

```