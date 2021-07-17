from flask import  render_template,Blueprint,request,redirect,url_for,current_app
from Operation_log import op_write
import pandas as pd
import csv,time
show=Blueprint("show",__name__)
@show.route('/show',methods=["post","get"])
def show_p():
    global df_sheet
    data=pd.read_csv("Core_file/data_core.csv")
    df_columns=(list(data.columns))
    wd,zb=[],[]
    for i in df_columns:
        if data[i].dtype != "object":
            #指标
            zb.append(i)
        #维度
        wd.append(i)
    #图类型
    p_type=request.values.get("BOX_data")
    # 标题
    title=request.values.get("title_name")
    #XY是否互转
    XY_T=request.values.get("XYtransform")
    #玫瑰图是否转换
    pie_rose=request.values.get("XYtransform")
    #背景颜色
    back_color = request.values.get("input_color")
    #粗细
    degree=request.values.get("degree_finish_data")
    #弧度
    radian=request.values.get("compliance_value")
    #面积图
    line_area=request.values.get("Area_value")
    line_x,line_y,bar_x,bar_y,pie_x,pie_y,scatter_x,scatter_y='','','','','','','',''
    df_tb=pd.read_csv("Core_file/data_test")

    #折线图
    if p_type=="1":
        #折线图X坐标
        line_x=replace_a(request.values.get("BSX1-input"))
        line_x=data[line_x].T.values.tolist()[0]
        #折线图Y坐标
        line_y=replace_a(request.values.get("BSY1input"))
        line_y=(data[line_y].T.values.tolist())

        #判断粗细和弧度是否为空 为空则赋予一个默认值
        if degree=='':
            degree='2'
        if radian=='':
            radian=0.2

        ybp_write(p_type, title, XY_T,str(line_x),str(line_y),degree,back_color,radian,line_area)
        op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin提交了{[title]} 的折线图")

    #柱状图
    elif p_type=="2":
        #柱状图X坐标
        bar_x = replace_a(request.values.get("BSX1-input"))
        bar_x=data[bar_x].T.values.tolist()[0]
        #柱状图Y坐标
        bar_y =replace_a(request.values.get("BSY1input"))
        bar_y=(data[bar_y].T.values.tolist())
        ybp_write(p_type, title, XY_T, bar_x, bar_y,degree,back_color)
        op_write(f"用户admin提交 {[title]} 的柱状图")

    #饼图
    elif p_type=="3":
        pie_x =replace_a(request.values.get("BSX1-input"))
        pie_x=data[pie_x].T.values.tolist()[0]

        pie_y =replace_a(request.values.get("BSY1input"))
        pie_y = data[pie_y].T.values.tolist()[0]
        ybp_write(p_type, title, pie_x, pie_y,pie_rose,back_color)
        op_write(f"{time.asctime( time.localtime(time.time()) )} 用户提交了 {[title]} 的饼图")
    #散点图
    elif p_type=="4":
        scatter_x=(replace_a(request.values.get("BSX1-input")))
        scatter_x=data[scatter_x].T.values.tolist()[0]

        scatter_y=replace_a(request.values.get("BSY1input"))
        scatter_y=data[scatter_y].T.values.tolist()[0]

        ybp_write(p_type, title, scatter_x, scatter_y,XY_T,back_color)
        op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin提交了 {[title]} 的散点图")

    #表格图
    elif p_type=="5":
        df_tbs=replace_a(request.values.get("BSX1-input"))
        df_tb=data[df_tbs]
        df_tb.to_csv("./Core_file/sheet_table",index=False)
        ybp_write(p_type)
        op_write(f'{time.asctime( time.localtime(time.time()) )} 用户提交了字段名为 {df_tbs} 的数据表')

    print(request.values.get("YBP_data_value"))



    sort_mod()
    return render_template('Visual.html',title=title,p_type=p_type,XY_T=XY_T,wd=wd,zb=zb,line_x=line_x,line_y=line_y,bar_x=bar_x,bar_y=bar_y,pie_x=pie_x,pie_y=pie_y,
                           scatter_x=scatter_x,scatter_y=scatter_y,pie_rose=pie_rose,degree=degree,back_color=back_color,
                           radian=radian,line_area=line_area,df_tb=df_tb.to_html(index=False,classes="data_show_1"))
def replace_a(data):
    data=str(data).replace(","," ").replace("<div2>","").split(' ')
    del data[0]
    return data

def replace_b(data):
    data=str(data).replace("  ",' ').replace(" ",',')
    return data

def ybp_write(*args):
    f = open("./Core_file/ybp_c.csv", 'a+',newline='')
    csv_writer = csv.writer(f)
    csv_writer.writerow(args)

def sort_mod():
    f = open('Core_file/ybp_c.csv')
    fp = f.readlines()
    lists, lists2 = [], []
    for i in fp:
        lists.append(i)
    lists2 = set(lists)
    f.close()
    f1 = open('Core_file/ybp_c.csv', "w+")
    for i in lists2:
        f1.write(str(i))
