# Learning notes of Week 3

## 8.21 Wed.

+ 昨天用 pip 捣鼓了半天 numpy 和虚拟环境，结果还是导入不了，今天用 conda 试了一下就可以了。

  *[vscode 使用 conda 虚拟环境](<https://blog.csdn.net/SpuerCheng/article/details/81485154>)* 

+ 在梯度下降的迭代中做 theta 的赋值时需要注意用深复制：

  ```python
  while cur_iter < n_iters:
      gradient = dJ(theta, x_b, y)
      last_theta = theta.copy()  # 非常重要，不然浅复制，只迭代一次就退出了
      theta -= eta * gradient  # 浅复制的话这一行会导致 last_theta 也发生改变
      if (abs(J(theta, x_b, y) - J(last_theta, x_b, y)) < epsilon):
          break
          cur_iter += 1
  ```

+ 求损失函数的梯度是对每个参数求偏微分，而不是 x 。

+ 在[*误差从哪来？*](<https://datawhalechina.github.io/leeml-notes/#/chapter5/chapter5>)一节中，多次提到的偏差和方差是说训练出的不同的模型对同一组测试数据的表现，而不是说同一个模型对许多组测试数据的表现（r2_score）。

##### Last-modified date: 2019.8.21, 4 p.m.