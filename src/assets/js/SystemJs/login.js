$(document).ready(function () {
    if ($("#txtUserName").val() != '' && $("#txtpassword").val() != '') {
        $("#IsRemember").prop("checked", true);
    }
    $("#frmlogin").submit(function (event) {
        if ($("#txtUserName").val() != '') {
            var url = "Home/UserLogin";
            var param = $(this).formToJson();
            param["userName"] = $("#txtUserName").val();
            param["password"] = $("#txtpassword").val();
            param["isRemember"] = $("#IsRemember").prop("checked");
            var isAsync = false;
            LoginForm(url, param, isAsync, "LoginDone");
        }
        event.preventDefault();
    });
    $("#frmregister").submit(function (event) {
        
        if (isValidRegister()) {
            var url = "Home/UserRegister";
            var param = $(this).formToJson();
            param["Email"] = $("#txtemail").val();
            param["Contact"] = $("#txtcontact").val();
            param["password"] = $("#txtregisterpassword").val();
            param["ConfirmPassword"] = $("#txtconfirmregisterpassword").val();
            var isAsync = false;
            LoginForm(url, param, isAsync, "RegisterDone");
        }
        event.preventDefault();
    });

    $("#frmResetPassword").submit(function (event) { 
        
        Forgotpassword();
        event.preventDefault();
    });
});

function LoginDone(data) {
    if (data != undefined && data != "") {
        if (data.success) {
            setLocalStorage(lsUserAccessToken, data.result.access_token);
            setLocalStorage(lsUserName, data.result.userName);
            window.location = "/client/dashboard";
        }
    }
}

function isValidRegister() {
    var isValid = true;
    var strErrorMessage = "";
    if ($("#txtemail").val() == "") {
        strErrorMessage += "Email is Required!<br>";
        isValid = false;
    }

    if ($("#txtcontact").val() == "") {
        strErrorMessage += "Contact Number is Required!<br>";
        isValid = false;
    }

    if ($("#txtregisterpassword").val() == "") {
        strErrorMessage += "Password is Required!<br>";
        isValid = false;
    }

    if ($("#txtconfirmregisterpassword").val() == "") {
        strErrorMessage += "Confirm Password is Required!<br>";
        isValid = false;
    }

    if ($("#txtconfirmregisterpassword").val() != $("#txtregisterpassword").val()) {
        strErrorMessage += "Confirm Password not match!<br>";
        isValid = false;
    }

    if (!isValid)
        alertError("Validation", strErrorMessage);
    return isValid;
}



function Forgotpassword() {
    if ($("#txtForgotEmail").val() != "" && validateEmail($("#txtForgotEmail").val())) {
        var url = "Home/ForgotPassword";
        var param = $(this).formToJson();
        param["email"] = $("#txtForgotEmail").val();
        var isAsync = false;
        LoginForm(url, param, isAsync, "ForgotpasswordDone");
    }
    else {
        alertError("Error", "Enter valid Email.");
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




function ForgotpasswordDone(data) {
    if (data != undefined && data != "") {
        if (data.success) {
            alertSuccess("Success", data.message != undefined ? data.message : "");
        } else {
            alertError("Error", data.message != undefined ? data.message : "");
        }
    }
}

function RegisterDone(data) {
    if (data != undefined && data != "") {
        if (data.success) {
            alertSuccess("Success", data.message != undefined ? data.message : "");
            window.location.href = "/RegisterSuccess";
        }
    }
}