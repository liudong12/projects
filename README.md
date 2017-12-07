## Tutorial on How to Build a Shopping Cart with NodeJS/ Express

This repository holds the source code of my YouTube series on how to create a shopping cart with NodeJS/Express/MongoDB



创建项目
1. project> express shopping-cart --hbs
--hbs === set up default template engine to handle bar

2. project> cd shopping-cart

3. shopping-cart> npm install

4. shopping-cart> npm start
//to start the server

5. shopping-cart> npm install express-handlebars --save
//this express-handlebars offer more feature than the built in one.

6. download mongodb
cd mongodb
cd bin
双击运行mongodb
这样才能读写
要一直开着，不能关闭，关闭了就不能用了

install mongoose
7. npm install --save mongoose
-------------------------------------------------------------------------------------------------------
mongodo 常用命令
C:\Program Files\MongoDB\Server\3.4\bin>mongod.exe  保持窗口打开
-----------------------------------------------------------
另起窗口
C:\windows\system32>cd..

C:\Windows>cd..

C:\>cd C:\Program Files\MongoDB\Server\3.4\bin

C:\Program Files\MongoDB\Server\3.4\bin>mongo.exe
MongoDB shell version v3.4.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.3
Server has startup warnings:
2017-05-04T03:13:31.564+0800 I CONTROL  [initandlisten]
2017-05-04T03:13:31.564+0800 I CONTROL  [initandlisten] ** WARNING: Access contr
ol is not enabled for the database.
2017-05-04T03:13:31.565+0800 I CONTROL  [initandlisten] **          Read and wri
te access to data and configuration is unrestricted.
2017-05-04T03:13:31.566+0800 I CONTROL  [initandlisten]
2017-05-04T03:13:31.567+0800 I CONTROL  [initandlisten] Hotfix KB2731284 or late
r update is not installed, will zero-out data files.
2017-05-04T03:13:31.567+0800 I CONTROL  [initandlisten]

----------------------------------------------------------

> show collections
> use foodorderdb
switched to db foodorderdb
> show collections
> use tekbook
switched to db tekbook
> show collections
books
categories
-----------------------------------------------------
> use shopping
switched to db shopping
2017-05-10T14:26:12.401+0800 I NETWORK  [thread1] Socket say send() An existing
connection was forcibly closed by the remote host. 127.0.0.1:27017

> show collections
2017-05-10T14:26:30.894+0800 I NETWORK  [thread1] trying reconnect to 127.0.0.1:
27017 (127.0.0.1) failed
2017-05-10T14:26:31.599+0800 I NETWORK  [thread1] reconnect 127.0.0.1:27017 (127
.0.0.1) ok
products
sessions
users

> db.products.drop()
true
>

如何删除一张表里面的内容？
> db.products.remove({})
> db.sizes.remove({})
> db.products.find()  查询products表
> db.sizes.find()  查询sizes表

--------------------------------------------------
如何加载数据？
PS C:\nodejs-project\dong-nodejs-shop-2-no-bootstrap> cd seed
PS C:\nodejs-project\dong-nodejs-shop-2-no-bootstrap\seed> node product-seeder.js
PS C:\nodejs-project\dong-nodejs-shop-2-no-bootstrap\seed> cd..
--------------------------------------------------
本项目使用 nodejs 来开发一个购物网站，是在 mindspace 的 nodejs shopping cart 的基础上修改的，本项目不是 SPA
参考： E:\视频教程\IT\mindspace\NodeJS Shopping Cart\nodejs-shopping-cart-tutorial-07-finishing-touches
如何运行这个项目？
1.  打开 cmd
2. 
	C:\windows\system32>cd..

	C:\Windows>cd..

	C:\>cd C:\Program Files\MongoDB\Server\3.4\bin
