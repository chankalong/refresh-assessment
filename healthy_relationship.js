document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#healthy_relationshipIntroDiv').style.display = 'none';
    document.querySelector('#healthy_relationshipQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 4; i++) {
    var targetId = '#healthy_relationship_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var healthy_relationship_1_next_button = document.getElementById('healthy_relationship_1_next_button');
var healthy_relationship_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#healthy_relationship_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('healthy_relationship_1_block').style.display = 'none';
                document.getElementById('healthy_relationship_2_block').style.display = '';
            }
        })
        .add({
            targets: '#healthy_relationship_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=healthy_relationship_0]'), function (e) {
    e.addEventListener('click', healthy_relationship_1_next_function);
    e.addEventListener('click', function () {
        healthy_relationship_1_next_button.addEventListener('click', healthy_relationship_1_next_function);
        healthy_relationship_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 11; i++) {
    AddFunctionListener('healthy_relationship_' + i, 'healthy_relationship_' + (i + 1), 'healthy_relationship_' + (i + 2));
}

//##last

var healthy_relationship_13_previous_button = document.getElementById('healthy_relationship_13_previous_button');
healthy_relationship_13_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#healthy_relationship_13_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('healthy_relationship_12_block').style.display = '';
                document.getElementById('healthy_relationship_13_block').style.display = 'none';
            }
        })
        .add({
            targets: '#healthy_relationship_12_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var healthy_relationship_13_next_button = document.getElementById('healthy_relationship_13_next_button');
var healthy_relationship_13_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=healthy_relationship_12]'), function (e) {
    e.addEventListener('click', healthy_relationship_13_next_function);
    e.addEventListener('click', function () {
        healthy_relationship_13_next_button.addEventListener('click', healthy_relationship_13_next_function);
        healthy_relationship_13_next_button.style.opacity = 1
    });
})
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement('canvas');
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_healthy_relationship');

form.addEventListener("submit", function (e) {
    function sum_object(obj) {
        var sum = 0;
        for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
                sum += parseFloat(obj[el]);
            }
        }
        return sum;
    }

    var healthy_relationship_object = {};

    for (var i = 0; i <= 12; i++) {
        var inputName = 'healthy_relationship_' + i;
        healthy_relationship_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    var healthy_relationshipScore = sum_object(healthy_relationship_object);
            
    if (isNaN(healthy_relationshipScore)) {
        return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    if (healthy_relationshipScore > 10 && healthy_relationshipScore <= 13) {
        healthy_relationshipCategory.textContent = "你們的關係很健康";
        healthy_relationshipDescription.textContent = "你與你所重視的人，不論在價值觀、行為都有不少相似的地方，是一段健康的關係。希望你們在往後日子，都能夠對對方抱持著真誠之心，令關係不斷昇華。";
        healthy_relationshipColor = "#4EC04E";
    } if (healthy_relationshipScore > 6 && healthy_relationshipScore <= 10) {
        healthy_relationshipCategory.textContent = "你們的關係有進步的空間";
        healthy_relationshipDescription.textContent = "你與你所重視的人，不論在價值觀、行為都有一些相似的地方，關係可謂中規中距。願你們在往後日子有更多經歷，努力邁向一段健康的關係。";
        healthy_relationshipColor = "#FFC84A";
    } if (healthy_relationshipScore >= 0 && healthy_relationshipScore <= 6) {
        healthy_relationshipCategory.textContent = "你們的關係響起警號";
        healthy_relationshipDescription.innerHTML = "你與你所重視的人，不論在價值觀、行為，較少有相似的地方，關係響起警號，建議尋求" + '<a href="/consultation?lms_course=assessment_healthy_relationship">專業意見</a>' + "。為你和你所重視的人營造健康關係提供新方向。";
        healthy_relationshipColor = "#F48847";
    }
    document.getElementById('healthy_relationshipQuestionDiv').style.display = 'none';
    document.getElementById('healthy_relationshipResultDiv').style.display = '';
    document.querySelector('h1').innerText = '測試結果';
    document.title = '測試結果 | Re:Fresh線上精神健康自助平台';

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: healthy_relationshipScore,
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 15] },
                bar: { color: healthy_relationshipColor, thickness: 1 }
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
            document.querySelector("#healthy_relationship_category_description_div").style.borderBottomRightRadius = '0px';
            document.querySelector("#healthy_relationship_category_description_div").style.borderBottomLeftRadius = '0px';
            document.querySelector("#healthy_relationship_footer").style.display = '';
        }
    }).then(function (canvas) {
        canvas_element = canvas;
    })
})
document.querySelector('#save_div').addEventListener('click', function () {
    var img = canvas_element.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = 'healthy_relationship_result.png';
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