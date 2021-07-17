from flask import Flask
import data_handle
import upload,oper_log
import show_p,YBP
application=Flask(__name__,instance_relative_config=True)
application.config.from_pyfile("config.py")

application.register_blueprint(upload.uploads)
application.register_blueprint(data_handle.handle)
application.register_blueprint(show_p.show)
application.register_blueprint(YBP.ybp)
application.register_blueprint(oper_log.log)

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=8080,debug=True)