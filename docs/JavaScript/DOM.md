## DOM中的Event事件
#### 事件
- onblur		元素失去焦点。
- onchange	域的内容被改变。
- onclick		当用户点击某个对象时调用的事件句柄。
- ondblclick	当用户双击某个对象时调用的事件句柄。
- onfocus	元素获得焦点。
- onkeydown	某个键盘按键被按下。
- onkeypress	某个键盘按键被按下并松开。
- onkeyup	某个键盘按键被松开。
- onload		一张页面或一幅图像完成加载。
- onmousedown	鼠标按钮被按下。
- onmousemove	鼠标被移动。
- onmouseout	鼠标从某元素移开。
- onmouseover	鼠标移到某元素之上。
- onmouseup	鼠标按键被松开。
- onselect	文本被选中。
- onsubmit	确认按钮被点击。
- onunload	用户退出页面。
#### 鼠标键盘属性
- button		返回当事件被触发时，哪个鼠标按钮被点击。
- clientX		返回当事件被触发时，鼠标指针的水平坐标。
- clientY		返回当事件被触发时，鼠标指针的垂直坐标。
- screenX	    返回当某个事件被触发时，鼠标指针的水平坐标。
- screenY	    返回当某个事件被触发时，鼠标指针的垂直坐标。
#### IE属性
- cancelBubble	如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。
- offsetX,offsetY	发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。
#### 标准Event属性
- bubbles	返回布尔值，指示事件是否是冒泡事件类型。
- cancelable	返回布尔值，指示事件是否可拥可取消的默认动作。
- currentTarget	返回其事件监听器触发该事件的元素。
- eventPhase	返回事件传播的当前阶段。
- target		返回触发此事件的元素（事件的目标节点）。
- timeStamp	返回事件生成的日期和时间。
- type		返回当前 Event 对象表示的事件的名称。
#### 标准Event方法
- initEvent()		初始化新创建的 Event 对象的属性。
- preventDefault()	通知浏览器不要执行与事件关联的默认动作。
- stopPropagation()	不再派发事件。




## DOM中Document对象
#### 对象属性
- cookie		设置或返回与当前文档有关的所有 cookie。
- lastModified	返回文档被最后修改的日期和时间。
- referrer		返回载入当前文档的文档的 URL。
- URL		返回当前文档的 URL。
#### 对象方法
- getElementById()		返回对拥有指定 id 的第一个对象的引用。
- getElementsByName()		返回带有指定名称的对象集合。【数组】
- getElementsByTagName()	返回带有指定标签名的对象集合。【数组】




## DOM中Element对象
```
element.appendChild()	向元素添加新的子节点，作为最后一个子节点。  
element.attributes	返回元素属性的 NamedNodeMap。  
element.childNodes	返回元素子节点的 NodeList。  
element.className	设置或返回元素的 class 属性。  
element.firstChild	返回元素的首个子节点。  
element.getAttribute()	返回元素节点的指定属性值。  
element.getAttributeNode()	返回指定的属性节点。  
element.getElementsByTagName()	返回拥有指定标签名的所有子元素的集合。  
element.hasAttribute()	如果元素拥有指定属性，则返回true，否则返回 false。  
element.hasAttributes()	如果元素拥有属性，则返回 true，否则返回 false。  
element.hasChildNodes()	如果元素拥有子节点，则返回 true，否则 false。  
element.insertBefore()	在指定的已有的子节点之前插入新节点。  
element.lastChild	返回元素的最后一个子元素。  
element.parentNode	返回元素的父节点。  
element.previousSibling	返回位于相同节点树层级的前一个元素。  
element.removeAttribute()	从元素中移除指定属性。  
element.removeAttributeNode()	移除指定的属性节点，并返回被移除的节点。  
element.removeChild()	从元素中移除子节点。  
element.replaceChild()	替换元素中的子节点。  
element.setAttribute()	把指定属性设置或更改为指定值。  
element.setAttributeNode()	设置或更改指定属性节点。  
element.tabIndex	设置或返回元素的 tab 键控制次序。  
element.tagName	返回元素的标签名。  
element.textContent	设置或返回节点及其后代的文本内容。  
element.title	设置或返回元素的 title 属性。  
```




