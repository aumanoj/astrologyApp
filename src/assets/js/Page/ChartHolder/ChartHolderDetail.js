var hdnPKID = "";
var hdnCurrentAddressPKID = "";
var hdnAddressPopup = false;
$(document).ready(function () {
    $('.datetimepicker').datetimepicker({
        inline: true,
        format: 'DD/MM/YYYY hh:mm:ss A',    
      
        sideBySide: true,
        useSeconds: true
    });
    getCountries();
    ResetControl();
    hdnPKID = getQueryStringValue("id");
    if (hdnPKID == null) {
        hdnPKID = "";
    }
    $('.rdoAynamsa').trigger('change');
    getValueToControl();
    $("#frmChartHolderDetail").submit(function (event) {
        event.preventDefault();
        if (Validation()) {
            var formData = $(this).formToJson();
            formData["WrContactPhoneNumber"] = $("#txtContact").val();
            formData["WrChildName"] = $("#txtChildName").val();
            formData["WrFatherName"] = $("#txtFatherName").val();
            formData["WrMotherName"] = $("#txtMotherName").val();
            formData["WrDOB"] = $("#txtBirthDate").val();
            formData["WrAyanamsa"] = $("#ddlAynamsa").val();
            formData["WrHouseSystem"] = $("#ddlHouseSys").val();
            formData["WrEmail"] = $("#txtEmail").val();
            formData["WrBirhPlace"] = $("#txtBirthPlace").val();
            formData["WrCity"] = $("#txtCity").val();
            formData["WrState"] = $("#txtState").val();
            formData["WrCountry"] = $("#ddlCountry").val();
            formData["WrPostalCode"] = $("#txtPostalCode").val();
            formData["WrTimeZone"] = $("#ddlTimeZone").val();
            formData["WrLatitude"] = $("#txtLatitude").val();
            formData["WrLongitude"] = $("#txtLongitude").val();
            formData["WrGender"] = (($("#rdMale").prop("checked")) ? true : false);
            formData["WrLatLocator"] = $("#txtLatLocator").val();
            formData["WrLngLocator"] = $("#txtLngLocator").val();
            formData["WrAynamsaPolicy"] = (($("#rdNirayana").prop("checked")) ? "Nirayana" : "Sayana");
            formData["WrChartHolderID"] = hdnPKID;
            PostDataToaster("Client/ChartHolder/SaveChartHolder", formData, true, "SaveDataComplete");
        }
    });
});

//$('.rdoAynamsa').on('change', function () {
//    if ($('#rdNirayana').prop("checked")) {
//        $("#ddlAynamsa").val("0");
//        $("#ddlAynamsa").attr("disabled", "true");
//    }
//    else {
//        $("#ddlAynamsa").removeAttr("disabled");      
//    }

//});



$('.rdoAynamsa').on('change', function () {
    if ($('#rdNirayana').prop("checked")) {
        $("#ddlAynamsa").removeAttr("disabled");
    }
    else {
        $("#ddlAynamsa").val("0");
        $("#ddlAynamsa").attr("disabled", "true");
    }

});
function SaveDataComplete(data) {
    if (data != undefined && data != null) {
        //ResetControl();
        getValueToControl();
    }
}
function ResetControl() {
    hdnPKID = "";
    $("#txtContact").val("");
    $("#txtChartType").val("");
    $("#txtChildName").val("");
    $("#txtFatherName").val("");
    $("#txtMotherName").val("");
    $("#txtBirthDate").val("");
    $("#ddlAynamsa").val("0");
    $("#ddlHouseSys").val("0");
    $("#txtEmail").val("");
    $("#rdMale").prop("checked", true);
    $("#rdNirayana").prop("checked", true);
    $('.rdoAynamsa').trigger('change');
    $("#txtBirthPlace").val("");
    $("#txtCity").val("");
    $("#txtState").val("");
    $("#ddlCountry").val("0").trigger("chosen:updated");
    $("#txtPostalCode").val("");
    $("#ddlTimeZone").val("0").trigger("chosen:updated");
    $("#txtLatitude").val("");
    $("#txtLongitude").val("");
    $("#txtLatLocator").val("");
    $("#txtLngLocator").val("");
    $("#txtDMSLat").val("");
    $("#txtDMSLong").val("");
    //$("#txtContact").val(getSessionStorage("UserName"));
}

