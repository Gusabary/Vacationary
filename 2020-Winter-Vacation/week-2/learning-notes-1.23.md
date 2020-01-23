# Learning notes of Week 2

## 1.23 Thu.

### Git 工具

#### 高级合并

+ `git merge --abort` 可以在合并产生冲突时退回到合并以前

+ `git merge -X` 可以指定合并策略的某些选项，例如忽略空白修改

+ 手动合并文件：在产生冲突时暂存区中会有冲突文件三个阶段的副本，stage 1 是共同祖先版本（该文件没有共同祖先的话就没有这个阶段），stage 2 是你的版本，stage 3 是即将并入的版本（theirs），可以用如下方式拷贝出这三个文件：

  ```bash
  git show :1:filename > filename.common
  git show :2:filename > filename.ours
  git show :3:filename > filename.theirs
  ```

  `:1:filename` 是该文件 blob 对象的 hash 简写。

  然后经过一番操作解决了冲突以后，可以用 `git merge-file -p filename.ours filename.common filename.theirs` 进行合并。

+ 在产生冲突时可以检出不同样式的冲突文件，例如 `git checkout --conflict=diff3` 不仅可以显示两边的更改，还能显示共同祖先版本

+ 可以用 `git log --left-right HEAD...MERGE_HEAD` 查看两个分支分叉后的提交记录，甚至可以加上 `--merge` 选项过滤出和冲突文件有关的提交

+ `git revert (commit)` 将某次 commit 的父提交所指向的树对象作为新提交的树对象，如果该次 commit 是由 merge 产生的 commit，需要使用 `-m` 选项指定使用第一父提交还是第二父提交所指向的树对象。

+ 合并策略和某个合并策略的选项是两个不同的概念，前者用 `-s` 指定，后者用 `-X` 指定。

  例如 recursive 策略的 ours 选项是说有冲突时使用 ours 版本，而 ours 策略则是执行一个假合并，直接将 ours 版本作为合并结果。

#### Rerere

+ `git rerere` （reuse recorded resolution）让 Git 记住解决一个冲突的方法，在下次看到同样的冲突时可以自动解决。

#### 使用 Git 调试

+ `git blame -L m,n (file)` 打印该文件从 m 到 n 行分别是谁写的，在哪次提交中更改的
+ `git bisect` 可以使用二分查找来定位从哪一次提交开始引入了 bug
  1. `git bisect start` 开始调试
  2. `git bisect bad` 告诉 Git 当前 commit 是有问题的
  3. `git bisect good (commit)` 告诉 Git 哪一次 commit 是没有问题的
  4. 接下来 Git 会进行二分，如果当前 commit 没有问题，就 `git bisect good`；如果有问题，就 `git bisect bad` 
  5. 最终会找到从哪个 commit 开始引入了 bug，HEAD 也会停在这里，调试结束后需要 `git bisect reset` 恢复 HEAD

#### 子模块

+ `git submodule add (url)` 添加一个子模块

+ 在 clone 一个带有子模块的仓库时，默认会包含子模块的目录，但目录中还没有任何文件，需要用 `git submodule update --init` 来更新子模块。

  在 clone 的时候也可以指定 `--recursive` 自动更新子模块

+ 仓库中记录的子模块 commit 可能不是最新的 commit，使用 `git submodule update --remote` 可以拉取最新的 commit

#### 打包

+ 用 `git bundle` 命令可以将仓库打成一个包或从包中重建一个仓库，方便传输
+ `git bundle create` 用于打包
+ `git clone a.bundle` 用于从一个包中重建出仓库

#### 替换

+ `git replace` 命令可以用一个对象假装替换另一个对象，这在连接 commit 历史的时候很有用。

### Git 内部原理

#### Git 对象

+ 再次说明，Git 有三种对象：blob 对象，树对象以及提交对象，全部保存在 `.git/objects` 目录下。

+ 每一个对象都是一个键值对，键是长度为 40 个字符的 hash 校验和，值是实际数据（有效载荷）。保存一个对象时，先取出 hash 的前两位作为 `.git/objects` 下的子目录名，再取后 38 位作为该子目录下的文件名。

+ 可以用 `git hash-object` 命令向 Git 数据库里存入一个数据对象，指定 `-w` 选项才是真正存入，否则只是计算并打印一下 hash

