# Learning notes of Week 1

## 8.10 Sat.

### 摄像机

- `glm::LookAt` 函数需要一个摄像机位置、观察目标位置和上向量，它会创建一个观察矩阵：

  ```c++
  glm::mat4 view = glm::mat4(1.0f);
  view = glm::lookAt(
      glm::vec3(0.0f, 0.0f, 3.0f),   // 摄像机位置：屏幕前 3.0f 处
      glm::vec3(0.0f, 0.0f, 0.0f),   // 观察目标位置：原点
      glm::vec3(0.0f, 1.0f, 0.0f)    // 上向量：正常的上向量
  );
  ```

- 将观察目标位置参数设为摄像机位置加上一个固定向量，则摄像机永远观察该固定向量所指的方向：

  ```c++
  glm::vec3 cameraFront = glm::vec3(0.0f, 0.0f, -1.0f);
  glm::vec3 cameraUp    = glm::vec3(0.0f, 1.0f,  0.0f);
  view = glm::lookAt(cameraPos, cameraPos + cameraFront, cameraUp);
  ```

  不管 `cameraPos` 怎么改变，观察方向永远是垂直屏幕向里。当然可以通过改变 `cameraFront` 的值以改变观察方向。

  事实上，观察方向向量是观察目标位置与摄像机位置之差，即第二个参数减去第一个参数。

- 视角右移，yaw 角增大；视角上移，pitch 角减小。

- 处理摄像机位置移动：修改 `position` 属性

  处理摄像机视角旋转：修改 `yaw`, `pitch` 属性 -> 计算得到 `front` -> `front`, `worldUp` 叉乘得到 `right` -> `right`, `front` 叉乘得到 `up`。

  处理摄像机缩放调整：修改 `zoom` 属性

  对于上述属性的修改会在构造观察矩阵以及投影矩阵的时候体现出来。

- 需要注意的是，因为目前的摄像机为 fps 风格，不能滚动，即 `roll` 角不会改变，所以在用 `lookAt` 函数生成观察矩阵时，第三个参数填入 `up` 还是 `worldUp` 效果都是一样的，因为这两个向量和 `front` 叉乘出来得到的是同一个向量，即这三个向量共面。

##### Last-modified date: 2019.8.10, 5 p.m.