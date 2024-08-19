var assessment_div = document.querySelector('ol');
var progress_div = document.getElementById('progress_div');

window.FloatingUIDOM.autoUpdate(assessment_div, progress_div, function () {
    window.FloatingUIDOM.computePosition(assessment_div, progress_div, {
        placement: 'bottom', // 'bottom' by default
        strategy: 'fixed',
        middleware: [window.FloatingUIDOM.offset(10), window.FloatingUIDOM.shift({ crossAxis: true, })],
    }).then(function (result) {
        Object.assign(progress_div.style, {
            left: result.x + "px",
            top: result.y + "px",
        });
    });
})
document.querySelectorAll("input[type=radio]").forEach(
    function (input) {
        input.addEventListener('click', function (event) {
            var numberTickedBoxes =
                document.querySelectorAll("input[type=radio]:checked").length;
            console.log(numberTickedBoxes)
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 12 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 12"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_scs');

form.addEventListener("submit", function (e) {


    var scs_1_score = parseInt(document.querySelector('input[name="scs_0"]:checked').value);
    var scs_2_score = parseInt(document.querySelector('input[name="scs_1"]:checked').value);
    var scs_3_score = parseInt(document.querySelector('input[name="scs_2"]:checked').value);
    var scs_4_score = parseInt(document.querySelector('input[name="scs_3"]:checked').value);
    var scs_5_score = parseInt(document.querySelector('input[name="scs_4"]:checked').value);
    var scs_6_score = parseInt(document.querySelector('input[name="scs_5"]:checked').value);
    var scs_7_score = parseInt(document.querySelector('input[name="scs_6"]:checked').value);
    var scs_8_score = parseInt(document.querySelector('input[name="scs_7"]:checked').value);
    var scs_9_score = parseInt(document.querySelector('input[name="scs_8"]:checked').value);
    var scs_10_score = parseInt(document.querySelector('input[name="scs_9"]:checked').value);
    var scs_11_score = parseInt(document.querySelector('input[name="scs_10"]:checked').value);
    var scs_12_score = parseInt(document.querySelector('input[name="scs_11"]:checked').value);

    var scsScore_sk = (scs_2_score + scs_6_score)/2;
    var scsScore_sj = ((6 - scs_11_score) + (6 - scs_12_score))/2;
    var scsScore_ch = (scs_5_score + scs_10_score)/2;
    var scsScore_i = ((6 - scs_4_score) + (6 - scs_8_score))/2;
    var scsScore_m = (scs_3_score + scs_7_score)/2;
    var scsScore_oi = ((6 - scs_1_score) + (6 - scs_9_score))/2;


    if (isNaN(scsScore_sk) || isNaN(scsScore_sj) || isNaN(scsScore_ch) || isNaN(scsScore_i) || isNaN(scsScore_m) || isNaN(scsScore_oi)) {
        return; //stop the execution of function
    }

    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();

    scsResult.innerHTML = "善待自己 " + scsScore_sk + " 分" + "<br />" + "自我批評 " + scsScore_sj + " 分" + "<br />" + "共同人性 " + scsScore_ch + " 分" + "<br />" + "自我隔離 " + scsScore_i + " 分" + "<br />" + "活在當下 " + scsScore_m + " 分" + "<br />" + "過度沉迷 " + scsScore_oi + " 分";

    document.getElementById('scsQuestionresultDiv').style.display = 'none';
    document.getElementById('scsResultDiv').style.display = '';

    var data = [{
        type: 'scatterpolar',
        r: [scsScore_sk, scsScore_sj, scsScore_ch, scsScore_i, scsScore_m, scsScore_oi, scsScore_sk],
        theta: ['善待自己', '自我批評', '共同人性', '自我隔離', '活在當下', '過度沉迷', '善待自己'],
        fill: 'toself'
    },
    {
        type: 'scatterpolar',
        mode: 'lines',
        r: [5, 5, 5, 5, 5, 5, 5],
        theta: ['善待自己', '自我批評', '共同人性', '自我隔離', '活在當下', '過度沉迷', '善待自己'],
        line: { color: 'grey' }
    }]

    var layout = {
        margin: { b: 30, t: 30, r: 60, l: 60, pad: 0 }, font: {
            family: 'Arial, sans-serif'
        },
        polar: {
            angularaxis: {
                color: "transparent",
                gridcolor: "grey",
                tickfont: { color: "grey" },
                rotation: 90
            },
            radialaxis: {
                visible: false,
                range: [0, 10]
            }
        },
        showlegend: false,
        hovermode: false,
        height: 300
    }
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
})
