var hdnPKId = "";
var VimsoData = "";
var CurrentData = {
    CurrentDissai: {
        Name: '', MoveTime: '', Gp: '1'
    },
    CurrentPuthi: {
        Name: '', MoveTime: '', Gp: '1'
    },
    CurrentAnthra: {
        Name: '', MoveTime: '', Gp: '1'
    },
    CurrentSookshma: {
        Name: '', MoveTime: '', Gp: '1'
    }
}
$(document).ready(function () {
    hdnPKId = sessionStorage.getItem("stChartholderIdforViewChart");
    VimsoData = "";
    getAstrochart();
    //getVimsoChart();
});

function getAstrochart() {
    if (hdnPKId != undefined && hdnPKId != null && hdnPKId != "") {
        var url = "Client/AstroChart/getAstroChart?IDs=" + hdnPKId
        var isAsync = true;
        PostData(url, "", isAsync, "setAstrochart");
    }
}
function setAstrochart(data) {

    if (data != undefined && data != null && data != "") {
        var cells = data.cells;
        var table = "<tr>";
        //First Row
        table = GenerateCell(table, cells[11].code);
        table = GenerateCell(table, cells[0].code);
        table = GenerateCell(table, cells[1].code);
        table = GenerateCell(table, cells[2].code);
        table += "</tr><tr>";
        //Second Row
        table = GenerateCell(table, cells[10].code);
        table = GenerateCell(table, "", "border-bottom:none;border-right:none;");
        table = GenerateCell(table, "", "border-bottom:none;border-left:none;");
        table = GenerateCell(table, cells[3].code);
        table += "</tr><tr>";
        //Third Row
        table = GenerateCell(table, cells[9].code);
        table = GenerateCell(table, "", "border-top:none;border-right:none;");
        table = GenerateCell(table, "", "border-top:none;border-left:none;");
        table = GenerateCell(table, cells[4].code);
        table += "</tr><tr>";
        //Forth Row
        table = GenerateCell(table, cells[8].code);
        table = GenerateCell(table, cells[7].code);
        table = GenerateCell(table, cells[6].code);
        table = GenerateCell(table, cells[5].code);
        table += "</tr>";
        $("#Astro .ChartBody").html(table);
        setbhavaStyle();
    }
    function GenerateCell(table, cell, style) {
        if (style != undefined && style != null && style != "") {
            style = "style=\"" + style + "\"";
        }
        else { style = ""; }
        table += "<td " + style + " >" + cell + "</td>";
        return table;
    }
    function setbhavaStyle() {
        var bhava1Content = 'BH : 1 :';
        $(`span:contains(${bhava1Content})`).css("color", "blue").css("text-decoration-color", "red");

        $('.bhavaStyle1').each(function (i, el) {
            var html = el.innerHTML;
            var fillText = html.indexOf(`${bhava1Content}`) > -1 ? "fill=\"blue\"" : "";
            var fillLine = html.indexOf(`${bhava1Content}`) > -1 ? "#f00" : "blue";
            var fillArrow = "#f00";
            $(el).html(
                `<svg style="width: 110px;height: 25px;">
                                                                <defs>
                                                                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
                                                                        <path d="M0,0 L0,6 L9,3 z" fill="`+ fillArrow + `"></path>
                                                                    </marker>
                                                                </defs>
                                                                <text x="0" y="20" font-weight="bold" `+ fillText + `>` + html + `</text>
                                                                <path d="M0,5 l104,0 l0,5" stroke="`+ fillLine + `" fill="none" stroke-width="2.5" marker-end="url(#arrow)">test</path>
                                                            </svg>`);
        });
        $('.bhavaStyle2').each(function (i, el) {
            var html = el.innerHTML;
            var fillText = html.indexOf(`${bhava1Content}`) > -1 ? "fill=\"blue\"" : "";
            var fillLine = html.indexOf(`${bhava1Content}`) > -1 ? "#f00" : "blue";
            var fillArrow = "#f00";
            $(el).html(
                `<svg style="width: 110px;height: 25px;">
                                                            <defs>
                                                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
                                                                    <path d="M0,0 L0,6 L9,3 z" fill="`+ fillArrow + `"></path>
                                                                </marker>
                                                            </defs>
                                                            <text x="0" y="15" font-weight="bold" `+ fillText + `>` + html + `</text>
                                                            <path d="M0,20 l104,0 l0,-5" stroke="`+ fillLine + `" fill="none" stroke-width="2.5" marker-end="url(#arrow)">test</path>
                                                        </svg>`);

        });
    }
}

