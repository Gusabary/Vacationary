# Learning notes of Week 4

## 2.8 Sat.

### Screeps

+ spawn 用 `spawnCreep` 方法可以创建 creep：

  ```js
  Game.spawns['spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvest1');
  ```

+ Creep 的 body part 中，MOVE 的数量需要和其他类型的数量相等，才能保持每 tick 一格的移动速度（空的 CARRY 不会拖慢移动速度）

+ 创建 creep 时最先声明的 body part 会在战斗中最先受到攻击。

+ Global Control Level（GCL）是和账户绑定的，不会降级；Room Control Level（RCL）是和 room 绑定的，最高 8 级，一段时间不维护的话会降级。贡献给 Room Controller 的资源也会作用于 GCL。

+ Wall 不仅挡敌人，也会挡自己的 creep；Rampart 只会挡敌人，同时自己的 creep 在 Rampart 中不会受到攻击。Wall 和 Rampart 起始时都只有 1 hits，贡献资源可以强化他们，需要注意的是 Rampart 需要不断维护。

+ Tower 的范围覆盖了整个 room，但是效果会随着距离增长而削弱。

### Ansible

+ 在 `/etc/ansible/hosts` 文件中指定从机，从机上需要有 python。`apt install python-minimal`

  `ansible all -m ping` 测试是否连通

  `ansible all -a "echo hello"` 在所有从机上运行命令

+ Ansible 从 inventory 文件读取从机信息，默认的 inventory 文件为 `/etc/ansible/hosts`

##### Last-modified date: 2020.2.8, 6 p.m.