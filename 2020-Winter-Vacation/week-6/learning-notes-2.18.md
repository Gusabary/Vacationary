# Learning notes of Week 6

## 2.18 Tue.

+ 互斥共享的资源称为**临界资源**，在同一时刻只允许一个进程访问，例如打印机。

+ 虚拟技术：时分复用（CPU 时间片），空分复用（虚拟内存）

+ 异常大致分为三类：

  + interrupt，（外）中断，由 CPU 执行指令以外的事件引起，比如 I/O，时钟
  + trap，陷入，调用 system call
  + fault，故障，比如地址越界，缺页等等，细分可分为可恢复的故障和不可恢复的故障（abort）

+ tar：

  ```bash
  tar [-zcv] [-f 新建的 tar 文件] filename...  # 打包压缩
  tar [-ztv] [-f 已有的 tar 文件]              # 查看内容
  tar [-zxv] [-f 已有的 tar 文件] [-C 目录]     # 解压缩
  ```

  `-z` 表示使用 zip 进行压缩

+ 双引号内的特殊字符可以**保留原本特性**，单引号内的特殊字符就是**特殊字符本身**：

  ```bash
  echo "lang is $LANG"
  # lang is en_US.UTF-8
  echo 'lang is $LANG'
  # lang is $LANG
  ```

+ `cut` 指令也可以用来截取输出信息，可以精细到第几个字符的粒度（awk 处理的最小单位是字段）

+ `uniq` 指令可以将重复的输出信息压缩成一个

+ `tee` 指令可以将输出信息同时显示在屏幕上以及重定向到文件中

##### Last-modified date: 2020.2.18, 7 p.m.