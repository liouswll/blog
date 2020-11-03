## constructor和super
1. constructor 构造方法，这是ES6对类的默认方法，通过new命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，如果没有显式定义，则会默认添加空的constructor()方法。
2. super 继承，在class方法中，继承是使用 extends 关键字来实现的。子类必须在 constructor()中调用 super()方法，否则新建实例时会报错。
>报错的原因是：子类是没有自己的this对象的，它只能继承自父类的this对象，然后对其进行加工，而super()就是将父类中的this对象继承给子类的。没有super，子类就得不到this对象。

>简单解释，就是在ES5的继承中，先创建子类的实例对象this，然后再将父类的方法添加到this上（ Parent.apply(this) ）。而ES6采用的是先创建父类的实例this（故要先调用super()方法），完后再用子类的构造函数修改this。
```
class A {
  constructor() {
    console.log(new.target.name); // new.target 指向当前正在执行的函数
  }
}
 
class B extends A {
  constructor() {
    super();
  }
}
 
new A(); // A
new B(); // B

-----------------------------------------------------
class Person {
    constructor(name, age){
        this.name  = name;
        this.age = age;
    }
    showName(){
        console.log(this.name)
    }
    showAge(){
        console.log(this.age)
    }
    static add(x, y){
        return x + y
    }
}

class Student extends Person {
    constructor(name, age, career){
        super(name, age)
        this.career = career
    }
    showCareer(){
        console.log(this.career)
    }
}

let ts = new Student('z', 12, 'x')
ts.showAge()
ts.showName()
ts.showCareer()
```

## Object.assign
1.  方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。`Object.assign(target, ...sources)`
```
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);
// target目标对象。 sources源对象。

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

## asycn-await 建立于Promise之上,换句话来说使用了Generator函数做了语法糖
1. async顾名思义是“异步”的意思，async用于声明一个函数是异步的。而await从字面意思上是“等待”的意思，就是用于等待异步完成。并且await只能在async函数中使用。
```
function a (){
    setTimeout(() => {
        alert("我是后弹出");
    },1000)
}
function b (){
    alsert("我是先弹出");
}
function * grenDome (){
    yield a();
    yield b();
}
let gren = grenDome();
gren.next();
gren.next();
// 我是先弹出
// 我是后弹出
---------------------------------------------------
function a (){
    setTimeout(() => {
        alert("我是后弹出");
    },1000)
}
function b (){
    alsert("我是先弹出");
}
async function grenDome (){
    await a();
    await b();
}
let gren = grenDome();
// 我是先弹出
// 我是后弹出
```

