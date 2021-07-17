import os
# os.environ['JAVA_HOME'] = 'jdk路径'
from pyspark.sql.session import SparkSession
from pyspark import SparkConf
import pandas as pd
conf = SparkConf().set("spark.kryoserializer.buffer.mb","128").set("spark.shuffle.compress", "true").set("spark.default.parallelism", "4").setMaster("local[4]").setAppName("grograme")
    # .set("spark.driver.cores", "2")\
    #     .set("spark.driver.maxResultSize", "1g")\
    #     .set("spark.driver.memory", "2g")\
    #     .set("spark.executor.memory", "2g")\
    #     .set("spark.cores.max", "2")\
    #     .set("spark.shuffle.compress", "true")\
    #     .set("spark.default.parallelism", "4")\
    #     .set("spark.dynamicAllocation.enabled", "true")\
    #     .set("spark.shuffle.service.enabled", "true")\
    #     .set("spark.shuffle.consolidateFiles","true")\
    #     .set("spark.shuffle.file.buffer","128k")\
    #     .set("spark.yarn.executor.memoryOverhead","1g")\
    #     .set("spark.dynamicAllocation.minExecutors", "1")\
    #     .set("spark.dynamicAllocation.maxExecutors", "2")\
    #     .set("spark.dynamicAllocation.initialExecutors", "2")\
    #     .setMaster("local[4]")\
    #     .setAppName("grograme")

spark = SparkSession.builder.config(conf=conf).config("spark.sql.crossJoin.enabled","true").getOrCreate()
spark.sparkContext.setLogLevel("WARN")


def cachetable():
    file_path = "Upload_file_path/"
    fileNames = []
    for i, j, k in os.walk(file_path):
        fileNames.append(k)
    fileNames = fileNames[0]
    for names in fileNames:
        df = spark.read.option("inferSchema", "true").option("multiLine","true").option("header", "true").csv(file_path+ names)
        tablename = names.replace(".csv", "").replace(".xlsx","")
        try:
            df.createTempView(tablename)
        except Exception as e:
            print(e)


def grograme(sql):
    # print(sql)
    if "select *  from" in sql and "where" not in sql and "join" not  in sql:
        sql = sql + " limit 100"
    print(sql)
    try:
    # print(sql)
        text = spark.sql(sql)
        result = text.toPandas()
        return result
    except:
	    df = pd.read_csv('Core_file/data_sql_false')
	    return df
