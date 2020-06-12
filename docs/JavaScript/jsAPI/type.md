#### 原始类型  
|number|string|boolean|underfined|null|
| ---- | ---- | ---- | ----| ---- |

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

#### 引用类型
+ function  
+ object — typeof(arr) //object	Undefined 与 null 的值相等，但类型不相等：