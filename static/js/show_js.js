function init() {
    document.getElementById("group_name").style.display="block";

}

function inpit_text(idss) {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+idss+' ';
}


function JIA_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'+ ';
}
function JIAN_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'- ';
}
function CHEN_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'* ';
}
function CHU_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'/ ';
}
function ZUO_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'( ';
}
function YOU_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+') ';
}
function qi_ziduan_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'* ';
}
function as_div_def() {
    var text=document.getElementById('textarea_data').value;
    document.getElementById('textarea_data').value=text+'as ';
}


function mOver(ids){
    if (ids==='sum()'){document.getElementById('textarea_data_div').innerText='求和'}
    if (ids==='avg()'){document.getElementById('textarea_data_div').innerText='DOUBLE\n' +
        'avg(col), avg(DISTINCT col)\n' +
        'Returns the average of the elements in the group or the average of the distinct values of the column in the group.\n' +
        'avg(col),表示求指定列的平均值，avg(DISTINCT col)表示求去重后的列的平均值'}
    if (ids==='count()'){document.getElementById('textarea_data_div').innerText='BIGINT\n' +
        'count(*), count(expr), count(DISTINCT expr[, expr...])\n' +
        'count(*) - Returns the total number of retrieved rows, including rows containing NULL values.\n' +
        '统计总行数，包括含有NULL值的行\n' +
        'count(expr) - Returns the number of rows for which the supplied expression is non-NULL.\n' +
        '统计提供非NULL的expr表达式值的行数\n' +
        'count(DISTINCT expr[, expr]) - Returns the number of rows for which the supplied expression(s) are unique and non-NULL. Execution of this can be optimized with hive.optimize.distinct.rewrite.\n' +
        '统计提供非NULL且去重后的expr表达式值的行数'}
    if (ids==='max()'){document.getElementById('textarea_data_div').innerText='DOUBLE\n' +
        'max(col)\n' +
        'Returns the maximum value of the column in the group.\n' +
        '求指定列的最大值'}
    if (ids==='min()'){document.getElementById('textarea_data_div').innerText='DOUBLE\n' +
        'min(col)\n' +
        'Returns the minimum of the column in the group.\n' +
        '求指定列的最小值'}
    if (ids==='stddev()'){document.getElementById('textarea_data_div').innerText='DOUBLE\n' +
        'stddev(col)\n' +
        'Returns the standard deviation of a numeric column in the group.\n' +
        '求指定列数值的标准差'}
    if (ids==='variance()'){document.getElementById('textarea_data_div').innerText='DOUBLE\n' +
        'variance(col)\n' +
        'Returns the variance of a numeric column in the group.\n' +
        '求指定列数值的方差'}
    if (ids==='abs()'){document.getElementById('textarea_data_div').innerText='DOUBLE\n' +
        'abs(DOUBLE a)\n' +
        'Returns the absolute value.\n' +
        '计算a的绝对值'}
    if (ids==='date()'){document.getElementById('textarea_data_div').innerText='日期'}
    if (ids==='day()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'day(string date) dayofmonth(date)\n' +
        'Returns the day part of a date or a timestamp string: day("1970-11-01 00:00:00") = 1, day("1970-11-01") = 1.\n' +
        '返回时间字符串的天'}
    if (ids==='year()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'year(string date)\n' +
        'Returns the year part of a date or a timestamp string: year("1970-01-01 00:00:00") = 1970, year("1970-01-01") = 1970.\n' +
        '返回时间字符串的年份部分'}
    if (ids==='month()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'month(string date)\n' +
        'Returns the month part of a date or a timestamp string: month("1970-11-01 00:00:00") = 11, month("1970-11-01") = 11.\n' +
        '返回时间字符串的月份部分'}
    if (ids==='hour()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'hour(string date)\n' +
        'Returns the hour of the timestamp: hour(\'2009-07-30 12:58:59\') = 12, hour(\'12:58:59\') = 12.\n' +
        '返回时间字符串的小时'}
    if (ids==='minute()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'minute(string date)\n' +
        'Returns the minute of the timestamp.\n' +
        '返回时间字符串的分钟'}
    if (ids==='second()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'second(string date)\n' +
        'Returns the second of the timestamp.\n' +
        '返回时间字符串的秒'}
    if (ids==='weekofyear()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'weekofyear(string date)\n' +
        'Returns the week number of a timestamp string: weekofyear("1970-11-01 00:00:00") = 44, weekofyear("1970-11-01") = 44.\n' +
        '返回时间字符串位于一年中的第几个周内  如weekofyear("1970-11-01 00:00:00") = 44, weekofyear("1970-11-01") = 44'}
    if (ids==='datediff()'){document.getElementById('textarea_data_div').innerText='int\n' +
        'datediff(string enddate, string startdate)\n' +
        'Returns the number of days from startdate to enddate: datediff(\'2009-03-01\', \'2009-02-27\') = 2.\n' +
        '计算开始时间startdate到结束时间enddate相差的天数'}
    if (ids==='date_sub()'){document.getElementById('textarea_data_div').innerText='string\n' +
        'date_sub(string startdate, int days)\n' +
        'Subtracts a number of days to startdate: date_sub(\'2008-12-31\', 1) = \'2008-12-30\'.\n' +
        '从开始时间startdate减去days'}
    if (ids==='date_add()'){document.getElementById('textarea_data_div').innerText='string\n' +
        'date_add(string startdate, int days)\n' +
        'Adds a number of days to startdate: date_add(\'2008-12-31\', 1) = \'2009-01-01\'.\n' +
        '从开始时间startdate加上days'}
    if (ids==='CONCAT()'){document.getElementById('textarea_data_div').innerText='string\n' +
        'concat(string|binary A, string|binary B...)\n' +
        'Returns the string or bytes resulting from concatenating the strings or bytes passed in as parameters in order. For example, concat(\'foo\', \'bar\') results in \'foobar\'. Note that this function can take any number of input strings..\n' +
        '对二进制字节码或字符串按次序进行拼接'}




}
function mOut(ids){
    document.getElementById('textarea_data_div').innerText='函数功能:'

}



