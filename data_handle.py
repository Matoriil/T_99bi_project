from flask import Blueprint,render_template,request,redirect,url_for,flash
from Operation_log import op_write
import csv,os,analysis,get_data,xlrd,advanced,time
import pandas as pd
handle=Blueprint('handle',__name__)

#获取上传文件
def file_data_get(table_name):
    file_path = "Upload_file_path/"
    fileNames = []
    columns_names=[]
    for i, j, k in os.walk(file_path):
        fileNames.append(k)
    fileNames = fileNames[0]
    x = 0
    result_csv = []
    result_xlsx = []

    for i in fileNames:
        with open(file_path + i, 'r', encoding='gb18030', errors='ignore') as file:
            files = os.path.splitext(file_path + i)
            type = files
            if type[1] == ".xlsx":
                workbook = xlrd.open_workbook(type[0] + type[1])
                try:
                    booksheet = workbook.sheet_by_name(i.replace(".xlsx", ""))
                except:
                    booksheet = workbook.sheet_by_name("Sheet1")
                result_xlsx.append(booksheet.row_values(0))
            if type[1] == ".csv":
                columns_names =list(pd.read_csv(type[0]+".csv",nrows=0).columns)
    columns_names_all = [columns_names] + result_xlsx
    result_csv = []
    result_xlsx = []
    x=0

    if table_name[0]==None:
        columns_names=[]
        for i in fileNames:
            with open(file_path + i, 'r', encoding='gb18030', errors='ignore') as file:
                files = os.path.splitext(file_path + i)
                type = files
                if type[1] == ".xlsx":
                    workbook = xlrd.open_workbook(type[0] + type[1])
                    try:
                        booksheet = workbook.sheet_by_name(i.replace(".xlsx", ""))
                    except:
                        booksheet = workbook.sheet_by_name("Sheet1")
                    result_xlsx.append(booksheet.row_values(0))
                if type[1] == ".csv":
                    columns_names =[list(pd.read_csv(type[0]+".csv",nrows=0).columns)]
        columns_names=columns_names+result_xlsx
    else:
        columns_names = []
        table_name = table_name[0]
        with open(file_path + table_name, 'r', encoding='gb18030', errors='ignore') as file:
            files = os.path.splitext(file_path + table_name)
            type = files
            if type[1] == ".xlsx":
                workbook = xlrd.open_workbook(type[0] + type[1])
                try:
                    booksheet = workbook.sheet_by_name(table_name.replace(".xlsx", ""))
                except:
                    booksheet = workbook.sheet_by_name("Sheet1")
                result_xlsx.append(booksheet.row_values(0))

            if type[1] == ".csv":
                columns_names =[list(pd.read_csv(type[0]+".csv",nrows=0).columns)]
        columns_names = columns_names + result_xlsx

    return fileNames, columns_names,columns_names_all


