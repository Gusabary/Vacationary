# Learning notes of Week 7

## 2.26 Wed.

+ C++ 单例：

  ```c++
  class Singleton {
  private:
      static Singleton *s;
      Singleton() {}
  public:
      static Singleton *getInstance() {
          if (!s) {
              s = new Singleton();
          }
          return s;
      }
      void print() {
          cout << "hello" << endl;
      }
  };
  
  // 虽然 s 是私有的，但这样访问没有问题，而且这一行是必需的，因为类中的 static 成员需要这样初始化
  Singleton *Singleton::s = nullptr;
  
  int main() {
      // Singleton::s = nullptr;  // 这样访问就不行
      Singleton *s = Singleton::getInstance();
      s->print();
      return 0;
  }
  ```

+ 当 vector 中的元素为对象时，vector 的自动扩容会导致调用拷贝构造和析构：

  ```c++
  vector<Obj> v;
  v.push_back(Obj());
  cout << "-------" << endl;
  v.push_back(Obj());
  cout << "-------" << endl;
  v.push_back(Obj());
  cout << "-------" << endl;
  v.push_back(Obj());
  cout << "-------" << endl;
  ```

  在构造函数、拷贝构造函数以及析构函数中打印相关信息，输出是这样：

  ```
  constructor         // 构造 Obj() 
  copy constructor    // push_back
  destructor          // 析构 Obj()
  -------
  constructor         // 构造 Obj()
  copy constructor    // 自动扩容导致调用拷贝构造
  copy constructor    // push_back
  destructor          // 析构 Obj()
  destructor          // 自动扩容导致调用析构
  -------
  constructor
  copy constructor
  copy constructor
  copy constructor
  destructor
  destructor
  destructor
  -------
  constructor          // 扩容一般是直接翻一倍，3->4 的话不会导致自动扩容
  copy constructor
  destructor
  -------
  destructor           // 析构 vector 中所有对象
  destructor
  destructor
  destructor
  ```

+ 而当 vector 中元素为指向对象的指针时，vector 的自动扩容不会导致调用拷贝构造和析构：

  ```c++
  vector<Obj *> v;
  v.push_back(new Obj());
  cout << "-------" << endl;
  v.push_back(new Obj());
  cout << "-------" << endl;
  v.push_back(new Obj());
  cout << "-------" << endl;
  v.push_back(new Obj());
  cout << "-------" << endl;
  ```

  输出是这样：

  ```
  constructor
  -------
  constructor
  -------
  constructor
  -------
  constructor
  -------
  ```

  可以看到不主动 delete 的话，析构函数也不会被调用。

+ 重载运算符时通过一个空设的 int 形参来区分前自增和后自增：

  ```c++
  T& T::operator++();    // ++a
  T T::operator++(int);  // a++
  ```

  注意前自增返回的是引用，而后自增返回的是值

+ STL list 的实现是一个**双向环状链表**，由于需要遵循 STL 前闭后开的原则 `[begin,end)`，会有一个空的节点置于尾端，而 list 类只需要持有这一个空节点的指针就可以访问到整个链表。

+ STL deque 的实现是一段段定量的连续空间加上一个中控 map，map 中的每个节点都指向一段定量连续空间，称为缓冲区。deque 的迭代器中有四个字段：cur，指示整个 deque 首部或尾部的位置；first，指示该缓冲区的首部；last，指示该缓冲区的尾部；node，指示该缓冲区由 map 中的哪一个节点管理。

  和 STL vector 相比，在起始插入或移除元素的时间复杂度变成了 O(1)，但是随机插入或移除还是 O(n)，随机访问是 O(1)。此外，deque 下标访问需要经过两次指针解引用，一次找到下标所在的节点，一次在该节点指向的缓冲区中定位下标；而 vector 只需经过一次解引用。

+ STL stack 和 queue 称为 container adapter，即可以用某种容器作为底层实现，例如 deque（默认），list。stack 和 queue 不允许遍历，没有迭代器。

+ STL heap 的数据结构是一个二叉堆（完全二叉树），默认是大顶堆，底层使用 vector 实现。heap 不提供遍历功能，没有迭代器操作。

+ STL priority_queue 的默认底层实现是 vector，再加上 heap 的处理规则。不提供遍历功能，没有迭代器操作。

+ slist，单向链表，仅支持首段插入，没有归入 C++ 标准，C++ 11 提供 forward_list，与 slist 类似

+ STL 关联式容器分 set 和 map 两大类。set 和 map 底层都是由红黑树实现。multiset 和 set 唯一的区别是允许 key 重复，multimap 同理。

+ hash_set 和 hash_map 底层由 hash table 实现，hash_multiset 和 hash_set 的区别也是是否允许 key 重复，hash_multimap 同理。使用拉链法处理哈希碰撞。

+ 使用红黑树实现的关联式容器是有序的，插入删除查找的时间复杂度为 O(logn)；而使用哈希表实现的关联式容器是无序的，插入删除查找的时间复杂度为 O(1)

+ 处理哈希碰撞的方法：

  + 开放定址法（open addressing）：从发生冲突的那个单元起，按照一定的次序，从哈希表中找到一个空闲的单元，然后把发生冲突的元素存入到该单元。

  + 拉链法（separate chaining）：将哈希值相同的元素构成一个单链表，并将单链表的头指针存放在哈希表的单元中。

    拉链法中如果链表过长，可以增加哈希表中单元的个数然后重新哈希。

  + 再哈希法：构造多个不同的哈希函数，当产生哈希碰撞时用另外的哈希函数进行计算。

##### Last-modified date: 2020.2.26, 7 p.m.

