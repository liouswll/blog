## 原型链
- **\_proto_** 是每个对象都有的属性；**prototype**是构造函数的属性；指向同一个对象
```
function F(){}
var f = new F();
f._proto_ === F.prototype; // true
```
![prototypeL](../../.vuepress/public/prototypeL.png)

1. 首先在对象自身上查找是否有该属性，如果有，返回结果
2. 如果没有，就去对象的原型上进行查找， 如果有，返回结果
3. 如果没有，就沿着原型链继续往上查找，直到Object.prototype原型上即可,如果有，返回结果。
4. 如果Object.prototype原型上也没有，返回undefined

>>
- 所有函数都有一个prototype指针，指向原型对象，如图中的Foo的prototype指针。prototype指针的意义是，当我们使用这个构造函数new出新对象的时候，新对象的原型是谁。
- 构造函数的prototype所指向的原型对象有一个constructor指针，指回构造函数。如图中Foo.prototype的- - constructor指针指向Foo。constructor指针有助于我们找到一个对象的构造函数是谁。
- __proto__每个对象都有，js在new一个对象的时候，会将它的__proto__指向构造函数的prototype指向的那个对象。在上图中，f1、f2这些实例对象的__proto__都指向了Foo.prototype。
- 如果一个对象的__proto__指向了另一个对象，那么前者就继承了后者的所有属性。

![protoL](../../.vuepress/public/protoL.png)

