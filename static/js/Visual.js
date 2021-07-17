var x_data = 0;//xy轴的数据数量
var y_data = 0;
var n = 1;
var dic = {};//存放数据的字典

var XYTF_data = 0;//玫瑰图是否转换

var box_data = 1;//现在在第几个图类型

var pie_y = 0;//饼图数据y轴判断设置数量



var x_zhi_len=0;//长度指标
var y_zhi_len=0;

var table_value=0;


//数据放置
function data_places() {


    document.getElementById("data-color").style.display = "none";
    document.getElementById("degree_finish").style.display = "none";
    document.getElementById("compliance_set").style.display = "none";
    document.getElementById("data_input").style.display = "block";
    document.getElementById("titil-from").style.display = "block";
    if(box_data ===3){
        document.getElementById("grid-form-dx_BS" + 3).style.display = "block";
    }else {
    document.getElementById("grid-form-dx_BS1").style.display = "block";}
    document.getElementById("Extrusion_shape").style.display = "block";//空白墙显示
}


//颜色设置
function YBPcolorDEF() {
    document.getElementById("compliance_set").style.display = "none";//柔软度设置
    document.getElementById("degree_finish").style.display = "none";//粗细显示
     document.getElementById("data-color").style.display = "block";//颜色显示
    document.getElementById("grid-form-dx_BS1").style.display = "none";//折线图隐藏
    document.getElementById("grid-form-dx_BS3").style.display = "none";//饼图隐藏
    document.getElementById("titil-from").style.display = "none";//标题隐身
    document.getElementById("Extrusion_shape").style.display = "none";//空白墙隐身
    document.getElementById('data_place').classList.remove("btn-default-initialize");//取消数据设置高亮
}
//粗细
function The_Thickness_def() {
     document.getElementById("compliance_set").style.display = "none";//柔软度设置
    document.getElementById("degree_finish").style.display = "block";//粗细显示
    document.getElementById("data-color").style.display = "none";//颜色显示
    document.getElementById("grid-form-dx_BS1").style.display = "none";//折线图隐藏
    document.getElementById("grid-form-dx_BS3").style.display = "none";//饼图隐藏
    document.getElementById("titil-from").style.display = "none";//标题隐身
    document.getElementById("Extrusion_shape").style.display = "none";//空白墙隐身
    document.getElementById('data_place').classList.remove("btn-default-initialize");//取消数据设置高亮
}

//柔软度
function emo_set_def() {
    document.getElementById("compliance_set").style.display = "block";//柔软度设置
    document.getElementById("degree_finish").style.display = "none";//粗细显示
    document.getElementById("data-color").style.display = "none";//颜色显示
    document.getElementById("grid-form-dx_BS1").style.display = "none";//折线图隐藏
    document.getElementById("grid-form-dx_BS3").style.display = "none";//饼图隐藏
    document.getElementById("titil-from").style.display = "none";//标题隐身
    document.getElementById("Extrusion_shape").style.display = "none";//空白墙隐身
    document.getElementById('data_place').classList.remove("btn-default-initialize");//取消数据设置高亮
}


//初始值高亮确定
function load() {
        //折线图和数据放置高亮
        document.getElementById('dx_BS1').classList.add("button0");
        document.getElementById('data_place').classList.add("btn-default-initialize");

}







//玫瑰图设置
function XYTF() {
    document.getElementById('data_place').classList.remove("btn-default-initialize");
    if (XYTF_data === 0) {
            document.getElementById('XYTFNAME').innerHTML = 'XY轴转换:开启';
        XYTF_data = 1;
        document.getElementById('XYtransform').value = XYTF_data;
    } else {

        document.getElementById('XYTFNAME').innerHTML = 'XY轴转换:关闭';
        XYTF_data = 0;
        document.getElementById('XYtransform').value = XYTF_data;
    }
}

//数据提交判断
function subit_onclick() {
    if(box_data!==5){

    if(document.getElementById('title-div1').value===''){
        alert('标题不能为空');
        return false;
    }
    }

    if(box_data===5){
        if(table_value===0){
            alert('数据不能为空');
            return false;
        }
    }

    if(box_data===4){
        if(x_zhi_len===0 && y_zhi_len===0){
            alert('指标轴数据不能为空');
            return false;
        }
        if(x_zhi_len!==y_zhi_len){
            alert('XY指标轴数据长度不相等');
            return false;
        }
    }



    if(box_data!==4 && box_data!==5){
    if (x_data === 0) {
        alert("X轴数据为空");
        return false;
    }
    if (y_data === 0) {
        alert("Y轴数据为空")
        return false;
    }}
    return true;
}

