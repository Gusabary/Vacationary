# Learning notes of Week 3

## 1.28 Tue.

### vector

+ `vector` 有三个用来标识位置的指针：`_M_start`, `_M_finish` 以及 `_M_end_of_storage`，它们的关系如下：

  ```
    <-----------capacity------------->
    <-----size----->
    |---------------------------------|-|
    |*|*|*|*|*|*|*|*| | | | | | | | | | |
    |---------------------------------|-|
     ^               ^                 ^
     |               |                 |
  _M_start       _M_finish     _M_end_of_storage
  ```

  在 64 位机器上，`sizeof(vector<>)` 是 24，即三个指针的大小。

+ `reserve()` 的实现是先判断传进来的 capacity 是否比旧 capacity 大，即是否真的需要扩容，如果是的话，就分配新空间，拷贝数据，析构原有的数据：

  ```c++
  void reserve(size_type __n) {
      if (capacity() < __n) {
        const size_type __old_size = size();
        // 分配空间，拷贝数据
        iterator __tmp = _M_allocate_and_copy(__n, _M_start, _M_finish);
        // 析构旧数据
        destroy(_M_start, _M_finish);
        _M_deallocate(_M_start, _M_end_of_storage - _M_start);
        // 调整位置指针
        _M_start = __tmp;
        _M_finish = __tmp + __old_size;
        _M_end_of_storage = _M_start + __n;
      }
  }
  ```

+ 用 `resize()` 的时候一般只传一个 size 进去，实际上的实现是：

  ```c++
  void resize(size_type __new_size) { resize(__new_size, _Tp()); }
  void resize(size_type __new_size, const _Tp& __x) {
      if (__new_size < size()) 
        erase(begin() + __new_size, end());
      else
        insert(end(), __new_size - size(), __x);
  }
  ```

  会加上一个模板类型的默认构造函数作为第二个参数，当新 size 小于旧 size 时 erase，否则 insert 这个默认构造函数构造出来的东西。

+ `swap()` 实际上仅仅交换了两个 vector 的 `_M_start`, `_M_finish` 以及 `_M_end_of_storage`

+ `_M_insert_aux()` 辅助函数用来在某个位置插入某个值，会在 `push_back()` 和 `insert()` 中被用到，有两个重载：

  ```c++
  void vector<_Tp, _Alloc>::_M_insert_aux(iterator __position, const _Tp& __x);
  void vector<_Tp, _Alloc>::_M_insert_aux(iterator __position);
  ```

  前者在 `__position` 前插入 `__X`，后者插入 `_Tp` 的默认构造函数构造出来的数据。

  先判断是否剩余备用空间（`_M_finish` 是否等于 `_M_end_of_storage`），如果剩余，就 `copy_backward` 从 `__position` 到 `_M_finish-1` 的这段数据（从后往前拷贝）：

  ```c++
  if (_M_finish != _M_end_of_storage) {
      construct(_M_finish, *(_M_finish - 1));
      ++_M_finish;
      // 入参 __x 是常量引用，直接把它赋值给 *__position 的话会导致之后 *__position 也变成常量
      _Tp __x_copy = __x;
      copy_backward(__position, _M_finish - 2, _M_finish - 1);
      *__position = __x_copy;
  }
  ```

  但是为什么要先 `construct` 一下说实话我没明白。

  如果不剩余，就先扩容至两倍原大小，然后 `uninitialized_copy` `__position` 前的数据，插入 `__x`，再 `uninitialized_copy` `__position` 后的数据，最后析构并释放空间：

  ```c++
  else { // 没有备用空间
      const size_type __old_size = size();
      const size_type __len = __old_size != 0 ? 2 * __old_size : 1;
      iterator __new_start = _M_allocate(__len);
      iterator __new_finish = __new_start;
      __STL_TRY {
        __new_finish = uninitialized_copy(_M_start, __position, __new_start);
        construct(__new_finish, __x);
        ++__new_finish;
        __new_finish = uninitialized_copy(__position, _M_finish, __new_finish);
      }
      __STL_UNWIND((destroy(__new_start,__new_finish), 
                    _M_deallocate(__new_start,__len)));
      destroy(begin(), end());
      _M_deallocate(_M_start, _M_end_of_storage - _M_start);
      _M_start = __new_start;
      _M_finish = __new_finish;
      _M_end_of_storage = __new_start + __len;
  }
  ```

  `uninitialized_copy()` 本质上就是一个 `memmove()`

+ `uninitialized_copy()` 用于将数据拷到已分配了空间而未初始化的地址上，实现是 `memmove()`

  `copy_backward()` 用于将数据拷到原先已经有数据的地址上，实现是一个从后向前的 for 循环

