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
document.querySelectorAll("select").forEach(
    function (input) {
        input.addEventListener('change', function (event) {
            var numberTickedBoxesArray = []
            document.querySelectorAll("select").forEach(function (input) { numberTickedBoxesArray.push(input.value) })
            var numberTickedBoxes = numberTickedBoxesArray.filter(Boolean).length;
            console.log(numberTickedBoxes)
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 20 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 20"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");

member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;

var uid_textbox = document.getElementById("uid");
var member_level_textbox = document.getElementById("member_level");
var eap_company_textbox = document.getElementById("eap_company");

if (uid_textbox.value) {console.log("input uid value already")} else {uid_textbox.value = Math.random();}
if (drupalSettings.user.levels === undefined) {member_level_textbox.value = 0} else {member_level_textbox.value = drupalSettings.user.levels[0]}
if (drupalSettings.user.eap === undefined) {eap_company_textbox.value = '0'} else {eap_company_textbox.value = drupalSettings.user.eap.label}

var form = document.getElementById('form_cmi');
form.addEventListener("submit", function (e) {


    var cmi_1_score = parseInt(document.querySelector('[name="cmi_1"]').value);
    var cmi_2_score = parseInt(document.querySelector('[name="cmi_2"]').value);
    var cmi_3_score = parseInt(document.querySelector('[name="cmi_3"]').value);
    var cmi_4_score = parseInt(document.querySelector('[name="cmi_4"]').value);
    var cmi_5_score = parseInt(document.querySelector('[name="cmi_5"]').value);
    var cmi_6_score = parseInt(document.querySelector('[name="cmi_6"]').value);
    var cmi_7_score = parseInt(document.querySelector('[name="cmi_7"]').value);
    var cmi_8_score = parseInt(document.querySelector('[name="cmi_8"]').value);
    var cmi_9_score = parseInt(document.querySelector('[name="cmi_9"]').value);
    var cmi_10_score = parseInt(document.querySelector('[name="cmi_10"]').value);
    var cmi_11_score = parseInt(document.querySelector('[name="cmi_11"]').value);
    var cmi_12_score = parseInt(document.querySelector('[name="cmi_12"]').value);
    var cmi_13_score = parseInt(document.querySelector('[name="cmi_13"]').value);
    var cmi_14_score = parseInt(document.querySelector('[name="cmi_14"]').value);
    var cmi_15_score = parseInt(document.querySelector('[name="cmi_15"]').value);
    var cmi_16_score = parseInt(document.querySelector('[name="cmi_16"]').value);
    var cmi_17_score = parseInt(document.querySelector('[name="cmi_17"]').value);
    var cmi_18_score = parseInt(document.querySelector('[name="cmi_18"]').value);
    var cmi_19_score = parseInt(document.querySelector('[name="cmi_19"]').value);
    var cmi_20_score = parseInt(document.querySelector('[name="cmi_20"]').value);


    var cmiScore_y = cmi_1_score + cmi_2_score + cmi_3_score + cmi_4_score;
    var cmiScore_c = cmi_5_score + cmi_6_score + cmi_7_score + cmi_8_score;
    var cmiScore_f = cmi_9_score + cmi_10_score + cmi_11_score + cmi_12_score;
    var cmiScore_p = cmi_13_score + cmi_14_score + cmi_15_score + cmi_16_score;
    var cmiScore_a = cmi_17_score + cmi_18_score + cmi_19_score + cmi_20_score;
    if (isNaN(cmiScore_y) || isNaN(cmiScore_c) || isNaN(cmiScore_f) || isNaN(cmiScore_p) || isNaN(cmiScore_a)) {
        return; //stop the execution of function
    }

    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    cmiResult.innerHTML = "屈服 " + cmiScore_y + " 分" + "<br />" + "妥協 " + cmiScore_c + " 分" + "<br />" + "強迫 " + cmiScore_f + " 分" + "<br />" + "解難 " + cmiScore_p + " 分" + "<br />" + "迴避 " + cmiScore_a + " 分";

    document.getElementById('cmiQuestionresultDiv').style.display = 'none';
    document.getElementById('cmiResultDiv').style.display = '';

    var data = [{
        type: 'scatterpolar',
        r: [cmiScore_y, cmiScore_c, cmiScore_f, cmiScore_p, cmiScore_a, cmiScore_y],
        theta: ['屈服', '妥協', '強迫', '解難', '迴避', '屈服'],
        fill: 'toself'
    },
    {
        type: 'scatterpolar',
        mode: 'lines',
        r: [20, 20, 20, 20, 20, 20],
        theta: ['屈服', '妥協', '強迫', '解難', '迴避', '屈服'],
        line: { color: 'grey' }
    }]

    var layout = {
        margin: { b: 0, t: 20, r: 40, l: 40, pad: 0 }, font: {
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
                range: [4, 20]
            }
        },
        showlegend: false,
        hovermode: false,
        height: 350
    }

    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
});
