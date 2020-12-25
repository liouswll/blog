## 1. 单例模式: 一个类只能构造出唯一实例
### 1.1 创建单例模式两个条件
- 确保只有一个实例
- 可全局访问

### 1.2 适用
- 适用于弹框的实现，全局缓存

### 1.3 实现单例模式
```
const singleton = function(name){
    this.name = name
    this.instance = null
}

singleton.prototype.getName = function(){
    console.log(this.name)
}

singleton.getInstance = function(name){
    if(this.instance){
        this.instance = new singleton(name)    
    }
    return this.singleton
}

// test 
const a = singleton.getInstance('a'); // 通过getInstance获取实例
const b = singleton.getInstance('b');
console.log(a === b)
```

### 1.4 JavaScript中的单例模式
- js是无类型语言，js**全局对象符**合单例模式的两个条件。可以当成单例模式。`var obj = {}`

### 弹窗层实践
- 建好弹窗，隐藏，浪费不必要的DOM开销
- 需要时创建，结合单例模式只有一个实例，从而节省DOM开销。
```
const createLoginLayer = function() {
  const div = document.createElement('div')
  div.innerHTML = '登入浮框'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

使单例模式和创建弹框代码解耦
const getSingle = function(fn) {
  const result
  return function() {
    return result || result = fn.apply(this, arguments)
  }
}


const createSingleLoginLayer = getSingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function() {
  createSingleLoginLayer()
}
```



## 2. 发布-订阅模式: 
`https://segmentfault.com/a/1190000019722065`  
**基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。**

**[！！！！！！！！！！！]发布订阅模式与观察者模式的不同，“第三者” （事件中心）出现。目标对象并不直接通知观察者，而是通过事件中心来派发通知。**
- 创建订阅者需要消耗一定的内存和时间。虽然可以弱化对象之间的联系，过度使用不利于代码的理解。
```
// 订阅
document.body.addEventListener('click', function() {
  console.log('click1');
}, false);

document.body.addEventListener('click', function() {
  console.log('click2');
}, false);

// 发布
document.body.click(); // click1  click2
```



## 3.观察者模式: 
**定义了对象间一种一对多的依赖关系，当目标对象 Subject 的状态发生改变时，所有依赖它的对象 Observer 都会得到通知。**
- observer(观察者)监听Model(js对象)的变化， 最核心的部分就是用到Object.defineProperty()中的**get**和**set**方法，获取对象是自动调用get，该动时自动调用set，实现最数据的劫持。
```
let data = {
    number: 0
}

observe(data)

data.number = 1

function observer(data) {
    if(!data || typeof(data) !== 'object'){
        return
    }
    const self = this

    Object.keys(data).forEach(key => {
        self.defineReactive(data, key, data[key])
    })

    function defineReactive(data, key, value){
        observer(value)
            Object.defineProperty(data, key, {
                get: function(){
                    return value;
                }
                set: function(newValue){
                    if(value !== newVlaue){
                        value = newValue
                    }
                }
            })
    }
}
```