+ `vector` 判等的重载比较的是两个 vector 的 `size` 以及其中的每个元素是否相等：

  ```c++
  template <class _Tp, class _Alloc>
  inline bool operator==(const vector<_Tp, _Alloc>& __x, const vector<_Tp, _Alloc>& __y)
  {
    	return __x.size() == __y.size() && equal(__x.begin(), __x.end(), __y.begin());
  }
  ```

+ `vector` 小于的重载比较的是两个 vector 各元素的字典序，此外如果 v1 比 v2 短，则认为 v1 小于 v2：

  ```c++
  template <class _Tp, class _Alloc>
  inline bool operator<(const vector<_Tp, _Alloc>& __x, const vector<_Tp, _Alloc>& __y)
  {
  	return lexicographical_compare(__x.begin(), __x.end(), __y.begin(), __y.end());
  }
  
  template <class _InputIter1, class _InputIter2>
  bool lexicographical_compare(_InputIter1 __first1, _InputIter1 __last1,
                               _InputIter2 __first2, _InputIter2 __last2) {
    // ...
    for ( ; __first1 != __last1 && __first2 != __last2
          ; ++__first1, ++__first2) {
      if (*__first1 < *__first2)
        return true;
      if (*__first2 < *__first1)
        return false;
    }
    return __first1 == __last1 && __first2 != __last2;
  }
  ```

### new

+ `operator new` 作为一个 global namespace 下的普通函数，有三个重载：

  ```c++
  void* operator new (std::size_t size);
  void* operator new (std::size_t size, const std::nothrow_t& nothrow_value) noexcept;
  void* operator new (std::size_t size, void* ptr) noexcept;
  ```

  可以直接被这样调用：

  ```c++
  MyClass * p = (MyClass*) ::operator new (sizeof(MyClass));
  ```

  + 第一种叫 throwing allocation，如果分配失败会抛一个 `bad_alloc` 的异常，分配成功就返回新分配空间的起始地址。
  + 第二种叫 nothrow allocation，如果分配失败不会抛异常而是返回一个 null，分配成功就返回新分配空间的起始地址。
  + 第三种叫 placement，需要 include `<new>`，不会试图分配空间，而是仅仅返回 ptr（看上去没啥用，但是用在 new-expression 中还是很有用的）

+ 以上讲的是直接调用 `operator new` 这个函数时它的行为，如果用在 new-expression 中会有所不同：首先会以普通函数的形式调用 `operator new`，这一步如上所述，如果成功会调用 new-expression 中类的构造函数，构造到刚才 `operator new` 返回的地址中，最后返回一个相应类型的指针。

  + 第一种是最简单的 new-expression：

    ```c++
    MyClass * p1 = new MyClass;
    // allocates memory by calling: operator new (sizeof(MyClass))
    // and then constructs an object at the newly allocated space
    ```

  + 第二种需要在 new 后面加上 `(std::nothrow)`：

    ```c++
     MyClass * p2 = new (std::nothrow) MyClass;
    // allocates memory by calling: operator new (sizeof(MyClass), std::nothrow)
    // and then constructs an object at the newly allocated space
    ```

  + 第三种需要在 new 后面加上一个地址：

    ```c++
    new (p2) MyClass;
    // does not allocate memory -- calls: operator new (sizeof(MyClass), p2)
    // but constructs an object at p2
    ```

+ 总结一下就是仅仅调用 `::operator new` 是分配空间（第三种除外），而 new-expression 则是分配空间加构造对象，前两种是在分配的新空间上构造，第三种是在指定的地址构造。