function Validation() {
    var isValid = true;
    var strErrorMessage = "";
    if ($("#txtContact").val() == "") {
        strErrorMessage += "Contact is Required!<br>";
        isValid = false;
    }
    if ($("#txtChildName").val() == "") {
        strErrorMessage += "Child Name is Required!<br>";
        isValid = false;
    }
    if ($("#txtFatherName").val() == "") {
        strErrorMessage += "Father Name is Required!<br>";
        isValid = false;
    }
    if ($("#txtMotherName").val() == "") {
        strErrorMessage += "Mother Name is Required!<br>";
        isValid = false;
    }
    if ($("#txtBirthDate").val() == "") {
        strErrorMessage += "Birth Date is Required!<br>";
        isValid = false;
    }
    
    if ($("#rdNirayana").prop("checked") && $("#ddlAynamsa").val() == "0") {
        strErrorMessage += "Select Aynamsa!<br>";
        isValid = false;
    }

    if ($("#ddlHouseSys").val() == "0") {
        strErrorMessage += "Select House System!<br>";
        isValid = false;
    }

    if ($("#txtBirthPlace").val() == "") {
        strErrorMessage += "Birth place is Required!<br>";
        isValid = false;
    }

    if ($("#txtCity").val() == "") {
        strErrorMessage += "City is Required!<br>";
        isValid = false;
    }

    if ($("#txtState").val() == "") {
        strErrorMessage += "State is Required!<br>";
        isValid = false;
    }

    if ($("#ddlCountry").val() == "0") {
        strErrorMessage += "Select Country!<br>";
        isValid = false;
    }

    if ($("#txtPostalCode").val() == "") {
        strErrorMessage += "Postal code is Required!<br>";
        isValid = false;
    }

    if ($("#ddlTimeZone").val() == "0") {
        strErrorMessage += "Select Time Zone!<br>";
        isValid = false;
    }

    if ($("#txtLatitude").val() == "") {
        strErrorMessage += "Latitude is Required!<br>";
        isValid = false;
    }
    if ($("#txtLongitude").val() == "") {
        strErrorMessage += "Longitude is Required!<br>";
        isValid = false;
    }


    if (!isValid)
        alertError("Validation", strErrorMessage);
    return isValid;
}

$('#btnViewChart').on('click', function () {
    if (hdnPKID != undefined && hdnPKID != null && hdnPKID != "") {
        getChartView(hdnPKID);
    }
});

$('#btnViewMap').on('click', function () {
    $('#showMapModal').modal('show');
});
$('#btnCreateAddress').on('click', function () {
    if (hdnPKID == "") {
        strErrorMessage = "Please save Chartholder's Detail First.!<br>";
        alertError("Validation", strErrorMessage);
    }
    else {
        ResetCurrentAddressControl();
        $('#CustAddressModal').modal('show');
    }
});
function getValueToControl() {

    if (hdnPKID != "") {
        var url = "Client/ChartHolder/getSingleChartHolder?IDs=" + hdnPKID;
        //var param = { "IDs": hdnPKID };
        var isAsync = true;
        PostData(url, "", isAsync, "setValueToControl");
        getCurrentAddress(hdnPKID);
    }
}

