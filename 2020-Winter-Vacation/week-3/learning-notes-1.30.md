# Learning notes of Week 3

## 1.30 Thu.

### CMake

+ 通过 `cmake (PATH)` 命令根据指定目录下的 `CMakeLists.txt` 来生成 `Makefile`，再用 `make` 命令进行构建

+ ```cmake
  project(Hello)
  add_executable(hi main.cpp)
  ```

  `CMakeLists.txt` 文件这么写，然后可以以如下命令构建并运行 main.cpp：

  ```bash
  mkdir build
  cd build
  cmake ..
  make hi
  ./hi
  ```

+ 指定 C++ standard：

  ```cmake
  set(CMAKE_CXX_STANDARD 11)
  set(CMAKE_CXX_STANDARD_REQUIRED True)
  ```

+ 当项目有多个目录时，例如

  ```
  |-- util
  |   |-- util.h
  |   |-- util.cpp
  |-- main.cpp
  ```

  可以先在 util 目录下的 `CMakeLists.txt` 中 add library 将其编成一个链接库：

  ```cmake
  add_library(util util.cpp)
  ```

  再在根目录下的 `CMakeLists.txt` 中 add subdirectory 并 link：

  （`add_subdirectory` 命令会执行子目录中的 `CMakeLists.txt`）

  ```cmake
  project(Hello)
  
  add_subdirectory(util)
  add_executable(hi main.cpp)
  
  target_link_libraries(hi PUBLIC util)
  ```

+ 如果说目录结构是这样：

  ```
  |-- include
  |   |-- util.h
  |-- main.cpp
  |-- util.cpp
  ```

  在根目录下的 `CMakeLists.txt` 中 add executable 的时候多 add 一个文件即可：

  ```cmake
  project(Hello)
  add_executable(hi main.cpp util.cpp)
  ```

  如果源文件很多，可以用 `AUX_SOURCE_DIRECTORY` 命令将一个目录下的源文件赋值给某个变量，add executable 的时候直接 add 这个变量即可：

  ```cmake
  project(Hello)
  aux_source_directory(. DIR_SRCS)
  add_executable(hi ${DIR_SRCS})
  ```

+ *references:*

  + <https://cmake.org/cmake/help/latest/guide/tutorial/index.html>
  + <http://derekmolloy.ie/hello-world-introductions-to-cmake/>
  + <https://www.ibm.com/developerworks/cn/linux/l-cn-cmake/index.html>
  + <https://github.com/Veiasai/CTP/blob/master/src/CMakeLists.txt>

##### Last-modified date: 2020.1.30, 8 p.m.