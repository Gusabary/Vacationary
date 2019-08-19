# Learning notes of Week 3

## 8.19 Mon.

### Django helloworld

```shell
# 创建项目目录
mkdir hello
cd hello

# 创建虚拟环境
python -m venv hello
hello\Scripts\activate.bat

# 配置虚拟环境
python -m pip install -U pip  # uninstall 9.0 and install 19.2
pip install django

# 创建项目
django-admin startproject helloworld .
python manage.py runserver
```

+ `python manage.py startapp appname` 创建应用

### 连接数据库

+ 在 `settings.py` 中配置数据库连接信息

+ migrate 时遇到的问题：

  照着教程走到 migrate，遇到 `django.core.exceptions.ImproperlyConfigured: mysqlclient 1.3.13 or newer is required; you have 0.9.3.` 这样的问题，第一反应是 pymysql 版本不够新，但是去官网一看最新的也就是 0.9.3 了。第二反应是 `__init.py__` 中的 `pymysql.install_as_MySQLdb()` 导致 mysqldb 和 pymysql 版本号一样，而实际上 mysqldb 要求 1.3.13 以上，所以尝试 `pip install mysqldb` ，但还是会有一堆错误，而且 mysqldb 通常用于 python 2，我也就没再深入。后来找到了一个[方法](<https://stackoverflow.com/questions/55657752/django-installing-mysqlclient-error-mysqlclient-1-3-13-or-newer-is-required>)，但是比较 hacking，其中两个文件的目录路径改为 `hello/Lib/site-packages/django/...` 。

+ 在 `models.py` 中编写实体类，然后通过迁移自动创建表：

  ```shell
  python manage.py makemigrations appname
  python manage.py migrate
  ```

### ORM CRUD

+ create / update :

  ```python
  from hrs.models import Dept
  dept = Dept(40, '研发2部', '深圳')
  dept.save()  # 数据库中主键字段没有该值，则 create
  dept.name = '研发3部'
  dept.save()  # 数据库中主键字段已有该值，则 update
  ```

+ delete :

  ```python
  Dept.objects.get(pk=40).delete()
  ```

+ read :

  + 查询所有：

    ```python
    Dept.objects.all()
    ```

  + 过滤查询：

    ```python
    Dept.objects.filter(...)
    ```

  + 查询单个：

    ```python
    Dept.objects.get(...)
    ```

### a bigger helloworld

+ > 如果 `JsonResponse` 序列化的是一个列表而不是字典，则需要指定 `safe` 参数的值为 `False` :
  >
  > ```python
  > return JsonResponse(resp, safe=False)
  > ```

+ 一个 Django 项目可以有很多个应用，应用的角色相当于 e-book 中的 user, book, cart, order，即不同的功能模块，在项目目录下的 `urls.py` 中可以配置应用的路由，相当于 Controller 类的 mapping 注解。

  对于每个应用而言，`models.py` 相当于实体层，`views.py` 相当于 Controller 层，`urls.py` 中的配置相当于 Controller 类中每个方法的 mapping 注解。

##### Last-modified date: 2019.8.19, 8 p.m.







