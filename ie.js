document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#ieIntroDiv').style.display = 'none';
    document.querySelector('#ieQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 10; i++) {
    var targetId = '#ie_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var ie_1_next_button = document.getElementById('ie_1_next_button');
var ie_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#ie_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('ie_1_block').style.display = 'none';
                document.getElementById('ie_2_block').style.display = '';
            }
        })
        .add({
            targets: '#ie_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=ie_0]'), function (e) {
    e.addEventListener('click', ie_1_next_function);
    e.addEventListener('click', function () {
        ie_1_next_button.addEventListener('click', ie_1_next_function);
        ie_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 6; i++) {
    AddFunctionListener('ie_' + i, 'ie_' + (i + 1), 'ie_' + (i + 2));
}

//##last

var ie_8_previous_button = document.getElementById('ie_8_previous_button');
ie_8_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#ie_8_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('ie_7_block').style.display = '';
                document.getElementById('ie_8_block').style.display = 'none';
            }
        })
        .add({
            targets: '#ie_7_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var ie_8_next_button = document.getElementById('ie_8_next_button');
var ie_8_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=ie_7]'), function (e) {
    e.addEventListener('click', ie_8_next_function);
    e.addEventListener('click', function () {
        ie_8_next_button.addEventListener('click', ie_8_next_function);
        ie_8_next_button.style.opacity = 1
    });
})
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement('canvas');
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;

  var uid_textbox = document.getElementById("uid");
  var member_level_textbox = document.getElementById("member_level");
  var eap_company_textbox = document.getElementById("eap_company");

  if (uid_textbox.value) {console.log("input uid value already")} else {uid_textbox.value = Math.random();}
  if (drupalSettings.user.levels === undefined) {member_level_textbox.value = 0} else {member_level_textbox.value = drupalSettings.user.levels[0]}
  if (drupalSettings.user.eap === undefined) {eap_company_textbox.value = '0'} else {eap_company_textbox.value = drupalSettings.user.eap.label}

var form = document.getElementById('form_ie');

form.addEventListener("submit", function (e) {
    var ie_object = {};

    for (var i = 0; i <= 7; i++) {
        var inputName = 'ie_' + i;
        ie_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(ie_object).some(hasNull)) {
        return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data,
    })
    e.preventDefault();

    //score
    var ie = ie_object['ie_0_score'] + ie_object['ie_1_score'] + ie_object['ie_2_score'] + ie_object['ie_3_score'] + ie_object['ie_4_score'] + ie_object['ie_5_score'] + ie_object['ie_6_score'] + ie_object['ie_7_score'];
    //var ie = Math.round((ie_sum + Number.EPSILON) * 10) / 10;
    

    if (ie <= 24) {
        ieDescription.innerHTML = "你傾向屬於<strong>內向型</strong>，偏向安靜低調，大部份時間喜歡獨處，以免被社交活動耗費大量精力。不過，你並非拒絕與人接觸，只是更著重個人空間，享受專注地思考，並以獨處來恢復精神及平靜。";
        ieColor = "#4E89AE";
        ieUrl = "/sites/default/files/inpages/post%201.3%20內向vs外向人休息方法大不同_v2_cms_アートボード%201_0.png"
    } else {
        ieDescription.innerHTML = "你傾向屬於<strong>外向型</strong>，熱衷人際交往，喜歡說話及參與社交聚會。比起獨處，你更傾向與他人共處，融入所在的環境，並從身邊的人事物及反應汲取能量，變得精力充沛。當你獨處時，反而會感到無聊及失去動力。";
        ieColor = "#ED6663";
        ieUrl = "/sites/default/files/inpages/post%201.2%20內向vs外向人休息方法大不同_v3_cms_アートボード%201.png"
    }
    
    document.getElementById('ieQuestionDiv').style.display = 'none';
    document.getElementById('ieResultDiv').style.display = '';
    document.querySelector('h1').style.display = '';
    document.querySelector('ie_result_image').src = ieUrl;

    //new
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: ie,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [8, 40], tickvals: [8, 24, 40] },
                bar: { color: ieColor, thickness: 1 }
            }
        }
    ];

    var layout = {
        margin: { b: 20, t: 60, r: 35, l: 35, pad: 0 }, height: 300, autosize: true, font: {
            family: 'Arial, sans-serif'
        }
    };

    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    //document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })

    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()

})

document
  .querySelector("#share_div")
  .setAttribute("data-clipboard-text", window.location.href);

document.querySelector("#share_div").addEventListener("click", function () {
  var shareData = {
    url: window.location.href,
  };

  try {
    window.navigator.canShare(shareData);
  } catch (err) {}

  if (window.navigator.canShare(shareData)) {
    try {
      window.navigator.share(shareData);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err.name, err.message);
      }
    }
  } else {
    console.warn("Sharing not supported", shareData);
  }
});