function quedin_but(){
    document.getElementById('zhezhao').style.display="none";
    var datas=document.getElementById('textarea_data').value;
    document.getElementById('quedin_input').innerText=datas+'';
}


function dianwo(){
    document.getElementById('zhezhao').style.display="";
}
function hidder(){
    document.getElementById('zhezhao').style.display="none";
}

function load() {
        // document.getElementById('zhezhao').style.display="none";

}


var ji = 1;
function table_join_add() {
    if (ji >= 150) {
        alert("超出范围");
    } else {

    var sourceNodeaddc = document.getElementById("js_join"); // 获得被克隆的节点对象
    var clonedNodeaddc = sourceNodeaddc.cloneNode(true); // 克隆节点
    clonedNodeaddc.setAttribute("id", "js_join"+ji); // 修改一下id 值，避免id 重复
    sourceNodeaddc.parentNode.appendChild(clonedNodeaddc); // 在父节点插入克隆的节点

    var sourceNodeadd = document.getElementById("tables2_datas"); // 获得被克隆的节点对象
    var clonedNodeadd = sourceNodeadd.cloneNode(true); // 克隆节点
    clonedNodeadd.setAttribute("id", "tables2_datas"+ji); // 修改一下id 值，避免id 重复
    clonedNodeadd.setAttribute("name", "tables2_datas"+ji); // 修改一下id 值，避免id 重复
    sourceNodeadd.parentNode.appendChild(clonedNodeadd); // 在父节点插入克隆的节点
        ji = ji + 1;
    }
}
function table_join_chu() {

        var odivadd=document.getElementById("js_join"+(ji-1));
        odivadd.parentNode.removeChild(odivadd);
        var odivgb=document.getElementById("tables2_datas"+(ji-1));
        odivgb.parentNode.removeChild(odivgb);
        ji = ji - 1;
}


