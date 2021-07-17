def op_write(datas):
    f=open("Core_file/Operation_log","a+")
    f.write(datas)
    f.write("\n")