document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#fomoIntroDiv').style.display = 'none';
    document.querySelector('#fomoQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 10; i++) {
    var targetId = '#fomo_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var fomo_1_next_button = document.getElementById('fomo_1_next_button');
var fomo_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#fomo_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('fomo_1_block').style.display = 'none';
                document.getElementById('fomo_2_block').style.display = '';
            }
        })
        .add({
            targets: '#fomo_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=fomo_0]'), function (e) {
    e.addEventListener('click', fomo_1_next_function);
    e.addEventListener('click', function () {
        fomo_1_next_button.addEventListener('click', fomo_1_next_function);
        fomo_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 8; i++) {
    AddFunctionListener('fomo_' + i, 'fomo_' + (i + 1), 'fomo_' + (i + 2));
}

//##last

var fomo_10_previous_button = document.getElementById('fomo_10_previous_button');
fomo_10_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#fomo_10_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('fomo_9_block').style.display = '';
                document.getElementById('fomo_10_block').style.display = 'none';
            }
        })
        .add({
            targets: '#fomo_9_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var fomo_10_next_button = document.getElementById('fomo_10_next_button');
var fomo_10_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=fomo_9]'), function (e) {
    e.addEventListener('click', fomo_10_next_function);
    e.addEventListener('click', function () {
        fomo_10_next_button.addEventListener('click', fomo_10_next_function);
        fomo_10_next_button.style.opacity = 1
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

var form = document.getElementById('form_fomo');

form.addEventListener("submit", function (e) {
    var fomo_object = {};

    for (var i = 0; i <= 9; i++) {
        var inputName = 'fomo_' + i;
        fomo_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(fomo_object).some(hasNull)) {
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
    var fomo = fomo_object['fomo_0_score'] + fomo_object['fomo_1_score'] + (fomo_object['fomo_2_score']) + fomo_object['fomo_3_score'] + (fomo_object['fomo_4_score']) + (fomo_object['fomo_5_score']) + fomo_object['fomo_6_score'] + fomo_object['fomo_7_score'] + fomo_object['fomo_8_score'] + fomo_object['fomo_9_score']

    if (fomo <= 20) {
        fomoDescription.textContent = "恭喜你，你沒有「FOMO」錯失恐懼的問題。";
        fomoColor = "#4EC04E";
    } else if (fomo > 20 && fomo < 31) {
        fomoDescription.textContent = "你在生活中可能有少許「FOMO」錯失恐懼的問題，我們建議你用不同的方式去調節情緒，然後學會擺脫「FOMO」的惡性循環，為即將到來的事情做好準備。";
        fomoColor = "#FFC84A";
    } else {
        fomoDescription.textContent = "你可能已經養成「FOMO」錯失恐懼的習慣，我們建議你運用方法，訓練自己去意識到「FOMO」的傾向，然後學會擺脫「FOMO」的惡性循環，為即將到來的事情做好準備。";
        fomoColor = "#F48847";
    }
    
    document.getElementById('fomoQuestionDiv').style.display = 'none';
    document.getElementById('fomoResultDiv').style.display = '';
    document.querySelector('h1').style.display = '';

    //new
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: fomo,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 40], tickvals: [0, 10, 20, 30, 40] },
                bar: { color: fomoColor, thickness: 1 }
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
