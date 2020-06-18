## BOM
#### Window 对象表示浏览器中打开的窗口。  
1. 对象属性  
- location	用于窗口或框架的 Location 对象。请参阅 Location 对象。  
- screenLeft	screenTop	screenX	screenY只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。
- IE、Safari 和 Opera 支持 screenLeft 和 screenTop，而 Firefox 和 Safari 支持 screenX screenY。  
2. 对象方法
- clearInterval()	取消由 setInterval() 设置的 timeout。
- clearTimeout()	取消由 setTimeout() 方法设置的 timeout。
- prompt() 方法用于显示可提示用户进行输入的对话框。
- prompt(text,defaultText)
- setInterval()	按照指定的周期（以毫秒计）来调用函数或计算表达式。
- setTimeout()	在指定的毫秒数后调用函数或计算表达式。
#### Navigator 对象包含有关浏览器的信息。
1. 对象属性
- userAgent	返回由客户机发送服务器的 user-agent 头部的值。
- appCodeName	返回浏览器的代码名。
- appMinorVersion	返回浏览器的次级版本。
- appName	返回浏览器的名称。
- platform	返回运行浏览器的操作系统平台。
- Screen 对象包含有关客户端显示屏幕的信息。
2. 对象属性
- updateInterval	设置或返回屏幕的刷新率。
- History对象包含用户（在浏览器窗口中）访问过的 URL
- History 对象包含用户（在浏览器窗口中）访问过的 URL。
- History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。
#### Location对象包含当前URL信息
1. 属性
- host	设置或返回主机名和当前 URL 的端口号。
- hostname	设置或返回当前 URL 的主机名。
- href	设置或返回完整的 URL。
- pathname	设置或返回当前 URL 的路径部分。
- port	设置或返回当前 URL 的端口号。
- protocol	设置或返回当前 URL 的协议。
2. 方法
- assign()	加载新的文档。
- reload()	重新加载当前文档。
- replace()	用新的文档替换当前文档。