function setValueToControl(data) {
    if (data != undefined && data != null) {
        data = data.result;
        $("#txtContact").val(data.wrContactPhoneNumber);
        $("#txtChildName").val(data.wrChildName);
        $("#txtFatherName").val(data.wrFatherName);
        $("#txtMotherName").val(data.wrMotherName);
        $("#txtBirthDate").val(data.wrDOB);
        $("#ddlAynamsa").val(data.wrAyanamsa);
        $("#ddlHouseSys").val(data.wrHouseSystem);
        $("#txtEmail").val(data.wrEmail);
        $("#txtBirthPlace").val(data.wrBirhPlace);
        $("#txtCity").val(data.wrCity);
        $("#txtState").val(data.wrState);
        $("#ddlCountry").val(data.wrCountry).trigger("chosen:updated");
        $("#ddlCountry").trigger("change");
        $("#txtPostalCode").val(data.wrPostalCode);
        $("#ddlTimeZone").val(data.wrTimeZone).trigger("chosen:updated");
        $("#ddlTimeZone").trigger("change");
        $("#txtLatitude").val(data.wrLatitude);
        $("#txtLongitude").val(data.wrLongitude);
        $("#txtLatLocator").val(data.wrLatLocator);
        $("#txtLngLocator").val(data.wrLngLocator);
        $("#rdMale").prop("checked", data.wrGender);
        if (data.wrAynamsaPolicy == "Nirayana") {
            $("#rdNirayana").prop("checked", true);
        } else {
            $("#rdSayana").prop("checked", true);
        }
        $('.rdoAynamsa').trigger('change');
    }
}

// For Country 
function getCountries() {

    var url = "Client/ChartHolder/getCountries"; 

    var isAsync = false;
    PostData(url, "", isAsync, "setCountry");
}

function setCountry(data) {

    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlCountry"), "--Select Country--", 0, 'CountryName', 'CountryName');
        fillDropdown(data, $("#ddlCCountry"), "--Select Country--", 0, 'CountryName', 'CountryName');
    }
}

// For Time Zone
$('#ddlCountry').on('change', function () {
    getTimeZone();
});
function getTimeZone() {
    var country = $('#ddlCountry').val();
    var url = "Client/ChartHolder/getTimeZone?strCountryName=" + country;
    var isAsync = false;
    PostData(url, "", isAsync, "setTimeZone");
}

function setTimeZone(data) {
    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlTimeZone"), "--Select the UTC value--", 0, 'ActualTimeZone', 'TimeZoneValue');
        setChosenDropdown("#ddlTimeZone");
    }
}


// For Customer current address

