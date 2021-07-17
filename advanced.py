from pyspark import SparkConf
from pyspark.sql.session import SparkSession
from pyspark.ml.clustering import KMeans
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
from scipy.stats import linregress
import numpy as np
import matplotlib.pyplot as plt

conf = SparkConf()
spark = SparkSession.builder.config(conf=conf).appName("advanced").getOrCreate()
spark.sparkContext.setLogLevel("WARN")

def cluster(sql):
    # 提取字段
    low = sql.index('t')
    high = sql.index(' from')
    fields = sql[low + 2:high]
    field = fields.split(",")
    # del field[-1]
    # 将多个数值列按顺序汇总成一个向量列
    result = spark.sql(sql)
    assembler = VectorAssembler().setInputCols(field).setOutputCol("features")
    dataset = assembler.transform(result)
    # dataset.show(10)
    x1 = dataset.select(field[0])
    y1 = dataset.select(field[1])
    x_copy = x1.toPandas()
    y_copy = y1.toPandas()
    x_copy1 = x_copy.values.tolist()
    y_copy1 = y_copy.values.tolist()
    x_copy2 = sum(x_copy1, [])
    y_copy2 = sum(y_copy1, [])
    x = np.array(x_copy2)
    y = np.array(y_copy2)
    # 训练 k-means 模型
    kmeans = KMeans().setK(2).setFeaturesCol('features').setPredictionCol('prediction')
    model = kmeans.fit(dataset)
    # 获取模型的所有聚类中心
    centers = model.clusterCenters()
    # 显示聚类中心
    plt.plot(x, y, 'kx')
    for i in centers:
        # print(i)
        plt.text(i[0], i[1], '.',fontsize=200, color='r')
    plt.savefig('static/matplotlibpicture/cluster.jpg')
    # plt.show()


def forecast(sql):
    # 提取特征字段
    low = sql.index('t')
    high = sql.index(' from')
    fields = sql[low + 2:high]
    field = fields.split(",")
    # 预测列与特征列
    feature = field[-1]
    del field[-1]
    # 通过添加一列随机数再对随机数排序进行shuffle
    sqls = sql.replace(" from", ",rand()" + " as random from")
    result = spark.sql(sqls)
    results = result.sort("random")
    # 将多个数值列按顺序汇总成一个向量列
    assembler = VectorAssembler().setInputCols(field).setOutputCol("features")
    dataset = assembler.transform(results)
    # dataset.show(10)
    # 拆分成训练集和测试集
    train, test = dataset.randomSplit([0.8, 0.2])
    #设置线性回归模型 最大迭代次数     设置正则化参数     设置弹性网络参数
    regression = LinearRegression().setMaxIter(10).setRegParam(0.3).setElasticNetParam(0.8)
    # fit 使用线性回归模型做训练
    model = regression.setLabelCol(feature).setFeaturesCol("features").fit(train)
    #作出预测,transform 做预测
    datas = model.transform(test)
    # 删除特征列和随机列
    data = datas.drop("random")
    res = data.drop("features")
    fore = res.toPandas()
    # print((fore))
    return fore

def fitting(sql):
    #提取拟合列
    low = sql.index('t')
    high = sql.index(' from')
    fields = sql[low + 2:high]
    field = fields.split(",")
    #将数据转为numpy.ndarray
    result = spark.sql(sql)
    x1 = result.select(field[0])
    y1 = result.select(field[1])
    x_copy = x1.toPandas()
    y_copy = y1.toPandas()
    x_copy1 = x_copy.values.tolist()
    y_copy1 = y_copy.values.tolist()
    x_copy2 = sum(x_copy1, [])
    y_copy2 = sum(y_copy1, [])
    x = np.array(x_copy2)
    y = np.array(y_copy2)
    # Scipy.stats.linregress 线性回归
    slope, intercept, r_value, p_value, stderr = linregress(x, y)  # slope, intercept等于C；
    # slope：回归线的斜率。
    # intercept：回归线的截距。
    # rvalue：相关系数。
    # pvalue：假设检验的p值，其零假设为斜率为零，使用检验统计量t分布的Wald检验。见上述alternative假设。
    # stderr：在残差正态性假设下，估计斜率（梯度）的标准误差。
    plt.xlabel(field[0])
    plt.ylabel(field[1])
    plt.plot(x, y, 'o', label='original data')
    plt.plot(x, slope * x + intercept, 'o-r',label='fitted line')
    plt.legend()
    # print(slope * x + intercept) #拟合线
    plt.savefig('static/matplotlibpicture/fitting.jpg')
    # plt.show()
