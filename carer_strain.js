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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 13 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 13"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_mcsi');

form.addEventListener("submit", function (e) {




    var mcsi_1_score = parseInt(document.querySelector('input[name="mcsi_1"]:checked').value);
    var mcsi_2_score = parseInt(document.querySelector('input[name="mcsi_2"]:checked').value);
    var mcsi_3_score = parseInt(document.querySelector('input[name="mcsi_3"]:checked').value);
    var mcsi_4_score = parseInt(document.querySelector('input[name="mcsi_4"]:checked').value);
    var mcsi_5_score = parseInt(document.querySelector('input[name="mcsi_5"]:checked').value);
    var mcsi_6_score = parseInt(document.querySelector('input[name="mcsi_6"]:checked').value);
    var mcsi_7_score = parseInt(document.querySelector('input[name="mcsi_7"]:checked').value);
    var mcsi_8_score = parseInt(document.querySelector('input[name="mcsi_8"]:checked').value);
    var mcsi_9_score = parseInt(document.querySelector('input[name="mcsi_9"]:checked').value);
    var mcsi_10_score = parseInt(document.querySelector('input[name="mcsi_10"]:checked').value);
    var mcsi_11_score = parseInt(document.querySelector('input[name="mcsi_11"]:checked').value);
    var mcsi_12_score = parseInt(document.querySelector('input[name="mcsi_12"]:checked').value);
    var mcsi_13_score = parseInt(document.querySelector('input[name="mcsi_13"]:checked').value);

    var mcsiScore = mcsi_1_score + mcsi_2_score + mcsi_3_score + mcsi_4_score + mcsi_5_score + mcsi_6_score + mcsi_7_score + mcsi_8_score + mcsi_9_score + mcsi_10_score + mcsi_11_score + mcsi_12_score + mcsi_13_score;

    if (isNaN(mcsiScore)) {
        return; //stop the execution of function
    }
    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();

    mcsiResult.textContent = "結果 " + mcsiScore + " 分";
    if (mcsiScore >= 0 && mcsiScore <= 2) {
        mcsiCategory.textContent = "輕微照顧者壓力";
        mcsiDescription.textContent = "你的情緒很健康啊，真好！";
        //document.getElementById('getHelpDiv').style.display='none';
        mcsiColor = "#4EC04E";
    } if (mcsiScore > 2 && mcsiScore <= 6) {
        mcsiCategory.textContent = "中度照顧者壓力";
        mcsiDescription.textContent = "你可能有中度照顧者壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        mcsiColor = "#FFC84A";
    } if (mcsiScore > 6 && mcsiScore <= 20) {
        mcsiCategory.textContent = "嚴重照顧者壓力";
        mcsiDescription.textContent = "你可能有嚴重照顧者壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        mcsiColor = "#F48847";
    } if (mcsiScore > 20 && mcsiScore <= 26) {
        mcsiCategory.textContent = "嚴重照顧者壓力";
        mcsiDescription.textContent = "你可能有嚴重照顧者壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        mcsiColor = "#EB4841";
    }
    document.getElementById('mcsiQuestionresultDiv').style.display = 'none';
    document.getElementById('mcsiResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: mcsiScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 26], tickvals: [0, 7, 13, 20, 26] },
                bar: { color: mcsiColor, thickness: 1 }
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