@handle.route('/handle',methods=["POST","GET"])
def data_handle():
    operator=['=','>','<','>=','<=','!=','is null','between','like']
    #获取列值
    columns = []
    columns.append(request.values.get('select_but'))
    for i in range(100):
        if request.values.get('select_but'+str(i))!=None:
            columns.append(request.values.get('select_but'+str(i)))

    #获取表名
    table_name=[]
    table_name.append(request.values.get('select_table'))
    for i in range(100):
        if request.values.get('select_table' + str(i)) != None:
            table_name.append(request.values.get('select_table' + str(i)))

    #获取条件字段
    condition_columns=[]
    condition_columns.append(request.values.get('condition_1'))
    for i in range(100):
        if request.values.get('condition_1' + str(i)) != None:
            condition_columns.append(request.values.get('condition_1' + str(i)))

    #获取字段运算符
    columns_operator=[]
    columns_operator.append(request.values.get('condition_2'))
    for i in range(100):
        if request.values.get('condition_2' + str(i)) != None:
            columns_operator.append(request.values.get('condition_2' + str(i)))

    # 获取连接符
    Connector=[]
    Connector.append(request.values.get('condition_0'))
    for i in range(100):
        if request.values.get('condition_0' + str(i)) != None:
            Connector.append(request.values.get('condition_0' + str(i)))

    #获取条件
    condition=[]
    condition.append(request.values.get('condition_3'))
    for i in range(100):
        if request.values.get('condition_3' + str(i)) != None:
            condition.append(request.values.get('condition_3' + str(i)))

    #获取表连接的一表
    join_tables1=[]
    join_tables1.append(request.values.get('table_join_1'))
    for i in range(100):
        if request.values.get('table_join_1' + str(i)) != None:
                join_tables1.append(request.values.get('table_join_1' + str(i)))

    # 获取表连接的一表的字段
    join_tables1_columns=[]
    join_tables1_columns.append(request.values.get('table_join_2'))
    for i in range(100):
        if request.values.get('table_join_2' + str(i)) != None:
                join_tables1_columns.append(request.values.get('table_join_2' + str(i)))

    #获取表连接的二表
    join_tables2=[]
    join_tables2.append(request.values.get('table_join_3'))
    for i in range(100):
        if request.values.get('table_join_3' + str(i)) != None:
                join_tables2.append(request.values.get('table_join_3' + str(i)))

    #获取表连接的二表的字段
    join_tables2_columns=[]
    join_tables2_columns.append(request.values.get('table_join_4'))
    for i in range(100):
        if request.values.get('table_join_4' + str(i)) != None:
                join_tables2_columns.append(request.values.get('table_join_4' + str(i)))

    #获取别名字段
    as_name=[]
    as_name.append(request.values.get('as_name_copy_buts'))
    for i in range(100):
        if request.values.get('as_name_copy_buts' + str(i)) != None:
                as_name.append(request.values.get('as_name_copy_buts' + str(i)))

    #获取分组聚合字段
    group_by = []
    group_by.append(request.values.get('group_by_1'))
    for i in range(100):
        if request.values.get('group_by_1' + str(i)) != None:
            group_by.append(request.values.get('group_by_1' + str(i)))

    #获取聚合函数
    group_by_select = []
    group_by_select.append(request.values.get('group_by_select'))
    for i in range(100):
        if request.values.get('group_by_select' + str(i)) != None:
            group_by_select.append(request.values.get('group_by_select' + str(i)))

    #获取自定义字段
    custom_sql=[]
    custom_sql.append(request.values.get('textarea_data'))
    for i in range(100):
        if request.values.get('textarea_data' + str(i)) != None:
            custom_sql.append(request.values.get('textarea_data' + str(i)))

    #获取排序字段
    sort_columns=(request.values.get("data_sort_html"))
    sort_func=request.values.get('data_sort_html1')

    #获取截取行数
    limit_num=request.values.get("data_slice_data")

    #获取自然连接的表
    zr_join1=[(request.values.get("tables1_data"))]
    zr_joins=[]
    zr_joins.append(request.values.get('tables2_datas'))
    for i in range(100):
        if request.values.get('tables2_datas' + str(i)) != None:
            zr_joins.append(request.values.get('tables2_datas' + str(i)))
    (zr_join1.append(zr_joins))
    zr_join=str(zr_join1).replace("[","").replace("]","").replace("'","").split(",")

   

    #将用户的操作转换为SQL语句
    data_sql=None
    if columns[0]!= None:
        data_sql=get_data.get_data(columns,condition_columns,columns_operator,condition,Connector
                 ,table_name,join_tables1,join_tables2,join_tables1_columns,join_tables2_columns,as_name,group_by,group_by_select,custom_sql,sort_columns,sort_func,limit_num,zr_join)

    #获取文件名
    file_names=file_data_get(table_name)[0]
    #选中数据源的的字段名
    columns_name=file_data_get(table_name)[1]
    #所有字段名
    columns_name_all=file_data_get(table_name)[2]


    #定义操作类型
    count_oper=["求和","平均值","计数","最大值","最小值","标准偏差","方差","拟合","聚类","预测"]

    df_v=pd.read_csv("Core_file/data_test")

    #获取通过PYspark返回的'df
    if data_sql!=None and columns[0] !=None and columns[0] != "无":
        #高级操作
        if group_by_select[0] =="预测":
            advanced.forecast(data_sql.replace('预测','').replace("(",'').replace(")",""))
            gj=data_sql.replace('预测','').replace("(",'').replace(")","")
            op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin对语句{gj} 进行了预测操作")
        if group_by_select[0] =="拟合":
            advanced.fitting(data_sql.replace('拟合','').replace("(",'').replace(")",""))
            gj=data_sql.replace('拟合','').replace("(",'').replace(")","")
            op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin对语句{gj} 进行了拟合操作")
        if group_by_select[0] =="聚类":
            advanced.cluster(data_sql.replace('聚类', '').replace("(", '').replace(")",""))
            gj = data_sql.replace('聚类', '').replace("(", '').replace(")","")
            op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin对语句 {gj} 进行了聚类操作")

        else:
            print(data_sql)
            #普通sql
            df=analysis.grograme(data_sql)

            op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin提交了 {data_sql} 操作语句")
            #获取数据的十行实列，为了保证能在网页中正常显示
          
            df=df.fillna(0)
            df_v=df.iloc[0:100,0:10]
            df.to_csv('Core_file/data_core.csv', index = False)
            print(request.values.get("table_save"))
            save_name=request.values.get("table_save")
            df.to_csv(f"Upload_file_path/{save_name}.csv",index=False)
            try:
                os.remove("./Upload_file_path/保存名称(请输入英文名).csv")
            except:
                pass

    #将所有上传文件整合为一个df，读取df字段类型并发送到前端
    c_zb,c_wd="",""
    if custom_sql[0]!=None and custom_sql[0]!='':
        print("正在加载用户自定义字段")
        custom_tb()
    try:
        custom_df=pd.read_csv("custom_df/custom.csv")
        custom_col=list(custom_df.columns)
        c_zb,c_wd=[],[]
        for i in custom_col:
            if custom_df[i].dtype != "object":
               c_zb.append(i)
            c_wd.append(i)
        c_zb=(c_zb[1:])
        c_wd=c_wd[1: ]
    except:
        pass

    c_oper = ["sum()", "avg()", "count()", "max()", "min()", "stddev()", "variance()", "abs()", "date()", "year()",
              "month()", "day()", "hour()", "minute()", "second()", "weekofyear()",
              "datediff()", "date_sub()", "date_add()", "CONCAT()"]
    return render_template("show.html",file_names=file_names,data=columns_name,operator=operator,count_oper=count_oper, df=df_v.to_html(index=False,classes="data_show_1")
                           ,columns_name_all=columns_name_all,c_zb=c_zb,c_wd=c_wd,c_oper=c_oper)


#将所有上传文件合并在一起，为了在自定义字段中更好的使用
def custom_tb():
    y = 0
    df_csv = []
    df_xlsx = []
    for i in (os.walk("Upload_file_path/")):
        for j in (i[2]):
            if "csv" in j:
                df_csv.append(pd.read_csv("Upload_file_path/" + j))
            if "xlsx" in j:
                df_xlsx.append(pd.read_excel("Upload_file_path/" + j))
    try:
        df_csv = (pd.concat(df_csv, ignore_index=True, axis=0))
    except:
        pass
    try:
        df_xlsx = (pd.concat(df_xlsx, ignore_index=True, axis=0))
    except:
        pass
    try:
        if df_csv == []:
            res = (pd.concat([df_xlsx]))
    except:
        pass

    try:
        if df_xlsx==[]:
            res=pd.concat([df_csv])
    except:
        pass
    try:
        res = pd.concat([df_csv,df_xlsx])
    except:
        pass
    res.to_csv("custom_df/custom.csv")