+ 可以用 `git update-index` 命令将某数据对象或文件加入暂存区，有几种文件模式

  + 100644 表示普通文件
  + 100755 表示可执行文件
  + 120000 表示符号链接

+ 可以用 `git read-tree` 命令将某树对象加入暂存区，指定 `--prefix=(dirname)` 将其作为子目录加入

+ 可以用 `git write-tree` 命令将暂存区写成一个树对象，相当于给暂存区照一个快照，用于 stash 或 commit 之类的操作。

+ 可以用 `git commit-tree` 命令创建一个提交对象，需要指定树对象的 hash，可选地用 `-p` 指定父提交对象的 hash

+ 构造对象 key 的方法：先构造一个 header = 对象类型 + 空格 + 内容长度 + 空字节，再把 header 和原始数据拼起来计算 SHA-1 值。

  构造对象 value 的方法：zlib 压缩。

#### Git 引用

+ 为了使用方便，不可能手记那些很长的 hash，最好是能有个类似别名的东西将比较常用的 hash 记录下来，这些东西在 Git 中叫做**引用**（refs）。一个引用就是一个 `.git/refs` 目录下的文件，文件名为引用名，文件内容为该引用的 hash 值。

+ 可以用 `git update-ref` 命令创建一个新的引用

+ HEAD 是一个符号引用，保存在 `.git/HEAD` 文件中，文件内容大致是 `ref: refs/heads/master` 这样。

+ 可以用 `git symbolic-ref` 命令查看或更改 HEAD 的值。

+ 标签有两种：轻量标签和附注标签（`git tag -a`）。它们都存在 `.git/refs/tags` 目录下，文件名都是标签名，轻量标签的文件内容是一个提交对象的 hash，附注标签的文件内容是一个标签对象的 hash。

  标签对象是 Git 中的第四种对象，内容包含标签名，message，tagger，以及标签所指向的对象的类型和 hash 等等，也就是说附注标签并不一定总是指向提交对象，也可以指向其他类型的对象。

+ 同理可以用 `git update-ref` 创建一个新的轻量标签

+ 远程引用保存在 `.git/refs/remote` 目录下，它和分支 (`.git/refs/heads`) 最大的区别是它是**只读**的。虽然可以 checkout 到某个远程分支，但是 HEAD 并不会指向该远程引用，也就是说无法通过 commit 更新远程引用。

#### 包文件

+ 使用 `git gc` 命令将 Git 数据库中的对象打包，打包的过程会将有细微差别的对象按照差异存储，即不在存储两个完整的对象，而是一个完整的对象加一个改动，大大节省空间。（push 的时候会自动打包）
+ 打出来的包和索引保存在 `.git/objects/pack` 目录下。可以用 `git verify-pack` 命令查看包文件的内容

#### 引用规格

+ `.git/config` 文件中 [remote] 这个 section 里记录着引用规格（refspec）。引用规格有拉取（fetch）和推送（push）两种，格式是可选的 + 号，后面跟着 `<src>:<dst>`。
+ 引用规格影响着每次 fetch 或 push 时将数据从哪里放到哪里。
+ 也可以从命令行指定一次性的引用规格，比如 `git fetch/push origin a:b `

#### 传输协议

+ Git 主要有两种方式在版本库之间传输数据：哑协议和智能协议。
+ 哑协议不能从客户端向服务端发送数据，抓取数据的过程也只是一连串的 HTTP GET
+ 智能协议可以双向传输数据，需要在客户端和服务端各运行一组进程

#### 维护与数据恢复

+ gc 不仅仅会打包对象，还会打包引用到 `.git/packed-refs` 文件。如果更新了引用，Git 不会修改这个文件，在检索引用的 hash 值时，会先查看 `.git/refs` 目录，没有的话再查看这个文件
+ 如果一不小心 hard reset 了某个分支导致头部的 commit 丢失了，可以通过 reflog 找回。每一次改动 HEAD 都会记录在 `.git/logs/HEAD` 文件中，只要能找到最新的 commit，创建一个指向它的引用就可以恢复了。
+ 如果 reflog 也被删了，还可以通过 `git fsck` 寻找所有悬空的对象，总之是可以恢复的（当然如果能记得最新的 commit 对象的 hash 那就不用这么麻烦了。
+ 可以用 `git count-objects` 查看 object 数量
+ 可以用 `git prune` 删除所有悬空对象

##### Last-modified date: 2020.1.23, 9 p.m.