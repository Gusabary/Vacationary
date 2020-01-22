# Learning notes of Week 2

## 1.22 Wed.

### Git 分支

#### 变基

+ rebase 的原理在于找到当前分支和目标基底分支的共同祖先，将当前分支相对于该共同祖先的历次提交暂时保存起来，再将当前分支指向目标基底，最后 replay 刚刚保存的历次提交。

  这样整个提交历史就只有一条线，而不会像 merge 那样有分叉和合并。

+ 有一条准则需要注意：**不要对在你的仓库外有副本的分支执行变基。**因为 rebase 的本质是**丢弃**一些现有的 commit，然后相应地**新建**一些内容一样但实际上不同的 commit。

### Git 工具

#### 选择修订版本

+ `git show` 加上 commit 的 hash 值可以查看某次 commit 的具体信息，也可以加分支名查看该分支所指向的 commit 的具体信息。

+ `git reflog` 会显示 HEAD 的变更历史，包括 commit，rebase，merge，reset，切换分支等等。这些历史称为引用日志，只会存在于本地仓库（第一条总是 clone）

+ HEAD 后面可以跟 `~` 或 `^` 表示父 commit，区别在于后面跟数字时， `~n` 表示上溯多少个父 commit，而 `^2` 则表示第二父提交（由 merge 产生的 commit 有两个父 commit，其中 merge 时所在分支指向的 commit 是第一父提交，另一个分支指向的 commit 是第二父提交）。

  这两个标记可以混合使用。

  `^^` 表示第一父提交的第一父提交。

+ **双点** `git log a..b` 用来选择在分支 b 中而不在分支 a 中的 commit，缺省的话默认是 HEAD，即当前分支。可以用 `git log origin/master..` 查看即将推送到远程分支的改动

+ 用 `^dev` 或 `--not dev` 来过滤不想查看的分支，dev 分支中的 commit 就不会打印。`git log a..b` 和 `git log b ^a` 是等价的。

+ **三点** `git log a...b` 用来选择在分支 a 中或分支 b 中，而不同属于两者的 commit（异或）。可以加上 `--left-right` 选项让打印更加直观地显示哪些 commit 属于哪个分支。

#### 交互式暂存

+ `git add -i` 打开交互式暂存界面，值得一提的是 diff 和 patch 命令。

+ diff 命令相当于 `git diff --cached`，比较的是暂存区和仓库的差异

+ patch 命令主要用来部分暂存一个文件，所谓*部分*，它的粒度是一个 *hunk*，大概五六行的样子。

  也可以用 `git add -p` 直接进入部分暂存的界面。

#### 储藏与清理

+ `git stash` 会将工作区未暂存的改动（untracked files 除外）以及暂存区未提交的改动储藏起来

+ 可以用 `git stash list` 查看储藏列表，`git stash show stash@{n}` 查看某次储藏的具体信息

+ 可以用 `git stash apply` 恢复储藏的信息，通过 `stash@{n}` 指定更旧的一次储藏。

  apply 不会删除 list 中的记录，如果是 pop 的话，相当于 apply + drop

  恢复储藏会导致原先已暂存的改动（new file 除外）变成未暂存，恢复时指定 `--index` 选项可以避免这一问题。

+ 恢复时不一定要求一个干净的工作区，Git 会尝试合并；也不一定要求恢复到储藏时的那个分支，所以可以用来跨分支传递文件。

+ 可以指定 `--keep-index` 来避免储存任何已暂存的改动

  可以指定 `-u` 将 untracked files 也储存起来（甚至可以指定 `-a` 将 ignored files 也储存起来）

  可以指定 `--patch` 储存一个文件的某些部分

+ 可以用 `git stash branch (name)` 来检出储藏时所在的提交并恢复，相当于是根据储藏时刻的快照创建了一个新分支。

+ `git clean` 会删除所有 untracked files，有些配置下需要强制 `-f` 才会生效，事实上并不推荐 clean，可以采用 `git stash -a`，至少还可以恢复，如果后悔了的话。

+ `-x` 选项会同时删除 ignored files 

  `-d` 选项会同时删除空目录

  `-n` 选项可以 dry run

#### 搜索

+ `git grep` 可以用于搜索（可以搜索任意一棵 Git 树，即任意一次 commit 对应的快照）

#### 重写历史

+ `git commit --amend` 可以满足重写最近一次 commit 的需求，但是如果需要重写多次 commit，就需要用到 `git rebase -i` 了。（amend 也可以理解成一次小 rebase）

+ 例如，想要重写最近三次 commit，使用 `git rebase -i HEAD~3`，会进入编辑界面。界面中有最近三次 commit 的信息，注意是逆序的，即靠上的是较旧的，因为待会会从上往下 **replay** 这些 commit，所以从上往下的顺序自然就是从旧到新的顺序。

+ 每条 commit 前都有一个 command，默认是 pick

  + pick：啥也不干
  + reword：给了一次重新编辑 commit message 的机会
  + edit：停在该次 commit 之后，给了一次 amend 的机会（不仅可以重新编辑 message，还能新加一些改动）
  + squash：将该次 commit 和上一次（前一次）commit 合并，可以重新编辑 commit message
  + fixup：和 squash 类似，但是新的合并出来的 commit 的 message 用的是该次 commit 的前一次的 message
  + exec：和其他 command 不同，后面跟的不是 commit 信息，而是 shell 命令，用于在 commit replay 的过程中执行特定命令（例如测试）

  除了这些 command 以外，还可以删除某条 commit 信息，这会导致这个 commit 被删除；也可以调换 commit 信息的顺序，这会导致 commit 被调换顺序。

+ 在 replay 的过程中有一些情况可能会在命令行停下，例如 edit，exec 出错，此时可以使用 `git rebase --continue` 继续 replay，或者 `git rebase --abort` 停止 replay。

