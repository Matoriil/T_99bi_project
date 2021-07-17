from flask import render_template,Blueprint,request
import csv,json,os,base64
import pandas as pd
from show_p import ybp_write,sort_mod


ybp=Blueprint("ybp",__name__)
@ybp.route('/ybp',methods=["get","post"])
def ybp_c():
    csv_file = csv.reader(open('./Core_file/ybp_c.csv', 'r'))
    ybp_data = []
    for i in csv_file:
        ybp_data.append(i)

    ybp_size=request.values.get("rrefresh_data_value")
    default_sizes()
    if ybp_size:
        f=open("./Core_file/ybp_sizes",'w')
        f.write(ybp_size)

    #整合echarts图表数据和拖拽div数据
    f = open("./Core_file/ybp_sizes", 'r')
    ybp_size = json.loads(f.read())
    datas = []
    for i in ybp_size:
        datas.append(str(i + "|" + ybp_size[i]))

    y=0
    try:
        with open("./Core_file/ybp_c.csv") as csvFile:
            rows = csv.reader(csvFile)
            with open("./Core_file/data_result.csv", 'w') as f:
                writer = csv.writer(f)
                for row in rows:
                    row.append(datas[y])
                    y += 1
                    writer.writerow(row)
    except:
        pass

    csv_file = csv.reader(open('./Core_file/data_result.csv', 'r',newline=""))
    ybp_data = []
    for i in csv_file:
        if i!=[]:
            ybp_data.append(i)
    #数据表
    try:
        df_tb=pd.read_csv("./Core_file/sheet_table")
    except:
        df_tb=pd.read_csv('./Core_file/sheet_Null')

    YBP_delete=request.values.get("YBP_data_value")
    if YBP_delete=="1":
        f1=open("Core_file/ybp_c.csv",'w+')
        f1.write("")
        f2=open("Core_file/data_result.csv","w+")
        f2.write("")
        f1s=open("Core_file/sheet_table","w+")
        f1s.write("")
        try:
            os.remove("static/matplotlibpicture/cluster.jpg")
            os.remove("static/matplotlibpicture/fitting.jpg")
        except:
            pass
    #聚类
    cluster_ext=str(os.path.exists("static/matplotlibpicture/cluster.jpg"))
    if cluster_ext ==   "True":
        ybp_write(6, "matplotlibpicture/cluster.jpg")
    #拟合
    fitting_ext = str(os.path.exists("static/matplotlibpicture/fitting.jpg"))
    if fitting_ext=="True":
        ybp_write(7, "/matplotlibpicture/fitting.jpg")
    sort_mod()
    return render_template("DashBoard.html",ybp_data=ybp_data,df_tb=df_tb.to_html(index=False,classes="data_show_1"),cluster_ext=cluster_ext,fitting_ext=fitting_ext)

#将图片传至前端
def return_img_stream(img_local_path):
    import base64
    img_stream = ''
    with open(img_local_path, 'rb') as img_f:
        img_stream = img_f.read()
        img_stream = base64.b64encode(img_stream).decode()
    return img_stream




def default_sizes():
    csv_file = csv.reader(open('./Core_file/ybp_c.csv', 'r'))
    f = open("./Core_file/ybp_sizes", 'w')
    y=1
    data=[]
    for i in csv_file:
        data.append(f'"refresh{y}":"200px,300px,-3px,62px"')
        y+=1
    f.write(str(data).replace("['","{").replace("']","}").replace(", ","").replace("''",","))