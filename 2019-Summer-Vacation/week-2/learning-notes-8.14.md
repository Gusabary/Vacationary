# Learning notes of Week 2

## 8.14 Wed.

### Assimp

下了几个版本的 assimp，3.0 的在 CMake configure 的时候说我没有 directX （其实好像是有的），4.0 的 CMake 没有问题，但是在 `mingw32-make` 的时候说找不到某个 .dll 文件，然后 5.0 的在 CMake configure 的时候说我的 MinGW 版本太低，要 7 以上。我把版本限制导致报错的代码删了，CMake 可以过但是之后会说 too many sections 之类的错误。然后我就去下 8.0 的 MinGW，下是下下来了，但是我又不知道去哪下 `mingw32-make`。

用的 vs code，VS 没试，丢人。

### Python

+ 单行注释 - 以 # 开头，多行注释 - 三个引号开头，三个引号结尾。

+ 数据类型：整型（只有 int），浮点型，字符串型（单双引号都可以），布尔型（True，False），复数型（3+5j）

+ `//` 整除，`**` 乘方，逻辑运算符是 `not`, `and`, `or`，而不是 `!`, `&&`, `||` 。

+ 使用 `input()` 函数获取键盘输入：

  ```python
  a = int(input('a = '))
  ```

+ 用占位符格式化输出的字符串：

  ```python
  print("%d + %d = %d" % (a, b, a + b))
  ```

+ > 和 C/C++、Java 等语言不同，Python 中没有用花括号来构造代码块而是使用了**缩进**的方式来设置代码的层次结构。

+ `if` - `elif` - `else` :

  ```python
  if x > 1:
      y = 3 * x - 5
  elif x >= -1:
      y = x + 2
  else:
      y = 5 * x + 3
  ```

+ ```python
  for x in range(101):
      sum += x
  ```

  - `range(101)`可以产生一个0到100的整数序列。
  - `range(1, 100)`可以产生一个1到99的整数序列。
  - `range(1, 100, 2)`可以产生一个1到99的奇数序列，其中的2是步长，即数值序列的增量。

+ 可以通过 `print('*', end='')` 这种方式让输出不换行。

+ 传递参数时可以不按照设定的顺序进行传递：

  ```python
  def add(a=0, b=0, c=0):
      return a + b + c
  print(add(c=50, a=100, b=200))
  ```

+ >```python
  ># 在参数名前面的*表示args是一个可变参数
  ># 即在调用add函数时可以传入0个或多个参数
  >def add(*args):
  >    total = 0
  >    for val in args:
  >        total += val
  >    return total
  >
  >print(add())
  >print(add(1))
  >print(add(1, 2))
  >print(add(1, 2, 3))
  >print(add(1, 3, 5, 7, 9))
  >```

##### Last-modified date: 2019.8.14, 9 p.m.

