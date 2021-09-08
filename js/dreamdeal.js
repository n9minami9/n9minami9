

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
    /* 沙巴-空运普通货 */
    if (transType === 0 && regionType === 0) {
        if (weight >= 1 && weight < 5)
            return weight * 36;
        if (weight >= 5)
            return weight * 32;
    }
    /* 沙捞越-空运普通货 */
    if (transType === 0 && regionType === 1) {
        if (weight >= 1 && weight < 5)
            return weight * 35;
        if (weight >= 5)
            return weight * 30;
    }
    /* 沙巴，沙捞越-空运敏感货 */
    if (transType === 1 && (regionType === 1 || regionType === 0)) {
        if (weight >= 1 && weight < 5)
            return weight * 38;
        if (weight >= 5)
            return weight * 35;
    }
    /* 沙巴，沙捞越-海运小包 */
    if (transType === 2 && (regionType === 1 || regionType === 0)) {
        if (weight <= 1) 
            return weight * 16;
        if (weight > 1)
            return 16 + (weight - 1) * 10;
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
    if (lengthVal.length <= 0 || lengthVal <= 0) {
        popupWarning('numberInputLength', "The Goods's length is not filled in correctly!");
        return -1;
    }

    if (widthVal.length <= 0 || widthVal <= 0) {
        popupWarning('numberInputWidth', "The Goods's width is not filled in correctly!");
        return -1;
    }

    if (heightVal.length <= 0 || heightVal <= 0) {
        popupWarning('numberInputHeight', "The Goods's height is not filled in correctly!");
        return -1;
    }
    return 0;
}

/* 检查运输类型参数 */
function checkTransType(transType)
{
    if (transType === 3) {
        popupWarning('comboxTransType', "The shipping price of large package is calculated using the actual received weight, please consult the consignee!");
        return -1;
    }
    return 0;
}

/* 检查运输地区 */
function checkRegionType(regionType)
{
    if (regionType >= 2) {
        popupWarning('comboxRegionType', "Other areas can only use shipping large bags, please consult the consignee!");
        return -1;
    }
    return 0;
}

/* 检查货物重量值 */
function checkWeightVal(weightVal)
{
    console.log("Weright = " + weightVal);
    if (weightVal.length <= 0) {
        popupWarning('numberInputWeight', "The Weight is not filled in correctly!");
        return -1;
    }
    if (weightVal < 1) {
        popupWarning('numberInputWeight', "We don't accept goods in weight less than 1kg!");
        return -1;
    }
    return 0;
}

/* 检查货物件数值 */
function checkCountVal(countVal)
{
    if (countVal.length <= 0) {
        popupWarning('numberInputCount', "The Count is not filled in correctly!");
        return -1;
    }
    if (countVal < 1) {
        popupWarning('numberInputCount', "We don't accept goods in count less than 1!");
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
});