//点击图标的数据清除和初始化 数据选择的显示
function chooseType(e) {
    //遍历字典数据
    var canshu = $(e).attr("id");
    var boxId = document.getElementById(e.id).parentNode.id;
    var arr = document.getElementById(boxId).children;
    for (var i = 0; i < arr.length; i++) {
        //遍历所有子元素移除 高亮 class
        arr[i].classList.remove("button0");
    }
    document.getElementById(canshu).classList.add("button0");
    let length = Object.keys(dic).length;
    for (var item in dic) {
        if (dic[item] === 1) {
            // alert(dic[item])
            console.log(item);
            var items;
            if (item.indexOf('<div2>') !== 7) {
                items = item.replace('<datas>', '<item>')
            } else {
                items = item.replace('<datas>', '<idiv>')
            }
            console.log(items);
            var odiv = document.getElementById(items);
            odiv.parentNode.removeChild(odiv);
        }
        document.getElementById('BSX1-input').value = '';
        document.getElementById('BSY1input').value = '';


    }

    //数据初始化


    document.getElementById("weidu").style.display = "block";//维度显示
    document.getElementById("weidu2").style.display = "none";//维度2不显示
    document.getElementById("result_data3").style.display = "none";//维度2不显示

    document.getElementById("Extrusion_shape").style.display = "block";//空白墙显示
    document.getElementById('title-div1').value = '';//title默认值为空
    document.getElementById('data_place').classList.add("btn-default-initialize");//默认数据放置高亮
    document.getElementById("data-color").style.display = "none";//color默认每次进入隐藏
    document.getElementById("titil-from").style.display = "block";//title默认每次进入隐藏
    document.getElementById('XYTFNAME').innerHTML = 'XY轴转换:关闭';

    document.getElementById("degree_finish").style.display = "none";//粗细显示

    show_1_value = 0;//xy轴转换初始化
    x_data = 0;//初始化x轴
    pie_y = 0;//饼图数据y轴判断设置数量
    dic = {};//字典初始化
    XYTF_data = 0;//玫瑰图是否转换
    y_data=0;
    x_zhi_len=0;
    y_zhi_len=0;



    document.getElementById('The_emo').style.display = "none";//柔软度按钮隐藏
    document.getElementById('compliance_set').style.display = "none";//柔软度
    document.getElementById('compliance_value').value = '';//柔软度数据初始化
    document.getElementById('degree_finish_data').value = '';

    document.getElementById('The_Thickness').style.display = "none";//默认粗细设置隐藏

    if (canshu === 'dx_BS1' || canshu==='dx_BS6') {
        document.getElementById('Area_value').value = 0;
        if(canshu==='dx_BS6'){
            document.getElementById('Area_value').value = 1;
        }

        box_data = 1;
        document.getElementById('The_emo').style.display = "inline-block";//柔软度按钮
        document.getElementById('The_Thickness').style.display = "inline-block";//粗细设置

        document.getElementById('BOX_data').value = 1;
        document.getElementById("grid-form-dx_BS3").style.display = "none";
        document.getElementById("grid-form-dx_BS1").style.display = "block";
    }
    if (canshu === 'dx_BS2') {
        box_data = 2;
        document.getElementById('BOX_data').value = 2;
        document.getElementById('The_Thickness').style.display = "inline-block";//粗细设置
        document.getElementById("grid-form-dx_BS3").style.display = "none";
        document.getElementById("grid-form-dx_BS1").style.display = "block";
    }
    if (canshu === 'dx_BS3' || canshu === 'dx_BS7') {
        document.getElementById('XYtransform').value =0;
        if(canshu==='dx_BS7'){
            document.getElementById('XYtransform').value =1;
        }
        box_data = 3;
        document.getElementById('XYTFNAME').style.display = "none";
        document.getElementById("XYTFNAME").style.display = "inline-block";
        document.getElementById('BOX_data').value = 3;
        document.getElementById("grid-form-dx_BS3").style.display = "block";
        document.getElementById("grid-form-dx_BS1").style.display = "none";
    }
    document.getElementById('x_zhou').innerHTML = 'X轴';
    document.getElementById('y_zhou').innerHTML = 'Y轴';
    if (canshu === 'dx_BS4') {
        document.getElementById('x_zhou').innerHTML = 'X指标轴';
        document.getElementById('y_zhou').innerHTML = 'Y指标轴';

        box_data = 4;
        document.getElementById("weidu").style.display = "none";//维度不显示
        document.getElementById("result_data").style.display = "none";//维度不显示
        document.getElementById("weidu2").style.display = "block";//维度2显示



        document.getElementById('BOX_data').value = 4;
        document.getElementById("grid-form-dx_BS3").style.display = "none";
        document.getElementById("grid-form-dx_BS1").style.display = "block";
    }
    document.getElementById("zhibiao").style.display = "block";
    document.getElementById("result_data2").style.display = "none";
    document.getElementById("y_data_zhou").style.display = "block";
    document.getElementById("YBP_data_color").style.display = "inline-block";

    if (canshu === 'dx_BS5') {
        box_data = 5;


        document.getElementById("YBP_data_color").style.display = "none";
        document.getElementById("y_data_zhou").style.display = "none";
        document.getElementById("zhibiao").style.display = "none";
        document.getElementById("result_data2").style.display = "none";


        document.getElementById('BOX_data').value = 5;

        document.getElementById("XYTFNAME").style.display = "none";//转换按钮隐藏
        document.getElementById("grid-form-dx_BS3").style.display = "none";
        document.getElementById("grid-form-dx_BS1").style.display = "block";

        inline-block
    }
}

