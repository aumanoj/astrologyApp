var lsUserAccessToken = 'token';
var lsUserName = 'UserName';
var lsMultiDevice = "MultiDevice";
var vSiteUrl = window.location.origin + "/";
$(document).ready(function () {
    setNumeric();
});
function setChosenDropdown(elementId) {
    if (elementId == undefined || elementId == null)
        elementId='.chosen-select';
    try {
        $(elementId).chosen('destroy');
    } catch { }
    $(elementId).chosen({ allow_single_deselect: true });
    $(".chosen-container").css("width","100%");
}
function showToolTip(strcontrol) {
    if ($(window).width() > 768) {
        $('#' + strcontrol.id).tooltip('show');
    }
    //if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //}
    //else {
    //    $('#' + strcontrol.id).tooltip('show');
    //}
}


function StartLoading() {
    $(".Loading").show();
}
function EndLoading() {
    $(".Loading").hide();
}
function alertSuccess(Header, Message) {
    AlertMessage(Header, Message, '#5ba035', 'success');
}

function alertError(Header, Message) {
    AlertMessage(Header, Message, '#bf441d', 'error');
}
function AlertMessage(Header, Message, loaderBgColor, icon) {
    var options = {
        heading: Header,
        text: Message,
        position: 'top-right',
        loaderBg: loaderBgColor,
        icon: icon,
        hideAfter: 5000,
        stack: 1
    };
    options.showHideTransition = 'slide';
    $.toast().reset('all');
    $.toast(options);
}
function setLocalStorage(vname, vValue) {
    localStorage.setItem(vname, vValue);
}
function getLocalStorage(vname) {
    return localStorage.getItem(vname);
}
function removeLocalStorage(vname) {
    localStorage.removeItem(vname);
}

function setSessionStorage(vname, vValue) {
    sessionStorage.setItem(vname, vValue);
}
function getSessionStorage(vname) {
    return sessionStorage.getItem(vname);
}
function removeSessionStorage(vname) {
    sessionStorage.removeItem(vname);
}
function getQueryStringValue(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function fillDropdown(result, dropdown, defaultMessage, defaultValue, DisplayColumn, ValueColumn) {
    // Remove current options
    dropdown.html('');
    // Add the empty option with the empty message
    dropdown.append('<option value="' + defaultValue + '">' + defaultMessage + '</option>');
    // Check result isnt empty
    if (result != '') {
        // Loop through each of the results and append the option to the dropdown
        $.each(result, function (k, v) {
            dropdown.append('<option value="' + v[ValueColumn] + '">' + v[DisplayColumn] + '</option>');
        });
    }
}
function setNumeric() {
    $(".numeric").bind("keypress", function (e) {
        return isNumeric(e);
    });
    $(".numeric").bind("paste", function (e) {
        return false;
    });
    $(".numeric").bind("drop", function (e) {
        return false;
    });

    $(".number").bind("keypress", function (e) {
        return isNumber(e);
    });
    $(".number").bind("paste", function (e) {
        return false;
    });
    $(".number").bind("drop", function (e) {
        return false;
    });

    //$('.numeric').attr("type", "number");
    //$('.number').attr("type", "number");
}


function isNumber(e) {
    var iKeyCode = (e.which) ? e.which : e.keyCode
    if ($.inArray(iKeyCode, [8, 9, 13, 17, 27, 35, 36, 37, 39, 45]) == -1 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;
    return true;
}

function isNumeric(e) {
    var iKeyCode = (e.which) ? e.which : e.keyCode
    var dot = $("#" + e.target.id).val().indexOf(".", 1);
    if (iKeyCode == 46 && dot >= 1)
        return false;
    if ($.inArray(iKeyCode, [8, 9, 13, 17, 27, 35, 36, 37, 39, 46, 45]) == -1 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}
