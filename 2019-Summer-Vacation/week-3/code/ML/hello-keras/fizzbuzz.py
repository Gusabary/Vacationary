from keras.layers.normalization import BatchNormalization
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Activation
from keras.optimizers import SGD, Adam
import numpy as np


def fizzbuzz(start, end):
    x_train, y_train = [], []
    for i in range(start, end+1):
        num = i
        tmp = [0]*10
        j = 0
        while num:
            tmp[j] = num & 1
            num = num >> 1
            j += 1
        x_train.append(tmp)
        if i % 3 == 0 and i % 5 == 0:
            y_train.append([0, 0, 0, 1])
        elif i % 3 == 0:
            y_train.append([0, 1, 0, 0])
        elif i % 5 == 0:
            y_train.append([0, 0, 1, 0])
        else:
            y_train.append([1, 0, 0, 0])
    return np.array(x_train), np.array(y_train)


x_train, y_train = fizzbuzz(101, 1000)  # 打标记函数
x_test, y_test = fizzbuzz(1, 100)

model = Sequential()
model.add(Dense(input_dim=10, output_dim=1000))
model.add(Activation('relu'))
model.add(Dense(output_dim=4))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adam', metrics=['accuracy'])

model.fit(x_train, y_train, batch_size=20, nb_epoch=100)

result = model.evaluate(x_test, y_test)

print('Test Acc：', result[1])
