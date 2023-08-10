$(document).ready(function () {
    $(".username").text(getLocalStorage(lsUserName));
    setChosenDropdown();
});
function logout() {

    PostData("client/Dashboard/Logout", "", true, "redirect");
}

function redirect() {
    setLocalStorage(lsUserAccessToken, "");
    setLocalStorage(lsUserName, "");
    window.location = vSiteUrl;
}

function getChartView(vChartHolderId) {
    sessionStorage.setItem("stChartholderIdforViewChart", vChartHolderId);
    var url = "Client/ChartHolder/_loadChartView";
    var isAsync = true;
    getPartialView(url, null, isAsync, "setChartView");
}

function setChartView(Response) {
    $("#ChartViewPopup").empty();
    $("#ChartViewPopup").html(Response);
    $('#ShowChartModal').modal('show');
}