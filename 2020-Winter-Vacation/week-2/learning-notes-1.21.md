# Learning notes of Week 2

## 1.21 Tue.

### 简介

+ 本地版本控制 -> 集中化版本控制 -> 分布式版本控制
+ Git 诞生于 2005 年，由 Linux 开源社区开发
+ Git 直接记录每个版本的快照（有未改动的文件则记录指向上个版本该文件的链接），而不是记录每个版本和上个版本相比的差异。
+ 文件有三种状态：已修改、已暂存和已提交，分别对应三个工作区：工作目录、暂存区和 git 仓库

### 配置

+ Git 配置信息存储在三个位置：

  + `/etc/config`：每个用户每个仓库的通用配置，用 `git config --system` 来读写
  + `~/.gitconfig` 或 `~/.config/git/config`：当前用户的配置，用 `git config --global` 来读写
  + `.git/config`：当前仓库的配置，用 `git config --local` 或 `git config` 来读写

  靠下的配置会覆盖靠上的配置

+ 用 `git config user.name` 查看 user.name 配置

  用 `git config user.name tbc` 修改 user.name 配置

### Git 基础

#### 获取仓库

+ 两种方式，一种 `git init`，另一种 `git clone` 

#### 记录每次更新到仓库

+ 文件的已修改、已暂存、已提交合称为已跟踪，除此以外还有未跟踪（untracked）文件。

+ `git diff` 比较工作区和暂存区的差异，`git diff --cached` 比较暂存区和仓库（已提交区）的差异

  一个文件的修改通过 `add` 从工作区进入暂存区，通过 `commit` 从暂存区进入仓库

  需要注意的是新文件（即 untracked）在 add 之前，`git diff` 是看不到差异的，因为暂存区中还没有这个文件；但是在 add 之后 commit 之前，`git diff --cached` 是可以看到差异的

+ `git commit -a` 可以在 commit 之前自动 add **已跟踪**的文件（不等同于 `git add .`）

+ 每次 commit 就相当于给暂存区照一张快照作为仓库中的最新版本，所以已经存在于之前版本快照中的文件，如果之后不存在了，那一定是会留下删除的痕迹的（除非回退版本）*@fg*

+ `git rm` 可以删除工作区和暂存区的文件，`git rm --cached` 只删除暂存区的文件。如果暂存区有还未 commit 的改动，`git rm` 需要带 `-f` 选项，而 `git rm --cached` 则不需要，这样设计的初衷是为了避免误删改动：还未 commit 的改动不会存在于仓库中，如果 `git rm` 了，工作区和暂存区里的改动也都会被删除，就彻底无了，但是`git rm --cached` 只会删暂存区，所以至少这个改动还存在于工作区。

  `git rm` 感觉很像 `rm` 然后 `git add .`，用的似乎不多，但是 `git rm --cached` 用的还是挺多的，可以撤销对一些改动的 add。

+  `git mv a b` 相当于一次运行以下三条命令：

  ```bash
  mv a b
  git rm a
  git add b
  ```

  如果手动输这三条命令的话，`git rm` 这一条似乎在 Git 2.0 以后可以省略，即允许 add 一次 rm 操作

#### 查看提交历史

+ `git log -p` 会显示每次 commit 的详细改动（每个文件哪里改了）

  `git log --stat` 会显示每次 commit 的缩略改动（改了哪些文件，每个文件改了几行）

+ 可以用 `--pretty` 选项来格式化 log 输出，例如 `git log --pretty=oneline` 让每条 commit 只占一行（这命令太长了，可以用 `alias gitlog='git log --pretty=oneline'` 取个别名）；`--pretty=format` 甚至可以自定义格式

+ 用 `--graph` 可以更形象地展示分支、合并信息，和 `--pretty=oneline` 搭配起来很好用（`gitlog --graph`）

+ 用 `-S` 过滤出添加或移出了某个关键字的 commit

+ 用 `-- path`（放在命令最后） 过滤出有关某个文件或目录的 commit

#### 撤销操作

+ 撤销仓库：
  + `git reset --hard` 将三个区域均回退到某次 commit
  + `git reset --mixed` 将仓库和暂存区回退到某次 commit
  + `git reset --soft` 仅将仓库回退到某次 commit
