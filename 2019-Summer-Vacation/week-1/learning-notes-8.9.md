# Learning notes of Week 1

## 8.9 Fri.

### 变换

+ 向量和矩阵定义了与标量之间的加减法。

+ 不均匀缩放 (Non-uniform Scale)：每个轴的缩放因子 (Scaling Factor) 不一样，反之则叫均匀缩放 (Uniform Scale)。

+ > 向量的w分量也叫齐次坐标。如果一个向量的齐次坐标是0，这个坐标就是方向向量(Direction Vector)，因为w坐标是0，这个向量就不能位移（译注：这也就是我们说的不能位移一个方向）。

+ > 有了位移矩阵我们就可以在3个方向(x、y、z)上移动物体。

+ > 旋转矩阵在3D空间中每个单位轴都有不同定义。

+ >GLM库从0.9.9版本起，默认会将矩阵类型初始化为一个零矩阵（所有元素均为0），而不是单位矩阵（对角元素为1，其它元素为0）。如果你使用的是0.9.9或0.9.9以上的版本，你需要将所有的矩阵初始化改为 `glm::mat4 mat = glm::mat4(1.0f)`。

+ > 记住，实际的变换顺序应该与阅读顺序相反！！（从下往上读）

+ 先缩放，再旋转，再位移：

  ```c++
  // 指定位移向量
  trans = glm::translate(trans, glm::vec3(-0.5f, 0.5f, 0.0f));
  // 指定旋转轴方向和旋转角度
  trans = glm::rotate(trans, glm::radians(90.0f), glm::vec3(0.0f, 0.0f, 1.0f));
  // 指定缩放向量
  trans = glm::scale(trans, glm::vec3(0.5f, 0.5f, 0.5f)); 
  ```

  需要时刻注意 OpenGL 画布的原点在中心位置而不是左下角，所以缩放和旋转时对于处在中心的物体来说没有产生位移。

### 坐标系统

+ 模型矩阵：将物体移动到他在世界中所处的位置

  ```c++ 
  glm::mat4 model = glm::mat4(1.0f);
  model = glm::translate(model, cubePositions[i]);
  model = glm::rotate(model, glm::radians(-55.0f), glm::vec3(1.0f, 0.0f, 0.0f));
  ```

  观察矩阵：将物体相对于摄像头做一定位移

  ```c++
  glm::mat4 view = glm::mat4(1.0f);
  // 注意，我们将矩阵向我们要进行移动场景的反方向移动。
  view = glm::translate(view, glm::vec3(0.0f, 0.0f, -3.0f));
  ```

  投影矩阵：裁剪世界空间，有两种投影方式，一种是正射投影，指定一个立方体作为裁剪后的世界空间：

  ```c++
  glm::mat4 projection = glm::mat4(1.0f);
  projection = glm::ortho(-5.0f, 5.0f, -5.0f, 5.0f, 0.1f, 100.0f);
  ```

  还有一种是透视投影，应用了近大远小的透视效果：

  ```c++
  glm::mat4 projection = glm::mat4(1.0f);
  projection = glm::perspective(glm::radians(45.0f), screenWidth / screenHeight, 0.1f, 100.0f);
  ```

+ >因为将所有可见的坐标都指定在-1.0到1.0的范围内不是很直观，所以我们会指定自己的坐标集(Coordinate Set)并将它变换回标准化设备坐标系，就像OpenGL期望的那样。
  >
  >为了将顶点坐标从观察变换到裁剪空间，我们需要定义一个投影矩阵(Projection Matrix)，它指定了一个范围的坐标，比如在每个维度上的-1000到1000。投影矩阵接着会将在这个指定的范围内的坐标变换为标准化设备坐标的范围(-1.0, 1.0)。

  这段话意思是我们在指定顶点坐标时不一定非得在 -1.0 和 1.0 之间，而是可以任意值，只要在设置投影矩阵时将这些顶点坐标包含在裁剪空间内，他们就会被映射到 -1.0 和 1.0 之间，即能在屏幕上显示。

  如以下的投影矩阵会将 x, y 坐标在 -5.0 到 5.0 之间的顶点全部显示在屏幕上：

  ```c++
  projection = glm::ortho(-5.0f, 5.0f, -5.0f, 5.0f, 0.1f, 100.0f);
  ```

##### Last-modified date: 2019.8.9, 8 p.m.

  

