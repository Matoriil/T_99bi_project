import os,psycopg2,xlrd,logging

from translate import Translator
from werkzeug.utils import secure_filename
from flask import render_template, request, redirect,Blueprint,url_for,flash,current_app

import analysis
from Operation_log import op_write
import time
uploads=Blueprint("upload",__name__,url_prefix='/')


@uploads.route('/', methods=['get', 'post'])
@uploads.route('/index', methods=['get', 'post'])
def index():
    file_size = len(os.listdir("./Upload_file_path"))
    ns_f = open('Core_file/ns_xs.txt', "r+").read()
    return render_template('upload.html', file_size=file_size, ns_f=ns_f)


def is_Chinese(word):
    for ch in word:
        if '\u4e00' <= ch <= '\u9fff':
            return True
    return False

@uploads.route('/upload', methods=['get','POST'])
def upload():
    #获取前端传入的文件
    file = request.files['myfile']
    print("正在获取文件")
    #获取传入文件的文件名
    file_name = file.filename
    print("正在获取文件名")
    try:
        file_name_t=file_name.replace(".csv","sample.csv")
        print(file_name_t)
    except:
        pass
    fileNames_test = []
    file_path = "Upload_file_path/"
    for i, j, k in os.walk(file_path):
        fileNames_test.append(k)
    fileNames_test = fileNames_test[0]
    if file_name_t not in fileNames_test:
        file_name=file_name.replace("(","").replace(")","")
        translator = Translator(from_lang="chinese", to_lang="english")
        print(file_name)
        if file_name !="":
            if ".csv" in file_name:
                if is_Chinese(file_name):
                    translation = translator.translate(file_name)
                    translation = translation.replace(".csv","sample.csv")
                    print(translation)
                    save_path = os.path.join("./Upload_file_path/", translation)
                    op_write(f"用户admin上传了{translation}文件")
                    file.save(save_path)
                else:
                    file_name = file_name.replace(".csv", "sample.csv")
                    #csv写入文件系统
                    save_path = os.path.join("./Upload_file_path/",file_name)
                    op_write(f"用户admin上传了{file_name}文件")
                    file.save(save_path)

            if ".xlsx" in file_name:
                #XLSX写入文件系统
                sheet_name=request.values.get("xlsx_sheet")
                if sheet_name=="":
                    sheet_name="Sheet1"
                save_path = os.path.join("./Upload_file_path/", file_name)
                file.save(save_path)
                wb = xlrd.open_workbook(filename=os.path.join("./Upload_file_path/", file_name))
                if sheet_name not in (wb.sheet_names()):
                    flash(f"{file_name}文件中没有 {sheet_name} 工作溥!")
                    os.remove(os.path.join("./Upload_file_path/", file_name))
                else:
                    if is_Chinese(sheet_name):
                        translation = translator.translate(sheet_name+".xlsx")
                        new_filename = translation.replace(".xlsx","sample.xlsx")
                        os.rename(os.path.join("./Upload_file_path/", file_name),os.path.join("./Upload_file_path/", new_filename))
                        op_write(f"{time.asctime(time.localtime(time.time()))} 用户admin上传了{new_filename}文件")
                    else:
                        new_filename=sheet_name+"sample.xlsx"
                        os.rename(os.path.join("./Upload_file_path/", file_name),os.path.join("./Upload_file_path/", new_filename))
                        op_write(f"{time.asctime( time.localtime(time.time()) )} 用户admin上传了{new_filename}文件")
    #数据库用户名
    db_username=request.values.get("data1")
    #数据库密码
    db_password=request.values.get("data2")
    #IP地址
    db_ip=request.values.get("data3")
    #端口
    db_post=request.values.get("data4")
    #数据库名
    db_name=request.values.get("data5")
    #表名
    db_tb_name=request.values.get("data6")
    if db_tb_name!="" or db_username !="" or db_ip!="" or  db_post !="" or  db_name!="":
        try:
            #创建数据库连接
            conn = psycopg2.connect(database=db_name, user=db_username, password=db_password, host=db_ip, port=db_post)
            cur = conn.cursor()
            # 执行查询命令
            cur.execute(f"copy(select * from {db_tb_name}) to 'E:\\pycharm_project\\Hq99(1)\\Upload_file_path\\{db_tb_name}.csv' with csv header")
            op_write(f"{time.asctime( time.localtime(time.time()) )}用户admin导入了 数据库用户名{db_username} 数据库密码为{db_password} IP地址为{db_ip} 端口为{db_post} 数据库名为{db_name} 表名为{db_tb_name} 的数据")
        except:
            flash("数据库连接错误")
    analysis.cachetable()
    return redirect(url_for('upload.index'))