//数据拖动禁止默认事件触发
function allowDrop(ev) {
    ev.preventDefault();
}

//数据拖动确定数据
function drag(ev) {
    ev.dataTransfer.setData('Text', ev.target.id);
}

//x轴数据托放放置设置
function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData('Text');

    if (data.indexOf("<div2>") !== 0 && x_data === 0) {
        if (dic["<datas>" + data] === undefined && data.indexOf("<item>") !== 0) {
            // 判断id有没有在里面，没有就变成1

            var item = document.getElementById(data).cloneNode(true);
            item.setAttribute("id", "<item>" + data); // 修改一下id 值，避免id 重复
            ev.target.appendChild(item);

            dic["<datas>" + data] = 1;
            var text = document.getElementById('BSX1-input').value
            document.getElementById('BSX1-input').value = text + ',' + data;
            if(box_data ===4){x_data = 0;
            x_zhi_len=x_zhi_len+1;
            }else {
            x_data = 1;}
            if(box_data ===5){
                x_data = 0;
                table_value=table_value+1
            }else {
            x_data = 1;}
        }


    }
}

//y轴数据托放放置设置
function drop_div2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('Text');
    //饼图数据y轴判断是否是1个
    if (box_data === 3 && pie_y > 0) {
        alert('Y轴只能有一个数据')
        return false;
    }
    y_data = y_data + 1;
    //y轴数据放置
    if (data.indexOf("<div2>") === 0) {
        if (dic["<datas>" + data] === undefined && data.indexOf("<idiv>") !== 0) {
            // 判断id有没有在里面，没有就变成1
            var item = document.getElementById(data).cloneNode(true);
            item.setAttribute("id", "<idiv>" + data); // 修改一下id 值，避免id 重复
            ev.target.appendChild(item);

            dic["<datas>" + data] = 1;

            var text = document.getElementById('BSY1input').value
            document.getElementById('BSY1input').value = text + ',' + data;


            y_zhi_len=y_zhi_len+1;
            pie_y = pie_y + 1;
        }
    }
}

//数据删除
function deletes(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('Text');

    if (data.indexOf("<item>") === 0) {
        dic["<datas>" + data.substring(6)] = undefined;

        var odiv = document.getElementById(data);
        odiv.parentNode.removeChild(odiv);

        var text = document.getElementById('BSX1-input').value
        var list = text.split(',')
        var index = list.length - 1
        delete list[index];
        document.getElementById('BSX1-input').value = list;
        x_data = 0;
        x_zhi_len=x_zhi_len-1;
        table_value=table_value-1;
    }
    if (data.indexOf("<idiv>") === 0) {
        dic["<datas>" + data.substring(6)] = undefined;
        var asdiv = document.getElementById(data);
        asdiv.parentNode.removeChild(asdiv);

        var text1 = document.getElementById('BSY1input').value
        var list1 = text1.split(',')
        var index1 = list1.length - 1
        delete list1[index1];
        document.getElementById('BSY1input').value = list1;

        y_zhi_len=y_zhi_len-1;
        y_data = y_data - 1;
        pie_y = pie_y - 1;
    }
}

//数据下拉框
function aa() {
    var a = document.getElementById("result_data").scrollTop;
    var b = document.getElementById("result_data").scrollLeft;
    document.getElementById("result_items").scrollTop = a;
    document.getElementById("result_head").scrollLeft = b;
}

