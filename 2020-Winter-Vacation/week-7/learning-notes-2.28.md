# Learning notes of Week 7

## 2.28 Thu.

### STL Allocator

+ STL Allocator 定义了两个配置器，每个配置器都实现了公有方法 allocate, deallocate 以及 reallocate。其中第一级配置器（`__malloc_alloc_template`）的实现较为简单，allocate 直接调用 malloc，deallocate 直接调用 free。而第二级配置器（`__default_alloc_template`）维护了 16 个 free list，负责配置小型的内存区块，以避免内存过于碎片化，当申请的内存大于 128 bytes 时，会调用第一级配置器。

+ STL 中的容器默认使用第二级配置器：

  ```c++
  template <class T, class Alloc = alloc>  // 缺省使用 alloc 为配置器
  class vector {...};
  
  // 令 alloc 为第二级配置器
  typedef __default_alloc_template<__NODE_ALLOCATOR_THREADS, 0> alloc;  
  ```

+ 第一级配置器中还有一个公有方法 `__set_malloc_handler`，接受一个函数指针作为入参，顾名思义，将这个函数设置为 handler，将会在 malloc 或 realloc 返回 null 的时候调用。

+ `stl_alloc.h` 文件中还有两个 allocator：

  + `simple_alloc` 仅做了一层简单的封装，根据模板参数的不同来调用不同的配置器
  + `debug_alloc` 用于调试，会在每次申请内存块的时候多申请一小段用来存放此次申请的内存的大小

+ 第二级配置器的 allocate 方法：当申请空间过大，交给第一级配置器处理。否则 roundup 一下，将需求量上调至 8 的倍数，然后返回相应 free list 的第一个区块。如果相应 free list 没有空闲区块的话，就用 refill 重新填充。

+ 第二级配置器的 deallocate 方法：当释放空间过大，交给第一级配置器处理。否则就将释放的空间插入到相应 free list 的头部。

+ 第二级配置器的 reallocate 方法：当原空间或者新空间过大，就调用 realloc 函数（不知道为什么不是交给第一级配置器处理）。否则先判断原空间和新空间是否属于同一个 free list（即 roundup 后大小是否相同），如果相同就直接返回原空间，不相同的话先调用第二级配置器的 allocate 方法，然后 memcpy，最后调用第二级配置器的 deallocate 方法。

+ 第二级配置器的 refill 方法：private 方法，用于填充某一个 free list

  + 首先调用 chunk_alloc 方法申请内存，默认是申请 20 个区块的大小，如果只申请成功了 1 个区块，就将这个区块直接返回（因为只有 allocate 方法会调用 refill）；
  + 如果还有多余的话，就将这些内存空间分成一个一个区块添加到对应的 free list 后面。

+ 第二级配置器的 chunk_alloc 方法：private 方法，用于申请整数个区块的内存。

  + 如果内存池中的剩余空间满足要求，就修改 start_free 指向的位置并返回申请到的内存的起始地址；
  + 如果剩余空间不满足要求但至少还能申请一个区块，就修改第二个入参（该入参是一个引用，标识成功申请到的区块数）以及 start_free 指向的位置并返回申请到的内存的起始地址；
  + 如果剩余空间连申请一个区块都不能满足，就用 malloc 补充内存池，在此之前要先将剩余空间中的一点点内存作为一个区块分配给对应的 free list 以清空内存池。
  + 如果 malloc 也失败了，就从更大区块的 free list 中取一块下来作为内存池。
  + 如果更大区块的 free list 也没有空闲块了，就调用第一级配置器

+ Allocator 有两个地方实现很精彩，一个是 roundup 函数，还有一个是 free list 节点的数据结构。

+ roundup 函数：

  ```c++
  static size_t _S_round_up(size_t __bytes) { 
      return (((__bytes) + (size_t) _ALIGN-1) & ~((size_t) _ALIGN - 1)); 
  }
  ```

  其实就等价于

  ```c++
  ((__bytes) + (size_t) _ALIGN-1) - ((__bytes) + (size_t) _ALIGN-1) % (size_t) _ALIGN
  ```

  也等价于

  ```c++
  ((__bytes-1) / (size_t) _ALIGN + 1) * (size_t) _ALIGN
  ```

+ free list 是一个链表，其中每一个节点是一个 union：

  ```c++
  union _Obj {
      union _Obj* _M_free_list_link;
      char _M_client_data[1];    /* The client sees this. */
  };
  ```

  在 Allocator free list 的上下文中，`_M_free_list_link` 发挥作用，用来指向链表中下一个节点；而一旦作为一个**单独**的区块被分配出去，`_M_client_data` 就会发挥作用，用来存储数据。（所谓单独的区块是指每次申请要么只获得一个 roundup 大小的区块，要么由第一级配置器处理）

  `_M_client_data` 声明成一个只有一个元素的 char 数组，实质上就表示一段内存，之所以可以这样，是因为 Allocator 在实现的时候刻意让 free list 中相邻的两个 obj 间隔一个区块的大小，这样前一个区块塞满了也不会覆盖到后一个区块。

### 移动构造

+ 直观上，移动构造可以实现 unique_ptr 的赋值：

  ```c++
  unique_ptr<int> p1 = make_unique<int>(3);
  unique_ptr<int> p2 = std::move(p1);  // p2 = p1 是不行的
  ```

##### Last-modified date: 2020.2.28, 5 p.m.