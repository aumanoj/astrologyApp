var hdnPKID = "";

$(document).ready(function () {
    ResetControl();
    hdnPKID = getQueryStringValue("id");
    if (hdnPKID == null) {
        hdnPKID = "";
    }
    getBooks();

    getValueToControl();
    $("#frmContentDetail").submit(function (event) {
        event.preventDefault();
        if (Validation()) {
            var formData = $(this).formToJson();
            formData["AppBookID"] = $("#ddlBook").val();
            formData["AppChapterId"] = $("#ddlChapter").val();
            formData["AppParentID"] = $("#ddlHeader").val();
            formData["AppHeader"] = $("#txtHeaderTitle").val();
            formData["AppContent"] = $("#txtContent").val();
            formData["AppContentID"] = hdnPKID;
            PostDataToaster("Client/Books/SaveContent", formData, true, "SaveDataComplete");
        }
    });
    $('#ddlBook').on('change', function () {
        debugger;
        getChapter();
    });
    $('#ddlChapter').on('change', function () {
        getHeader();
    });
});

// For Books 
function getBooks() {
    debugger;
    var url = "Client/Books/getBookList";

    var isAsync = false;
    PostData(url, "", isAsync, "setBook");
}



// For Chapter 
function getChapter() {
    var book = $('#ddlBook').val();
    var url = "Client/Books/getChapterListByBook?id=" + book;
    var isAsync = false;
    PostData(url, "", isAsync, "setChapter");
}


// For Header 
function getHeader() {
    var chapter = $('#ddlChapter').val();
    var url = "Client/Books/getContentListByChapterID?id=" + chapter;

    var isAsync = false;
    PostData(url, "", isAsync, "setHeader");
}

function setBook(data) {

    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlBook"), "--Select Books--", 0, 'appBookName', 'appBookID');
    }
}



function setChapter(data) {
    debugger;
    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlChapter"), "--Select Chapter--", 0, 'appChapterTitle', 'appChapterID');
    }
}

function setHeader(data) {

    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlHeader"), "--Select Header--", 0, 'appHeader', 'appContentID');
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
    $("#ddlBook").val("0").trigger("chosen:updated");
    $("#ddlChapter").val("0").trigger("chosen:updated");
    $("#ddlHeader").val("0").trigger("chosen:updated");
    $("#txtHeaderTitle").val("");
    $("#txtContent").val("");
}

function Validation() {
    var isValid = true;
    var strErrorMessage = "";

    if ($("#ddlBook").val() == "0") {
        strErrorMessage += "Select Book!<br>";
        isValid = false;
    }

    if ($("#ddlChapter").val() == "0") {
        strErrorMessage += "Select Chapter!<br>";
        isValid = false;
    }

    if ($("#txtHeaderTitle").val() == "") {
        strErrorMessage += "Header title is Required!<br>";
        isValid = false;
    }

    if ($("#txtContent").val() == "") {
        strErrorMessage += "Content is Required!<br>";
        isValid = false;
    }

    if (!isValid)
        alertError("Validation", strErrorMessage);
    return isValid;
}



function getValueToControl() {

    if (hdnPKID != "") {
        var url = "Client/books/getSingleContent?IDs=" + hdnPKID;
        //var param = { "IDs": hdnPKID };
        var isAsync = true;
        PostData(url, "", isAsync, "setValueToControl");

    }
}

function setValueToControl(data) {
    if (data != undefined && data != null) {
        data = data.result[0];

        $("#ddlBook").val(data.appBookID).trigger("chosen:updated");
        $("#ddlBook").trigger("change");
        $("#ddlChapter").val(data.appChapterId).trigger("chosen:updated")
        $("#ddlChapter").trigger("change");
        $("#ddlHeader").val(data.appParentID).trigger("chosen:updated");;
        $("#txtHeaderTitle").val(data.appHeader);
        $("#txtContent").val(data.appContent);
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