function getCurrentAddress(hdnPKID) {

    var url = "Client/ChartHolder/getCurrentAddressList?IDs=" + hdnPKID;
    var isAsync = true;
    PostData(url, "", isAsync, "setDataList");
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

$('#btnSaveCurrentAddress').on('click', function () {
    SaveCurrentAddress();
});
function SaveCurrentAddress() {
    if (CurrentAddressValidation()) {
        var formData = $(this).formToJson();
        formData["wrChartHolderId"] = hdnPKID;
        formData["wrAddress"] = $("#txtAddress").val();
        formData["wrCity"] = $("#txtCCity").val();
        formData["wrState"] = $("#txtCState").val();
        formData["wrCountry"] = $("#ddlCCountry").val();
        formData["wrPostalCode"] = $("#txtCPostalCode").val();
        formData["wrTimezone"] = $("#ddlCTimeZone").val();
        formData["wrPhoneNumber"] = $("#txtCPhoneNumber").val();
        formData["wrLatitude"] = $("#txtCLatitude").val();
        formData["wrLongitude"] = $("#txtCLongitude").val();
        formData["wrLatLocator"] = $("#txtCLatLocator").val();
        formData["wrLngLocator"] = $("#txtCLngLocator").val();
        formData["wrCurrentAddressID"] = hdnCurrentAddressPKID;
        PostDataToaster("Client/ChartHolder/AddEditCurrentAddress", formData, true, "SaveCurrentAddressDataComplete");
    }
}

function SaveCurrentAddressDataComplete(data) {
    if (data != undefined && data != null) {
        ResetCurrentAddressControl();
        getCurrentAddress(hdnPKID);
        $('#CustAddressModal').modal('hide');
    }
}
function ResetCurrentAddressControl() {
    hdnCurrentAddressPKID = "";
    $("#txtAddress").val("");
    $("#txtCCity").val("");
    $("#txtCState").val("");
    $("#ddlCCountry").val("0").trigger("chosen:updated");
    $("#txtCPostalCode").val("");
    $("#ddlCTimeZone").val("0").trigger("chosen:updated");
    $("#txtCPhoneNumber").val("");
    $("#txtCLatitude").val("");
    $("#txtCLongitude").val("");
    $("#txtCLatLocator").val("");
    $("#txtCLngLocator").val("");
    $("#txtCDMSLat").val("");
    $("#txtCDMSLong").val("");
}
function getCurrentAddressValue(CurrentAddressPKID) {
    hdnCurrentAddressPKID = CurrentAddressPKID;
    if (hdnCurrentAddressPKID != "") {
        var url = "Client/ChartHolder/getSingleCurrentAddress?IDs=" + hdnCurrentAddressPKID;
        //var param = { "IDs": hdnPKID };
        var isAsync = true;
        PostData(url, "", isAsync, "setValueToCurrentAddress");
    }
}
function setValueToCurrentAddress(data) {
  
    if (data != undefined && data != null) {
        data = data.result;
        $("#txtAddress").val(data.wrAddress);
        $("#txtCCity").val(data.wrCity);
        $("#txtCState").val(data.wrState);
        $("#ddlCCountry").val(data.wrCountry).trigger("chosen:updated");
        $("#ddlCCountry").trigger("change");
        $("#txtCPostalCode").val(data.wrPostalCode);
        $("#ddlCTimeZone").val(data.wrTimezone).trigger("chosen:updated");
        $("#ddlCTimeZone").trigger("change");
        $("#txtCPhoneNumber").val(data.wrPhoneNumber);
        $("#txtCLatitude").val(data.wrLatitude);
        $("#txtCLongitude").val(data.wrLongitude);
        $("#txtCLatLocator").val(data.wrLatLocator);
        $("#txtCLngLocator").val(data.wrLngLocator);
        $('#CustAddressModal').modal('show');
    }
}
function CurrentAddressValidation() {
    var isValid = true;
    var strErrorMessage = "";

    if (hdnPKID == "") {
        strErrorMessage = "Please save Chartholder's Detail First.!<br>";
        alertError("Validation", strErrorMessage);
        return false;
    }
    if ($("#txtAddress").val() == "") {
        strErrorMessage += "Birth place is Required!<br>";
        isValid = false;
    }

    if ($("#txtCCity").val() == "") {
        strErrorMessage += "City is Required!<br>";
        isValid = false;
    }

    if ($("#txtCState").val() == "") {
        strErrorMessage += "State is Required!<br>";
        isValid = false;
    }

    if ($("#ddlCCountry").val() == "0") {
        strErrorMessage += "Select Country!<br>";
        isValid = false;
    }

    if ($("#txtCPostalCode").val() == "") {
        strErrorMessage += "Postal code is Required!<br>";
        isValid = false;
    }

    if ($("#ddlCTimeZone").val() == "0") {
        strErrorMessage += "Select Time Zone!<br>";
        isValid = false;
    }

    if ($("#txtCLatitude").val() == "") {
        strErrorMessage += "Latitude is Required!<br>";
        isValid = false;
    }
    if ($("#txtCLongitude").val() == "") {
        strErrorMessage += "Longitude is Required!<br>";
        isValid = false;
    }


    if (!isValid)
        alertError("Validation", strErrorMessage);
    return isValid;
}


$('#ddlCCountry').on('change', function () {
    getCAddressTimeZone();
});

function getCAddressTimeZone() {
    var country = $('#ddlCCountry').val();
    var url = "Client/ChartHolder/getTimeZone?strCountryName=" + country;
    var isAsync = false;
    PostData(url, "", isAsync, "setCAddressTimeZone");
}

function setCAddressTimeZone(data) {

    if (data != undefined && data != null) {
        data = data.result;
        fillDropdown(data, $("#ddlCTimeZone"), "--Select the UTC value--", 0, 'ActualTimeZone', 'TimeZoneValue');
        setChosenDropdown("#ddlCTimeZone");
    }
}

//  Changes lat and long according to the time zone
$('#ddlTimeZone').on('change', function () {
    hdnAddressPopup = false;
    var postalCode = $("#txtPostalCode").val();
    var address;
    if (postalCode != null || postalCode != "")
        address = $("#txtBirthPlace").val() + ' ' + $("#txtCity").val() + ' ' + $("#txtState").val() + ' ' + $("#ddlCountry").val() + ' ' + postalCode;
    else
        address = $("#txtBirthPlace").val() + ' ' + $("#txtCity").val() + ' ' + $("#txtState").val() + ' ' + $("#ddlCountry").val();
    loadMapByPostalCode(address, '#txtLatitude', '#txtLongitude')
});
$('#ddlCTimeZone').on('change', function () {
    hdnAddressPopup = true;
    var postalCode = $("#txtCPostalCode").val();
    var address;
    if (postalCode != null || postalCode != "")
        address = $("#txtAddress").val() + ' ' + $("#txtCCity").val() + ' ' + $("#txtCState").val() + ' ' + $("#ddlCCountry").val() + ' ' + postalCode;
    else
        address = $("#txtAddress").val() + ' ' + $("#txtCCity").val() + ' ' + $("#txtCState").val() + ' ' + $("#ddlCCountry").val();
    loadMapByPostalCode(address, '#txtCLatitude', '#txtCLongitude')
});
function loadMapByPostalCode(address, ElLatitude, ElLongitude) {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            var lat = results[0].geometry.location.lat();
            var long = results[0].geometry.location.lng();
            loadMap(lat, long);
            $(ElLatitude).val(lat);
            $(ElLongitude).val(long);
            GetDMSLocation(ElLatitude, ElLongitude);
            isMapSet = true;
            isValidInfo = true;
        } else {
            alert("Something got wrong " + status);
        }
    });
}

