# Learning notes of Week 4

## 2.7 Fri.

+ Animator 组件中的 Apply Root Motion 是说放映动画时根对象是否可以运动。例如将这个属性禁用掉，在放映 walk 动画的时候，每一帧结束游戏对象都会返回一开始的位置。
+ Update 用于渲染，频率不确定；FixedUpdate 用于物理计算，频率默认为每秒调用 50 次。可以将 Animator    通过物理循环适时运行，避免动画和物理之间发生冲突。（将 Animator 组件的 Update Mode 设为 Animate Physics）
+ OnAnimatorMove 方法可以用来更改从 Animator 中应用根运动的方式。
+ 如果一个拥有 Collider 组件的游戏对象想要移动，需要加上 Rigidbody 组件，但是注意，Rigidbody 组件的 IsKinematic 属性必须禁用，否则不会有碰撞检测。
+ Collider 组件中的 IsTrigger 属性启用后碰撞体将变成触发器。
+ Nav Mesh Agent 组件使游戏对象在烘焙出的导航网格中移动。
+ 音频有两种：非剧情音频（BGM）和剧情音频（有可识别的音源）。音频在 Unity 中的工作方式包括三个部分：
  + 音频剪辑：即 MP3 之类的音频资源，包含于特定声音相关的所有数据。
  + 音频源：一种组件，用来标识发出声音的对象。
  + 音频监听器：一种组件，类似于玩家的虚拟耳朵，默认情况下位于主摄像机上。

##### Last-modified date: 2020.2.7, 8 p.m.



