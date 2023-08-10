var hdnPKID = "";

$(document).ready(function () {
       ResetControl();
    hdnPKID = getQueryStringValue("id");
    if (hdnPKID == null) {
        hdnPKID = "";
    }
   
    getValueToControl();
    $("#frmBooksDetail").submit(function (event) {
        event.preventDefault();
        debugger;
        if (Validation()) {
            var formData = $(this).formToJson();
            formData["AppBookName"] = $("#txtBookName").val();
            formData["AppAuther"] = $("#txtAuther").val();            
            formData["AppBookID"] = hdnPKID;
            PostDataToaster("Client/Books/SaveBook", formData, true, "SaveDataComplete");
        }
    });
});

function SaveDataComplete(data) {
    if (data != undefined && data != null) {
        //ResetControl();
        getValueToControl();
    }
}
function ResetControl() {
    hdnPKID = "";
    $("#txtBookName").val("");
    $("#txtAuther").val("");
}

function Validation() {
    var isValid = true;
    var strErrorMessage = "";

    if ($("#txtBookName").val() == "") {
        strErrorMessage += "Book Name is Required!<br>";
        isValid = false;
    }
    

    if (!isValid)
        alertError("Validation", strErrorMessage);
    return isValid;
}



function getValueToControl() {

    if (hdnPKID != "") {
        var url = "Client/Books/getSingleBook?IDs=" + hdnPKID;
        //var param = { "IDs": hdnPKID };
        var isAsync = true;
        PostData(url, "", isAsync, "setValueToControl");       
    }
}

function setValueToControl(data) {
    if (data != undefined && data != null) {
        data = data.result[0];
        $("#txtBookName").val(data.appBookName);
        $("#txtAuther").val(data.appAuther);   
    }
}


function setDataList(data) {

    $("#tblListBody").empty();
    if (data != undefined && data != null) {
        data = data.result;
        if (data.length > 0) {
            $("#tmpltblList").tmpl(data).appendTo("#tblListBody");
        }
    }
}


var isValidInfo = true;
var isFirstLoad = false;

