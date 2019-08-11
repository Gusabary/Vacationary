# Learning notes of Week 1

## 8.11 Sun.

### 颜色

+ > 当我们把光源的颜色与物体的颜色值相乘，所得到的就是这个物体所反射的颜色（也就是我们所感知到的颜色）:
  >
  > ```c++
  > glm::vec3 lightColor(1.0f, 1.0f, 1.0f);
  > glm::vec3 toyColor(1.0f, 0.5f, 0.31f);
  > glm::vec3 result = lightColor * toyColor; // = (1.0f, 0.5f, 0.31f);
  > ```

+ >每个顶点属性从一个 VBO 管理的内存中获得它的数据，而具体是从哪个 VBO（程序中可以有多个VBO）获取则是通过在调用 glVertexAttribPointer 时绑定到 GL_ARRAY_BUFFER 的 VBO 决定的：

  ```c++
  glBindBuffer(GL_ARRAY_BUFFER, VBO);  // 绑定 VBO
  glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);  // 灌数据
  
  glBindVertexArray(cubeVAO);  // 绑定 VAO
  // 将绑定到当前 GL_ARRAY_BUFFER 的 VBO 中的数据解析到当前绑定的 VAO 的 location0 中
  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void *)0);
  glEnableVertexAttribArray(0);  // 激活 location0
  ```

  之后 draw 的时候会将当前 VAO 中的数据传递给顶点着色器，location0 与 location=0 的 in 变量对应。

##### Last-modified date: 2019.8.11, 11 p.m.