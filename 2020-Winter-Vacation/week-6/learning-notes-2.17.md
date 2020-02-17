# Learning notes of Week 6

## 2.17 Mon.

+ 建站：

  ```bash
  mkdir blog && cd blog
  hexo init
  npm install
  ```

  之后 `blog` 目录下会有一个 `_config.yml` 文件，在文件末尾有一个 deploy 字段，设置该字段为：

  ```yaml
  deploy:
    type: git
    repository: git@github.com:Gusabary/gusabary.github.io.git
    branch: master
  ```

  注意 repository 字段是 ssh 协议的 repo 地址，如果是 http 的话需要在 deploy 的时候输密码

+ `blog` 作为博客站点的根目录，其中有一个 `.deploy_git` 子目录，该目录才是真正的 git 根目录。

+ workflow:

  ```bash
  hexo new hello
  hexo g  # 生成静态页面
  hexo s  # 在本地预览
  hexo d  # 推送至 git page
  ```

  需要注意 deploy 之前要先安装 `hexo-deployer-git`：

  ```bash
  npm install hexo-deployer-git
  ```

+ 看上去是每次 deploy 都相当于一次 commit + push，commit message 可以在 `_config.yml` 文件中的 deploy.message 字段设置每次的默认值，不设置的话就是 deploy 的时间，但是我也不知道怎么在 deploy 的时候写 message。

##### Last-modified date: 2020.2.17, 7 p.m.