var i = 1;
function tianjia() {
    if (i >= 150) {
        alert("超出范围");
    } else {
        var sourceNodeaddc = document.getElementById("div_11"); // 获得被克隆的节点对象
    var clonedNodeaddc = sourceNodeaddc.cloneNode(true); // 克隆节点
    clonedNodeaddc.setAttribute("id", "div_11"+i); // 修改一下id 值，避免id 重复
    sourceNodeaddc.parentNode.appendChild(clonedNodeaddc); // 在父节点插入克隆的节点

    var sourceNodeadd = document.getElementById("field_add_but"); // 获得被克隆的节点对象
    var clonedNodeadd = sourceNodeadd.cloneNode(true); // 克隆节点
    clonedNodeadd.setAttribute("id", "field_add_but"+i); // 修改一下id 值，避免id 重复
    clonedNodeadd.setAttribute("class", "select_but_class_add"); // 修改一下id 值，避免id 重复
    sourceNodeadd.parentNode.appendChild(clonedNodeadd); // 在父节点插入克隆的节点

     var sourceNodegb = document.getElementById("group_by_select"); // 获得被克隆的节点对象
    var clonedNodegb = sourceNodegb.cloneNode(true); // 克隆节点
    clonedNodegb.setAttribute("id", "group_by_select"+i); // 修改一下id 值，避免id 重复
    clonedNodegb.setAttribute("name", "group_by_select"+i); // 修改一下id 值，避免id 重复
    clonedNodegb.setAttribute("style", "display:none"); // 修改一下id 值，避免id 重复
    clonedNodegb.setAttribute("class", "select_but_class_add1"); // 修改一下id 值，避免id 重复
    sourceNodegb.parentNode.appendChild(clonedNodegb); // 在父节点插入克隆的节点


    var sourceNode = document.getElementById("select_but"); // 获得被克隆的节点对象
    var clonedNode = sourceNode.cloneNode(true); // 克隆节点
    clonedNode.setAttribute("id", "select_but"+i); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("name", "select_but"+i); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("class", "select_but_class_margin");
    sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点

    var sourceNode1 = document.getElementById("as_name_copy_but"); // 获得被克隆的节点对象
    var clonedNode1 = sourceNode1.cloneNode(true); // 克隆节点
    clonedNode1.setAttribute("id", "as_name_copy_but"+i); // 修改一下id 值，避免id 重复
    clonedNode1.setAttribute("class", "select_but_class_add"); // 修改一下id 值，避免id 重复
    sourceNode1.parentNode.appendChild(clonedNode1); // 在父节点插入克隆的节点

    var sourceNode2 = document.getElementById("as_name_copy_buts"); // 获得被克隆的节点对象
    var clonedNode2 = sourceNode2.cloneNode(true); // 克隆节点
    clonedNode2.setAttribute("id", "as_name_copy_buts"+i); // 修改一下id 值，避免id 重复
    clonedNode2.setAttribute("style", "display:none"); // 修改一下id 值，避免id 重复
    clonedNode2.setAttribute("name", "as_name_copy_buts"+i); // 修改一下id 值，避免id 重复
    sourceNode2.parentNode.appendChild(clonedNode2); // 在父节点插入克隆的节点

    document.getElementById("as_name_copy_buts"+i).value='请输入别名';
        i = i + 1;
    }
}
function jianchu() {
        var odivadd=document.getElementById("field_add_but"+(i-1));
        odivadd.parentNode.removeChild(odivadd);
        var odivgb=document.getElementById("group_by_select"+(i-1));
        odivgb.parentNode.removeChild(odivgb);
        var odiv=document.getElementById("select_but"+(i-1));
        odiv.parentNode.removeChild(odiv);
        var odiv1=document.getElementById("as_name_copy_but"+(i-1));
        odiv1.parentNode.removeChild(odiv1);
        var odiv2=document.getElementById("as_name_copy_buts"+(i-1));
        odiv2.parentNode.removeChild(odiv2);
        i = i - 1;
}


