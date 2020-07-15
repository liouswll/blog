## Nginx配置
#### Nginx是一个高性能的HTTP和反向代理服务器。是一种轻量级的Web服务器，可以作为独立的服务器部署网站（类似Tomcat）。有高性能和低消耗内存的结构。

1. 先去官网下载Nginx包。（注意分清Linux和Windows版本）
2. 下载完成后，解压缩，解压后的文件夹直接放入C盘（C:\nginx），运行cmd进到nginx目录下，使用命令进行启动，**不要直接双击nginx.exe，不要直接双击nginx.exe，不要直接双击nginx.exe**。
3. 启动命令 `start nginx`。
4. 查看任务进程是否存在，dos或打开任务管理器都行 `tasklist /fi "imagename eq nginx.exe"` 

![nginx](../.vuepress/public/nginx.png)

5. nginx下面logs文件下的error.log为日志文件。
>(1) 端口号被占用  
(2) nginx文件夹路径含中文

6. 修改配置文件，进入解压缩目录，在conf目录下找到nginx.conf使用txt文本打开即可，找到server这个节点，修改端口号等操作。
>listen 监听端口
location下的root为默认主页html

7. 修改完成后保存，使用以下命令检查一下配置文件是否正确，后面是nginx.conf文件的路径，successful就说明正确了  **检查配置文件是否正确命令**`nginx -t -c /nginx-1.15.2/conf/nginx.conf`

8. 如果程序没启动就直接start nginx启动，如果已经启动了就使用以下命令重新加载配置文件并重启  **重启命令**`nginx -s reload`

9. 打开浏览器访问刚才的域名及端口，例如http://localhost:8800，出现欢迎页就说明部署成功了。

10. 关闭nginx `nginx -s stop`

11. 完整有序的关闭 `nginx -s quit` 


#### 优化配置
```
#user  nobody;

#==工作进程数，一般设置为cpu核心数
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {

    #==最大连接数，一般设置为cpu*2048
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    
    #==客户端链接超时时间
    keepalive_timeout  65;

    #gzip  on;

    #当配置多个server节点时，默认server names的缓存区大小就不够了，需要手动设置大一点
    server_names_hash_bucket_size 512;

    #server表示虚拟主机可以理解为一个站点，可以配置多个server节点搭建多个站点
    #每一个请求进来确定使用哪个server由server_name确定
    server {
        #站点监听端口
        listen       8800;
        #站点访问域名
        server_name  localhost;
        
        #编码格式，避免url参数乱码
        charset utf-8;

        #access_log  logs/host.access.log  main;

        #location用来匹配同一域名下多个URI的访问规则
        #比如动态资源如何跳转，静态资源如何跳转等
        #location后面跟着的/代表匹配规则
        location / {
            #站点根目录，可以是相对路径，也可以使绝对路径
            root   html;
            #默认主页
            index  index.html index.htm;
            
            #转发后端站点地址，一般用于做软负载，轮询后端服务器
            #proxy_pass http://10.11.12.237:8080;

            #拒绝请求，返回403，一般用于某些目录禁止访问
            #deny all;
            
            #允许请求
            #allow all;
            
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
            #重新定义或者添加发往后端服务器的请求头
            #给请求头中添加客户请求主机名
            proxy_set_header Host $host;
            #给请求头中添加客户端IP
            proxy_set_header X-Real-IP $remote_addr;
            #将$remote_addr变量值添加在客户端“X-Forwarded-For”请求头的后面，并以逗号分隔。 如果客户端请求未携带“X-Forwarded-For”请求头，$proxy_add_x_forwarded_for变量值将与$remote_addr变量相同  
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            #给请求头中添加客户端的Cookie
            proxy_set_header Cookie $http_cookie;
            #将使用代理服务器的主域名和端口号来替换。如果端口是80，可以不加。
            proxy_redirect off;
            
            #浏览器对 Cookie 有很多限制，如果 Cookie 的 Domain 部分与当前页面的 Domain 不匹配就无法写入。
            #所以如果请求 A 域名，服务器 proxy_pass 到 B 域名，然后 B 服务器输出 Domian=B 的 Cookie，
            #前端的页面依然停留在 A 域名上，于是浏览器就无法将 Cookie 写入。
            
　　         #不仅是域名，浏览器对 Path 也有限制。我们经常会 proxy_pass 到目标服务器的某个 Path 下，
            #不把这个 Path 暴露给浏览器。这时候如果目标服务器的 Cookie 写死了 Path 也会出现 Cookie 无法写入的问题。
            
            #设置“Set-Cookie”响应头中的domain属性的替换文本，其值可以为一个字符串、正则表达式的模式或一个引用的变量
            #转发后端服务器如果需要Cookie则需要将cookie domain也进行转换，否则前端域名与后端域名不一致cookie就会无法存取
　　　　　　  #配置规则：proxy_cookie_domain serverDomain(后端服务器域) nginxDomain(nginx服务器域)
            proxy_cookie_domain localhost .testcaigou800.com;
            
            #取消当前配置级别的所有proxy_cookie_domain指令
            #proxy_cookie_domain off;
            #与后端服务器建立连接的超时时间。一般不可能大于75秒；
            proxy_connect_timeout 30;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
    
　　#当需要对同一端口监听多个域名时，使用如下配置，端口相同域名不同，server_name也可以使用正则进行配置
　　#但要注意server过多需要手动扩大server_names_hash_bucket_size缓存区大小
　　server {
　　　　listen 80;
　　　　server_name www.abc.com;
　　　　charset utf-8;
　　　　location / {
　　　　　　proxy_pass http://localhost:10001;
　　　　}
　　}
　　server {
　　　　listen 80;
　　　　server_name aaa.abc.com;
　　　　charset utf-8;
　　　　location / {
　　　　　　proxy_pass http://localhost:20002;
　　　　}
　　}
}
```