## DOM中Attribute 对象

## DOM-操作
#### 1. window和document
- window： 所有的浏览器都支持window对象，它支持浏览器窗口。所有的js全局对象，函数以及变量都能自动成为window对象的成员。全局变量是window对象的属性，全局函数是window对象的方法。

- document：document也是window对象的属性之一。document对象是documentHTML的一个实例，也是window对象的一个属性，因此可以将document对象作为一个全局对象来访问。
```
console.log(document);
console.log(document.childNodes);
console.log(document.head);
console.log(document.body);
document.title = "测试";
console.log(document.title);
```

#### 2. 事件
定义：用户和浏览器之间的交互行为,	比如：点击按钮，鼠标进入/离开、双击...，我们可以在事件对应的属性中实现一些js代码，这样当事件被触发时，这些代码将会执行。
```
比如: 按钮点击
方式一 结构和行为耦合，不方便维护，不推荐使用	
<button id="btn" onmousemove="alert('你干嘛摸我?');">按钮1</button>

方式二  为按钮的对应事件绑定处理函数的形式来响应事件
var btn = document.getElementById('btn');
btn.onclick = function (ev) {
    alert('你再点一下试试?');
}
```

#### 3. 文档加载过程
存在问题：浏览器在加载一个页面时，是按照自上向下的顺序加载的。读取到一行就运行一行, **如果将script标签写到head内部**，在代码执行时，页面还没有加载，页面中的DOM对象也没有加载。会导致在js中无法获取到页面中的DOM对象

解决方法：
- onload事件：onload事件会在整个页面加载完成之后才触发，为window绑定一个onload事件, 该事件对应的响应函数将会在页面加载完成之后执行，这样可以确保我们的代码执行时所有的DOM对象已经加载完毕了。
- 把script标签放在body尾部。


#### 4. 获取DOM对象
```
var btn1 = document.getElementById("btn");
var btn2 = document.getElementsByClassName("my-btn")[0];
var btn3 = document.getElementsByTagName("button")[0];
var btn4 = document.getElementsByName("btn")[0];
var btn5 = document.querySelector(".my-btn");
var btn6 = document.querySelectorAll(".my-btn")[0];
```
#### 5. 节点之间关系
- parentNode：获取父节点
```
通过子盒子设置父盒子的背景色
var btn = document.getElementsByClassName("btn")[0];
btn.onclick = function () {
    var span = document.getElementById("span");
    var box = span.parentNode;
    box.style.backgroundColor = "red";
};
```
- previousElementSibling || previousSibling ：上一个兄弟节点 
```
 var previous = span.previousElementSibling || span.previousSibling;
```
- nextElementSibling || nextSibling ：下一个兄弟节点
```
 var next = span.nextElementSibling || span.nextSibling;
```
- firstChild || firstElementChild ：获取标签中第一个子节点
```
box.firstElementChild || box.firstChild
```
#### 6. 节点操作
- CRUD(增删改查)
```
创建节点
	document.createElement("img");
    box.appendChild(img);
	box.insertBefore(img, btn);
删除节点
	var btn = document.getElementById("btn");
    word.parentNode.removeChild(word); // 自杀
    // btn.remove();
克隆节点
	新节点=要复制的节点.cloneNode(参数) ; 
	var box = document.getElementsByClassName("box")[0];
    var newTag = box.cloneNode(true);
    // console.log(newTag);
    document.body.appendChild(newTag);
```
- 节点属性（节点.属性）
```
获取：getAttribute(名称)
设置：setAttribute(名称, 值)
删除：removeAttribute(名称)
```

