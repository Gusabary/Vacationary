# Learning notes of Week 1

## 8.8 Thu.

+ `shader.h` 和着色器的 `.vs`, `.fs` 文件不知道为啥不能放在 src 目录下，报错似乎是说会编译 src 目录下的所有文件然后头文件和着色器文件不能编译。然后我就把头文件放到了 include 目录下，还有一个地方要注意，就是 `main.cpp` 传递着色器文件路径给头文件时，相对路径的当前目录被认为是项目根目录，即着色器文件路径要指定成 `shader/shader.vs` 而不是 `../shader/shader.vs` 。

### 纹理

+ > 为了能够把纹理映射(Map)到三角形上，我们需要指定三角形的每个顶点各自对应纹理的哪个部分。

+ > 纹理坐标起始于(0, 0)，也就是纹理图片的左下角，终始于(1, 1)，即纹理图片的右上角。

+ 生成纹理对象：

  ```c++
  unsigned int texture;
  glGenTextures(1, &texture);
  ```

  绑定纹理对象：

  ```c++
  glBindTexture(GL_TEXTURE_2D, texture);
  ```

  设置纹理对象属性：

  ```c++
  // set the texture wrapping parameters
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT); 
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
  // set texture filtering parameters
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
  ```

  注入纹理：

  ```c++
  int width, height, nrChannels;
  unsigned char *data = stbi_load("image/texture.jpg", &width, &height, &nrChannels, 0);
  glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width, height, 0, GL_RGB, GL_UNSIGNED_BYTE, data);
  ```

  现在 texture 这个 id 对应的纹理对象已经被注入了 `texture.jpg` 图片的纹理。

+ 要使用纹理单元，首先要注入多个纹理到多个纹理对象，如 t1 注入了来自 `a.jpg` 的纹理，t2 注入了来自 `b.jpg` 的纹理。在片段着色器中也要有多个采样器，每个采样器对应不同的纹理单元，如 texture1 对应纹理单元 `GL_TEXTURE0`，texture2 对应纹理单元 `GL_TEXTURE1`：

  ```c++
  ourShader.setInt("texture1", 0);
  ourShader.setInt("texture2", 1);
  // 这里的 0，1 对应的应该就是 GL_TEXTURE0 和 GL_TEXTURE1
  ```

  但目前为止仅仅将片段着色器中的采样器与纹理单元进行了关联，还需要绑定纹理单元和具体的纹理对象：

  ```c++
  // 激活 TEXTURE0 纹理单元
  glActiveTexture(GL_TEXTURE0);
  // 将 t1 绑定到当前激活的纹理单元的 2D 纹理上
  glBindTexture(GL_TEXTURE_2D, t1);
  glActiveTexture(GL_TEXTURE1);
  glBindTexture(GL_TEXTURE_2D, t2);
  ```

  事实上，片段着色器中的采样器默认为 0，即 `GL_TEXTURE0`，且默认激活的纹理单元也为 `GL_TEXTURE0`。所以只使用一个纹理时不需要设置采样器的值，也不需要激活纹理单元。

+ 着色器代码中除了用 in, out, uniform 定义的变量外似乎不可以定义临时变量。

+ ```c++
  FragColor = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), opacity);
  ```

  如果 opacity 的值没有限制在 0 到 1 之间，纹理会呈现很奇怪的颜色组合。

  原因可能是 `mix` 函数未对 opacity 参数的取值做检查，只是简单地将某一点的 rgb 计算为

  ```mathematica
  t1.rgb * (1 - opacity) + t2.rgb * opacity
  ```

  所以当 opacity > 1 时，会出现该点颜色在两个纹理范围之外的情况。而 rgb 又是有 255 的上限的，所以当 opacity 特别大时混合纹理会呈现大片的纯色。

##### Last-modified date: 2019.8.8, 11 p.m.

