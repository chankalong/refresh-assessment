document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#emotional_blackmailIntroDiv').style.display = 'none';
    document.querySelector('#emotional_blackmailQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 18; i++) {
    var targetId = '#emotional_blackmail_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var emotional_blackmail_1_next_button = document.getElementById('emotional_blackmail_1_next_button');
var emotional_blackmail_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#emotional_blackmail_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('emotional_blackmail_1_block').style.display = 'none';
                document.getElementById('emotional_blackmail_2_block').style.display = '';
            }
        })
        .add({
            targets: '#emotional_blackmail_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=emotional_blackmail_0]'), function (e) {
    e.addEventListener('click', emotional_blackmail_1_next_function);
    e.addEventListener('click', function () {
        emotional_blackmail_1_next_button.addEventListener('click', emotional_blackmail_1_next_function);
        emotional_blackmail_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 16; i++) {
    AddFunctionListener('emotional_blackmail_' + i, 'emotional_blackmail_' + (i + 1), 'emotional_blackmail_' + (i + 2));
}

//##last

var emotional_blackmail_18_previous_button = document.getElementById('emotional_blackmail_18_previous_button');
emotional_blackmail_18_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#emotional_blackmail_18_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('emotional_blackmail_17_block').style.display = '';
                document.getElementById('emotional_blackmail_18_block').style.display = 'none';
            }
        })
        .add({
            targets: '#emotional_blackmail_17_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var emotional_blackmail_18_next_button = document.getElementById('emotional_blackmail_18_next_button');
var emotional_blackmail_18_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=emotional_blackmail_17]'), function (e) {
    e.addEventListener('click', emotional_blackmail_18_next_function);
    e.addEventListener('click', function () {
        emotional_blackmail_18_next_button.addEventListener('click', emotional_blackmail_18_next_function);
        emotional_blackmail_18_next_button.style.opacity = 1
    });
})
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement('canvas');
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_emotional_blackmail');

form.addEventListener("submit", function (e) {
    var emotional_blackmail_object = {};

    for (var i = 0; i <= 17; i++) {
        var inputName = 'emotional_blackmail_' + i;
        emotional_blackmail_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(emotional_blackmail_object).some(hasNull)) {
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

    var emotional_blackmail_fear = emotional_blackmail_object['emotional_blackmail_0_score'] + emotional_blackmail_object['emotional_blackmail_1_score'] + emotional_blackmail_object['emotional_blackmail_2_score'] + emotional_blackmail_object['emotional_blackmail_3_score'] + emotional_blackmail_object['emotional_blackmail_4_score'] + emotional_blackmail_object['emotional_blackmail_5_score'];
    var emotional_blackmail_guilt = emotional_blackmail_object['emotional_blackmail_6_score'] + emotional_blackmail_object['emotional_blackmail_7_score'] + emotional_blackmail_object['emotional_blackmail_8_score'] + emotional_blackmail_object['emotional_blackmail_9_score'] + emotional_blackmail_object['emotional_blackmail_10_score'] + emotional_blackmail_object['emotional_blackmail_11_score'];
    var emotional_blackmail_obligate = emotional_blackmail_object['emotional_blackmail_12_score'] + emotional_blackmail_object['emotional_blackmail_13_score'] + emotional_blackmail_object['emotional_blackmail_14_score'] + emotional_blackmail_object['emotional_blackmail_15_score'] + emotional_blackmail_object['emotional_blackmail_16_score'] + emotional_blackmail_object['emotional_blackmail_17_score'];
    emotional_blackmailCategory.textContent = "afslkfls";
    emotional_blackmailDescription.textContent = "jdkhgkjfdhgkdf";
    document.getElementById('emotional_blackmailQuestionDiv').style.display = 'none';
    document.getElementById('emotional_blackmailResultDiv').style.display = '';
    document.querySelector('h1').style.display = '';
    document.querySelector('h1').textContent = "afslkfls";

    //new
    var data = [{
        type: 'scatterpolar',
        r: [emotional_blackmail_fear, emotional_blackmail_guilt, emotional_blackmail_obligate, emotional_blackmail_fear],
        theta: ['恐懼', '內疚', '義務', '恐懼'],
        fill: 'toself'
    },
    {
        type: 'scatterpolar',
        mode: 'lines',
        r: [24, 24, 24, 24],
        theta: ['恐懼', '內疚', '義務', '恐懼'],
        line: { color: 'grey' }
    }]

    var layout = {
        margin: { b: 30, t: 30, r: 20, l: 20, pad: 0 }, font: {
            family: 'Arial, sans-serif'
        },
        polar: {
            angularaxis: {
                color: "transparent",
                gridcolor: "grey",
                tickfont: { color: "grey" },
                rotation: 90
            },
            radialaxis: {
                visible: false,
                range: [0, 24]
            }
        },
        showlegend: false,
        hovermode: false,
        height: 250
    }
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    //document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })

    //old


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
