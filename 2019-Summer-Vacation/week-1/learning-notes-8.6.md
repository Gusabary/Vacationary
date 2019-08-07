# Learning notes of Week 1

## 8.6 Tue.

### 你好，三角形（练习）

+ `glGenVertexArrays` 和 `glGenBuffers` 可以一次创建多个 VAO 和 VBO：

  ```c++
  unsigned int VBOs[2], VAOs[2];
  glGenVertexArrays(2, VAOs); 
  glGenBuffers(2, VBOs);
  ```

  这样创建出来的 VAO 和 VBO 用 cout 输出得到以下结果：

  ```c++
  cout << VAOs[0];  // 1
  cout << VAOs[1];  // 2
  cout << VBOs[0];  // 1
  cout << VBOs[1];  // 2
  ```

  对于这样的情况：

  ```c++
  unsigned int VAOs[2], VAO;
  glGenVertexArrays(3, VAOs);
  glGenVertexArrays(1, VAO);
  ```

  输出会得到：

  ```c++
  cout << VAOs[0];  // 1
  cout << VAOs[1];  // 2
  cout << VAO;  // 4
  ```

  虽然看上去好像 id 仍然唯一，但是会存在某个其他的值被 3 覆盖掉（即 OpenGL 似乎没有做边界溢出的检查）

+ 在渲染循环的一个迭代里需要完成多个 VAO 的渲染，而不是每个迭代一个。

+ `glDeleteVertexArrays` 和 `glDeleteBuffers` 也同样可以一次删除多个 VAO 和 VBO：

  ```c++
  glDeleteVertexArrays(2, VAOs);
  glDeleteBuffers(2, VBOs);
  ```

+ 编译顶点着色器

  ```c++
  // 定义顶点着色器变量
  unsigned int vertexShader = glCreateShader(GL_VERTEX_SHADER);
  // 将顶点着色器代码放入该变量中
  glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
  // 编译
  glCompileShader(vertexShader);
  ```

+ 编译片段着色器（步骤同上）

  ```c++
  unsigned int fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  glShaderSource(fragmentShader, 1, &fragmentShader1Source, NULL);
  glCompileShader(fragmentShader);
  ```

+ 链接为着色器程序

  ```c++
  unsigned int shaderProgram = glCreateProgram();
  glAttachShader(shaderProgram, vertexShader);
  glAttachShader(shaderProgram, fragmentShader);
  glLinkProgram(shaderProgram);
  ...
  glUseProgram(shaderProgramOrange);
  ```

+ > 查询uniform地址不要求你之前使用过着色器程序，但是更新一个uniform之前你**必须**先使用程序（调用glUseProgram)，因为它是在当前激活的着色器程序中设置uniform的。

### 着色器

+ 先用 `glGetUniformLocation` 查询 uniform 变量的位置值，再用 `glUniform` 进行设置。

+ 在顶点着色器中有这样的代码：

  ```c++
  layout (location = 0) in vec3 aPos;   // 位置变量的属性位置值为 0 
  layout (location = 1) in vec3 aColor; // 颜色变量的属性位置值为 1
  ```

  其中不同的 location 对应 `glVertexAttribPointer` 对数据的不同解析方式：

  ```c++
  // 位置属性
  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float), (void*)0);
  glEnableVertexAttribArray(0);
  // 颜色属性
  glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float), (void*)(3* 			sizeof(float)));
  glEnableVertexAttribArray(1);
  ```

+ > 如果你声明了一个 uniform 却**在 GLSL 代码中**没用过，编译器会静默移除这个变量，导致最后编译出的版本中并不会包含它。

  也就是说，在 GLSL 代码中定义过某个 uniform 变量，即使在渲染循环中通过 `glGetUniformLocation` 获取过位置或者通过 `glUniform` 设置过值，但是只要在 GLSL 代码中没有使用过，编译器还是会自行移除。移除后通过 `glGetUniform` 查询到的位置值为 -1 。

  > 如果glGetUniformLocation返回`-1`就代表没有找到这个位置值。

+ 设置迭代次数为1（在渲染循环中加上 `system("pause")`），有趣的是，我将 `glUniform1f` 放在 `glDrawArrays` 前，uniform 会起作用，放在 `glDrawArrays` 之后，就不起作用。所以经过图形渲染流水线应该是 `glDrawArrays` 触发的操作。

+ 注意到 `glUniform` 函数的第一个参数是 uniform 变量的位置值，而改位置值的获取可以通过 `glGetUniformLocation` ，再注意到该函数的两个参数分别为着色器程序 id 和 uniform 变量名，所以知道不同着色器程序可以有相同命名的 uniform 变量，且 uniform 变量的作用域在某**一个**着色器程序中。

+ rgb 如果指定负值，似乎会被认为是0 。

##### Last-modified date: 2019.8.7, 11 a.m.

