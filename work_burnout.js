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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 22 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 22"
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

var form = document.getElementById('form_mbi');
form.addEventListener("submit", function (e) {
    var mbi_1_score = parseInt(document.querySelector('[name="mbi_1"]').value);
    var mbi_2_score = parseInt(document.querySelector('[name="mbi_2"]').value);
    var mbi_3_score = parseInt(document.querySelector('[name="mbi_3"]').value);
    var mbi_4_score = parseInt(document.querySelector('[name="mbi_4"]').value);
    var mbi_5_score = parseInt(document.querySelector('[name="mbi_5"]').value);
    var mbi_6_score = parseInt(document.querySelector('[name="mbi_6"]').value);
    var mbi_7_score = parseInt(document.querySelector('[name="mbi_7"]').value);
    var mbi_8_score = parseInt(document.querySelector('[name="mbi_8"]').value);
    var mbi_9_score = parseInt(document.querySelector('[name="mbi_9"]').value);
    var mbi_10_score = parseInt(document.querySelector('[name="mbi_10"]').value);
    var mbi_11_score = parseInt(document.querySelector('[name="mbi_11"]').value);
    var mbi_12_score = parseInt(document.querySelector('[name="mbi_12"]').value);
    var mbi_13_score = parseInt(document.querySelector('[name="mbi_13"]').value);
    var mbi_14_score = parseInt(document.querySelector('[name="mbi_14"]').value);
    var mbi_15_score = parseInt(document.querySelector('[name="mbi_15"]').value);
    var mbi_16_score = parseInt(document.querySelector('[name="mbi_16"]').value);
    var mbi_17_score = parseInt(document.querySelector('[name="mbi_17"]').value);
    var mbi_18_score = parseInt(document.querySelector('[name="mbi_18"]').value);
    var mbi_19_score = parseInt(document.querySelector('[name="mbi_19"]').value);
    var mbi_20_score = parseInt(document.querySelector('[name="mbi_20"]').value);
    var mbi_21_score = parseInt(document.querySelector('[name="mbi_21"]').value);
    var mbi_22_score = parseInt(document.querySelector('[name="mbi_22"]').value);


    var mbiScore_ee = mbi_1_score + mbi_2_score + mbi_3_score + mbi_4_score + mbi_5_score + mbi_6_score + mbi_7_score + mbi_8_score + mbi_9_score;
    var mbiScore_pa = (6 - mbi_10_score) + (6 - mbi_11_score) + (6 - mbi_12_score) + (6 - mbi_13_score) + (6 - mbi_14_score) + (6 - mbi_15_score) + (6 - mbi_16_score) + (6 - mbi_17_score);
    var mbiScore_dp = mbi_18_score + mbi_19_score + mbi_20_score + mbi_21_score + mbi_22_score;
    if (isNaN(mbiScore_ee) || isNaN(mbiScore_pa) || isNaN(mbiScore_dp)) {
        return; //stop the execution of function
    }

    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    var mbiScore_ee_plot = mbiScore_ee / 9;
    var mbiScore_pa_plot = mbiScore_pa / 8;
    var mbiScore_dp_plot = mbiScore_dp / 5;
    mbiResult.innerHTML = "情緒耗竭感 " + mbiScore_ee + " 分" + "<br />" + "缺乏成就感 " + mbiScore_pa + " 分" + "<br />" + "工作冷漠感 " + mbiScore_dp + " 分";

    document.getElementById('mbiQuestionresultDiv').style.display = 'none';
    document.getElementById('mbiResultDiv').style.display = '';

    var data = [{
        type: 'scatterpolar',
        r: [mbiScore_ee_plot, mbiScore_pa_plot, mbiScore_dp_plot, mbiScore_ee_plot],
        theta: ['情緒耗竭感', '缺乏成就感', '工作冷漠感', '情緒耗竭感'],
        fill: 'toself'
    },
    {
        type: 'scatterpolar',
        mode: 'lines',
        r: [6, 6, 6, 6],
        theta: ['情緒耗竭感', '缺乏成就感', '工作冷漠感', '情緒耗竭感'],
        line: { color: 'grey' }
    }]

    var layout = {
        margin: { b: 0, t: 30, r: 60, l: 60, pad: 0 }, font: {
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
                range: [0, 6]
            }
        },
        showlegend: false,
        hovermode: false,
        height: 300
    }
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
});
