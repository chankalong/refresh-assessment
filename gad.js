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
var form = document.getElementById('form_gad');

form.addEventListener("submit", function (e) {
    var gad_0_score = parseInt(document.querySelector('input[name="gad_0"]:checked').value);
    var gad_1_score = parseInt(document.querySelector('input[name="gad_1"]:checked').value);
    var gad_2_score = parseInt(document.querySelector('input[name="gad_2"]:checked').value);
    var gad_3_score = parseInt(document.querySelector('input[name="gad_3"]:checked').value);
    var gad_4_score = parseInt(document.querySelector('input[name="gad_4"]:checked').value);
    var gad_5_score = parseInt(document.querySelector('input[name="gad_5"]:checked').value);
    var gad_6_score = parseInt(document.querySelector('input[name="gad_6"]:checked').value);

    var gadScore = gad_0_score + gad_1_score + gad_2_score + gad_3_score + gad_4_score + gad_5_score + gad_6_score;

    if (isNaN(gadScore)) {
        return; //stop the execution of function
    }
    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();

    gadResult.textContent = "結果 " + gadScore + " 分";
    if (gadScore >= 0 && gadScore <= 4) {
        gadCategory.textContent = "良好";
        gadDescription.textContent = "你的情緒很健康啊，真好！";
        //document.getElementById('getHelpDiv').style.display='none';
        gadColor = "#4EC04E";
    } if (gadScore > 4 && gadScore <= 9) {
        gadCategory.textContent = "輕微焦慮";
        gadDescription.textContent = "你可能有輕微焦慮症的病徵，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
        gadColor = "#FFC84A";
    } if (gadScore > 9 && gadScore <= 14) {
        gadCategory.textContent = "中度焦慮";
        gadDescription.textContent = "你可能有中度焦慮症的病徵，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受。除了放鬆心情之外，我們建議你可以考慮輔導服務，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        gadColor = "#F48847";
    } if (gadScore > 14 && gadScore <= 21) {
        gadCategory.textContent = "嚴重焦慮";
        gadDescription.textContent = "你可能感到不適，請盡快尋求專業協助，例如醫生及社工。我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
        gadColor = "#EB4841";
    }
    document.getElementById('gadQuestionresultDiv').style.display = 'none';
    document.getElementById('gadResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: gadScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 21], tickvals: [0, 5, 10, 15, 21] },
                bar: { color: gadColor, thickness: 1 }
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
