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
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 4 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 4"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_pss');

form.addEventListener("submit", function (e) {
    var pss_0_score = parseInt(document.querySelector('input[name="pss_0"]:checked').value);
    var pss_1_score = parseInt(document.querySelector('input[name="pss_1"]:checked').value);
    var pss_2_score = parseInt(document.querySelector('input[name="pss_2"]:checked').value);
    var pss_3_score = parseInt(document.querySelector('input[name="pss_3"]:checked').value);

    var pssScore = pss_0_score + pss_1_score + pss_2_score + pss_3_score;
    if (isNaN(pssScore)) {
        return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();
    
    pssResult.textContent = "結果 " + pssScore + " 分";
    if (pssScore >= 0 && pssScore <= 2) {
        pssCategory.textContent = "沒有壓力";
        pssDescription.textContent = "你的情緒很健康啊，真好！";
        pssColor = "#4EC04E";
    } if (pssScore > 2 && pssScore <= 5) {
        pssCategory.textContent = "輕微壓力";
        pssDescription.textContent = "你可能有輕微壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
        pssColor = "#FFC84A";
    } if (pssScore > 5 && pssScore <= 16) {
        pssCategory.textContent = "中度壓力";
        pssDescription.textContent = "你可能有中度壓力，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受。除了放鬆心情之外，我們建議你可以考慮輔導服務，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        pssColor = "#F48847";
    }
    document.getElementById('pssQuestionresultDiv').style.display = 'none';
    document.getElementById('pssResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: pssScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 16] },
                bar: { color: pssColor, thickness: 1 }
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
