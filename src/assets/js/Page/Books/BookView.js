var vParentID = "";
$(document).ready(function () {
    
    GetData();
});

function GetData() {
    var url = "Client/Books/GetBookViewData";
    var isAsync = true;
    PostData(url, "", isAsync, "setDataList");
}
function setDataList(data) {
    $("#tblListBody").empty();
    if (data != undefined && data != null) {
        data = data.result;
        tblbook = data[0];
        $("#tmplBookList").tmpl(tblbook).appendTo("#treeBooks");

        tblChapter = data[1];
        for (var i = 0; i < tblChapter.length; i++) {
            $("#tmplChapterList").tmpl(tblChapter[i]).appendTo("#book_" + tblChapter[i].AppBookID);
        }
        tblContent = data[2];
        for (var i = 0; i < tblContent.length; i++) {
            if (tblContent[i].AppParentID == 0) {
                $("#tmplContentList").tmpl(tblContent[i]).appendTo("#chapter_" + tblContent[i].AppChapterId);
            }
            else {
                $("#tmplContentList").tmpl(tblContent[i]).appendTo("#content_" + tblContent[i].AppParentID);
            }
        }
        $('.expand').click(function () {
            $('ul', $(this).parent()).eq(0).toggle();
            var vIcon = $(this).find("i");
            if ($(vIcon).hasClass("tree-plus")) {
                $(vIcon).removeClass("tree-plus");
                $(vIcon).addClass("tree-minus");
            }
            else if ($(vIcon).hasClass("tree-minus")) {
                $(vIcon).removeClass("tree-minus");
                $(vIcon).addClass("tree-plus");
            }
        });
    }
}

function GetContentData(ids) {
    var url = "Client/Books/getContentList?id=" + ids;
    var isAsync = true;
    PostData(url, "", isAsync, "setContentData");
}

function setContentData(data) {
    $("#ContentBody").empty();
    debugger;
    if (data != undefined && data != null) {
        data = data.result;
        if (data.length > 0) {
            $("#ContentBody").html(data[0].appContent);

        }
    }
}
