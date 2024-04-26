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
            document.querySelectorAll("select").forEach(function (input) {numberTickedBoxesArray.push(input.value)})
            var numberTickedBoxes = numberTickedBoxesArray.filter(Boolean).length;
            console.log(numberTickedBoxes)
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 5 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 5"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_who');
form.addEventListener("submit", function (e) {

    var who_1_score = parseInt(document.querySelector('[name="who_1"]').value);
    var who_2_score = parseInt(document.querySelector('[name="who_2"]').value);
    var who_3_score = parseInt(document.querySelector('[name="who_3"]').value);
    var who_4_score = parseInt(document.querySelector('[name="who_4"]').value);
    var who_5_score = parseInt(document.querySelector('[name="who_5"]').value);

    var whoScore = (who_1_score + who_2_score + who_3_score + who_4_score + who_5_score) * 4;
    if (isNaN(whoScore)) {
        return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    whoResult.textContent = "結果 " + whoScore + " 分";
    if (whoScore >= 0 && whoScore <= 50) {
        whoCategory.textContent = "差";
        whoDescription.textContent = "你可能有輕微焦慮抑鬱的病徵，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
        whoColor = "#EB4841";
    } if (whoScore > 50 && whoScore <= 100) {
        whoCategory.textContent = "良好";
        whoDescription.textContent = "你的情緒很健康啊，真好！";
        whoColor = "#4EC04E";
    }
    document.getElementById('whoQuestionresultDiv').style.display = 'none';
    document.getElementById('whoResultDiv').style.display = '';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: whoScore,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 100], tickvals: [0, 50, 100] },
                bar: { color: whoColor, thickness: 1 }
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
