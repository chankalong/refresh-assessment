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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 10 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 10"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_fomo');

form.addEventListener("submit", function (e) {




    var fomo_1_score = parseInt(document.querySelector('input[name="fomo_1"]:checked').value);
    var fomo_2_score = parseInt(document.querySelector('input[name="fomo_2"]:checked').value);
    var fomo_3_score = parseInt(document.querySelector('input[name="fomo_3"]:checked').value);
    var fomo_4_score = parseInt(document.querySelector('input[name="fomo_4"]:checked').value);
    var fomo_5_score = parseInt(document.querySelector('input[name="fomo_5"]:checked').value);
    var fomo_6_score = parseInt(document.querySelector('input[name="fomo_6"]:checked').value);
    var fomo_7_score = parseInt(document.querySelector('input[name="fomo_7"]:checked').value);
    var fomo_8_score = parseInt(document.querySelector('input[name="fomo_8"]:checked').value);
    var fomo_9_score = parseInt(document.querySelector('input[name="fomo_9"]:checked').value);
    var fomo_10_score = parseInt(document.querySelector('input[name="fomo_10"]:checked').value);

    var fomoScore = fomo_1_score + fomo_2_score + fomo_3_score + fomo_4_score + fomo_5_score + fomo_6_score + fomo_7_score + fomo_8_score + fomo_9_score + fomo_10_score;

    if (isNaN(fomoScore)) {
        return; //stop the execution of function
    }
    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();

    fomoResult.textContent = "結果 " + fomoScore + " 分";
    if (fomoScore >= 0 && fomoScore <= 10) {
        fomoCategory.textContent = "輕微照顧者壓力";
        fomoDescription.textContent = "你的情緒很健康啊，真好！";
        //document.getElementById('getHelpDiv').style.display='none';
        fomoColor = "#4EC04E";
    } if (fomoScore > 10 && fomoScore <= 20) {
        fomoCategory.textContent = "中度照顧者壓力";
        fomoDescription.textContent = "你可能有中度照顧者壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        fomoColor = "#FFC84A";
    } if (fomoScore > 20 && fomoScore <= 30) {
        fomoCategory.textContent = "嚴重照顧者壓力";
        fomoDescription.textContent = "你可能有嚴重照顧者壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        fomoColor = "#F48847";
    } if (fomoScore > 30 && fomoScore <= 40) {
        fomoCategory.textContent = "嚴重照顧者壓力";
        fomoDescription.textContent = "你可能有嚴重照顧者壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        fomoColor = "#EB4841";
    }
    document.getElementById('fomoQuestionresultDiv').style.display = 'none';
    document.getElementById('fomoResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: fomoScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 40], tickvals: [0, 10, 20, 230, 40] },
                bar: { color: fomoColor, thickness: 1 }
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