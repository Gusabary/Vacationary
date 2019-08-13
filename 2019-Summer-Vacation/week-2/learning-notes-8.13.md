# Learning notes of Week 2

## 8.13 Tue.

### 材质

+ ambient 材质向量定义了在环境光照下物体的颜色，通常这是和物体颜色相同的颜色。

  diffuse 材质向量定义了在漫反射光照下物体的颜色，通常这也是和物体颜色相同的颜色。

  specular 材质向量设置的是镜面光照对物体的颜色影响，通常是灰色系的颜色（RGB 三个分量相等）。

  shininess 影响镜面高光的散射/半径。

  ```c++
  lightingShader.setVec3("material.ambient",  1.0f, 0.5f, 0.31f);
  lightingShader.setVec3("material.diffuse",  1.0f, 0.5f, 0.31f);
  lightingShader.setVec3("material.specular", 0.5f, 0.5f, 0.5f);
  lightingShader.setFloat("material.shininess", 32.0f);
  ```

+ ambient 光照向量通常会设置为一个比较低的强度，因为我们不希望环境光颜色太过显眼。

  diffuse 光照向量通常设置为光所具有的颜色（系）。

  specular 光照向量通常会保持为 `vec3(1.0)`，以最大强度发光。

  ```c++
  lightingShader.setVec3("light.ambient",  0.2f, 0.2f, 0.2f);
  lightingShader.setVec3("light.diffuse",  0.5f, 0.5f, 0.5f); // 将光照调暗了一些以搭配场景
  lightingShader.setVec3("light.specular", 1.0f, 1.0f, 1.0f); 
  ```

+ 在引入材质之前，计算光照采用的是 `strength * lightColor * objectColor` 的公式，引入材质之后：

  + 对于 ambient 分量，用 `light.ambient` 代替 `strength * lightColor` ，用 `material.ambient` 代替 `objectColor`；
  + 对于 diffuse 分量，用 `light.diffuse` 代替 `strength * lightColor` ，用 `material.diffuse` 代替 `objectColor`，不过在之前 diffuse 分量的 `strength ` 总是 1；
  + 对于 specular 分量， `light.specular` 通常保持在最明亮的白色，`material.specular` 体现 `strength` 的作用，在灰色系中调整。看上去之前的 specular 分量包含颜色信息，而现在是纯灰色系，只包含亮度信息。

  但是话又说回来，公式的变化其实就是三个因子相乘变成了两个因子相乘，所以原来的 strength 因子被划分到 light 还是 material 从道理上讲都是可以的，比如不考虑光照强度的话，将 `material.ambient` 降低一点来模拟环境光照也不是不可以。

### 光照贴图

+ 漫反射贴图：用纹理替换原本单一的物体颜色，即对每个片段进行控制：

  ```c++
  vec3 diffuse = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;
  ```

+ 镜面光贴图：用纹理替换原本单一的镜面强度，也是对每个片段进行控制。但是需要注意的是，镜面光贴图使用的纹理通常是黑白的，即每个片段颜色都是灰色系的，因为事实上 specular 材质向量并不表示颜色，而是表示镜面强度，镜面强度越大（rgb 值越靠近白色），则镜面反射的光越亮：

  ```c++
  vec3 specular = light.specular * spec * texture(material.specular, TexCoords).rgb;
  ```

### 投光物

+ 平行光 / 定向光：用光线方向向量来模拟而不是光源位置 - 片段位置：

  ```c++
  struct Light {
      // vec3 position; // 使用定向光就不再需要了
      vec3 direction;
  	...
  };
  ...
  void main()
  {
    vec3 lightDir = normalize(-light.direction);
    ...
  }
  ```

  平行光不考虑衰减。

+ > 为了实现衰减，在片段着色器中我们还需要三个额外的值：也就是公式中的常数项、一次项和二次项。它们最好储存在之前定义的 Light 结构体中：
  >
  > ```c++
  > struct Light {
  > 	...
  >     float constant;
  >     float linear;
  >     float quadratic;
  > };
  > ```

+ 关于环境光分量衰不衰减的问题，其实都说得通。如果衰减，可以认为环境光还是由点光源经过一顿反射形成的，离点光源远了自然光就弱了；如果不衰减，可以认为环境光是由点光源以外的其他光源形成的，不管离点光源是远是近，环境中总存在那么点细微的光，所以处处一样。

+ 关于衰减，我还有个问题没想通，就是现在的衰减只考虑了光源和片段的距离，距离越远，光越弱。但是没有考虑片段和摄像机的距离，讲道理片段反射光源的光所以能被摄像机看到，那不也应该考虑衰减吗。

  我唯一能想到的原因是衰减衰减的是强度而不是颜色，从光源出来的光之所以要考虑衰减，是因为他还要和片段做一次混合，光的强度决定了他在混合中所能占到的权重，而从片段反射出来之后直接被摄像机捕捉，不会再经过混合，所以强度信息没有意义，也就没有必要再考虑衰减。

+ 在聚光中，intensity 因子用来模拟平滑 / 软化的手电筒边缘效果，内圆锥中该值为 1，外圆锥外该值为 0，内外圆锥之间根据余弦插值。所以是在宽这个维度对视觉效果进行修正，与之相比，attenuation 则是在深这个维度对视觉效果进行修正。

  对于宽的维度来说，环境光分量是一直存在的，即不受 intensity 因子作用，否则外圆锥外是纯黑，环境光便失去意义了；而对于深的维度来说，环境光分量可以衰减，即受 attenuation 因子作用，也可以不衰减。

  ```c++
  // spotlight (soft edges)
  float theta = dot(lightDir, normalize(-light.direction)); 
  float epsilon = (light.cutOff - light.outerCutOff);
  float intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0);  //余弦插值
  diffuse  *= intensity;
  specular *= intensity;
  
  // attenuation
  float distance    = length(light.position - FragPos);
  float attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));  // 衰减公式
  ambient  *= attenuation;   // 也可不衰减
  diffuse  *= attenuation;
  specular *= attenuation;  
  ```

### 多光源

+ 进到箱子里面用手电筒照射内壁没有聚光效果是因为 `lightDir` 指向箱内，而 `normal` 指向箱外，点积为负，取 0。

##### Last-modified date: 2019.8.13, 10 p.m.