import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import MinMaxScaler


# one-hot coding
def p_data(data, col):
    tmp = pd.get_dummies(data[col])
    data = pd.concat([data, tmp], axis=1)
    data = data.drop(col, axis=1)
    return data


def main():
    # 读取数据 ----------
    path = './Dataset/'
    train_data = pd.read_csv(path + 'train.csv')
    test_data = pd.read_csv(path + 'test.csv')

    # 数据预处理 ----------
    data = pd.concat([train_data, test_data], axis=0)  # 先合并起来一起处理，处理完再拆分开

    data.loc[data['workclass'] == '?', 'workclass'] = 'Private'
    data.loc[data['occupation'] == '?', 'occupation'] = 'other'

    cols_discrete = ['workclass', 'education', 'marital-status',
                     'occupation', 'relationship', 'race', 'sex']
    for col in cols_discrete:
        data = p_data(data, col)

    mp = data['native-country'].value_counts() / data.shape[0]
    data['native-country'] = data['native-country'].map(mp)

    cols_continuous = ['age', 'fnlwgt', 'education-num',
                       'capital-gain', 'capital-loss', 'hours-per-week']
    data[cols_continuous] = MinMaxScaler().fit_transform(data[cols_continuous])

    lable_d = {
        '<=50K':  0,
        '<=50K.': 0,
        '>50K': 1,
        '>50K.': 1
    }
    data.lable = data.lable.map(lable_d)
    data['lable'] = data['lable'].astype(int)

    train_data = data[0:train_data.shape[0]]  # 拆分
    test_data = data[train_data.shape[0]:]

    # 分离特征和标签
    train_lable = train_data['lable']
    test_lable = test_data['lable']
    train = train_data.drop('lable', axis=1)
    test = test_data.drop('lable', axis=1)

    # 逻辑回归 ----------
    LR = LogisticRegression()
    print(LR.fit(train, train_lable))

    # 打印准确率 ----------
    print(LR.score(train, train_lable))
    print(LR.score(test, test_lable))


if __name__ == '__main__':
    main()
