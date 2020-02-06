# Learning notes of Week 4

## 2.6 Thu.

### C++

+ gcc 和 g++ 的区别：最早 gcc 是 GNU C Compiler 的意思，但后来 gcc 集成了许多其他不同语言的编译器，就变成了 GNU Compiler Collection，而 g++ 是其中 c++ 的编译器。

  对于后缀是 .c 的文件，gcc 会调用 c 编译器，对于后缀是 .cpp 的文件，gcc 会调用 c++ 编译器，也即 g++。

  而 g++ 对于后缀是 .c 以及 .cpp 的文件都会使用 c++ 编译器。

  在链接阶段，g++ 可以自动和 c++ 程序所使用的库进行链接，而 gcc 需要手动指定 `-lstdc++`。


### Unity

+ Unity 使用**对象-组件**模型，即一个对象可以拥有许多组件，而一个组件对应一种功能，所以一个对象可以有多种功能。

+ 最左侧 Hierarchy 窗口列出了场景中的对象，最右侧 Inspector 窗口则列出了当前对象的所有组件。所有对象都会有一个 Transform 组件，用于指定对象的位置和旋转。Camera 对象还会有 Camera 组件用于观察，Light 对象还会有 Light 组件用于光照。

+ Windows -> Asset Store / Package Manager

+ 从 Asset Store 下载资源非常慢，差不多到了十几 k 每秒的地步，而且极容易失败，一旦失败就要重新下载，根本顶不住。后来查了一顿资料，说资源会下载到 `C:\Users\用户名\AppData\Roaming\Unity\Asset Store-5.x\开发者公司名\插件名` 这个目录下，在下载好之前，该目录下有一个 json 文件，里面是下载地址和一个 key。所幸，这个教程的资源 key 为空，不然的话手动下载好了以后还要用 key 解码。我就在 chrome 里面对着这个地址下载，结果跟在 Unity Editor 里面下载一样慢，无奈只好下载了迅雷，结果真香（

  下载完了以后放到那个目录，再加上 `.unitypackage` 后缀名就可以在 Unity Editor 里面 import 了。

  之前我尝试在 Unity Editor 里面走代理，不知道是我梯子的问题还是我走的方式不对反正就行不通。

+ **预制件**（prefabs）是一种特殊类型的资源，由预制件创建出的所有实例都会关联到预制件资源，更改这个资源将更改场景中所有与其关联的实例。Unity 中的模型资源类似于只读预制件。

+ 将对象从 Hierarchy 窗口拖入 Project 窗口（最好是 Assets -> Prefabs 文件夹）会使其成为一个预制件。

+ Animator 组件用来控制动画，该组件第一个属性是 Controller，引用一种称为 Animation Controller 的资源（在 Project 窗口的 Animation -> Animators 文件夹可以查看这类资源），该资源通过一个**状态机**来控制动画的放映，每个状态就是一种动画，可以在 Project 窗口中的 Animation -> Animation 文件夹查看到。

+ Rigidbody 组件将游戏对象标记为可移动的物理系统的一部分，可以设置质量，运动约束等等。

+ 场景中没有父项的游戏对象的位置和角度是相对于世界坐标原点，即（0,0,0），以及世界坐标轴而言的。而有父项的游戏对象的位置和角度是相对于父项位置和父项坐标轴而言的。这些坐标和旋转轴会在刚体约束中被用到。

+ Collider 组件定义了一个碰撞体，使对象能够处理碰撞。调整该组件的参数使碰撞体能大约覆盖游戏对象。

+ 脚本也是一种资源，要用作组件的脚本在资源上的名称必须与脚本本身中的**类名称**相同，重命名脚本文件时需要注意。

+ 在 Unity 中，公共成员变量出现在 Inspector 窗口中，因此可以进行调整。

##### Last-modified date: 2020.2.6, 9 p.m.

