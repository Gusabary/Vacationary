# Learning notes of Week 3

## 8.24 Sat.

+ 在弄 keras helloworld 的时候遇到这个报错：`ImportError: DLL load failed: 找不到指定的模块。 Failed to load the native TensorFlow runtime.` ，解决方法是在虚拟环境中 upgrade TensorFlow：

  ```bash
  pip install --ignore-installed --upgrade tensorflow
  ```

  虽然 upgrade 前后我没发现差别在哪 - -

+ `y_train = np_utils.to_categorical(y_train, 10)` 有点像 one-hot coding，例如 3 会被转成 `[0 0 0 1 0 0 0 0 0 0]`。

+ 提高训练集上的准确率：

  + 用新的激活函数，比如 relu。
  + 用可以变化的学习率，比如 Adagrad, RMSProp, Momentum

  提高测试集上的准确率：

  + Early Stopping
  + Regularization，修正损失函数，遗忘神经元
  + Dropout，在训练中每次更新参数时随机丢弃一些神经元

+ > 假设第一层filter有2个，第二层的filter在考虑这个imput时是会考虑深度的，并不是每个channel分开考虑，而是一次考虑所有的channel。所以convolution有多少个filter，output就有多少个filter(convolution有25个filter，output就有25个filter。只不过，这25个filter都是一个立方体)

##### Last-modified date: 2019.8.24, 10 p.m.