## 正则（内置对象）
`https://www.runoob.com/jsref/jsref-obj-regexp.html`
1. 正则表达式：用于对**字符串模式匹配和检索替换**，对字符串执行模式匹配强大的工具。
2. 语法：
```
var patt = new RegExp(pattern, modifiers)
或者
var patt = /pattern/modifiers
```
**pattern(模式)：描述表达式的模式。**  
**modifiers(修饰符)：用于指定全局匹配，区分大小写的匹配和多行匹配。**

>当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的：  
var re = new RegExp("\\w+");  
var re = /\w+/;

>\\w 匹配字母、数字、下划线的字符。  
*表示任意多个多个字符  
\\w*表示任意多个\\w  

3. 修饰符： 

|序号|修饰符|描述|
|--|--|--|
|1|i|执行对大小写不敏感的匹配。|
|2|g|执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。|
|3|m|执行多行匹配。|

4. 方括号：查找某个范围的内的字符。
```
表达式	描述
[abc]	查找方括号之间的任何字符。
[^abc]	查找任何不在方括号之间的字符。
[0-9]	查找任何从 0 至 9 的数字。
[a-z]	查找任何从小写 a 到小写 z 的字符。
[A-Z]	查找任何从大写 A 到大写 Z 的字符。
[A-z]	查找任何从大写 A 到小写 z 的字符。
[adgk]	查找给定集合内的任何字符。
[^adgk]	查找给定集合外的任何字符。
(red|blue|green)	查找任何指定的选项。
```

5. 元字符：拥有特殊含义的字符。

## 正则对象的方法(exec,test,toString) 
1. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|exec|检索字符串中的正则表达式的匹配|字符串中有匹配的返回改匹配值，否则返回null|RegExpObject.exec(string)|
示例:
```
var str="Hello world!";
//查找"Hello"
var patt=/Hello/g;
var result=patt.exec(str);
document.write("返回值: " +  result); 

返回值: Hello
__________________________________________
//查找 "RUNOOB"
patt=/RUNOOB/g;
result=patt.exec(str);
document.write("<br>返回值: " +  result);

返回值: null
```
2. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|test|用于检测一个字符串是否匹配某个模式|如果字符串中有匹配的值返回 true ，否则返回 false。|RegExpObject.test(string)|
示例
```
var str="Hello world!";
//查找"Hello"
var patt=/Hello/g;
var result=patt.test(str);
document.write("返回值: " +  result);  // 返回值: true

//查找 "Runoob"
patt=/Runoob/g;
result=patt.test(str);
document.write("<br>返回值: " +  result); // 返回值: false
```
3. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|toString()||返回正则表达式的字符串值。|RegExpObject.toString()|
示例
```
var patt = new RegExp("RUNOOB", "g");
var res = patt.toString(); //  /RUNOOB/g
```


## 支持正则表达式的 String 对象的方法(match,replace,search,split)

1. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|match() |可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。|	存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。 如果没找到匹配结果返回 null 。|string.match(regexp)|
示例：
```
全局查找字符串 "ain"，且不区分大小写:
var str = "The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/gi);   // ain,AIN,ain,ain

判断是否微信浏览器:
function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
}
```

2. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|replace()|在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串|一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。|string.replace(searchvalue,newvalue)|
示例：
```
全局替换：
var str="Mr Blue has a blue house and a blue car";
var n=str.replace(/blue/g,"red");   // Mr Blue has a red house and a red car

// 忽略大小写
var str="Mr Blue has a blue house and a blue car";
var n=str.replace(/blue/gi, "red");  // Mr red has a red house and a red car


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function myFunction() {
	var str=document.getElementById("demo").innerHTML;
	var n=str.replaceAll("Microsoft","Runoob");
	document.getElementById("demo").innerHTML=n;
}
Visit Microsoft!Visit Microsoft!Visit Microsoft!  
Visit Runoob!Visit Runoob!Visit Runoob!
```

3. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|search() |检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串|与指定查找的字符串或者正则表达式相匹配的 String 对象起始位置。|string.search(searchvalue)|
示例：
```
执行一次忽略大小写的检索:
var str="Mr. Blue has a blue house";
document.write(str.search(/blue/i)); //4

执行一次对大小写敏感的查找:
var str="Mr. Blue has a blue house";
document.write(str.search("blue"));  // 15
```

4. 
|方法|描述|返回值|语法|
|--|--|--|--|--|
|split() |把一个字符串分割成字符串数组。split() 方法不改变原始字符串。|与指定查找的字符串或者正则表达式相匹配的 String 对象起始位置。|string.split(separator,limit可选。该参数可指定返回的数组的最大长度。)|
示例：
```
省略分割参数：
var str="How are you doing today?";
var n=str.split();
n 输出数组值得结果:
How are you doing today?

分割每个字符，包括空格:
var str="How are you doing today?";
var n=str.split("");
n 输出数组值得结果:
H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?

使用 limit 参数:
var str="How are you doing today?";
var n=str.split(" ",3);
n 将输出3个数组的值:
How,are,you

使用一个字符作为分隔符:
var str="How are you doing today?";
var n=str.split("o");
n 输出数组值得结果:
H,w are y,u d,ing t,day?
```