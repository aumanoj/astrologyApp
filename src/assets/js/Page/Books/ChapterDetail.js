var hdnPKID = "";

$(document).ready(function () {
    ResetControl();
    hdnPKID = getQueryStringValue("id");
    if (hdnPKID == null) {
        hdnPKID = "";
    }
    getBooks();
    getValueToControl();
    $("#frmChapterDetail").submit(function (event) {
        event.preventDefault();
         if (Validation()) {
            var formData = $(this).formToJson();
            formData["AppBookID"] = $("#ddlBook").val();
            formData["AppChapterNo"] = $("#txtChapterNo").val();  
            formData["AppChapterTitle"] = $("#txtTitle").val();  
            formData["AppChapterID"] = hdnPKID;
            PostDataToaster("Client/Books/SaveChapter", formData, true, "SaveDataComplete");
        }
    });
});

// For Books 
function getBooks() {    
    var url = "Client/Books/getBookList";
    var isAsync = false;
    PostData(url, "", isAsync, "setBook");
}

function setBook(data) {

    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlBook"), "--Select Books--", 0, 'appBookName', 'appBookID');
    }
}

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


    if ($("#ddlBook").val() == "0") {
        strErrorMessage += "Select Book!<br>";
        isValid = false;
    }

    if ($("#txtChapterNo").val() == "") {
        strErrorMessage += "Chapter no is required!<br>";
        isValid = false;
    }

    if ($("#txtTitle").val() == "") {
        strErrorMessage += "Title is required!<br>";
        isValid = false;
    }
    

    if (!isValid)
        alertError("Validation", strErrorMessage);
    return isValid;
}



function getValueToControl() {

    if (hdnPKID != "") {
        var url = "Client/Books/getSingleChapter?IDs=" + hdnPKID;
        //var param = { "IDs": hdnPKID };
        var isAsync = true;
        PostData(url, "", isAsync, "setValueToControl");       
    }
}

function setValueToControl(data) {
    if (data != undefined && data != null) {
        data = data.result[0];
        $("#ddlBook").val(data.appBookID).trigger("chosen:updated");
        $("#txtChapterNo").val(data.appChapterNo);
        $("#txtTitle").val(data.appChapterTitle);   
    }
}




var isValidInfo = true;
var isFirstLoad = false;