function GetDMSLocation(ElLatitude, ElLongitude) {
    var latitude = $(ElLatitude).val();
    var longitude = $(ElLongitude).val();
    if (!latitude) { latitude = 0 }
    if (!longitude) { longitude = 0 }
    var url = 'Client/ChartHolder/OnGetDMSLocations?Latitude=' + latitude + '&Longitude=' + longitude;
    var isAsync = false;
    PostData(url, "", isAsync, "setDMSLocation");
}

function setDMSLocation(data) {
    if (data != undefined && data != null) {
        if (hdnAddressPopup) {
            $('#txtCLatLocator').val(data.LatLocator);
            $('#txtCLngLocator').val(data.LngLocator);
            $('#txtCDMSLat').val(data.DMSLat);
            $('#txtCDMSLong').val(data.DMSLong);
        }
        else {
            $('#txtLatLocator').val(data.LatLocator);
            $('#txtLngLocator').val(data.LngLocator);
            $('#txtDMSLat').val(data.DMSLat);
            $('#txtDMSLong').val(data.DMSLong);
        }
        hdnAddressPopup = false;
    }
}

var isMapSet = false;
var isValidInfo = true;
var isFirstLoad = false;
function loadMap(lat, lng) {
    var myLatlng = new google.maps.LatLng(lat || 1.45, lng || 1.45);
    var mapOptions = { zoom: 8, center: myLatlng, mapTypeId: google.maps.MapTypeId.ROADMAP };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({ position: myLatlng, map: map, title: "Here!" });
    $("#map-canvas").css('visibility', 'visible');
    //$("#showMapModal").modal("show");
}

