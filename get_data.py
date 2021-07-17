import re
def get_data(columns,condition_columns,columns_operator,condition,Connector,table_name,join_tables1,join_tables2,join_tables1_columns,join_tables2_columns,as_name,group_by,group_by_select,custom_sql,sort_columns,sort_func,limit_num,zr_join):
    #将聚合函数和字段合并在一起
    g_cloumns=[]
    for i in range(len(columns)):
        g_cloumns.append(f"{replace_groupby_select(group_by_select[i])}(`{columns[i]}`) as `{as_name[i]}`")

    #将条件字段、条件符号、条件合并
    g_condition=[]
    for i in range(len(condition_columns)):
        g_condition.append(f" {Connector[i]} `{condition_columns[i]}` {columns_operator[i]} '{condition[i]}'")
    #整合多表连接
    join_tabls_sql = []
    for i in range(len(join_tables1)):
        if i==0:
            join_tabls_sql.append(f"`{join_tables1[i]}` join `{join_tables2[i]}` on `{join_tables1[i]}`.`{join_tables1_columns[i]}`=`{join_tables2[i]}`.`{join_tables2_columns[i]}`")
        else:
            join_tabls_sql.append(f"join `{join_tables2[i]}` on `{join_tables1[i]}`.`{join_tables1_columns[i]}`=`{join_tables2[i]}`.`{join_tables2_columns[i]}`")
    join_talbs_num=len(join_tabls_sql)
    join_tabls_sqls=(str(join_tabls_sql).replace("['",join_talbs_num*"(").replace("'","").replace(",",")").replace("]",")").replace(". ","."))

    #整合自然连接
    zr_f_datas=zr_join[0]
    zr_table_join=[]
    zr_num=(len(zr_join))
    for i in range(len(zr_join)):
        if i==0:
            zr_table_join.append(zr_join[i])
        else:
            zr_table_join.append(f"join {zr_join[i]}")
    zr_table_joins=(str(zr_table_join).replace("[",zr_num*"(").replace("'","").replace(",",")").replace("]",")").replace(f"({zr_f_datas})",f"{zr_f_datas}"))
    #设置允许使用中文字符
    #判断是否是第一次进入网页，第一次进入网页的值是NONE\

    if join_tables1[0] != "None":
        datas = f"select {g_cloumns} from {join_tabls_sqls} where{g_condition}  group by `{group_by}`"
    elif zr_join[0] !="None":
        print(zr_join[0])
        datas = f"select {g_cloumns} from {zr_table_joins} where{g_condition}  group by `{group_by}`"
    else:
        datas=f"select {g_cloumns} from {table_name} where{g_condition}  group by `{group_by}`"
        # 将自定义字段写入sql
        if custom_sql[0] != None and custom_sql[0] != "":
            datas = f"select {g_cloumns},{custom_sql[0]} from {table_name} where{g_condition}  group by `{group_by}`"
    #添加排序字段
    if sort_columns !="":
        datas=(replace_data_core(datas)+f"order by `{sort_columns}` {sort_func}").replace("倒序",'desc').replace("正序",'')
    else:
        datas=replace_data_core(datas)
    datas=datas.replace("order by `无条件` ","")
    #添加截取字段行数
    if limit_num !="":
        datas=datas+f" limit {limit_num}"
    return datas


def replace_groupby_select(datas):
    datas=str(datas).replace('求和','sum').replace('平均值','avg').replace("最小值","min").replace("最大值","max").replace("计数","count")\
        .replace("标准偏差","stddev").replace("方差","variance")
    return datas

def replace_data_core(datas):
    datas=str(datas).replace("['","").replace("']","").replace("请选择聚合函数","").replace("group by `请选择字段`","").replace("', '",",").replace(".csv","").replace(".xlsx","")\
        .replace(", or"," or").replace(", and"," and").replace("as  ","").replace("无条件","").replace("as `请输入别名`","")\
        .replace("( ","(").replace("(空) ,","").replace("(`*`)","*").replace("where  ``","").replace("* ,","").replace("``","`").replace('["',"").replace('"]',"").replace("where  `  ''","")
    return datas

