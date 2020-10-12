#### 原始类型  
|number|string|boolean|underfined|null| BigInt | Symbol |
| ---- | ---- | ---- | ----| ---- | --- | --- |
1. BigInt:数据类型的目的是比Number数据类型支持的范围更大的整数值。  
```
const max = Number.MAX_SAFE_INTEGER; // 9007199254740991
max + 1 // 9007199254740992
max + 2 // 9007199254740992

max + 1 == max +2  -> ×(错)
```
2. Symbol:返回的Symbol值都是唯一的。不重复不可变的值。

#### 引用类型
1. 对象（Object）。其中对象类型包括：数组（Arra），函数（function），还有两个特殊的对象：正则（RegExp），日期（date）
2. object — typeof(arr)  //object	Undefined 与 null 的值相等，但类型不相等：


#### 类型转换
1).toString()	原始类型Number,Boolean,String都可以转化为字符串，可以改变进制: 二进制toString(2)  

2).parseInt()	对String类型有效(转为整数)，首位必须是有效数字。基模式可以转换进制: 十六机制parseInt("AF", 16) //175

3).parseFloat()	对String类型有效(转为小数)，首位必须是有效数字。无基模式。

#### 强制类型转换
+ Boolean(value) - 把给定的值转换成 Boolean 型；  
+ Number(value) - 把给定的值转换成数字（可以是整数或浮点数）；  
+ String(value) - 把给定的值转换成字符串  

#### 隐式转换
+ 不同类型的变量比较要先转类型，叫做类型转换，类型转换也叫隐式转换。隐式转换通常发生在运算符加减乘除，等于，还有小于，大于等

