## 介绍
![git](../.vuepress/public/git.png)
Workspace：工作区  
Index / Stage：暂存区  
Repository：仓库区（或本地仓库）  
Remote：远程仓库  

## 命令
```
- git init	                 初始化
- git add <filename> 	     添加文件导暂存区
- git add .                  添加全部文件
- git rm -cached <filename>	 移除暂存区的内容
- git commit -m <description>     提交到本地库(必须先add)
- git commit -am                  可提交未add文件，但是不包括未创建文件
- git push origin 
```

## 日志
```
- git log	查看历史提交
- git reflog
```
## 版本控制
```
- git reset --hard	             简洁/完整的哈希索引
- git reset --hard HEAD	 强制工作区 暂存区  本地库为当前HEAD指针所在的版本
- git reset --hard HEAD^     回退一个版本
- git reset --hard HEAD ~1  回退一个版本
```
## 比较差异
```
- git diff  比较工作区和暂存区的文件差异
- git diff <filename>   比较工作区暂存区指定问价差异
```

## 分支操作
 ```
- git branch -v   查看所有分支
- git branch -d <分支名>   删除本地分支
- git branch   新建分支
- git checkout  切换分支
- git merge <被合并分支名>：合并分支

　tip：如master分支合并 hot_fix分支，那么当前必须处于master分支上，然后执行 git merge hot_fix 命令

　tip2：合并出现冲突

　　①删除git自动标记符号，如<<<<<<< HEAD、>>>>>>>等

　　②修改到满意后，保存退出

　　③git add <file name>

　　④git commit -m "日志信息"，此时后面不要带文件名
```

## 本地和远程
```
- git clone <Url>  克隆
- git remote -v 查看远程仓库别名
- git remote add <别名><远程仓库地址>   新建远程仓库地址别名
- git remote rm <别名>  删除本地中远程库别名
- git push <别名> <分支名>：本地库某个分支推送到远程库，分支必须指定
- git pull <别名> <分支名>：把远程库的修改拉取到本地  tip：该命令包括git fetch，git merge
- git fetch <远程库别名> <远程库分支名>：抓取远程库的指定分支到本地，但没有合并
- git merge <远程库别名/远程库分支名>：将抓取下来的远程的分支，跟当前所在分支进行合并
- git fork：复制远程库
 ```

## 
#### Github提交没有commits显示(也就是没有小绿框的显示)
- 使用查看log的命令发现有些提交的日志中没有指明作者的邮箱地址
git log

#### 使用以下命令对作者的邮箱进行配置
- 如果只想修改这一个仓库的邮箱：
git config user.email "your_email@example.com"

- 可以使用如下命令确认修改是否成功：
git config user.email  就会显示你目前的邮箱。


- 如果想对所有的仓库生效，避免在别的仓库继续出现这个情况，则输入：
git config --global user.email "your_email@example.com"

- 同样可以查看确认一下：
git config --global user.email