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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 14 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 80%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 14"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_scs_lms');

form.addEventListener("submit", function (e) {
    var scs_lms_0_score = parseInt(document.querySelector('input[name="scs_lms_0"]:checked').value);
    var scs_lms_1_score = parseInt(document.querySelector('input[name="scs_lms_1"]:checked').value);
    var scs_lms_2_score = parseInt(document.querySelector('input[name="scs_lms_2"]:checked').value);
    var scs_lms_3_score = parseInt(document.querySelector('input[name="scs_lms_3"]:checked').value);
    var scs_lms_4_score = parseInt(document.querySelector('input[name="scs_lms_4"]:checked').value);
    var scs_lms_5_score = parseInt(document.querySelector('input[name="scs_lms_5"]:checked').value);
    var scs_lms_6_score = parseInt(document.querySelector('input[name="scs_lms_6"]:checked').value);
    var scs_lms_7_score = parseInt(document.querySelector('input[name="scs_lms_7"]:checked').value);
    var scs_lms_8_score = parseInt(document.querySelector('input[name="scs_lms_8"]:checked').value);
    var scs_lms_9_score = parseInt(document.querySelector('input[name="scs_lms_9"]:checked').value);
    var scs_lms_10_score = parseInt(document.querySelector('input[name="scs_lms_10"]:checked').value);
    var scs_lms_11_score = parseInt(document.querySelector('input[name="scs_lms_11"]:checked').value);
    var scs_lms_12_score = parseInt(document.querySelector('input[name="scs_lms_12"]:checked').value);
    var scs_lms_13_score = parseInt(document.querySelector('input[name="scs_lms_13"]:checked').value);

    var scs_lmsScore = scs_lms_0_score + scs_lms_1_score + scs_lms_2_score + scs_lms_3_score + scs_lms_4_score + scs_lms_5_score + scs_lms_6_score + scs_lms_7_score + scs_lms_8_score + scs_lms_9_score + scs_lms_10_score + scs_lms_11_score + scs_lms_12_score + scs_lms_13_score;

    if (isNaN(scs_lmsScore)) {
        return; //stop the execution of function
    }
    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log("submitted data to google sheet");

    scs_lmsResult.textContent = "結果 " + scs_lmsScore + " 分";
    scs_lmsColor = "#4EC04E";
    if (scs_lmsScore >= 0 && scs_lmsScore <= 7) {
        scs_lmsColor = "#4EC04E";
    } if (scs_lmsScore >= 8 && scs_lmsScore <= 10) {
        scs_lmsColor = "#FFC84A";
    } if (scs_lmsScore >= 11 && scs_lmsScore <= 14) {
        scs_lmsColor = "#EB4841";
    }
    //if (scs_lmsScore >= 0 && scs_lmsScore <= 4) {
    //    scs_lmsCategory.textContent = "良好";
    //    scs_lmsDescription.textContent = "你的情緒很健康啊，真好！";
    //    //document.getElementById('getHelpDiv').style.display='none';
    //    scs_lmsColor = "#4EC04E";
    //} if (scs_lmsScore > 4 && scs_lmsScore <= 9) {
    //    scs_lmsCategory.textContent = "輕微焦慮";
    //    scs_lmsDescription.textContent = "你可能有輕微焦慮症的病徵，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
    //    scs_lmsColor = "#FFC84A";
    //} if (scs_lmsScore > 9 && scs_lmsScore <= 14) {
    //    scs_lmsCategory.textContent = "中度焦慮";
    //    scs_lmsDescription.textContent = "你可能有中度焦慮症的病徵，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受。除了放鬆心情之外，我們建議你可以考慮輔導服務，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
    //    scs_lmsColor = "#F48847";
    //} if (scs_lmsScore > 14 && scs_lmsScore <= 21) {
    //    scs_lmsCategory.textContent = "嚴重焦慮";
    //    scs_lmsDescription.textContent = "你可能感到不適，請盡快尋求專業協助，例如醫生及社工。我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
    //    scs_lmsColor = "#EB4841";
    //}
    document.getElementById('scs_lmsQuestionresultDiv').style.display = 'none';
    document.getElementById('scs_lmsResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: scs_lmsScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 14], tickvals: [0, 7, 14] },
                bar: { color: scs_lmsColor, thickness: 1 }
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
}, true);