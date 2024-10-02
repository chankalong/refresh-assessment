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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 15 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 15"
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

var form = document.getElementById('form_maas');
form.addEventListener("submit", function (e) {
    var maas_1_score = parseInt(document.querySelector('[name="maas_1"]').value);
    var maas_2_score = parseInt(document.querySelector('[name="maas_2"]').value);
    var maas_3_score = parseInt(document.querySelector('[name="maas_3"]').value);
    var maas_4_score = parseInt(document.querySelector('[name="maas_4"]').value);
    var maas_5_score = parseInt(document.querySelector('[name="maas_5"]').value);
    var maas_6_score = parseInt(document.querySelector('[name="maas_6"]').value);
    var maas_7_score = parseInt(document.querySelector('[name="maas_7"]').value);
    var maas_8_score = parseInt(document.querySelector('[name="maas_8"]').value);
    var maas_9_score = parseInt(document.querySelector('[name="maas_9"]').value);
    var maas_10_score = parseInt(document.querySelector('[name="maas_10"]').value);
    var maas_11_score = parseInt(document.querySelector('[name="maas_11"]').value);
    var maas_12_score = parseInt(document.querySelector('[name="maas_12"]').value);
    var maas_13_score = parseInt(document.querySelector('[name="maas_13"]').value);
    var maas_14_score = parseInt(document.querySelector('[name="maas_14"]').value);
    var maas_15_score = parseInt(document.querySelector('[name="maas_15"]').value);

    var maasScore = maas_1_score + maas_2_score + maas_3_score + maas_4_score + maas_5_score + maas_6_score + maas_7_score + maas_8_score + maas_9_score + maas_10_score + maas_11_score + maas_12_score + maas_13_score + maas_14_score + maas_15_score;
    if (isNaN(maasScore)) {
        return; //stop the execution of function
    }

    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    maasResult.textContent = "結果 " + maasScore + " 分";

    document.getElementById('maasQuestionresultDiv').style.display = 'none';
    document.getElementById('maasResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: maasScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 90], tickvals: [0, 15, 30, 45, 60, 75, 90] },
                bar: { color: "#4EC04E", thickness: 1 }
            }
        }
    ];

    var layout = {
        margin: { l: 35, r: 35, b: 10, t: 80, pad: 0 }, height: 200, autosize: true, font: {
            family: 'Arial, sans-serif'
        }
    };
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
});