function getVimsoChart() {

    $(".vimso-sub-chart").addClass("hide");

    if (hdnPKId != undefined && hdnPKId != null && hdnPKId != "") {
        var url = "Client/AstroChart/getVimsoChart_DI_Grp/" + hdnPKId
        var isAsync = true;
        GetData(url, isAsync, "setVimsochart");
    }

    //$(".vimso-sub-chart").addClass("hide");
    //if (VimsoData != undefined && VimsoData != null && VimsoData != "") {
    //    setVimsochart(VimsoData);
    //}
    //else {
    //    if (hdnPKId != undefined && hdnPKId != null && hdnPKId != "") {
    //        var url = "Client/AstroChart/getVimsoChart?IDs=" + hdnPKId
    //        var isAsync = true;
    //        PostData(url, "", isAsync, "setVimsochart");
    //    }
    //}
}

function setVimsochart(data) {
    resetChart(1);
    if (data != undefined && data != null && data != "") {
        VimsoData = data;
        $("#tabVismo td").removeClass("active-cell");
        $("#DissaiChartBody").html("");
        $("#tmplDissaichartlist").tmpl("").appendTo("#DissaiChartBody");
        for (var i = 0; i < data.length; i++) {
            if (i < 10) {
                $("#tmpldissaigroup").tmpl(data[i]).appendTo("#trdissaigroup");
                $("#tmpldissaitime").tmpl(data[i]).appendTo("#trdissaitime");
            }
        }
    }
}

function getPuthiChart(Di_GP, name) {
    CurrentData.CurrentDissai.Name = name;
    CurrentData.CurrentDissai.Gp = Di_GP;
    CurrentData.CurrentDissai.MoveTime = $("#date_" + name + "_" + Di_GP).text();

    $("#DissaiChartBody td").removeClass("active-cell");

    $("#" + name + "_" + Di_GP).addClass("active-cell");
    $(".spdissainame").text(name);

    var url = "Client/AstroChart/getPuthiChart?IDs=" + hdnPKId + "&Group=" + Di_GP
    var isAsync = true;
    PostData(url, "", isAsync, "setPuthiChart");
}

function setPuthiChart(data) {
    if (data != undefined && data != null && data != "") {
        $("#puthiChartBody").html("");
        $("#tmplputhichartlist").tmpl("").appendTo("#puthiChartBody");
        $("#tmplputhigroup").tmpl(data).appendTo("#trputhigroup");
        $("#tmplputhitime").tmpl(data).appendTo("#trputhitime");
        resetChart(2);
    }
}

function GetAntraChart(Di_GP, name) {
    CurrentData.CurrentPuthi.Name = name;
    CurrentData.CurrentPuthi.Gp = Di_GP;
    CurrentData.CurrentPuthi.MoveTime = $("#date_" + name + "_" + Di_GP).text();
    $("#puthiChartBody td").removeClass("active-cell");
    $("#" + name + "_" + Di_GP).addClass("active-cell");
    $(".spputhiname").text(name);

    var url = "Client/AstroChart/GetAntraChart?IDs=" + hdnPKId + "&Group=" + Di_GP
    var isAsync = true;
    PostData(url, "", isAsync, "setAntraChart");
}

