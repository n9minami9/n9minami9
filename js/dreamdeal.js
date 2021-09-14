
function priceTable() {
    // 双斜线的后面是注释，可以不关心
    var table = [
            {
                head: "Air Transport - Normal",
                subHead: "Sabah ABX",
                subHeadCN: "沙巴 ABX",
                w1_5kg: 36, //0.1kg - 5kg, RM36/kg
                w5_kg: 32,  //大于 5kg, RM32/kg
            },
            {
                head: "Air Transport - Normal",
                subHead: "Sarawak ABX",
                subHeadCN: "沙捞越 ABX",
                w1_5kg: 35, //0.1kg - 5kg, RM5/kg
                w5_kg: 30   //大于 5kg, RM30/kg
            },
            {
                head: "Air Transport - Sensibility",
                subHead: "Sabah / Sarawak ABX",
                subHeadCN: "沙巴 / 沙捞越 ABX",
                w1_5kg: 38, //0.1kg - 5kg, RM38/kg
                w5_kg: 35   //大于 5kg, RM35/kg
            },
            {
                head: "Marine Shipping - Small Package",
                subHead: "ABX",
                subHeadCN: "ABX",
                w1kg : 16,  //0.1kg - 1kg，首重RM16
                over1kg: 10 //超过1kg的，每1kg RM10
            },
            {
                head: "Marine Shipping - Big Package",
                subHead: "Sabah - KK / Sarawak - SIBU",
                subHeadCN: "沙巴 - KK / 沙捞越 - SIBU",
                v0_5m3: 647, //0.5m^3起，每m^3 RM647
            },
            {
                head: "Marine Shipping - Big Package",
                subHead: "Sabah/Sarawak - Other",
                subHeadCN: "沙巴 / 沙捞越 - Other",
                v0_5m3: 725, //0.5m^3起，每m^3 RM725
            }
        ];
    return table;
}


function languageType()
{
    var path = window.location.pathname;
    if (path.indexOf("/zh-CN/index.html") > 0)
        return "zh-CN";
    return "en";
}


function genPriceTableShow()
{
    var priceTab = priceTable();
    //价格表1
    if (languageType() == "zh-CN")
        $('#SabahABX').append("<strong>" + priceTab[0].subHeadCN + "<strong><br>");
    else
        $('#SabahABX').append("<strong>" + priceTab[0].subHead + "<strong><br>");
    $('#SabahABX').append("<strong>- RM"+ priceTab[0].w1_5kg +"/kg [0.1kg - 5kg]<strong><br>");
    $('#SabahABX').append("<strong>- RM"+ priceTab[0].w5_kg +"/kg [5.1kg+]<strong>");

    if (languageType() == "zh-CN")
        $('#SarawakABX').append("<strong>" + priceTab[1].subHeadCN + "<strong><br>");
    else
        $('#SarawakABX').append("<strong>" + priceTab[1].subHead + "<strong><br>");
    $('#SarawakABX').append("<strong>- RM"+ priceTab[1].w1_5kg +"/kg [0.1kg - 5kg]<strong><br>");
    $('#SarawakABX').append("<strong>- RM"+ priceTab[1].w5_kg +"/kg [5.1kg+]<strong>");

    if (languageType() == "zh-CN")
        $('#SabahSarawakABX').append("<strong>" + priceTab[2].subHeadCN + "<strong><br>");
    else
        $('#SabahSarawakABX').append("<strong>" + priceTab[2].subHead + "<strong><br>");
    $('#SabahSarawakABX').append("<strong>- RM"+ priceTab[2].w1_5kg +"/kg [0.1kg - 5kg]<strong><br>");
    $('#SabahSarawakABX').append("<strong>- RM"+ priceTab[2].w5_kg +"/kg [5.1kg+]<strong>");

    if (languageType() == "zh-CN")
        $('#ABX').append("<strong>" + priceTab[3].subHeadCN + "<strong><br>");
    else
        $('#ABX').append("<strong>" + priceTab[3].subHead + "<strong><br>");
    $('#ABX').append("<strong>- RM"+ priceTab[3].w1kg +"/kg [0.1kg - 1kg]<strong><br>");
    $('#ABX').append("<strong>- Part over 1kg, RM"+ priceTab[3].over1kg +"/kg [1kg+]<strong>");  

    if (languageType() == "zh-CN")
        $('#SabahKKSarawakSIBU').append("<strong>" + priceTab[4].subHeadCN + "<strong><br>");
    else
        $('#SabahKKSarawakSIBU').append("<strong>" + priceTab[4].subHead + "<strong><br>");
    $('#SabahKKSarawakSIBU').append("<strong>- RM"+ priceTab[4].v0_5m3 +"/m^3 [0.5m^3 +]<strong>");

    if (languageType() == "zh-CN")
        $('#SabahSarawakOther').append("<strong>" + priceTab[5].subHeadCN + "<strong><br>");
    else
        $('#SabahSarawakOther').append("<strong>" + priceTab[5].subHead + "<strong><br>");
    $('#SabahSarawakOther').append("<strong>- RM"+ priceTab[5].v0_5m3 +"/m^3 [0.5m^3 +]<strong>");
}