## HTTP
## Http 结构报文
起始行 -> 头部 ->空行 -> 实体（请求体，响应体）
1. 起始行：请求报文 `GET /home HTTP/1.1` 方法+路径+http版本；响应报文：`HTTP/1.1 200 OK` http版本+状态码+原因
## Http1.1 请求方法  
GET: 通常用来获取资源  
HEAD: 获取资源的元信息  
POST: 提交数据，即上传数据  
PUT: 修改数据  
DELETE: 删除资源(几乎用不到)  
CONNECT: 建立连接隧道，用于代理服务器  
OPTIONS: 列出可对资源实行的请求方法，用来跨域请求  
TRACE: 追踪请求-响应的传输路径  
- get post 区别  
**从缓存的角度**，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。  
**从编码的角度**，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。  
**从参数的角度**，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。  
**从TCP的角度**，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(火狐浏览器除外，它的 POST 请求只发一个 TCP 包)

## URL
`https://www.baidu.com/s?wd=HTTP&rsv_spt=1`  
这个 URI 中，https即scheme部分，www.baidu.com为host:port部分（注意，http 和 https 的默认端口分别为80、443），/s为path部分，而wd=HTTP&rsv_spt=1就是query部分。  
`https://user:passwd@www.baidu.com/s?wd=HTTP&rsv_spt=1#fragment`   
user:passwd@ 表示登录主机时的用户信息，不过很不安全，不推荐使用，也不常用。  
fragment表示 URI 所定位的资源内的一个锚点，浏览器可以根据这个锚点跳转到对应的位置。  
## Http 状态码 
`https://juejin.im/post/5e76bd516fb9a07cce750746#heading-2`   
1xx: 表示目前是协议处理的中间状态，还需要后续操作。  
2xx: 表示成功状态。  
3xx: 重定向状态，资源位置发生变动，需要重新请求。  
4xx: 请求报文有误。  
5xx: 服务器端发生错误  
## Http 特点 缺点
特点：
1. 灵活可扩展。语义自由，只规定基本格式。传输样式多样性，文本，图片，视频等。
2. 可靠传输， tcp/ip。
3. 请求-应答。一发一收，有来有回。
4. 无状态。状态是指通信上下文信息，每次http请求都是独立，无关，默认不需要保留状态信息

缺点：
1. 无状态。（缺点）需要长连接的场景，保存大量信息，以免传输大量重复信息。（优点）获取一些数据，不需要保存连接上下文信息，减少了网络开销。
2. 明文传输。主要指头部不使用二进制数据，而是采用文本形式。
3. 队头阻塞问题。当http开启长连接，同一时刻只能处理一个请求。请求好事过长的情况下，其他请求只能处于阻塞状态。

## Accept 接受参数
1. 数据格式：
```
// 发送端  Response中
Content-Type: application/json
// 接收端  Request中
Accept: */*
```
|发送端 Content-Type 接收端 Accept
|--|
|text： text/html, text/plain, text/css 等     
|image: image/gif, image/jpeg, image/png 等  
|audio/video: audio/mpeg, video/mp4 等  
|application: application/json, application/javascript, application/pdf, application/octet-stream


2. 压缩方式：
```
// 发送端  Response中
Content-Encoding: gzip
// 接收端  Request中
Accept-Encoding: gzip
```
|发送端 Content-Encoding接收端 Accept-Encoding
|--|
|gzip: 当今最流行的压缩格式
|deflate: 另外一种著名的压缩格式
|br: 一种专门为 HTTP 发明的压缩算法


3. 支持语言：
```
// 发送端  Response中
Content-Language: zh-CN, zh, en
// 接收端  Request中
Accept-Language: zh-CN, zh, en
```
|发送端 Content-Language 接收端 Accept-Language
|--|
|zh-CN, zh, en


4. 字符集：
```
// 发送端  Response中
Content-Type: text/html; charset=utf-8
// 接收端  Request中
Accept-Charset: charset=utf-8
```
|发送端 Content-Language 接收端 Accept-Charset
|--|
| text/html; charset=utf-8
**总结**  
![accept](../.vuepress/public/accept.png)


## 定长包体和不定长包体
#### 定长包体
发送端在传输的时候一般会带上 Content-Length
```
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 10);
    res.write("helloworld");
  }
})

server.listen(8081, () => {
  console.log("成功启动");
})
// helloworld

res.setHeader('Content-Length', 8);
// hellowor

res.setHeader('Content-Length', 12);
// 直接无法显示

```

#### 不定长包体
1. Transfer-Encoding: chunked  
表示分块传输数据，设置这个字段后会自动产生两个效果:  
Content-Length 字段会被忽略  
基于长连接持续推送动态内容  
```
res.setHeader('Content-Type', 'text/html; charset=utf8');
res.setHeader('Content-Length', 10); // 不生效
res.setHeader('Transfer-Encoding', 'chunked');
```