function setAntraChart(data) {
    if (data != undefined && data != null && data != "") {
        $("#antraChartBody").html("");
        let html = "<tr style='font-weight:bold;text-align:center;'><td class='side-border top-border-color anthra-backcolor'>Anthra</td><td class='side-border top-border-color'></td><td class='side-border top-border-color' colspan=9>Sookshma for anthra</td></tr>"
        let chart = data;
        for (let i = 0; i < chart.length; i++) {
            let currentAntra = chart[i].Antra;
            let row1 = "<tr class='top-border-color side-border'>";
            let row2 = "<tr class='side-border'>";

            //if (currentAntra.strNewDate.includes('01/01/0001')) {
            //    row1 += `<td>ANRA-` + currentAntra.GroupName + "</td><td class='side-border top-border-color'></td>";
            //    row2 += "<td>N/A</td><td class='side-border'></td>";
            //} else
            {
                row1 += "<td class='cursor-p side-border'>ANRA-" + currentAntra.GroupName + "</td><td class='side-border top-border-color'></td>";
                row2 += `<td  id=adate_${currentAntra.GroupName}_${currentAntra.GroupId}>` + currentAntra.strNewDate + "</td><td class='side-border'></td>";
            }

            let soksumasArray = chart[i].Soksumas;
            for (let j = 0; j < soksumasArray.length; j++) {
                let currentSoksuma = soksumasArray[j];
                let onclick = "GetPranaChart('" + currentAntra.GroupId + "','" + currentAntra.GroupName + "','" + currentSoksuma.GroupId + "','" + currentSoksuma.GroupName + "')";
                //if (currentSoksuma.strNewDate.includes('01/01/0001')) {
                //    row1 += `<td>SOKS-` + currentSoksuma.GroupName + "</td>";
                //    row2 += "<td>N/A</td>";
                //} else
                {
                    row1 += `<td id=${currentSoksuma.GroupName}_${currentSoksuma.GroupId} class='cursor-pointer top-border-color' onclick=${onclick}>SOKS-` + currentSoksuma.GroupName + "</td>";
                    row2 += `<td id=sdate_${currentSoksuma.GroupName}_${currentSoksuma.GroupId}>` + currentSoksuma.strNewDate + "</td>";
                }
            }

            row1 += "</tr>";
            row2 += "</tr>";
            html += row1;
            html += row2;
        }
        $('#antraChartBody').append(html);
        resetChart(3);
    }
}
function GetPranaChart(antra_Di_GP, antra_name, Di_GP, name) {
    CurrentData.CurrentSookshma.Gp = Di_GP;
    CurrentData.CurrentSookshma.Name = name;
    CurrentData.CurrentSookshma.MoveTime = $("#sdate_" + name + "_" + Di_GP).text();

    CurrentData.CurrentAnthra.Gp = antra_Di_GP;
    CurrentData.CurrentAnthra.Name = antra_name;
    CurrentData.CurrentAnthra.MoveTime = $("#adate_" + antra_name + "_" + antra_Di_GP).text();

    $("#antraChartBody td").removeClass("active-cell");
    $("#" + name + "_" + Di_GP).addClass("active-cell");
    $(".spputhiname").text(name);

    var url = "Client/AstroChart/GetPranaChart?IDs=" + hdnPKId + "&Group=" + Di_GP
    var isAsync = true;
    PostData(url, "", isAsync, "setPranaChart");
}
function setPranaChart(data) {
    if (data != undefined && data != null && data != "") {

        $('#pranaTable tbody').empty();
        SetCurrentDataTable();
        let pranaData = data;
        let html = "";
        for (let i = 0; i < pranaData.length; i++) {
            //if (pranaData[i].strNewDate.includes('01/01/0001')) {
            //    html += "<tr><td>" + pranaData[i].starLord + "</td><td>N/A</td></tr>";
            //} else
            {
                html += "<tr><td>" + pranaData[i].GroupName + "</td><td>" + pranaData[i].strNewDate + "</td></tr>";
            }
        }
        $('#pranaTable tbody').append(html);
        $("#pranaModal").modal("show");
        $(".modal-dialog").draggable({
            handle: ".modal-header"
        });
    }
}
function SetCurrentDataTable() {
    $("#currentDataTable tbody").empty();

    var row1 = "<tr>";
    row1 += "<td><b>Dassai</b></td>";
    row1 += "<td>" + CurrentData.CurrentDissai.Name + "</td>";
    row1 += "<td>" + CurrentData.CurrentDissai.MoveTime + "</td>";
    row1 += "</tr>";
    $("#currentDataTable tbody").append(row1);

    var row2 = "<tr>";
    row2 += "<td><b>Puthi</b></td>";
    row2 += "<td>" + CurrentData.CurrentPuthi.Name + "</td>";
    row2 += "<td>" + CurrentData.CurrentPuthi.MoveTime + "</td>";
    row2 += "</tr>";
    $("#currentDataTable tbody").append(row2);

    var row3 = "<tr>";
    row3 += "<td><b>Anthra</b></td>";
    row3 += "<td>" + CurrentData.CurrentAnthra.Name + "</td>";
    row3 += "<td>" + CurrentData.CurrentAnthra.MoveTime + "</td>";
    row3 += "</tr>";
    $("#currentDataTable tbody").append(row3);

    var row4 = "<tr>";
    row4 += "<td><b>Sookshma</b></td>";
    row4 += "<td>" + CurrentData.CurrentSookshma.Name + "</td>";
    row4 += "<td>" + CurrentData.CurrentSookshma.MoveTime + "</td>";
    row4 += "</tr>";
    $("#currentDataTable tbody").append(row4);
}

function resetChart(level) {
    $(".vimso-sub-chart").addClass("hide");
    $("#pranaModal").modal("hide");
    for (var i = 1; i <= level; i++) {
        $(".chart-" + i).removeClass("hide");
    }
}
function closeprana() {
    $("#pranaModal").modal("hide");
}