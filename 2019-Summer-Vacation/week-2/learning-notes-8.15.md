# Learning notes of Week 2

## 8.15 Thu.

+ 切片：`[start:end:step]` ，当 step 为负值时，从右向左取。

+ 列表增删操作：

  ```python
  list.append(3)       # 在末尾加上 3
  list.insert(1, 3)    # 在index = 1 处添上3
  list.remove(3)       # 删除第一个 3
  del list[3]          # 删除 index = 3 处的元素
  ```

+ 列表复制操作：

  ```python
  fruits2 = fruits     # 没有复制列表只创建了新的引用
  fruits2 = fruits[:]  # 可以通过完整切片操作来复制列表
  ```

+ 列表排序操作：

  ``` python
  list2 = sorted(list)     # list 不会被修改
  list.sort(reverse=True)  # 直接在 list 上排序
  ```

+ 集合操作：

  ```python
  set.add(3)         # 添加元素 3
  set.update([4, 5]) # 添加元素 4，5
  set.discard(3)     # 删除元素 3
  set1 & set2        # 交集
  set1 | set2        # 并集
  set1 - set2        # 差集
  set1 ^ set2        # 对称差
  set2 <= set1       # 判断子集 / 超集
  ```

+ `@property` 装饰器

  ```python
  class Person(object):
      
      # 访问器 - getter方法
      @property
      def age(self):
          return self._age
  
      # 修改器 - setter方法
      @age.setter
      def age(self, age):
          self._age = age
      ...    
  
  person.age = 22
  ```

+ > 如果我们需要限定自定义类型的对象只能绑定某些属性，可以通过在类中定义 `__slots__` 变量来进行限定。需要注意的是 `__slots__` 的限定只对当前类的对象生效，对子类并不起任何作用：
  >
  > ```python
  > class Person(object):
  > 
  >     # 限定Person对象只能绑定_name, _age和_gender属性
  >     __slots__ = ('_name', '_age', '_gender')
  > 
  >     def __init__(self, name, age):
  >         self._name = name
  >         self._age = age
  >     ...
  >     
  > person._gender = '男'
  > ```

+ `@staticmethod` 注解静态方法：

  ```python
  @staticmethod
  def is_valid(a, b, c):
      return a + b > c and b + c > a and a + c > b
  ```

+ `@classmethod` 注解类方法：

  ```python
  @classmethod
  def now(cls):
      ctime = localtime(time())
      return cls(ctime.tm_hour, ctime.tm_min, ctime.tm_sec)
  ```

+ 继承：

  ```python
  class Person(object):
  class Student(Person):
  class Teacher(Person):
  ```

+ > 如果一个类中存在抽象方法那么这个类就不能够实例化（创建对象）。

+ json 模块主要有四个比较重要的函数，分别是：

  - `dump` - 将Python对象按照JSON格式序列化到文件中
  - `dumps` - 将Python对象处理成JSON格式的字符串
  - `load` - 将文件中的JSON数据反序列化成对象
  - `loads` - 将字符串的内容反序列化成Python对象

##### Last-modified date: 2019.8.15, 11 p.m.