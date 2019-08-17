# Learning notes of Week 2

## 8.17 Sat.

+ 简单选择排序：`O(n^2)`，外层循环每迭代一次就找出一个待排序数组中的最小值。

  高质量冒泡排序（搅拌排序）：`O(n^2)`，外循环每迭代一次就找出一个待排序数组中的最小值和最大值分别放在首尾。

  归并排序（分治法）：`O(nlogn)`，要做 `logn` 次二分，对于每一次二分，做一次（等价于）遍历全表的归并。

  快速排序：`O(nlogn)`，划分的策略不是简单的二分，而是取待排序数组的末尾元素作为枢轴，比枢轴小的排在左边，比枢轴大的排在右边，然后交换枢轴和大小边的分界，这样枢轴左边都是比枢轴小的，而右边都是比枢轴大的，这一步对复杂度的贡献是 n。然后对于左半边和右半边再重复此步骤，对复杂度贡献为 logn。

+ > 生成式（推导式）可以用来生成列表、集合和字典：
  >
  > ```python
  > prices2 = {key: value for key, value in prices.items() if value > 100}
  > ```

+ ```python
  list = list(map(lambda x: x ** 2, filter(lambda x: x % 2, range(1, 10))))
  ```

  在 map 前加 list，不然 print 出来是地址。

+ > Python搜索变量的LEGB顺序（Local --> Embedded --> Global --> Built-in）

+ 装饰器：装载装饰器的过程，相当于执行了 `test = dec1(dec2(test))`：

  ```python
  @dec1  
  @dec2  
  def test():  
      print("test test")  
  ```

+ > Python使用了自动化内存管理，这种管理机制以**引用计数**为基础，同时也引入了**标记-清除**和**分代收集**两种机制为辅的策略。

##### Last-modified date: 2019.8.17, 11 p.m.


