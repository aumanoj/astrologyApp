var vParentID = "";
$(document).ready(function () {
    GetChartHolder();
});

function GetChartHolder() {
    var url = "Client/ChartHolder/getChartHolderList"; /*this is calling cantroller */
    var isAsync = true;
    PostData(url, "", isAsync, "setDataList");
}
function deleteRecord(vChartHolderId) {
    debugger;
    var url = "Client/ChartHolder/deleteChartHolderRecord?IDs="+vChartHolderId; /*this is calling cantroller */
    var isAsync = true;
    PostDataToaster(url, "", isAsync, "");
    GetChartHolder();
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

function viewChart(vChartHolderId) {
    getChartView(vChartHolderId);
}