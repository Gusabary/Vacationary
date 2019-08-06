# Learning notes of Week 1

## 8.5 Tue.

### 你好，窗口

+ >GLAD的头文件包含了正确的OpenGL头文件（例如`GL/gl.h`），所以需要在其它依赖于OpenGL的头文件之前包含GLAD。

+ `glfwInit()` 初始化 GLFW

+ `glfwWindowHint(option, value)` 配置 GLFW，其中

  + option 是以 `GLFW_` 开头的枚举类型
  + value 是 int，为该选项的值

+ ```c++
  GLFWwindow* window = glfwCreateWindow(800, 600, "LearnOpenGL", NULL, NULL);
  glfwMakeContextCurrent(window);
  ```

  + `glfwCreateWindow` 创建窗口对象，参数列表：宽、高、窗口名、未知、未知

  + `glfwMakeContextCurrent` 通知GLFW将我们窗口的上下文设置为当前线程的主上下文

+ >GLAD是用来管理OpenGL的函数指针的，所以在调用任何OpenGL的函数之前我们需要初始化GLAD:
  >
  >```c++
  >gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)
  >```

+ 通过调用 glViewport 函数来设置窗口的位置和尺寸：

  ```c++
  glViewport(0, 0, 800, 600);
  ```

  参数列表：前两个参数控制窗口**左下角**的位置。第三个和第四个参数控制渲染窗口的宽度和高度（像素）。

+ 渲染循环：

  ```c++
  while(!glfwWindowShouldClose(window))
  {
      glfwSwapBuffers(window);
      glfwPollEvents();    
  }
  ```

  + `glfwWindowShouldClose` 检查 GLFW 是否被要求退出
  + `glfwSwapBuffers` 会交换颜色缓冲（它是一个储存着 GLFW 窗口每一个像素颜色值的大缓冲），它在这一迭代中被用来绘制，并且将会作为输出显示在屏幕上。
  + `glfwPollEvents` 检查有没有触发什么事件（比如键盘输入、鼠标移动等）、更新窗口状态，并调用对应的回调函数（可以通过回调方法手动设置）。

+ `glfwTerminate()` 正确释放/删除之前的分配的所有资源。

+ `glfwGetKey()` 判断某个键是否被按下，参数列表：window, key.

  ```c++
  if(glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
      glfwSetWindowShouldClose(window, true);
  ```

  + ESC 被按下，返回 GLFW_PRESS，否则返回 GLFW_RELEASE。

+ > 可以通过调用 glClear 函数来清空屏幕的颜色缓冲，它接受一个缓冲位(Buffer Bit)来指定要清空的缓冲，可能的缓冲位有GL_COLOR_BUFFER_BIT，GL_DEPTH_BUFFER_BIT 和 GL_STENCIL_BUFFER_BIT。

+ >glClearColor 函数是一个**状态设置**函数，而 glClear 函数则是一个**状态使用**的函数，它使用了当前的状态来获取应该清除为的颜色。

### 你好，三角形

+ > **图形渲染管线**可以被划分为两个主要部分：第一部分把你的3D坐标转换为2D坐标，第二部分是把2D坐标转变为实际的有颜色的像素。

+ 顶点着色器 -> 图元装配 -> 几何着色器 -> 光栅化 -> 片段着色器 -> alpha 测试和混合

+ > 在现代OpenGL中，我们**必须**定义至少一个顶点着色器和一个片段着色器（因为GPU中没有默认的顶点/片段着色器）。

+ > 为了设置顶点着色器的输出，我们必须把位置数据赋值给预定义的 `gl_Position` 变量，它在幕后是`vec4`类型的。

+ ? VAO 和 VBO 的 id 可以相同吗，即以下代码为什么可以:

  ```c++
  glGenVertexArrays(1, &VAO);
  glGenBuffers(1, &VBO);
  ```

+ 编译、链接着色器 -> 配置 VAO（将 VBO，EBO 绑定上去）-> 在渲染循环中使用着色器和 VAO

##### Last-modified date: 2019.8.6, 10 a.m.