/*
    参数1 - 快递类型，包含四种类型
    0.空运普通货
    1.空运敏感货
    2.海运小包

    参数2 - 运送地区，包含两个地区
    0.沙巴
    1.沙捞越
    2.沙巴其他地区
    3.沙捞越其他地区

    参数3 - 货物长宽高，单位cm

    参数4 - 货物件数
 */
function calcRM(transType, regionType, weight, volume, count)
{
    var priceTab = priceTable();
    
    /* 沙巴-空运普通货 */
    if (transType === 0 && regionType === 0) {
        if (weight >= 1 && weight < 5)
            return weight * priceTab[0].w1_5kg;
        if (weight >= 5)
            return weight * priceTab[0].w5_kg;
    }
    /* 沙捞越-空运普通货 */
    if (transType === 0 && regionType === 1) {
        if (weight >= 1 && weight < 5)
            return weight * priceTab[1].w1_5kg;
        if (weight >= 5)
            return weight * priceTab[1].w5_kg;
    }
    /* 沙巴，沙捞越-空运敏感货 */
    if (transType === 1 && (regionType === 1 || regionType === 0)) {
        if (weight >= 1 && weight < 5)
            return weight * priceTab[2].w1_5kg;
        if (weight >= 5)
            return weight * priceTab[2].w5_kg;
    }
    /* 沙巴，沙捞越-海运小包 */
    if (transType === 2 && (regionType === 1 || regionType === 0)) {
        if (weight <= 1) 
            return weight * priceTab[3].w1kg;
        if (weight > 1)
            return priceTab[3].w1kg + (weight - 1) * priceTab[3].over1kg;
    }
    return -1;
}

/* 在某元素后面弹出一个Warning */
function popupWarning(who, message)
{
    $('#' + who).after(
        "<div id='warningAlert' class='alert alert-warning alert-dismissible fade in' role='alert'>"
        +"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        +"<strong>Warning!</strong> "
        + message + 
        "</div>");
}

/* 检查体积参数 */
function checkVolume(lengthVal, widthVal, heightVal)
{
    var langType = languageType();
    if (lengthVal.length <= 0 || lengthVal <= 0) {
        popupWarning('numberInputLength', langType === "zh-CN"? "货物长度的填写不正确！" : "The Goods's length is not filled in correctly!");
        return -1;
    }

    if (widthVal.length <= 0 || widthVal <= 0) {
        popupWarning('numberInputWidth', langType === "zh-CN"? "货物宽度的填写不正确！" : "The Goods's width is not filled in correctly!");
        return -1;
    }

    if (heightVal.length <= 0 || heightVal <= 0) {
        popupWarning('numberInputHeight', langType === "zh-CN"? "货物高度的填写不正确！" : "The Goods's height is not filled in correctly!");
        return -1;
    }
    return 0;
}

