document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#gratitudeIntroDiv').style.display = 'none';
    document.querySelector('#gratitudeQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 4; i++) {
    var targetId = '#gratitude_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var gratitude_1_next_button = document.getElementById('gratitude_1_next_button');
var gratitude_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#gratitude_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('gratitude_1_block').style.display = 'none';
                document.getElementById('gratitude_2_block').style.display = '';
            }
        })
        .add({
            targets: '#gratitude_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=gratitude_0]'), function (e) {
    e.addEventListener('click', gratitude_1_next_function);
    e.addEventListener('click', function () {
        gratitude_1_next_button.addEventListener('click', gratitude_1_next_function);
        gratitude_1_next_button.style.opacity = 1
    });
})

// Common function for handling previous and next buttons
function handlePreviousButton(previousblockId, currentBlockId) {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#' + currentBlockId + '_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0,
            complete: function () {
                document.querySelector('#' + currentBlockId + '_block').style.display = 'none';
                document.querySelector('#' + previousblockId + '_block').style.display = '';
            }
        })
        .add({
            targets: '#' + previousblockId + '_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50');
}

function handleNextButton(currentBlockId, nextBlockId) {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#' + currentBlockId + '_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0,
            complete: function () {
                document.querySelector('#' + currentBlockId + '_block').style.display = 'none';
                document.querySelector('#' + nextBlockId + '_block').style.display = '';
            }
        })
        .add({
            targets: '#' + nextBlockId + '_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50');
}

function AddFunctionListener(previousblockId, currentBlockId, nextBlockId) {
    document.getElementById(currentBlockId + '_previous_button').addEventListener('click', function () { handlePreviousButton(previousblockId, currentBlockId) })
    Array.prototype.map.call(document.querySelectorAll('input[name=' + previousblockId + ']'), function (e) {
        e.addEventListener('click', function () { handleNextButton(currentBlockId, nextBlockId) });
        e.addEventListener('click', function () {
            document.getElementById(currentBlockId + '_next_button').addEventListener('click', function () { handleNextButton(currentBlockId, nextBlockId) });
            document.getElementById(currentBlockId + '_next_button').style.opacity = 1
        });
    })

}

for (var i = 1; i <= 18; i++) {
    AddFunctionListener('gratitude_' + i, 'gratitude_' + (i + 1), 'gratitude_' + (i + 2));
}

//last

