from flask import Blueprint,render_template
import pandas as pd
log=Blueprint("log",__name__)
@log.route("/log")
def oper_log():
    log_datas=pd.read_table("Core_file/Operation_log")
    return render_template("oper_log.html",log_datas=log_datas.to_html(index=True))