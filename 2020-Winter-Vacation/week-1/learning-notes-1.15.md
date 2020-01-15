# Learning notes of Week 1

## 1.15 Wed.

### Pod Lifecycle

+ pod condition 可以通过 `kubectl get pod -o yaml` 查看

+ pod 可以指定其中容器的 restart policy：Always，OnFailure 或者 Never，重启容器是有指数级的 back-off delay 的，上限五分钟，会在容器正常运行一段时间后重置。

  感觉可以类比 deployment 起 pods（Always restart），Jobs 起 pods （restart on failure，猜的，还没看到 jobs），以及直接起 pods（never restart）

### Init Containers

+ init containers 可以指定多个，顺序执行
+ 如果 pod 的 restartPolicy 设为了 Always，init containers 也只会 restart on failure
+ 如果 pod 重启了，init containers 也会重新运行一遍
+ init container image 被改了整个 pod 都会重启，app container image 被改了只有 app container 会重启

### Pod Preset

+ Pod Preset 是一种资源，用来解决的问题是有许多 pod 在启动的时候需要插入一些特定的信息，而这些信息往往是重复的，比如 secret，volume，environment variable 等等，全部手动指定的话很麻烦。而 Pod Preset 通过 label 挑选出 pod 将这些信息附加到 pod spec 上。
+ 具体的工作方式是当有新的 pod creation 请求到来时，检查一遍是否有 label match 的 pod preset，有的话就添加信息。
+ 当然也可以为特定的 pod 关闭这个选项，即使 label match 了也不会添加信息。
+ 这个资源好像比较新，需要手动开启。

##### Last-modified date: 2020.1.15, 11 p.m.