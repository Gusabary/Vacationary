# Learning notes of Week 4

## 2.6 Wed.

+ `React` 中 class 的名称首字母一定要大写。

+ `hexo new (post) "title"` 生成文章，支持 `markdown` 格式。

+ `hexo new draft "title"` 生成草稿，草稿不会被渲染至网页。

+ `hexo new page "title"` 生成纯页面。

+ post, draft, page 模板在 scaffolds 目录下。

+ >Hexo 不支持指定多个同级分类。下面的指定方法：
  >
  >```yaml
  >categories:
  >	- Diary
  >	- Life
  >```
  >
  >会使分类`Life`成为`Diary`的**子分类**，而不是并列分类。

+ >如果你的 Hexo 项目中只有少量图片，那最简单的方法就是将它们放在 `source/images` 文件夹中。然后通过类似于 `![](/images/image.jpg)` 的方法访问它们

+ hexo 部署到 github 上的简单流程：

  1. `hexo new` 新建文件。
  2. `hexo g -d` 部署到 `test` 分支（部署到哪个分支可以在 `_config.yml -> deploy -> branch` 中修改 ）。
  3. 在远端 `pull request` 合并分支。
  4. 网页上会显示 `master` 分支中的内容。

##### Last-modified date: 2019.2.6, 2 p.m.