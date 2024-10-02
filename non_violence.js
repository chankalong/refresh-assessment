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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 7 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 7"
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

var form = document.getElementById('form_nvc');

form.addEventListener("submit", function (e) {
    var nvc_0_score = parseInt(document.querySelector('input[name="nvc_0"]:checked').value);
    var nvc_1_score = parseInt(document.querySelector('input[name="nvc_1"]:checked').value);
    var nvc_2_score = parseInt(document.querySelector('input[name="nvc_2"]:checked').value);
    var nvc_3_score = parseInt(document.querySelector('input[name="nvc_3"]:checked').value);
    var nvc_4_score = parseInt(document.querySelector('input[name="nvc_4"]:checked').value);
    var nvc_5_score = parseInt(document.querySelector('input[name="nvc_5"]:checked').value);
    var nvc_6_score = parseInt(document.querySelector('input[name="nvc_6"]:checked').value);

    var nvcScore = nvc_0_score + nvc_1_score + nvc_2_score + nvc_3_score + nvc_4_score + nvc_5_score + nvc_6_score;
    if (isNaN(nvcScore)) {
        return; //stop the execution of function
    }
    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();
    nvcResult.textContent = "結果 " + nvcScore + " 分";

    document.getElementById('nvcQuestionresultDiv').style.display = 'none';
    document.getElementById('nvcResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: nvcScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [7, 28] },
                bar: { thickness: 1 }
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
})
