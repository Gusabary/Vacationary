# Learning notes of Week 7

## 2.29 Sat.

### STL Algorithm

+ STL Algorithm 中的函数前两个入参一般都是迭代器，表示 `[begin, end)` 中的一段数据

+ [`<numeric>` 头文件](<http://www.cplusplus.com/reference/numeric/>)：

  | 函数名              | 作用                                                         |
  | ------------------- | ------------------------------------------------------------ |
  | accumulate          | 将一段数据累加起来（可自定义二元运算）                       |
  | adjacent_difference | 将一段数据相邻元素作差，结果存放到另一段（可自定义二元运算） |
  | inner_product       | 两段数据作内积（可自定义二元运算）                           |
  | partial_sum         | 将一段数据的前 n 项和存放到另一段（可自定义二元运算）        |
  | iota (C++ 11)       | 从某个值开始，递增地填充一段区域，如 x, x+1, x+2...          |

+ [`<algorithm>` 头文件](<http://www.cplusplus.com/reference/algorithm/>)：

  Non-modifying:

  | 函数名                       | 作用                                                         |
  | ---------------------------- | ------------------------------------------------------------ |
  | all_of / any_of / none_of    | 判断一段数据是否全部满足 / 部分满足 / 全部不满足某一条件     |
  | for_each                     | 将一段数据中的每一个都作为入参调用一遍函数                   |
  | find / find_if / find_if_not | 找一段数据中第一个等于某值 / 满足某条件 / 不满足某条件的元素 |
  | find_end                     | 找一段数据中满足某条件（例如和另一段数据相等）的最后一个子串 |
  | find_first_of                | 找一段数据中满足某条件（例如出现在另一段数据中）的第一个元素 |
  | adjacent_find                | 找一段数据中第一对满足某条件的相邻元素                       |
  | count / count_if             | 数一段数据中某元素 / 满足某条件的元素出现的次数              |
  | mismatch                     | 找两段数据中第一对不匹配的元素（例如不相等或自定义函数返回 false） |
  | equal                        | 判断两段数据中是否每个元素一一匹配（匹配的含义同上）         |
  | is_permutation               | 判断一段数据是否为另一段数据的排列                           |
  | search / search_n            | 找一段数据中满足某条件（例如和另一段数据相等）的第一个子串   |

  Modifying:

  | 函数名                                   | 作用                                                      |
  | ---------------------------------------- | --------------------------------------------------------- |
  | copy / copy_n / copy_if / copy_backward  | 将一段数据（前 n 个 / 满足条件的元素 / 后向）拷贝到另一段 |
  | move / move_backward                     | 将一段数据（前向 / 后向）移动到另一段                     |
  | swap（C++ 11 后在 `<utility>` 头文件中） | 交换两个容器的元素                                        |
  | swap_ranges                              | 交换两段数据                                              |
  | iter_swap                                | 交换两个迭代器所指的元素                                  |
  | transform                                | 将一段（或两段）数据经过某函数作用后存放于另一段          |
  | replace / replace_if                     | 将一段数据中某元素（或满足条件的元素）替换为新值          |
  | replace_copy / replace_copy_if           | 同上，但不是就地修改，而是在拷贝出来的数据上修改          |
  | fill / fill_n                            | 以某值填充一段数据（的前 n 个）                           |
  | generate / generate_n                    | 以某函数的返回值填充一段数据（的前 n 个）                 |
  | remove / remove_if                       | 将一段数据中某元素（或满足条件的元素）删去                |
  | remove_copy / remove_copy_if             | 同上，但不是就地删除，而是在拷贝出来的数据上删除          |
  | unique / unique_copy                     | 将一段数据中连续重复（或满足某条件）的元素变成一个        |
  | reverse / reverse_copy                   | 翻转一段数据中的元素                                      |
  | rotate / rotate_copy                     | 将一段数据的后面一部分放到前面一部分的前面                |
  | random_shuffle / shuffle                 | 将一段数据顺序打乱                                        |

  Partitions:

  | 函数名           | 作用                                                       |
  | ---------------- | ---------------------------------------------------------- |
  | is_partitioned   | 判断一段数据中是否满足某条件的元素全部位于不满足的元素之前 |
  | partition        | 划分一段数据，将满足某条件的元素全部置于不满足的元素之前   |
  | stable_partition | 稳定划分，不会改变两部分数据内部的有序性                   |
  | partition_copy   | 稳定划分，将划分后的数据放在两个不同的地方                 |
  | partition_point  | 传入一段已划分好的数据，输出两部分的分界点                 |

  Sorting:

  | 函数名            | 作用                                                         |
  | ----------------- | ------------------------------------------------------------ |
  | sort              | 排序一段数据                                                 |
  | stable_sort       | 稳定排序一段数据                                             |
  | partial_sort      | 部分排序一段数据（例如 n 个元素中的前 k 个是最小且升序的）   |
  | partial_sort_copy | 将一段数据排好序后前 k 个拷贝到另一段（不真的对 n 个元素都排序） |
  | is_sorted         | 检查一段数据是否有序                                         |
  | is_sorted_until   | 找一段数据中第一个破坏有序性的元素                           |
  | nth_element       | 重排一段数据，使得某个位置左边的元素都比他小，右边的元素都比他大 |

  Binary search (mostly operating on **sorted ranges**):

  | 函数名                    | 作用                                                       |
  | ------------------------- | ---------------------------------------------------------- |
  | lower_bound / upper_bound | 找到一段有序数据中某个元素最早（最晚）出现的位置（后一位） |
  | equal_range               | 找到一段有序数据中某个元素出现的范围                       |
  | binary_search             | 判断一段有序数据中是否存在等于（大于 / 小于）某值的元素    |

  Merge (operating on **sorted ranges**):

  | 函数名                   | 作用                               |
  | ------------------------ | ---------------------------------- |
  | merge / inplace_merge    | （就地）归并                       |
  | includes                 | 判断一段数据是否完全包含另一段数据 |
  | set_union                | 求并集                             |
  | set_intersection         | 求交集                             |
  | set_difference           | 求差集                             |
  | set_symmetric_difference | 求对称差                           |

  Heap:

  | 函数名        | 作用                               |
  | ------------- | ---------------------------------- |
  | push_heap     | 向堆中加入一个元素                 |
  | pop_heap      | 从堆顶弹出一个元素                 |
  | make_heap     | 建堆                               |
  | sort_heap     | 将一个堆重排成有序数组             |
  | is_heap       | 判断一段数据是否构成一个堆         |
  | is_heap_until | 找一段数据中第一个破坏堆性质的元素 |

  Min / Max:

  | 函数名                                     | 作用                              |
  | ------------------------------------------ | --------------------------------- |
  | min / max / minmax                         | 取小 / 取大 / 两个都取，返回 pair |
  | min_element / max_element / minmax_element | 从一段数据中取                    |

  Other:

  | 函数名                              | 作用                                |
  | ----------------------------------- | ----------------------------------- |
  | lexicographical_compare             | 按字典序比较两段数据                |
  | next_permutation / prev_permutation | 找（按字典序的）后一个 / 前一个排列 |

### explicit

+ C++ 中的 explicit 关键字只能用来修饰单参构造函数，以标识该构造函数只能显式调用。所谓显式调用是指在实例化时用括号的方式而非赋值：

  ```c++
  A a(3);   // 显式
  A a = 3;  // 隐式
  ```

+ 修饰空参或多参构造函数没有意义，因为它们本来也就只能显式调用。

##### Last-modified date: 2020.2.29, 5 p.m.