+ 撤销暂存区：`git reset HEAD` 可以将暂存区回退到仓库中最新的版本（所以不加选项默认是 `--mixed` ？）
+ 撤销工作区：`git checkout`，从暂存区中签出文件，即用暂存区中还未更新的那一版文件覆盖已更新的文件，可以用 `git checkout .` 丢弃所有更改（可以认为是回退到最近一次 add）

#### 打标签

+ 参考*[之前的 git 笔记](<https://github.com/Gusabary/SAIL/blob/master/2019-Spring-Semester/Learning-notes/Git.md>)*

#### Git 别名

+ 通过 `git config --global alias.als 'actual command'` 为 `git actual command` 取一个别名，以后可以直接用 `git als` 代替。
+ 如果 `actual command` 不是一个 Git 子命令，而是外部命令，则需要这样写 `git config --global alias.als '!actual command'`

### Git 分支

#### 分支简介

+ Git 仓库中有三种对象：
  + blob 对象，保存文件快照
  + 树对象，保存目录校验和，记录目录结构和 blob 对象索引（可以认为一个根的树对象就是仓库的一个快照）
  + 提交对象：记录根的树对象索引、父提交对象索引以及 commit 信息
+ Git 的分支本质上是指向提交对象的可变指针，而 HEAD 是一个指向当前分支的指针，切换分支即意味着将 HEAD 指针指向别的分支。

#### 分支的新建与合并

+ 对于**版本单纯滞后**（一个分支是另一个分支的祖先）时的合并，这种情况称为 **Fast-forward**（快进），将较老的分支平移到较新的分支处即可。

+ 但是对于**版本分叉**的情况，Git 会做一次三方合并，并将合并结果作为一个新的提交对象，再让当前分支（也即并入分支）指向这个新的提交对象，这个提交对象有两个父提交对象。

  三方合并是指以两个分支所指的提交对象的共同祖先为基础，并入两个分支所指的提交对象。

  但是这个合并可能会产生冲突，需要手动解决。

#### 分支管理

+ `git branch -v` 查看每个分支的最后一次 commit
+ `git branch --merged` 查看以合并到当前分支的分支，同理有 `--no-merged` 选项，尝试删除 no fully merged 的分支时，需要使用 `-D` 选项。

#### 远程分支

+ 有三种分支：

  + 远程分支：远端服务器上的分支，GitHub 上可以看见的分支，可以通过 `git ls-remote origin` 以及 `git remote show origin` 查看

  + 远程跟踪分支：远程分支状态的引用，是不能手动移动的本地引用，只有当 fetch 的时候才会和远程分支做一次同步（pull 是会有 fetch 操作的，我感觉 push 也会有，因为 push 之前要先看一下能不能 push，如果是交给远端来判断的话有点奇怪，更像是 fetch 下来本地判断一下，可以的话再 push，事实上 push 也确实会导致远程跟踪分支更新）。

    以 `(remote)/(branch)` 形式命名，例如 `origin/master` 

  + 本地分支：可以手动移动的本地引用，有些本地分支跟踪了远程跟踪分支，所以也叫**跟踪分支**，而被跟踪的远程跟踪分支就叫**上游分支**。

+ 使用 `git fetch` 操作会将远程跟踪分支和远程分支同步一下，此时所有 `origin/*` 分支都是最新的，再用 `git merge` 合并到当前分支即完成了一次 pull 操作。

  如果当前分支存在上游分支，则可以直接 pull。但还是建议分成 fetch + merge 两步

+ 可以用 `git branch -vv` 来检查各本地分支对应的上游分支以及版本领先或滞后情况（注意，此时上游分支，也即远程跟踪分支有可能不是最新的，最好先 fetch 一下）

+ 跟踪上游分支的方法：

  + clone 的时候会自动让 master 跟踪 origin/master
  + 从远程跟踪分支检出本地分支：`git checkout -b dev origin/dev` 或 `git checkout --track origin/dev`
  + set upstream：`git branch -u origin/dev` 或 `git push -u origin dev`

+ push 的话建议用 `git push origin (branch)` ，如果直接 `git push` 的话好像会把和远程分支有关联的本地分支全部 push 上去

##### Last-modified date: 2020.1.21, 11 p.m.