+ 需要注意的是既然是 rebase，就一定会改 commit 校验和（因为 rebase 实质是丢弃 commit 再新建 commit），但是是从第一个发生变化的 commit 开始改**起**。改起是指第一个发生变化的 commit 以及之后所有 commit 的校验和都会被更改，因为校验和的计算也用到了父 commit 的信息。

  而且，既然是 rebase，就最好不要在已经 push 的情况下修改 commit。

+ 还有一个非常强大的重写历史的工具：`git filter-branch`

  可以在末尾加上 `HEAD~n..HEAD` 表示只重写最近 n 次 commit（在 HEAD 中而不在 HEAD~n 中）

#### 重置揭秘

+ `git cat-file -p (hash)` 用于查看 object（之前提到过的三种 object：blob 对象，树对象，提交对象）

  + 提交对象的打印结果是其指向的树对象的 hash，父提交的 hash，author，committer，message 等等
  + 树对象的打印结果是这棵树包含了哪些文件
  + blob 对象的打印结果就是文件内容

+ `git ls-tree` 用于查看树对象包含的文件，类似于 `git cat-file -p (treehash)`

+ `git ls-files` 用于查看暂存区的文件

+ 即使 hard reset，已提交的文件仍能通过 reflog 找到 commit object hash 从而找回

+ `git reset (commit) (path)` 指定 path 的话，reset 不会回退仓库中的 HEAD，而只回退暂存区的 path 到指定的 commit 快照（将 commit 快照的 path 检出到暂存区）

+ `git checkout (path)` 指定 path 的话，意思是从暂存区检出 path 到工作区

  `git checkout (commit) (path) ` 同时指定 commit 和 path 的话，是将某个 commit 快照的 path 同时检出到暂存区和工作区。

+ 对于 `git checkout (commit/branch)`，用来切换分支，在有一个干净的工作区和暂存区的情况下肯定是可以切的，但是如果工作区有未暂存的改动或者暂存区有未提交的改动时，时而能切时而不能切，为了搞清楚这一问题我做了个小实验。大概可以从实验结果中推导出这么一个结论：

  首先切换的时刻存在两张快照：HEAD 指向的 commit 和即将要切过去的 commit，如果某个文件在这两张快照中内容相同（hash 可以不同），那么即使该文件有未暂存或未提交的改动也是可以切换过去的（可以理解成因为有相同的基础 replay）。其中内容相同不仅仅指字面意思的内容相同，某文件在两张快照中都不存在也算“内容相同”，而某文件在一张快照中存在而在另一张中不存在就不算“内容相同”。

  但是有一个例外，如果某文件在两张快照中内容不同，但是**暂存区中**有这样的未提交的更改，使得更改后该文件和另一边的快照内容相同，那么也是可以切过去的（注意是暂存区中未提交的更改，工作区中未暂存的更改是不行的）。但是切过去之后，这个未提交的更改没了，即使切回来也没了，不知道是 Git 的一个 bug 还是有意这么设计 - -

#### 高级合并

+ 关于 `git merge` 用来合并分支，在有一个干净的工作区和暂存区的情况下肯定是可以合的（最多就是有冲突而已），但是如果工作区有未暂存的改动或者暂存区有未提交的改动时，时而能合时而不能合，我受到刚刚的实验的启发，又做了一个类似的小实验。大概可以从实验结果中推导出这么一个结论：

  首先合并的时刻也存在两张快照（假定能合的话，先不考虑未暂存以及未提交的改动）：HEAD 指向的 commit 和**由 merge 产生**的 commit（不是被合并分支的 commit），如果某个文件在这两张快照中内容相同（hash 可以不同），那么即使该文件有未暂存或未提交的改动也是可以将另一个分支合进来的（可以理解成因为有相同的基础 replay）。其中内容相同不仅仅指字面意思的内容相同，某文件在两张快照中都不存在也算“内容相同”，而某文件在一张快照中存在而在另一张中不存在就不算“内容相同”。

  这里和切分支有一点直觉上的不同：切分支是 HEAD 和要切到的分支，而合并分支是 HEAD 和由 merge 产生的 commit，而不是要合进来的分支。（假设 HEAD 是 a，要合进来的分支是 b）所以 a 中存在某文件而 b 中不存在也算“内容相同”，因为 a，b 合并以后产生的 commit 是存在该文件的，和 a 内容相同。

  但是有一个例外，如果某文件在两张快照中内容不同，但是**暂存区中**有这样的未提交的更改，使得更改后该文件和由 merge 产生的 commit 快照内容相同，那么也是可以合的（注意是暂存区中未提交的更改，工作区中未暂存的更改是不行的）。但是合进来之后，这个未提交的更改没了（不能有冲突，因为 fast-forward 情况下一旦 merge 了，新的 commit 就有了，HEAD 也更新了，所以未提交的更改才会消失，而冲突的情况下，新的 commit 还未生成，HEAD 也还未更新，所以和旧的 HEAD 相比，未提交的更改还是存在）。

  通过这两个实验我有了一些启发：不管是切分支还是合并分支，本质都是在仓库中操作完，HEAD 更新以后，**用一张新的快照刷一遍工作区和暂存区**，切分支的话这张新的快照就是即将切过去的 commit，合并分支的话新的快照就是两个分支 merge 以后产生的 commit。如果在新的快照和原来的快照这两张快照中，那些有未暂存或是未提交的改动的文件具有相同内容的话，完全可以 replay 一遍来完成基于旧快照到基于新快照的切换。例外情况就是，未提交的改动如果满足*提交之后和新快照内容一样*这个条件的话，新快照还是可以刷进来的。

##### Last-modified date: 2020.1.22, 10 p.m.

