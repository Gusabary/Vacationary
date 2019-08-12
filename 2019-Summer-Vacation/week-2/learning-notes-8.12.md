# Learning notes of Week 2

## 8.12 Mon.

### 基础光照

+ 环境光照：模拟环境中一些细微的光亮。环境光照的贡献在物体表面处处相等，为一个常量：环境光照因子：

  ```c++
  float ambientStrength = 0.1;
  vec3 ambient = ambientStrength;
  ```

  漫反射光照：物体反射的光强与接收到的光强成正比，而接收到的光强取决于光的入射角度，所以当光线垂直入射时，漫反射光照强度最大，这样的关系可以用物体表面法向量与光线向量点乘来描述（别忘了**标准化**）：

  ```c++
  vec3 norm = normalize(Normal);
  vec3 lightDir = normalize(lightPos - FragPos);  // 光线向量：光源位置 - 物体表面某点位置
  float diffuse = max(dot(norm, lightDir), 0.0);  // 不能为负值
  ```

  镜面光照：物体反射的光强被观察者接收多少，取决于观察方向，当观察方向正对反射光时，接收到的光强最大，同样可以用反射光线向量与视线向量点乘来描述（也需要**标准化**），除此以外，镜面光照还有两个参数，一个是镜面强度（specularStrength），指定反射光强，一个是反光度（shininess），指定反射光的聚集程度：

  ```c++
  float specularStrength = 0.5;
  int shininess = 32;
  vec3 viewDir = normalize(viewPos - FragPos);
  vec3 reflectDir = reflect(-lightDir, norm);
  float specular = pow(max(dot(viewDir, reflectDir), 0.0), shininess) * specularStrength;
  ```

  最后将三个因子相加作用在原来光线和物体颜色的乘积上，就得到了更真实的光线效果下的物体颜色：

  ```c++
  vec3 result = (ambient + diffuse + specular) * lightColor * objectColor;
  FragColor = vec4(result, 1.0);
  ```

+ 目前片段着色器里的计算都是在世界空间坐标中进行的。所以我们应该把法向量也转换为世界空间坐标，看上去将法向量乘以模型矩阵就可以了，就如对顶点坐标的处理一样，但是存在两个问题：

  第一，法向量是三维向量，模型矩阵是 4 x 4 矩阵，没办法直接相乘，出现这个问题是因为模型矩阵有位移物体的作用，而法向量只指示方向，不含长度信息，所以我们只选用模型矩阵左上角 3×3 的部分。

  第二，当进行不等比缩放时，法向量会不再垂直于物体表面，解决方法是不直接乘模型矩阵，而是乘上模型矩阵的逆矩阵的转置矩阵，该矩阵也称为法线矩阵。

  所以最终把法向量转换为世界空间坐标的操作如下：

  ```c++
  Normal = mat3(transpose(inverse(model))) * aNormal;
  ```

##### Last-modified date: 2019.8.12, 9 p.m.