/* 检查运输类型参数 */
function checkTransType(transType)
{
    var langType = languageType();
    if (transType === 3) {
        popupWarning('comboxTransType', langType === "zh-CN"? "货物运输类型的填写不正确！" :"The shipping price of large package is calculated using the actual received weight, please consult the consignee!");
        return -1;
    }
    return 0;
}

/* 检查运输地区 */
function checkRegionType(regionType)
{
    var langType = languageType();
    if (regionType >= 2) {
        popupWarning('comboxRegionType', langType === "zh-CN"? "货物运输地区的填写不正确！" :"Other areas can only use shipping large bags, please consult the consignee!");
        return -1;
    }
    return 0;
}

/* 检查货物重量值 */
function checkWeightVal(weightVal)
{
    var langType = languageType();
    if (weightVal.length <= 0) {
        popupWarning('numberInputWeight', langType === "zh-CN"? "货物重量的填写不正确！" :"The Weight is not filled in correctly!");
        return -1;
    }
    if (weightVal < 1) {
        popupWarning('numberInputWeight', langType === "zh-CN"? "货物重量低于1kg的将不接收运送！" :"We don't accept goods in weight less than 1kg!");
        return -1;
    }
    return 0;
}

/* 检查货物件数值 */
function checkCountVal(countVal)
{
    var langType = languageType();
    if (countVal.length <= 0) {
        popupWarning('numberInputCount', langType === "zh-CN"? "货物件数的填写不正确！" :"The Count is not filled in correctly!");
        return -1;
    }
    if (countVal < 1) {
        popupWarning('numberInputCount', langType === "zh-CN"? "货物件数不得小于1！" :"We don't accept goods in count less than 1!");
        return -1;
    }
    return 0;
}


function onCalcBtnClick() {
    /* 获取当前的值 */
    var transType = $('#comboxTransType').prop('selectedIndex');
    var regionType = $('#comboxRegionType').prop('selectedIndex');
    var weightVal = $('#numberInputWeight').val();
    var lengthVal = $('#numberInputLength').val();
    var widthVal = $('#numberInputWidth').val();
    var heightVal = $('#numberInputHeight').val();
    var countVal = $('#numberInputCount').val();
    /* 检查输入 */
    if (checkTransType(transType) < 0)
        return;
    if (checkRegionType(regionType) < 0)
        return;
    if (checkWeightVal(weightVal) < 0)
        return;
    if (checkVolume(lengthVal, widthVal, heightVal) < 0)
        return;
    if (checkCountVal(countVal) < 0) 
        return;
    var volumeVal = lengthVal * widthVal * heightVal / 1000000;
    /* 计算马来西亚币 */
    var rm = calcRM(transType, regionType, weightVal, volumeVal, countVal);
    $('#textCYM').text(rm);
    /* 计算人民币 */
    var rate = $('#textExchangeRate').text();

    $('#textCNY').text(rm / rate);
}

$(document).ready(function() {
	$("#calcButton").click(onCalcBtnClick);
    $('[data-toggle="popover"]').popover({
        trigger: 'focus',
        html: true
    });
    var controls = new Array('comboxTransType',
                        'comboxRegionType',
                        'numberInputWeight',
                        'numberInputWidth',
                        'numberInputLength',
                        'numberInputHeight',
                        'numberInputCount');
    $.each(controls, function(){
        $('#' + this).focus(function() {
            $('#warningAlert').alert('close');
        });
    });

    $.get("https://api.it120.cc/gooking/forex/rate?fromCode=CNY&toCode=MYR",function(data,status){
        $('#textExchangeRate').text(data.data.rate);
    });
    genPriceTableShow();
});


