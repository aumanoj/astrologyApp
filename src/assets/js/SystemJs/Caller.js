function PostDataToaster(url, param, isAsync, CallBack) {
    try {
        var Token = getLocalStorage(lsUserAccessToken);
        if (Token == null || Token == "" || Token == undefined) {
            logout();
        }
        StartLoading();
        $.ajax({
            type: "POST",
            url: vSiteUrl + url,
            data: JSON.stringify(param),
            dataType: "json",
            async: isAsync,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + Token
            },
            success: function (data) {
                if (data != "") {
                    data = JSON.parse(data);
                }
                EndLoading();
                if (data.success == true) {
                    alertSuccess("Success", data.message != undefined ? data.message : "");
                    if (CallBack != "") {
                        window[CallBack](data);
                    }
                }
                else {
                    alertError("Error", data.message != undefined ? data.message : "");
                }
            },
            error: function (error) {
                if (error.statusText == "Unauthorized")
                    logout();
                EndLoading();
            }
        });
    }
    catch (ex) {
        alertError("", ex);
        console.log("error in PostData:" + ex);
        EndLoading();
    }
}

//Post data to api and set response with toaster message.
function PostData(url, param, isAsync, CallBack) {
    try {
        var Token = getLocalStorage(lsUserAccessToken);
        if (Token == null || Token == "" || Token == undefined) {
            logout();
        }
        $.ajax({
            type: "POST",
            url: vSiteUrl + url,
            data: JSON.stringify(param),
            async: isAsync,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + Token
            },
            success: function (data) {
                if (data != "") {
                    data = JSON.parse(data);
                }
                if (data.success == undefined || data.success) {
                    if (CallBack != "") {
                        window[CallBack](data);
                    }
                }
                else {
                    if (data.message != undefined && data.message != "") {
                        alertError("Error", data.message != undefined ? data.message : "");
                    }
                }
            },
            error: function (error) {
                if (error.statusText == "Unauthorized")
                    logout();
                EndLoading();
            }
        });
    }
    catch (ex) {
        EndLoading();
        alertError("", ex);
        console.log("error in PostFormAndToaster:" + ex);
    }
}

//GET data to api and set response with toaster message.
function GetData(url, isAsync, CallBack) {
    try {
        var Token = getLocalStorage(lsUserAccessToken);
        if (Token == null || Token == "" || Token == undefined) {
            logout();
        }
        $.ajax({
            type: "GET",
            url: vSiteUrl + url,
            async: isAsync,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + Token
            },
            success: function (data) {
                if (data != "") {
                    data = JSON.parse(data);
                }
                if (data.success == undefined || data.success) {
                    if (CallBack != "") {
                        window[CallBack](data);
                    }
                }
                else {
                    if (data.message != undefined && data.message != "") {
                        alertError("Error", data.message != undefined ? data.message : "");
                    }
                }
            },
            error: function (error) {
                if (error.statusText == "Unauthorized")
                    logout();
                EndLoading();
            }
        });
    }
    catch (ex) {
        EndLoading();
        alertError("", ex);
        console.log("error in PostFormAndToaster:" + ex);
    }
}

function getPartialView(url, param, isAsync, CallBack) {
    try {
        var Token = getLocalStorage(lsUserAccessToken);
        if (Token == null || Token == "" || Token == undefined) {
            logoutUser();
        }

        $.ajax({
            url: vSiteUrl + url,
            data: JSON.stringify(param),
            dataType: "html",
            async: isAsync,
            contentType: "application/json;",
            headers: {
                'Authorization': 'Bearer ' + Token
            },
            type: "Post",
            success: function (data) {
                if (CallBack != "") {
                    window[CallBack](data);
                }
            },
            error: function (error) {
            }
        });
    }
    catch (ex) {
        console.log("error in getDataNoLoading:" + ex);
    }
}

function LoginForm(url, param, isAsync, CallBack) {
    try {
        StartLoading();
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(param),
            async: isAsync,
            contentType: "application/json",
            success: function (data) {
                EndLoading();
                if (data.success) {
                    if (CallBack != "") {
                        window[CallBack](data);
                    }
                }
                else {
                    alertError("Unauthorized!", data.message != undefined ? data.message : "");
                }
            }
        });
    }
    catch (ex) {
        EndLoading();
        alertError("Unauthorized!", ex);
        console.log("error in PostFormAndToaster:" + ex);
    }
}

function validateSession() {
    var url = "client/Dashboard/validateSession";
    try {
        var Token = getLocalStorage(lsUserAccessToken);
        if (Token == null || Token == "" || Token == undefined) {
            logout();
        }
        $.ajax({
            type: "POST",
            url: vSiteUrl + url,
            async: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + Token
            },
            success: function (data) {
                if (data == true) {
                    setTimeout(validateSession, 20000);
                }
                else {
                    logout();
                }
            },
            error: function (error) {
                logout();
            }
        });
    }
    catch (ex) {
        EndLoading();
        alertError("", ex);
        console.log("error in PostFormAndToaster:" + ex);
    }
}