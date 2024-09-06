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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 6 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 6"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_resilience');

form.addEventListener("submit", function (e) {
    var resilience_0_score = parseInt(document.querySelector('input[name="resilience_0"]:checked').value);
    var resilience_1_score = parseInt(document.querySelector('input[name="resilience_1"]:checked').value);
    var resilience_2_score = parseInt(document.querySelector('input[name="resilience_2"]:checked').value);
    var resilience_3_score = parseInt(document.querySelector('input[name="resilience_3"]:checked').value);
    var resilience_4_score = parseInt(document.querySelector('input[name="resilience_4"]:checked').value);
    var resilience_5_score = parseInt(document.querySelector('input[name="resilience_5"]:checked').value);

    var resilienceScore = resilience_0_score + resilience_1_score + resilience_2_score + resilience_3_score + resilience_4_score + resilience_5_score;
    if (isNaN(resilienceScore)) {
        return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    resilienceResult.textContent = "結果 " + resilienceScore + " 分";
    if (resilienceScore >= 0 && resilienceScore <= 8) {
        resilienceCategory.textContent = "心理彈性程度低";
        resilienceDescription.textContent = "你的心理彈性程度低，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受。除了放鬆心情之外，我們建議你可以考慮輔導服務，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        resilienceColor = "#F48847";
    } if (resilienceScore > 8 && resilienceScore <= 16) {
        resilienceCategory.textContent = "心理彈性程度中";
        resilienceDescription.textContent = "你的心理彈性程度中，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
        resilienceColor = "#FFC84A";
    } if (resilienceScore > 16 && resilienceScore <= 24) {
        resilienceCategory.textContent = "心理彈性程度高";
        resilienceDescription.textContent = "你的情緒很健康啊，真好！";
        resilienceColor = "#4EC04E";
    }
    document.getElementById('resilienceQuestionresultDiv').style.display = 'none';
    document.getElementById('resilienceResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: resilienceScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 24], tickvals: [0, 12, 24] },
                bar: { color: resilienceColor, thickness: 1 }
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
