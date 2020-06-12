#### 一：输出  
1.window.alert() 弹出框  
2.document.write() 写入 注意：HTML文档加载完成后将删除所有  
3.console.log() 控制台打印  
4.innerHTML 写入HTML元素  

#### 二：语句  
1.代码块：程序有一条条的语句构成，按照自上而下顺序执行，js中可以使用{}来为语句进行分组。  
```
    {
      var name = ""  
      console.log(name)  
    }  
```  
2.流程控制语句：根据不同的条件执行不同的代码，或者重复执行某一段代码。  

1)——if语句：  
```
if(条件表达式)
{
    语句块1
}else{
    语句块2
}
```  
2)——switch语句：  
```
switch(条件表达式){
  case 表达式:
      语句1;
      break;
  case 表达式:
      语句2; 
      break;
  default:
      语句n+1;
      break;
}
```  
3)——for循环
```
for(①初始化表达式；②循环条件表达式；④循环后操作表达式)
{
    ③执行语句;
}
```  
4)——while循环
```
while ( 条件表达式 ) {
     语句1;
     语句2;
     ....
 }
var num = 0;
  while (num < 10){
      num++;
      if(num % 2 == 0){
          break;
      }
      console.log(num); // 1
  }

var num = 0;
  while (num < 10){
      num++;
      if(num % 2 == 0){
          continue;
      }
      console.log(num); // 1, 3, 5, 7, 9
  }
```  
5)—— do-while循环  
```
 do {
     语句1;
     语句2;
     ....
 } while ( 条件 );  

 
 不管while中的条件是否成立，循环体中的语句至少会被执行一遍
```