var dic={};
function show_input_as_name(id) {
    if (dic[id]===undefined){
        // alert('dao 1')
        dic[id]=1;
    }
    // alert(dic[id])
    if ((id.substring(16))!==""){
    // alert(id.substring(16));
    if (dic[id]===1){
        document.getElementById("as_name_copy_buts"+id.substring(16)).style.display="inline-block";
       dic[id]=0;
    }else {

        document.getElementById("as_name_copy_buts"+id.substring(16)).style.display="none";
        dic[id]=1;
        // alert(dic[id])
    }
    }else {
        // alert((i-1));
      if (dic[id]===1){
        document.getElementById("as_name_copy_buts").style.display="inline";
        dic[id]=0;
    }else {
        document.getElementById("as_name_copy_buts").style.display="none";
        dic[id]=1;
    }
    }
}

var s = 1;
function tianjias() {
    if (s >= 15) {
        alert("超过15个模板");
    } else {
    var sourceNode0 = document.getElementById("dui"); // 获得被克隆的节点对象
    var clonedNode0 = sourceNode0.cloneNode(true); // 克隆节点
    clonedNode0.setAttribute("id", "dui"+s); // 修改一下id 值，避免id 重复
    clonedNode0.setAttribute("name", "dui"+s); // 修改一下id 值，避免id 重复
    sourceNode0.parentNode.appendChild(clonedNode0); // 在父节点插入克隆的节点

    var sourceNode = document.getElementById("table_join_1"); // 获得被克隆的节点对象
    var clonedNode = sourceNode.cloneNode(true); // 克隆节点
    clonedNode.setAttribute("id", "table_join_1"+s); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("name", "table_join_1"+s); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("class", "select_but_class_adds");
    sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点

    var sourceNode6 = document.getElementById("tableis"); // 获得被克隆的节点对象
    var clonedNode6 = sourceNode6.cloneNode(true); // 克隆节点
    clonedNode6.setAttribute("id", "tableis"+s); // 修改一下id 值，避免id 重复
    clonedNode6.setAttribute("name", "tableis"+s); // 修改一下id 值，避免id 重复
    sourceNode6.parentNode.appendChild(clonedNode6); // 在父节点插入克隆的节点

    var sourceNode1 = document.getElementById("table_join_2"); // 获得被克隆的节点对象
    var clonedNode1 = sourceNode1.cloneNode(true); // 克隆节点
    clonedNode1.setAttribute("id", "table_join_2"+s); // 修改一下id 值，避免id 重复
    clonedNode1.setAttribute("name", "table_join_2"+s); // 修改一下id 值，避免id 重复
    clonedNode1.setAttribute("class", "select_but_class_adds");
    sourceNode1.parentNode.appendChild(clonedNode1); // 在父节点插入克隆的节点

    var sourceNode7 = document.getElementById("and_data"); // 获得被克隆的节点对象
    var clonedNode7 = sourceNode7.cloneNode(true); // 克隆节点
    clonedNode7.setAttribute("id", "and_data"+s); // 修改一下id 值，避免id 重复
    clonedNode7.setAttribute("name", "and_data"+s); // 修改一下id 值，避免id 重复
    sourceNode7.parentNode.appendChild(clonedNode7); // 在父节点插入克隆的节点

    var sourceNode2 = document.getElementById("table_join_3"); // 获得被克隆的节点对象
    var clonedNode2 = sourceNode2.cloneNode(true); // 克隆节点
    clonedNode2.setAttribute("id", "table_join_3"+s); // 修改一下id 值，避免id 重复
    clonedNode2.setAttribute("name", "table_join_3"+s); // 修改一下id 值，避免id 重复
    clonedNode2.setAttribute("class", "select_but_class_adds");
    sourceNode2.parentNode.appendChild(clonedNode2); // 在父节点插入克隆的节点

    var sourceNode3 = document.getElementById("table_ands"); // 获得被克隆的节点对象
    var clonedNode3 = sourceNode3.cloneNode(true); // 克隆节点
    clonedNode3.setAttribute("id", "table_ands"+s); // 修改一下id 值，避免id 重复
    clonedNode3.setAttribute("name", "table_ands"+s); // 修改一下id 值，避免id 重复
    sourceNode3.parentNode.appendChild(clonedNode3); // 在父节点插入克隆的节点

    var sourceNode4 = document.getElementById("table_join_4"); // 获得被克隆的节点对象
    var clonedNode4 = sourceNode4.cloneNode(true); // 克隆节点
    clonedNode4.setAttribute("id", "table_join_4"+s); // 修改一下id 值，避免id 重复
    clonedNode4.setAttribute("name", "table_join_4"+s); // 修改一下id 值，避免id 重复
    clonedNode4.setAttribute("class", "select_but_class_adds");
    sourceNode4.parentNode.appendChild(clonedNode4); // 在父节点插入克隆的节点

    var sourceNode5 = document.getElementById("ziduan_join"); // 获得被克隆的节点对象
    var clonedNode5 = sourceNode5.cloneNode(true); // 克隆节点
    clonedNode5.setAttribute("id", "ziduan_join"+s); // 修改一下id 值，避免id 重复
    clonedNode5.setAttribute("name", "ziduan_join"+s); // 修改一下id 值，避免id 重复
    sourceNode5.parentNode.appendChild(clonedNode5); // 在父节点插入克隆的节点


    var sourceNode8 = document.getElementById("lianhe"); // 获得被克隆的节点对象
    var clonedNode8 = sourceNode8.cloneNode(true); // 克隆节点
    clonedNode8.setAttribute("id", "lianhe"+s); // 修改一下id 值，避免id 重复
    clonedNode8.setAttribute("name", "lianhe"+s); // 修改一下id 值，避免id 重复
    sourceNode8.parentNode.appendChild(clonedNode8); // 在父节点插入克隆的节点

        s = s + 1;
    }
}

