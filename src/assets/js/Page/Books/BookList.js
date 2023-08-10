var vParentID = "";
$(document).ready(function () {
    GetData();
});

function GetData() {    
    var url = "Client/Books/getBookList";
    var isAsync = true;
    PostData(url, "", isAsync, "setDataList");
}

function setDataList(data) {
    $("#tblListBody").empty();
    if (data != undefined && data != null) {
        data = data.result;        
        if (data.length > 0) {
            $("#tmpltblList").tmpl(data).appendTo("#tblListBody");
            if (data.length > 10) {
                $(".btn-addnew").removeClass("hide");
            }
        }
    }
}
