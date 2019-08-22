import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler


def r2_score(y_true, y_predict):
    MSE = np.sum((y_true - y_predict) ** 2) / len(y_true)
    return 1 - MSE / np.var(y_true)


class LinearRegression:
    def __init__(self):
        self.coef = None
        self.intercept = None
        self.theta = None

    def fit_gd(self, x_train, y_train, eta=0.01, n_iters=1e4):

        def J(theta, x_b, y):
            return np.sum((y - x_b.dot(theta)) ** 2) / len(y)

        def dJ(theta, x_b, y):
            return x_b.T.dot(x_b.dot(theta) - y) * 2. / len(y)

        def gradient_descent(x_b, y, initial_theta, eta, n_iters, epsilon=1e-8):
            theta = initial_theta
            cur_iter = 0
            
            while cur_iter < n_iters:
                gradient = dJ(theta, x_b, y)
                last_theta = theta.copy()  # 非常重要，不然浅复制，只迭代一次就退出了
                theta -= eta * gradient
                if (abs(J(theta, x_b, y) - J(last_theta, x_b, y)) < epsilon):
                    break
                cur_iter += 1
            return theta

        x_b = np.hstack([np.ones((len(x_train), 1)), x_train])
        initial_theta = np.zeros(x_b.shape[1])
        self.theta = gradient_descent(x_b, y_train, initial_theta, eta, n_iters)
        self.intercept = self.theta[0]
        self.coef = self.theta[1:]
        return self

    def predict(self, x_predict):
        x_b = np.hstack([np.ones((len(x_predict), 1)), x_predict])
        return x_b.dot(self.theta)

    def score(self, x_test, y_test):
        y_predict = self.predict(x_test)
        return r2_score(y_test, y_predict)


def main():
    # 读取数据 ----------
    path = './Dataset/'
    train = pd.read_csv(path + 'train.csv', engine='python', encoding='utf-8')
    test = pd.read_csv(path + 'test.csv', engine='python', encoding='gbk')

    # 数据预处理 ----------
    train = train[train['observation'] == 'PM2.5']
    test = test[test['AMB_TEMP'] == 'PM2.5']
    train = train.drop(['Date', 'stations', 'observation'], axis=1)
    test_x = test.iloc[:, 2:]
    train_x = []
    train_y = []

    for i in range(15):
        x = train.iloc[:, i:i + 9]
        x.columns = np.array(range(9))
        y = train.iloc[:, i + 9]
        y.columns = np.array(range(1))
        train_x.append(x)
        train_y.append(y)

    train_x = pd.concat(train_x)
    train_y = pd.concat(train_y)

    train_x = np.array(train_x, float)
    train_y = np.array(train_y, float)
    test_x = np.array(test_x, float)

    ss = StandardScaler()
    train_x = ss.fit_transform(train_x)  # 归一化 train_x
    test_x = ss.fit_transform(test_x)  # 归一化 test_x
    # 没有必要对 y 归一化

    # 线性回归 ----------
    LR = LinearRegression().fit_gd(train_x, train_y)
    print(LR.score(train_x, train_y))
    result = LR.predict(test_x)

    # 保存结果 ----------
    sampleSubmission = pd.read_csv(
        path + 'sampleSubmission.csv', engine='python', encoding='gbk')
    sampleSubmission['value'] = result
    sampleSubmission.to_csv(path + 'result.csv')


if __name__ == '__main__':
    main()
