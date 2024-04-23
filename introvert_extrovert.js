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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 8 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 8"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");

member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_ie');

form.addEventListener("submit", function (e) {

    var ie_0_score = parseInt(document.querySelector('input[name="ie_0"]:checked').value);
    var ie_1_score = parseInt(document.querySelector('input[name="ie_1"]:checked').value);
    var ie_2_score = parseInt(document.querySelector('input[name="ie_2"]:checked').value);
    var ie_3_score = parseInt(document.querySelector('input[name="ie_3"]:checked').value);
    var ie_4_score = parseInt(document.querySelector('input[name="ie_4"]:checked').value);
    var ie_5_score = parseInt(document.querySelector('input[name="ie_5"]:checked').value);
    var ie_6_score = parseInt(document.querySelector('input[name="ie_6"]:checked').value);
    var ie_7_score = parseInt(document.querySelector('input[name="ie_7"]:checked').value);

    var ieScore = 30 - ie_0_score - ie_1_score - ie_2_score + ie_3_score - ie_4_score + ie_5_score + ie_6_score - ie_7_score;

    if (isNaN(ieScore)) {
        return; //stop the execution of function
    }

    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();

    if (ieScore > 24) {
        ieResult.textContent = "結果 " + ieScore + " 分，你傾向屬於外向型";
        //document.getElementById('getHelpDiv').style.display='none';
        ieColor = "#ED6663";
    } if (ieScore <= 24) {
        ieResult.textContent = "結果 " + ieScore + " 分，你傾向屬於內向型";
        ieColor = "#4E89AE";
    }
    document.getElementById('ieQuestionresultDiv').style.display = 'none';
    document.getElementById('ieResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: ieScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 40], },
                bar: { color: ieColor, thickness: 1 }
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