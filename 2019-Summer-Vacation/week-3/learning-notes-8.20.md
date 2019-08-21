# Learning notes of Week 3

## 8.20 Tue.

+ `np.vstack(tup)` 沿着竖直方向将矩阵堆叠起来：

  ```python
  arr1 = np.array([1, 2, 3])
  arr2 = np.array([4, 5, 6])
  res = np.vstack((arr1, arr2))  # [[1, 2, 3], [4, 5, 6]]
  ```

  `np.hstack(tup)` 沿着水平方向将矩阵堆叠起来：

  ```python
  arr1 = np.array([[1, 2], [3, 4], [5, 6]])
  arr2 = np.array([[7, 8], [9, 0], [0, 1]])
  res = np.hstack((arr1, arr2))  # [[1 2 7 8], [3 4 9 0], [5 6 0 1]]
  ```


##### Last-modified date: 2019.8.21, 4 p.m.