function jianchus() {
        var odiv0=document.getElementById("dui"+(s-1));
        odiv0.parentNode.removeChild(odiv0);
        var odiv=document.getElementById("table_join_1"+(s-1));
        odiv.parentNode.removeChild(odiv);
        var odiv1=document.getElementById("tableis"+(s-1));
        odiv1.parentNode.removeChild(odiv1);
        var odiv3=document.getElementById("table_join_2"+(s-1));
        odiv3.parentNode.removeChild(odiv3);
		var odiv4=document.getElementById("and_data"+(s-1));
        odiv4.parentNode.removeChild(odiv4);
		var odiv5=document.getElementById("table_join_3"+(s-1));
        odiv5.parentNode.removeChild(odiv5);
		var odiv6=document.getElementById("table_ands"+(s-1));
        odiv6.parentNode.removeChild(odiv6);
		var odiv7=document.getElementById("table_join_4"+(s-1));
        odiv7.parentNode.removeChild(odiv7);
		var odiv8=document.getElementById("ziduan_join"+(s-1));
        odiv8.parentNode.removeChild(odiv8);
        s = s - 1;
}



var j = 1;
function tianjia1() {
    if (i >= 15) {
        alert("超过15个模板");
    } else {
    var sourceNode0 = document.getElementById("condition_0"); // 获得被克隆的节点对象
    var clonedNode0 = sourceNode0.cloneNode(true); // 克隆节点
    clonedNode0.setAttribute("id", "condition_0"+j); // 修改一下id 值，避免id 重复
    clonedNode0.setAttribute("name", "condition_0"+j); // 修改一下id 值，避免id 重复
    clonedNode0.setAttribute("class", "select_but_class_add");
    sourceNode0.parentNode.appendChild(clonedNode0); // 在父节点插入克隆的节点

    var sourceNode = document.getElementById("condition_1"); // 获得被克隆的节点对象
    var clonedNode = sourceNode.cloneNode(true); // 克隆节点
    clonedNode.setAttribute("id", "condition_1"+j); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("name", "condition_1"+j); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("class", "select_but_class_add");
    sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点

    var sourceNode1 = document.getElementById("condition_2"); // 获得被克隆的节点对象
    var clonedNode1 = sourceNode1.cloneNode(true); // 克隆节点
    clonedNode1.setAttribute("id", "condition_2"+j); // 修改一下id 值，避免id 重复
    clonedNode1.setAttribute("name", "condition_2"+j); // 修改一下id 值，避免id 重复
    clonedNode1.setAttribute("class", "select_but_class_add");
    sourceNode1.parentNode.appendChild(clonedNode1); // 在父节点插入克隆的节点

    var sourceNode2 = document.getElementById("condition_3"); // 获得被克隆的节点对象
    var clonedNode2 = sourceNode2.cloneNode(true); // 克隆节点
    clonedNode2.setAttribute("id", "condition_3"+j); // 修改一下id 值，避免id 重复
    clonedNode2.setAttribute("name", "condition_3"+j); // 修改一下id 值，避免id 重复
    clonedNode2.setAttribute("class", "select_but_class_add");
    sourceNode2.parentNode.appendChild(clonedNode2); // 在父节点插入克隆的节点

    document.getElementById("condition_3"+j).value='无条件';

    var sourceNodeaddc = document.getElementById("div_22"); // 获得被克隆的节点对象
    var clonedNodeaddc = sourceNodeaddc.cloneNode(true); // 克隆节点
    clonedNodeaddc.setAttribute("id", "div_22"+i); // 修改一下id 值，避免id 重复
    sourceNodeaddc.parentNode.appendChild(clonedNodeaddc); // 在父节点插入克隆的节点
        j = j + 1;
    }
}
function jianchu1() {

        var odiv0=document.getElementById("condition_0"+(j-1));
        odiv0.parentNode.removeChild(odiv0);

        var odiv=document.getElementById("condition_1"+(j-1));
        odiv.parentNode.removeChild(odiv);
        var odiv1=document.getElementById("condition_2"+(j-1));
        odiv1.parentNode.removeChild(odiv1);
        var odiv2=document.getElementById("condition_3"+(j-1));
        odiv2.parentNode.removeChild(odiv2);

        j = j - 1;
}


