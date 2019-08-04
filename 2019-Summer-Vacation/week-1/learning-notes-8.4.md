# Learning notes of Week 1

## 8.4 Sun.

### [C/C++ Project Generator 插件](https://marketplace.visualstudio.com/items?itemName=danielpinto8zz6.c-cpp-project-generator)

首先，要使用这个插件需要 [MinGW](<http://mingw.org/>)，不过之前写过 c++ 应该有装过。

然后 `ctrl+shift+p` 输入 `Create C++ project` 快速生成 helloworld，但是 F5 运行的时候可能会有报错说要添加 `MIDebuggerPath` 选项，我的解决方法是在 `launch.json` 文件里添加 `"miDebuggerPath":"D:/MinGW/bin/gdb.exe"` 字段。

再然后还有个问题，就是程序结束会直接退出，看不到 hello world，可以通过 `system("pause")` 解决，但总感觉怪怪的 - - 

[这篇教程](<https://www.cnblogs.com/islety/p/9771782.html>)提到怎么通过配置文件解决这个问题，要注意的是 `launch.json` 文件中 type 字段为 `cppvsdbg` 而不是默认的 `cppdbg` 。

### OpenGL hello-world

[这篇教程](<https://blog.csdn.net/sarono/article/details/86564726>)写的**很**详细，然后只有几点想补充一下：

+ CMake 可以下载 cmake-3.15.1-win64-x64.msi
+ GLFW 可以下载 Source code (zip)
+ 最后 Makefile 需要对着教程改一下，似乎不能用插件默认生成的

*p.s. this is the greenest hello-world I have seen.*

##### Last-modified date: 2019.8.4, 9 p.m.