+ [*reference*](<http://www.cplusplus.com/reference/new/operator%20new/>)

### 二叉搜索树（BST）

+ 对于每个节点，左子树中所有值均小于自己，右子树中所有值均大于自己。**中序遍历**一棵 BST，即能得到有序的数据。
+ 所以对于**查找**来说，将相当于是根据中序遍历的结果进行操作：
  + 查找指定 key：当前节点小于 key，向右查找，否则向左查找。
  + 查找最小 key：不停向左查找。
  + 查找后继：右子树的最左节点；如果没有右子树，则向上查找直到自己所在的子树是某个节点的左子树。
+ **插入**：从根节点开始，当前节点小于待插入的值，就向右，否则向左，直到遇见 null 为止，就是正确的插入位置。
+ **删除**分三种情况：
  + 待删除的节点没有儿子：直接删除
  + 待删除的节点有一个儿子：将儿子提升到被删除的节点原来的位置
  + 待删除的节点有两个儿子：找到被删除节点的后继，将其提升到被删节点原来的位置。（相当于将后继提升上来再删除后继）
    + 如果后继就是右儿子，就直接将右儿子提升上来
    + 如果后继不是右儿子，先将后继提升上来，再将后继的右子树变成后继原先父节点的左子树（后继一定是其原先父节点的左儿子，且自己没有左儿子）
+ BST 操作的时间复杂度和树高成正比，最坏情况下会退化成链表，时间复杂度也就退化成了 O(n)，有很多改进版的 BST 可以让树尽量平衡，比如 SBT，AVL 树，红黑树。
+ [*reference*](<https://lufficc.com/blog/binary-search-tree>)

### Size Balanced Tree（SBT）

+ 平衡树的一种，通过保证每棵子树的大小大于其**侄子**子树的大小来保证平衡，即

  ```
  s[T.right] ≥ s[T.left.left], s[T.left.right]
  s[T.left] ≥ s[T.right.right], s[T.right.left]
  ```

+ 保证不了任一节点对应的两棵子树的最大高度差为 1，反例：

  ```
                           o
                          / \
                         /   \
                        /     \
                       /       \
  					A         o   
                     / \       / \
                    /   \     /   \
                   o     o   B     o
                            /       \
                           o         o
                          /           \
                         o             o
  ```

  如 A 节点对应的子树大小为 3，B 节点是 A 节点的侄子，对应的子树大小也为 3。但是根节点的左右两棵子树高度差为 2。

  问题在于只限制了子树的大小关系，一棵子树可以每层铺满，像完全二叉树那样，而另一棵可以一直往下长，这两棵子树虽然大小接近，但是高度会越差越大。

### AVL Tree

+ 任何一个节点的左右两棵子树高度差不能超过 1。

+ 定义某节点的**平衡因子**为该节点左子树高度减去右子树高度，显然 AVL 树的任意节点平衡因子绝对值小于等于 1。

+ 在插入节点时，可能会导致多个节点失衡（平衡因子绝对值大于 1），找到**最小失衡子树**，将其旋转以达到重新平衡：

  + 如果左子树比右子树高，就右旋：右旋节点的左儿子上升到右旋节点的位置，左儿子的右子树变成右旋节点的左子树，右旋节点变成原先左儿子的右儿子。
  + 如果右子树比左子树高，就左旋。

+ 但有时仅旋转一次是不够的，而且也不能只旋转失衡子树，考虑这样一棵树：

  ```
                  A                        A                          E
                 / \                      / \                        / \
                B   C                    E   C                      B   A
               / \           -->        /               -->        / \   \
              D   E                    B                          D   F   C
                 /                    / \
                F                    D   F
  ```

  节点 F 的插入导致节点 A 成为最小失衡节点，试图右旋 A，但是发现旋转完了以后 B 又失衡了。所以正确的旋转方式是先左旋 B（尽管一开始 B 并没有失衡），然后再右旋 A。

+ 总结一下，有四种旋转方式，对应着四种由插入导致的平衡被破坏的情况：

  | 插入方式                 | 旋转方式                   |
  | ------------------------ | -------------------------- |
  | 插到左儿子的左子树（LL） | 右旋根节点                 |
  | 插到右儿子的右子树（RR） | 左旋根节点                 |
  | 插到左儿子的右子树（LR） | 先左旋左儿子，再右旋根节点 |
  | 插到右儿子的左子树（RL） | 先右旋右儿子，再左旋根节点 |

  表格中的*根节点*即为最小失衡子树的根节点。

+ 删除的情况和 BST 一样，删除后如果失衡了需要重新平衡，按照上述表格操作即可。

+ [*reference*](<https://zhuanlan.zhihu.com/p/56066942>)

### 红黑树

+ 红黑树中，

  + 每个节点要么是红色，要么是黑色
  + 根节点是黑色
  + 红色节点不能连续（即红色节点儿子必须是黑色）
  + 对于任一节点，从该节点向下遍历至任一叶子节点所经过的黑色节点个数必须相等。

+ 红黑树能保证任意节点左右两棵子树中，高的那个也不会比矮的那个两倍还高。可以这么理解，左右两棵子树遍历到叶子节点的路径要确保黑色节点个数相同，而红色节点又不能连续，所以最长路径是**一黑一红**交叉出现，而最短路径是**全黑**，所以长的路径最多是短的路径的两倍长。

+ 红黑树中新插入的节点一定是红色的，如果插到黑色节点上，没有违反任何一条性质，不用修复；如果插到红色节点上，需要根据不同情况进行修复（先将新插入的节点标为待修复节点，并假设父节点为祖父节点的左儿子（若为右儿子由对称性同理可得））：

  + 待修复节点的父节点为红色，叔叔节点也为红色：将父亲和叔叔节点都改为黑色，祖父节点改为红色，并将祖父节点标记为待修复节点。
  + 待修复节点的父节点为红色，叔叔节点不存在或为黑色（其实空节点也算黑色节点），且待修复节点是其父节点的右儿子：将父节点标记为待修复节点，然后左旋父节点。
  + 待修复节点的父节点为红色，叔叔节点不存在或为黑色，且待修复节点是其父节点的左儿子：将父节点改为黑色，祖父节点改为红色，并右旋祖父节点。

  重复上述过程直到待修复节点的父节点变成黑色（待修复节点永远为红色）。需要注意的是第二种修复手段执行后必须立刻第三种修复手段再进行下一次是否需要修复的判断（即修复二的结果必将导致修复三的条件出现）：

  ```
                                   |-------> 1 ----->|
                                   |                 |
                              ---->|--> 2 ---|       |---->
                              ^    |         v       |    |
                              |    |-------> 3 ----->|    |
                              |                           v
                              <----------------------------
  ```

+ 从红黑树中删除一个节点比较麻烦，前面说过 BST 的删除分三种情况：

  + 待删除节点没有儿子：如果该节点是红色节点，正常删除，不需要修复；如果该节点是黑色节点，将该节点被删后留下的空节点标记为待修复节点。
  + 待删除节点有一个儿子：如果该节点是红色节点，正常删除并将儿子节点接上来，不需要修复；如果该节点是黑色节点，删掉并将儿子节点接上来后，将儿子节点标记为待修复节点。
  + 待删除节点有两个儿子：这种情况本质上是将待删节点的后继提升上来再删除后继，而后继提升上来以后只要**继承被删节点的颜色**，则被删节点局部的颜色其实没有发生改变，所以这个问题可以化归成删除后继节点，又因为后继节点没有没有左儿子，所以实际上就是*待删节点只有一个儿子*的情况。

  总结一下就是 BST 删除的三种情况可以化归成两种，但是细看一下第一种和第二种好像也没啥区别，所以结论就是如果被删节点是红色的，正常删除，不需要修复；如果被删节点是黑色的，删除并将**删除操作发生的节点**标记为待修复节点（第一种情况删除发生在叶子节点，被删后待修复节点标记在空节点上；第二种情况删除发生在有一个儿子节点的父节点，被删后待修复节点标记在提升上来的儿子节点上）。下面进行修复。

+ 修复的最终目标是**将被顶替的黑色节点中的黑色赋给另外的节点**以达到平衡。

  首先，如果待修复节点是根节点或者红色节点，直接涂黑，完成修复（也即红 + 黑修复成黑）。

  如果待修复节点是黑色节点（即黑 + 黑），就不能将这个多余的黑色赋给自己，需要另寻别的节点，分四种情况：

  + 待修复节点的兄弟节点是红色：此时父节点必为黑色，交换父节点和兄弟节点的颜色并左旋父节点（左旋父节点导致兄弟节点的一个孩子跑到自己这里来了，因为兄弟节点是红色，所以其孩子是黑色，这一步相当于抢了兄弟节点一个黑色孩子）
  + 待修复节点的兄弟节点是黑色，且兄弟节点的儿子均为黑色：将兄弟节点涂红，待修复节点变为父节点（即底下这一层子树修复好了，向上修复）
  + 待修复节点的兄弟节点是黑色，且兄弟节点的儿子左红右黑：交换兄弟节点和兄弟节点左儿子的颜色并右旋兄弟节点（为了方便第四步操作）
  + 待修复节点的兄弟节点是黑色，且兄弟节点右儿子为红色：将兄弟节点的黑色给他的右儿子，将父节点的颜色给兄弟节点，将自己多余的黑色给父节点（注意这一步多余的黑色已经给出去了，所以修复必然结束）

  如此循环直到待修复节点变成根节点或者红色节点，循环结束后将待修复节点涂黑，完成修复。整个循环大致是这样：

  ```
                      |<------------------------------------
                      |                                    ^
                      |   |---> 1 ---|  |-------> 2 ------>|
                      v   |          v  |                  |
                      ---------------------> 3 ---|        |
                                        |         v        v
                                        |-------> 4 --------->
  ```

  只可能由第二步或第四步导致循环退出，因为第二步中会上移待修复节点，第四步中会直接给掉多余的黑色（可以通过将待修复节点赋成根节点来强制退出循环）

  需要注意的是空节点也被认为是黑色节点，将空节点涂红它还是空节点，且上述方法适用于待修复节点为其父节点的左儿子的情况，若为右儿子由对称性同理可得。

+ *references:*

  + [JavaGuide](<https://github.com/Snailclimb/JavaGuide/blob/master/docs/dataStructures-algorithms/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.md#6-%E7%BA%A2%E9%BB%91%E6%A0%91>)
  + [源码参考](<https://www.programiz.com/dsa/red-black-tree>)
  + [插入参考](<https://blog.csdn.net/v_july_v/article/details/6105630>)
  + [删除参考](<https://blog.csdn.net/ChinaLeeSunnyBoy/article/details/79525456>)

##### Last-modified date: 2020.2.5, 4 p.m.

