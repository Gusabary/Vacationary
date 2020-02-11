# Learning notes of Week 4

## 2.9 Sun.

### Ansible

+ Ansible 提供两种操作方式：ad-hoc 命令和 playbook，就相当于直接敲 shell 命令和写 shell 脚本的区别。

+ 运行 ad-hoc 命令：`ansible <pattern> -m <module> -a <arguments>`

  + `pattern` 是从机的集合，可以是从机名，组名，正则表达式，all 等等
  + `module` 是 Ansible 的模块名，默认是 command，还有 shell, apt, git, copy, file 等等
  + `arguments` 是调用该模块的参数，每个模块有各自的规约，command 模块的话接执行的命令即可

+ Ansible 的设计理念是由用户指定目标状态，然后 Ansible 不断调整当前状态使其达到目标状态。即用户指定的是状态而不是行为，所以操作是幂等的。

+ 执行一个 playbook：`ansible-playbook playbook.yml`

+ playbook 文件是 yaml 格式的，文件内容是一个数组，其中每个元素称为一个 play。对于每一个 play，可以指定 hosts（哪些从机会受到影响），tasks（在每个从机上执行的任务）等字段。

  tasks 是一个数组，其中每个元素都是一个 map，包含一个 name 字段，一个 module 字段，还有可选的一些其他的设置字段，例如：

  ```yaml
  - name: ensure apache is at the latest version
    yum: pkg=httpd state=latest
  - name: ensure apache is running
    service: name=httpd state=started
  - name: run this command and ignore the result
    shell: /usr/bin/somecommand || /bin/true
  ```

  所以一个 play 的意思就是说在一些从机上执行一些 tasks。

  可以发现，除了 command 和 shell 模块以外，其他模块的参数大多是键值对格式的。

+ 只有当一个 task 在其对应的所有从机上都执行完毕后，才会执行下一个 task，如果某个从机执行某个 task 失败，便不会再执行之后的 task。

+ 可以使用 include 来包含别的 playbook 或是 tasks。

  + include playbook：

    ```yaml
    - name: this is a play at the top level of a file
      hosts: all
      remote_user: root
      tasks:
      - name: say hi
        tags: foo
        shell: echo "hi..."
    
    - include: load_balancers.yml
    - include: webservers.yml
    - include: dbservers.yml
    ```

    其中最后的三个文件都是 playbook

  + include tasks：

    ```yaml
    tasks:
     - { include: wordpress.yml, wp_user: timmy }
    ```

    其中 `wordpress.yml` 是 task file，仅包含一组 tasks，例如：

    ```yaml
    ---
    - name: placeholder foo
      command: /bin/foo
    - name: placeholder bar
      command: /bin/bar
    ```

+ roles 目录下可以有一些角色，每个角色都有一个目录，该目录下有 tasks，handles 等等子目录。当使用某个 role 的时候，会将这些子目录中的配置映射过来。像这样使用一个 rule（可以参数化）：

  ```yaml
  ---
  - hosts: webservers
    roles:
      - common
      - { role: foo_app_instance, dir: '/opt/a',  port: 5000 }
      - { role: foo_app_instance, dir: '/opt/b',  port: 5001 }
  ```

+ “角色依赖” 使你可以自动地将其他 roles 拉取到现在使用的 role 中。”角色依赖” 保存在 role 目录下的 `meta/main.yml` 文件中：

  ```yaml
  ---
  dependencies:
    - { role: common, some_parameter: 3 }
    - { role: apache, port: 80 }
    - { role: postgres, dbname: blarg, other_parameter: 12 }
  ```

### Seccomp

+ seccomp 是一个 system call：

  ```c++
  int seccomp(unsigned int operation, unsigned int flags, void *args);
  ```

+ 第一个参数有以下几个选项：

  + `SECCOMP_SET_MODE_STRICT`：限制进程只能使用 read, write, _exit, sigreturn 这些 system call，如果试图使用别的会产生 SIGKILL 信号，这个 operation 下，flags 参数必须为 0，args 参数必须为 NULL

  + `SECCOMP_SET_MODE_FILTER`：通过 args 参数传递一个自定义的 filter 用来限制任意 system call，甚至可以限制 system call 的参数。

    clone 或 fork 出的子进程拥有和父进程一样的 system call 限制

    调用 execve 时，原先的限制仍然会起作用（所谓 preserved 是这个意思）

##### Last-modified date: 2020.2.11, 1 p.m.