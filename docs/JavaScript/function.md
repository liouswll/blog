### 函数定义： 被设计为执行特定任务的代码块  
+ 函数也是一个对象
+ 函数就是可以重复执行的代码块
+ 函数就是完成特定功能的一段代码
+ 使用typeof检查一个函数对象时，会返回function


### 函数作用
+ 将复杂的事情简单化，将重复使用的代码进行统一封装


### 基本使用
+ 函数定义  （常用方式）
```
function 函数名([形参1,形参2, ...,形参N]){
    函数体
}
```
+ 函数定义 （不常用方式）
```
var fun = new Function("console.log('大家好, 我是函数!');");
```
+ 函数调用方式： 函数名()


### 常见的声明方式
+ 函数声明
```
function add(num1,num2){
    return num1+num2;
}
```
+ 函数表达式
```
 var add= function(num1,num2){
    return num1+num2;
};　
```
+ 使用Function构造函数
```
var add = new Function('num1','num2','return num1+num2');  

不推荐使用,  主要用于面向对象时理解"函数就是对象,  函数名就是指针"这一概念
```
+ 区别
```
JavaScript解析器首先会把当前作用域的函数声明提前到整个作用域的最前面。

//  代码没问题  
console.log(f(5,6));
function f(a, b) {
     return a + b;
}

// 报错
myFun(6,7);
var myFun = function (a,b){
   return a + b;
}
```

### 函数的参数
+ 形参：形式上参与运算的变量，无实际值，为实参占位置，就像一个躯壳一样。  
` function f(a,b){}  //a,b是形参，占位用，函数定义时形参无值 `  
+ 实参：实际参与运算的变量。形参为他占位置，真实参与运算的变量。  
`f(x, y); //x, y实参，有具体的值，会把x,  y复制一份给函数内部的a和b，函数内部的值是复制的新值，无法修改外部的x,y`
+ 注意点  
1.在调用函数时，可以在()中指定实参,  实参将会赋值给函数中对应的形参  
2.调用函数时解析器不会检查实参的类型,   所以开发中一般需要对参数进行类型的检查  
3.函数的实参可以是任意的数据类型  
4.调用函数时，解析器不会检查实参的数量, 多余实参不会被赋值,  如果实参的数量少于形参的数量，则没有对应实参的形参将是undefined

### arguments对象
1.包含了传入函数中的所有参数,  arguments并不是一个数组，只是与数组相似,  除了拥有length属性，数组的所有属性和方法都不具备。  
2.arguments对象还有一个名叫callee的属性,  该属性是一个指针,  指向拥有这个arguments对象的函数;  

### length属性/return
+ length函数形参的个数
+ return结束函数执行/返回结果/
+ 函数未使用return，返回其默认值undefined

### 匿名函数
+ 没有命名的函数 `function () {}`
```
用在绑定事件的时候
document.onclick = function () {
    alert(1);
}

定时器
setInterval(function () {
        console.log(444);
},1000);


立即执行函数（IIFE）:函数定义完，立即被调用，叫做立即执行函数 /立即执行函数往往只会执行一次
(function(){alert("hello")})();

(function(num1,  num2){
	console.log("mum1 = "+ num1);
	console.log("num2 = "+ num2);
})(100, 101);

```

### 回调函数（一个通过函数调用的函数）
+ 如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。
```
一般用于递归
求菲波那契数列（Fibonacci）的第n个数 1 1 2 3 5 8 13 21...
function f1 (n) {
    if (n == 1) return 1;
    if (n == 2) return 1;
        return f1(n-1) + f1(n-2);
}
console.log(f1(7)); //13


求n个数的累加
function getSum (n) {
    if (n == 1) { return 1;}
        return n + getSum(n - 1);
}
console.log(getSum(100)); // 5050
```

### 变量作用域
 - 全局作用域：定义在script或者不属于某个函数的变量
 - 函数作用域：定义在函数内部的变量
 > 函数内部可以访问到该函数所属的外部作用域的变量(作用域链)  
 > 不使用var声明的变量是全局变量，不推荐使用(XXXX)  
 > 变量退出作用域之后会销毁，全局变量关闭网页或浏览器才会销毁

 