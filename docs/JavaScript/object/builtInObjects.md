### 内置对象（js本身已经写好的对象，创建出来以后可以直接使用,  不需要定义）

## Array对象
#### 创建Array对象
new Array();  
new Array(size);  
new Array(element0, element1, ..., elementn);
#### 属性  
constructor	返回对创建此对象的数组函数的引用。  
length		设置或返回数组中元素的数目。  
prototype	使您有能力向对象添加属性和方法。

#### 方法  
- reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。注意: reduce() 对于空数组是不会执行回调函数的。
```
var numbers = [65, 44, 12, 4];
function getSum(total, num) {
    return total + num;
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum);
}
// 125
```

- conact() 连接两个或更多的数组，并返回组合后的数组。`[1,2].concat([3,4])  //[1, 2, 3, 4]`  

- slice() 从已有的数组中选定元素,返回组成的数组。 
```
arr.slice(start,end)      -1为倒数第一位
[1,2,3,4].silce(2) //     [3,4]  
[1,2,3,4].silce(2,3) //   [3]  (正数不包含首位)
[1,2,3,4].silce(-1) //    [4] 
[1,2,3,4].silce(-4,3) //  [1,2,3]
```

- join() 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。返回字符串  
`[1,2,3,4].join(",")  //"1,2,3,4" `

- valueOf() 返回数组对象的原始。 `[1,2,3,4].valueOf()    //[1, 2, 3, 4]`

- toString() 把数组转换为字符串，并返回结果。 `[1,2,3,4].toString()  //"1,2,3,4" `

>以上方法不改变原数组  
————————  
>以下方法改变原数组

- pop() 删除并返回数组的**最后一个**元素。 ` [1,2,3,4].pop()  //4 `

- push() 向数组的**末尾**添加一个或更多元素，并返回新的长度。 `[1,2,3,4].push(5) //5`

- reverse()	颠倒数组中元素的顺序(数组)。`[1,2,3,4].reverse()  //[4, 3, 2, 1]`

- shift() 删除并返回数组的**第一个**元素。` [1,2,3,4].shift()  //1 `

- unshift()	向数组的**开头**添加一个或更多元素，并返回新的长度。 `[1,2,3,4].unshift(5) //5`

- sort() 对数组的元素进行排序。
```
[3,2,1,4].sort() // [1,2,3,4]
arr.sort(sortby)  参数可选，规定排序顺序，！！！！必须是函数。
如果无参数，按照字符编码的顺序进行排序。（默认为升序排列）

参数函数（数字排序）
1）升序
var compare = function (x, y) { //比较函数
　　if (x < y) {
　　　　return -1;
　　} else if (x > y) {
　　　　return 1;
　　} else {
　　　　return 0;
　　}
}

2）升序——比较数字而非字符串，比较函数可以简单的以 a 减 b
arr.sort(function(a,b){
　　　retun a-b;
});

 ```

- arrayObject.splice(index,howmany,item1,.....,itemX) 删除元素，并向数组添加新元素。  
>index	    必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。  
>howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。  
>item1, ..., itemX	可选。向数组添加的新项目。  
```
var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(2,3,"William")
document.write(arr)
```

- toSource() 返回该对象的源代码。
- toLocaleString() 数组转换为本地字符串，返回字符串。

#### 数组高级方法
- map() "映射"对数组中的**每一项运行给定函数**，返回**每次函数调用的结果组成的数组**。
```
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.map(function(item){
    return item*item;
});
console.log(arr2); //[1, 4, 9, 16, 25]
```

- filter() "过滤"功能，数组中的**每一项运行给定函数**，返回**满足过滤条件组成的数组**。
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arr2 = arr.filter(function(x, index) {
    return index % 3 === 0 || x >= 8;
}); 
console.log(arr2); //[1, 4, 7, 8, 9, 10]
```

- erery() 判断数组中**每一项都**是否满足条件，**只有所有项都满足条件，才会返回true**。
```
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.every(function(x) {
    return x < 10;
}); 
console.log(arr2); //true

var arr3 = arr.every(function(x) {
    return x < 3;
}); 
console.log(arr3); // false
```

- some() 判断数组中是否存在满足条件的项，只要**有一项满足条件，就会返回true**。
```
var arr = [1, 2, 3, 4, 5];
var arr2 = arr.some(function(x) {
    return x < 3;
}); 
console.log(arr2); //true

var arr3 = arr.some(function(x) {
    return x < 1;
}); 
console.log(arr3); // false
```

- forEach() 对数组进行遍历循环，对**数组中的每一项运行给定函数**。
```
var array = ['a', 'b', 'c'];
array.forEach(function(element) {
  console.log(element);
});