//表连接
var n=1;
function table_block() {
    if (n===1){
        document.getElementById("table_join").style.display="block";
        n=n-1;
    }else {
        document.getElementById("table_join").style.display="none";
        n=n+1;
    }
}


var na=1;
function data_sort() {
    if (na===1){
        document.getElementById("data_sort_html").style.display="block";
        na=na-1;
    }else {
        document.getElementById("data_sort_html").style.display="none";
        na=na+1;
    }
}

var ns=1;
function data_slice() {
    if (ns===1){
        document.getElementById("data_slice_html").style.display="block";
        ns=ns-1;
    }else {
        document.getElementById("data_slice_html").style.display="none";
        ns=ns+1;
    }
}

var nj=1;
function nature_join_def() {
    if (nj===1){
        document.getElementById("N_join").style.display="block";
        nj=nj-1;
    }else {
        document.getElementById("N_join").style.display="none";
        nj=nj+1;
    }
}




// 表的添加和删除
var tables_values = 1;
function select_table_add() {
    if (i >= 150) {
        alert("超出范围");
    } else {
    var sourceNode = document.getElementById("select_table"); // 获得被克隆的节点对象
    var clonedNode = sourceNode.cloneNode(true); // 克隆节点
    clonedNode.setAttribute("id", "select_table"+tables_values); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("name", "select_table"+tables_values); // 修改一下id 值，避免id 重复
    clonedNode.setAttribute("class", "select_but_class");
    sourceNode.parentNode.appendChild(clonedNode); // 在父节点插入克隆的节点
    tables_values = tables_values + 1;
    }
}
function select_table_sub() {
    var div_data=document.getElementById("select_table"+(tables_values-1));
    div_data.parentNode.removeChild(div_data);
    tables_values = tables_values - 1;
}
//结束



var dic_gb={};
function show_group_by_select(id) {
    if (dic_gb[id] === undefined) {
        dic_gb[id] = 1;
    }
    if ((id.substring(13)) === "") {
        // alert(id.substring(13));
        if (dic_gb[id] === 1) {
            document.getElementById("group_by_select").style.display = "inline-block";
            dic_gb[id] = 0;
        } else {
            document.getElementById("group_by_select").style.display = "none";
            dic_gb[id] = 1;
        }
    }
     else {
         if (dic_gb[id]===1){
            document.getElementById("group_by_select"+id.substring(13)).style.display="inline-block";
            dic_gb[id]=0;
        }else {
            document.getElementById("group_by_select"+id.substring(13)).style.display="none";
            dic_gb[id]=1;
        }
    }
}