var gratitude_6_previous_button = document.getElementById('gratitude_6_previous_button');
gratitude_6_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#gratitude_6_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('gratitude_5_block').style.display = '';
                document.getElementById('gratitude_6_block').style.display = 'none';
            }
        })
        .add({
            targets: '#gratitude_5_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var gratitude_6_next_button = document.getElementById('gratitude_6_next_button');
var gratitude_6_next_function = function () {
    swal.fire({
        text: '確定提交嗎？',
        showCloseButton: true,
        cancelButtonText: '取消',
        showCancelButton: true,
        confirmButtonText: '確定',
        customClass: { confirmButton: 'btnRound-thin btnRound-orange mx-2', cancelButton: 'btnRound-thin btnRound-green mx-2' },
        buttonsStyling: false,
        focusConfirm: false
    }).then(function (result) {
        if (result.isConfirmed) {
            document.querySelector('input[value=查看測試結果]').click()
        }
    });
}

Array.prototype.map.call(document.querySelectorAll('input[name=gratitude_5]'), function (e) {
    e.addEventListener('click', gratitude_6_next_function);
    e.addEventListener('click', function () {
        gratitude_6_next_button.addEventListener('click', gratitude_6_next_function);
        gratitude_6_next_button.style.opacity = 1
    });
})
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement('canvas');
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_gratitude');

form.addEventListener("submit", function (e) {
    var gratitude_0_score = parseInt(document.querySelector('input[name="gratitude_0"]:checked').value);
    var gratitude_1_score = parseInt(document.querySelector('input[name="gratitude_1"]:checked').value);
    var gratitude_2_score = parseInt(document.querySelector('input[name="gratitude_2"]:checked').value);
    var gratitude_3_score = parseInt(document.querySelector('input[name="gratitude_3"]:checked').value);
    var gratitude_4_score = parseInt(document.querySelector('input[name="gratitude_4"]:checked').value);
    var gratitude_5_score = parseInt(document.querySelector('input[name="gratitude_5"]:checked').value);

    var gratitudeScore = gratitude_0_score + gratitude_1_score + (4 - gratitude_2_score) + gratitude_3_score + gratitude_4_score + (4 - gratitude_5_score);
    if (isNaN(gratitudeScore)) {
        return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    if (gratitudeScore > 15 && gratitudeScore <= 25) {
        gratitudeCategory.textContent = "感恩程度：高";
        gratitudeDescription.textContent = "結果顯示你會經常對自己所得的美好事物或境況，感到慶幸、欣賞及感激，你亦可以透過寫感恩日記，或每日安排一段安靜的時間去數算自己的恩典，來幫助自己更加懂得感恩。";
        gratitudeColor = "#4EC04E";
    } if (gratitudeScore > 7 && gratitudeScore <= 15) {
        gratitudeCategory.textContent = "感恩程度：中";
        gratitudeDescription.textContent = "結果顯示你會間中都會對自己所得的美好事物或境況，感到慶幸、欣賞及感激。如果你想培養更加多感恩的習慣，你可以寫感恩日記，或每日安排一段安靜的時間去數算自己的恩典。";
        gratitudeColor = "#FFC84A";
    } if (gratitudeScore >= 0 && gratitudeScore <= 7) {
        gratitudeCategory.textContent = "感恩程度：低";
        gratitudeDescription.innerHTML = "結果顯示你較少會對自己所得的美好事物或境況，感到慶幸、欣賞及感激。不妨透過寫感恩日記來養成表達謝意的習慣，或每日安排一段安靜的時間去數算自己的恩典。除此之外，我們建議你可以考慮輔導服務，我們很樂意為你提供" + '<a href="/consultation?lms_course=assessment_gratitude">一對一免費線上諮詢服務</a>' + "，讓你進一步了解自己的狀況。"
        gratitudeColor = "#F48847";
    }
    document.getElementById('gratitudeQuestionDiv').style.display = 'none';
    document.getElementById('gratitudeResultDiv').style.display = '';
    document.querySelector('h1').innerText = '測試結果';
    document.title = '測試結果 | Re:Fresh線上精神健康自助平台';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: gratitudeScore,
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 25] },
                bar: { color: gratitudeColor, thickness: 1 }
            }
        }
    ];

    var layout = {
        paper_bgcolor: "#ffffff",
        margin: { l: 35, r: 35, b: 10, t: 10, pad: 0 }, height: 200, autosize: true, font: {
            family: 'Arial, sans-serif'
        }
    };
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()

    html2canvas(document.querySelector('#save_result'), {
        backgroundColor: null,
        onclone: function (document) {
            document.querySelector("#save_result_logo").style.display = 'flex';
            //document.querySelector("#save_result_header").style.display = '';
            document.querySelector("#gratitude_category_description_div").style.borderBottomRightRadius = '0px';
            document.querySelector("#gratitude_category_description_div").style.borderBottomLeftRadius = '0px';
            document.querySelector("#gratitude_footer").style.display = '';
        }
    }).then(function (canvas) {
        canvas_element = canvas;
    })
})
document.querySelector('#save_div').addEventListener('click', function () {
    var img = canvas_element.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = 'gratitude_result.png';
    link.href = img;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
    //canvastoimage.saveAsPNG(canvas_element, canvas_element.width, canvas_element.height, 'result')
})


document.querySelector('#share_div').addEventListener('click', function () {
    canvas_element.toBlob(function (blob) {
        var fileType = blob.type;
        var fileName = 'image.png';

        var file = new File([blob], fileName);
        file.type = fileType;
        var files = [file];

        // Even if you want to share just one file you need to
        // send them as an array of files.
        var shareData = {
            files: files
        }
        if (window.navigator.canShare(shareData)) {
            try {
                window.navigator.share(shareData)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err.name, err.message)
                }
            }
        } else {
            console.warn('Sharing not supported', shareData)
        }
    })
});
var browser = window.bowser.getParser(window.navigator.userAgent);
var isValidBrowser = browser.is("desktop");
if (isValidBrowser) {
    document.querySelector("#share_div").style.display = 'none';
}