var arr = [1,2,3,4];
arr.forEach(alert); 
//    等价于：
var arr = [1, 2, 3, 4];
for (var k = 0, k < arr.length;; k++) {
    alert(array[k]);
} 
```

## Boolean对象
#### 创建Boolean对象
new Boolean(value);	//构造函数  
Boolean(value);		//转换函数

#### 方法
toSource()	返回该对象的源代码。  
toString()	把逻辑值转换为字符串，并返回结果。  
valueOf()	返回 Boolean 对象的原始值。

## Data对象
#### 创建Date对象  
 var myDate=new Date()
#### 属性  
constructor	返回对创建此对象的 Date 函数的引用。  
prototype	使您有能力向对象添加属性和方法。

#### 方法  
getDate()   从 Date 对象返回一个月中的某一天 (1 ~ 31)。  
getDay()    从 Date 对象返回一周中的某一天 (0 ~ 6)。  
getMonth()  从 Date 对象返回月份 (0 ~ 11)。  
getFullYear()   从 Date 对象以四位数字返回年份。  
getHours()  返回 Date 对象的小时 (0 ~ 23)。  
getMinutes()    返回 Date 对象的分钟 (0 ~ 59)。  
getTime()   返回 1970 年 1 月 1 日至今的毫秒数。  
valueOf()   返回 Date 对象的原始值。

## Math对象（无构造函数）
#### 方法  
abs(x)		返回数的绝对值。  
**floor(x)	对数进行下舍入。**  
**ceil(x)		对数进行上舍入。**   
**round(x)	把数四舍五入为最接近的整数。**   
max(x,y)	返回 x 和 y 中的最高值。  
min(x,y)	返回 x 和 y 中的最低值。  
random()	返回 0 ~ 1 之间的随机数。  
toSource()	返回该对象的源代码。  
valueOf()	返回 Math 对象的原始值。

## Number对象
#### 属性
- constructor	返回对创建此对象的 Number 函数的引用。  
- MAX_VALUE	    可表示的最大的数。  
- MIN_VALUE	    可表示的最小的数。  
- NaN		    非数字值。  
- NEGATIVE_INFINITY		负无穷大，溢出时返回该值。（infinty）  
- POSITIVE_INFINITY		正无穷大，溢出时返回该值。

#### 方法  
toString() 把数字转换为字符串，使用指定的基数。  `var a = 15  a.toString(2)  // "1111" `  
toFixed() 把数字转换为字符串，结果的**小数点后有指定位数的数字**。
```
var a = 15    a.toFixed(10)    //"15.0000000000"
``` 

## String对象
#### 创建String对象
new String(s);  
String(s); 

#### 属性
constructor	对创建该对象的函数的引用  
length		字符串的长度  
prototype	允许您向对象添加属性和方法  

#### 方法
- charAt()	    返回在指定位置的字符。  `"qweqweq".charAt(1)  // w`  
- charCodeAt()	返回在指定的位置的字符的 Unicode 编码。  
- concat()	    连接字符串。 

- indexOf()	    检索字符串。 
```
'asdada'.indexOf('v') // -1
'asdada'.indexOf('d') // 2
```
>stringObject.indexOf(searchvalue,fromindex)  
>searchvalue	必需。规定需检索的字符串值。  
>fromindex	可选的整数参数。规定在字符串中开始检索的位置  
>注释：indexOf() 方法对大小写敏感！  
>注释：j检索到则返回字符串**位置**，如果要检索的字符串值没有出现，则该方法**返回 -1**。

- lastIndexOf()	从后向前搜索字符串。
```
'asdada'.lastIndexOf('d') // 4
'asdada'.lastIndexOf('w') // -1
```

- match()	找到一个或多个正则表达式的匹配。**(存放匹配结果的数组)**
>stringObject.match(searchvalue) searchvalue规定要检索的字符串值。  
>stringObject.match(regexp) 返回值存放匹配结果的数组。该数组的内容依赖于regexp是否具有全局标志g。
```
var str="Hello world!"
str.match("world") // world
str.match("World") // null
str.match("worlld") //null
str.match("world!") //world!

var str="1 plus 2 equal 3"
str.match(/\d+/g) // 1,2,3
```

- replace(regexp/substr,replacement) 替换与正则表达式匹配的子串。**返回一个新的字符串**
```
var str="Visit Microsoft!"
document.write(str.replace(/Microsoft/, "W3School"))
// Visit W3School!

全局替换
var str="Welcome to Microsoft! "
str=str + "We are proud to announce that Microsoft has "
str=str + "one of the largest Web Developers sites in the world."
// document.write(str.replace(/Microsoft/g, "W3School"))
```

- stringObject.search(regexp) 检索与正则表达式相匹配的值。**返回值：stringObj中找到的第一个与reregexp相匹配子串起始的位置，如果没有找到则返回-1**
```
var str="Visit W3School!"
document.write(str.search(/W3School/))
// 6
```

- slice(tart,end) 提取字符串的片断，并在新的字符串中**返回被提取的部分**。`stringObject.slice(start,end) start 开始（包括 start）到 end 结束（不包括 end）`

- split(separator,howmany) 把字符串分割为字符串数组，**返回字符串数组**。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
>separator 分割依据 // var words = sentence.split(/\s+/)
>howmany 长度

- substr(start,length) 从起始索引号提取字符串中指定数目的字符。**一个新的字符串，包含从 stringObject 的 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符**
>str.substr(3,7)

- substring(start,stop) 提取字符串中两个指定的索引号之间的字符。
```
stringObject.substr(start不可为负数,length为起始时的长度)

var str="Hello world!"
document.write(str.substring(3,7))
```