3.  C:\Program Files\MongoDB\Server\3.4\bin>mongod.exe
4.  保持窗口的打开
4.x 如要通过命令行操作数据库，则：
	另起窗口
	C:\windows\system32>cd..

	C:\Windows>cd..

	C:\>cd C:\Program Files\MongoDB\Server\3.4\bin

	C:\Program Files\MongoDB\Server\3.4\bin>mongo.exe

5.  在项目文件夹上面右键打开 termal
	PS C:\nodejs-project\dong-nodejs-shop-2-no-bootstrap> npm start

	> shopping-cart@0.0.0 start C:\nodejs-project\dong-nodejs-shop-2-no-bootstrap
	> node ./bin/www

-----------------------------------------------------
> npm install mongoose@4.5.0

--------------------------------------------------------------------------------------
如何将 node js 项目部署到 aws?
	-- 先注册aws账号，
	-- 然后创建一个 ec2 的 instance
	-- 配置 这个 instance （看视频）
		-- now ssh in aws machine usig putty
			-- 到 putty.org 下载 puTTY 和 puTTYgen，然后分别安装，参考视频3分10秒，
				puTTYgen 是用来生成 ssh key 的。有了ssh key 以后，就不需要每次登陆的时候输入密码
				username 是ubuntu
			-- 登陆以后：ubuntu@ip-172-31-28-201:~$ sudo apt-get update  //将软件都升级到最新的版本
		-- now set up node js 参考视频5分10秒，
	-- 然后再创建一个 mongodb 的 instance
	-- 配置 这个 instance （看视频）

	
	-- 然后先将项目上传到 github
		-- 看文章：“ 使用Git命令把本地项目上传到Github托管 ”
			（6）执行命令：git add .
			注意该命令后面有一个“.”,小点。表示把该目录下的所有文件加入到本地暂存区中。执行成功后不会有任何提示：
			（7）执行命令：git status
			该命令会把你本地工作区和暂存区的版本进行比较，查看当前的状态。我下面的状态是已经把所有文件加入到了暂存区中，但是还没有提交到本地历史区。
			8）执行命令：git commit -m "这里是注释。。。"
			该命令会把本地暂存区中的文件提交到本地历史区，注意只有在本地历史区中的内容才能提交到github。执行该命令后，我们所有的文件都只是在本地。没有github任何关系。
			（9）执行命令：git remote add origin https://github.com/liudong12/projects.git
			该命令是把本地历史区中的文件添加到github服务器的暂存区中。这一步是本地和远程服务器建立联系的一步。执行成功后不会显示任何结果：
			（10）执行命令：git pull origin master
			该命令是先把github上的文件拉下来，注意在每次提交之前要首先进行pull，这是防止冲突。
			（11）执行命令：git push -u origin master
			这一步是真正向github提交，执行完成后，github上的repository就有和你本地一样的代码文件了。

	-- 然后将项目从 github 克隆到 node js 的实例里面
		-- ubuntu@ip-172-31-28-201:~$ git clone https://github.com/liudong12/projects.git （链接在github上面找）
		-- 克隆好以后，操作系统的根目录下面就会有一个叫 projects 的文件夹，这就是项目



	-- 如何运行项目？
		先要启动 mongodb （先要通过使用 SSH 工具 putty 来与 aws 里面的 mongodo 实例建立连接）
		打开putty

		1. login as: ubuntu  //进入操作系统
		   密码：无，直接回车
		2. 进入 etc 文件夹
		ubuntu@ip-172-31-21-25:~$ cd /etc
		ubuntu@ip-172-31-21-25:/etc$ mongo  //启动 mongodb

		--------------

		然后再开启一个 putty 窗口。

		1. login as: ubuntu       //进入操作系统
		   密码：无，直接回车

		2. 进入项目所在的目录
		    ubuntu@ip-172-31-28-201:~$ cd projects
		    ubuntu@ip-172-31-28-201:~/projects$ npm start  //启动项目

		然后在浏览器里面输入 
		http://ec2-54-209-191-249.compute-1.amazonaws.com:3000
