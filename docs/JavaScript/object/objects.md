## 对象属性类型
#### 数据类型
- Configurable：表示能否通过delete删除属性从而重新定义，**能否修改属性特性**。默认为true
- Enumerable：表示是否能够通过for-in循环返回属性。默认为true。
- Writeable：表示能否修改属性的值。默认为true。
- Value：属性的数据值，读取时从这取。写入时，把新值保存到这个位置。默认为undefined
```
使用Object.defineProperty()方法修改，接受三个参数。
Object.defineProperty(属性所在的对象, 属性的名字, 一个描述符对象)

var person ={}
Object.defineProperty(person, "name", {
	writeable: false,
	value: 'zx'
})
console.log(person.name) // zx
person.name = "cy"
console.log(person.name) // zx

writeable设置为false,修改值，非严格模式下赋值操作会被忽略。严格模式下报错。
configurable设置为不可更改后,调用delete非严格模式下什么模式也不会发生。严格模式下报错。一旦设置为不可修改属性特性，就不能变回可配置。此时再修改writeable之外的特性，都会导致报错。
```

#### 访问器属性
- Configurable：表示能否通过delete删除属性从而重新定义，能否修改器特性。默认为true
- Enumerable：表示是否能够通过for-in循环返回属性。默认为true。
- Get：读取数值时调用的函数，默认undefined
- Set：写入属性时调用的函数，默认undefined
```
var book = {
	_year: 2004,
	edition: 1
};
Object.defineProperty(book, "year", {
	get: function(){
		return this._year
	},
	set: function(newValue){
		if(newValue > 2004)
	}
})
```

## 基本要求
- 定义一个构造函数，创建自定义对象。

## 面向对象和基于对象
- 面向对象：可以创建自定义的类型、很好的支持继承和多态。面向对象的语言c++/java/c#...
>特征：封装、继承、多态  
>万物皆对象：世间的一切事物都可以用对象来描述

- 基于对象：无法创建自定义的类型、不能很好的支持继承和多态。
> 基于对象的语言,  比如:JavaScript

## 辨别JS中的对象
- 除了5种基本的数据类型，其它的全都是对象。Object就是一个对象

## 使用对象
- 对象属于一种复合的数据类型，在对象中可以保存多个不同数据类型的属性。
```
比如想要描述一个人? 如果使用基本数据类型的数据，我们所创建的变量都是独立，不能成为一个整体。
var name = "";
var intro = "";
var age = 108;
```

## JS中对象的分类
#### 内建对象：由ES标准中定义的对象，在任何的ES的实现中都可以使用。  
- 比如：String Number Boolean Function Object Math ....
#### 宿主对象：由JS的运行环境提供的对象，现在主要指由浏览器提供的对象  
- 比如: BOM对象, DOM对象
#### 自定义对象
- 比如: Person, Dog, ....

## 如何创建对象
#### 构造函数
- 构造函数是专门用来创建对象的函数。使用new关键字调用的函数，可以被称为构造函数(constructor)  
`var obj = new Object();`
#### 定义：
- 在对象中保存的值称为属性
- 向对象添加属性: 对象.属性名 = 属性值;
- 读取对象中的属性: 对象.属性名 
>如果读取对象中没有的属性，不会报错而是会返回undefined
- 修改对象的属性值: 对象.属性名 = 新值
- 删除对象的属性: delete 对象.属性名
```
var obj = new Object();
//向obj中添加一个name属性
obj.name = "谢霆锋";
//向obj中添加一个gender属性
obj.gender = "男";
//向obj中添加一个age属性
obj.age = 38;
```

## 属性名和属性值
**如果要使用特殊的属性名，不能采用.的方式来操作, 需要使用另一种方式, 语法: 对象["属性名"] = 属性值, 读取也要用该方式**
```
obj["666"] = 888;
console.log(obj["666"]);

var str = '666';
obj[str] = 888;
console.log(obj[str]);
```
- JS对象的属性值，可以是任意的数据类型, 也可以是一个对象
#### in 运算符
- 通过该运算符可以检查一个对象中是否含有指定的属性, 如果有则返回true，没有则返回false
>"属性名" in 对象


## 基本类型和引用类型在堆栈中的表示
#### 基本数据类型
- String Number Boolean Null Undefined
#### 引用数据类型
- Object
#### 区别
- JS中的变量都是保存到栈内存中的，基本数据类型的值直接在栈内存中存储，值与值之间是独立存在，修改一个变量不会影响其他的变量
- 对象是保存到堆内存中的，每创建一个新的对象，就会在堆内存中开辟出一个新的空间，而变量保存的是对象的内存地址（对象的引用），如果两个变量保存的是同一个对象引用，当一个通过一个变量修改属性时，另一个也会受到影响
>比较两个基本数据类型的值时，就是比较值。  
>比较两个引用数据类型时，它是比较的对象的内存地址，如果两个对象是一摸一样的，但是地址不同，它也会返回false

## 对象字面量
```
var 对象 = {属性名:属性值,属性名:属性值....};
对象字面量的属性名可以加引号也可以不加，建议不加, 如果要使用一些特殊的名字，则必须加引号
使用对象字面量，可以在创建对象时，直接指定对象中的属性
属性名和属性值是一组一组的名值对结构，和值之间使用:连接，多个名值对之间使用,隔开
var obj = {	
	name:"刘德华",
	age:50,
	gender:"男",
	friend:{name:"洗头发"}
	};	
console.log(obj.friend);
```