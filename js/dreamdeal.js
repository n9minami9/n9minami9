

function popupWarning(message)
{
    $('#numberInputWeight').after(
        "<div class='alert alert-warning alert-dismissible fade in' role='alert'>"
        +"<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        +"<strong>Warning!</strong> "
        + message + 
        "</div>");
}


function onCalcBtnClick() {
    var transType = $('#comboxTransType').prop('selectedIndex');
    var regionType = $('#comboxRegionType').prop('selectedIndex');

    var weightVal = $('#numberInputWeight').val();

    console.log("transType = " + transType);
    console.log("regionType = " + regionType);
    console.log("weightVal = " + weightVal);

    if (weightVal.length <= 0) {
        popupWarning("The Weight is not filled in correctly!");
        return;
    }
}

$(document).ready(function() {
	$("#calcButton").click(onCalcBtnClick);
    $('[data-toggle="popover"]').popover({
        trigger: 'focus',
        html: true
    });
});


