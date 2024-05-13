document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#procrastinationIntroDiv').style.display = 'none';
    document.querySelector('#procrastinationQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 9; i++) {
    var targetId = '#procrastination_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var procrastination_1_next_button = document.getElementById('procrastination_1_next_button');
var procrastination_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#procrastination_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('procrastination_1_block').style.display = 'none';
                document.getElementById('procrastination_2_block').style.display = '';
            }
        })
        .add({
            targets: '#procrastination_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=procrastination_0]'), function (e) {
    e.addEventListener('click', procrastination_1_next_function);
    e.addEventListener('click', function () {
        procrastination_1_next_button.addEventListener('click', procrastination_1_next_function);
        procrastination_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 7; i++) {
    AddFunctionListener('procrastination_' + i, 'procrastination_' + (i + 1), 'procrastination_' + (i + 2));
}

//##last

var procrastination_9_previous_button = document.getElementById('procrastination_9_previous_button');
procrastination_9_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#procrastination_9_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('procrastination_8_block').style.display = '';
                document.getElementById('procrastination_9_block').style.display = 'none';
            }
        })
        .add({
            targets: '#procrastination_8_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var procrastination_9_next_button = document.getElementById('procrastination_9_next_button');
var procrastination_9_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=procrastination_8]'), function (e) {
    e.addEventListener('click', procrastination_9_next_function);
    e.addEventListener('click', function () {
        procrastination_9_next_button.addEventListener('click', procrastination_9_next_function);
        procrastination_9_next_button.style.opacity = 1
    });
})
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement('canvas');
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_procrastination');

form.addEventListener("submit", function (e) {
    var procrastination_object = {};

    for (var i = 0; i <= 8; i++) {
        var inputName = 'procrastination_' + i;
        procrastination_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(procrastination_object).some(hasNull)) {
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
    var procrastination = procrastination_object['procrastination_0_score'] + procrastination_object['procrastination_1_score'] + (5 - procrastination_object['procrastination_2_score']) + procrastination_object['procrastination_3_score'] + (5 - procrastination_object['procrastination_4_score']) + (5 - procrastination_object['procrastination_5_score']) + procrastination_object['procrastination_6_score'] + procrastination_object['procrastination_7_score'] + procrastination_object['procrastination_8_score']

    if (procrastination <= 18) {
        procrastinationDescription.textContent = "你可能較少時候會拖延。";
        procrastinationColor = "#4EC04E";
    } else if (procrastination > 18 | procrastination < 27) {
        procrastinationDescription.textContent = "你可能較少時候會拖延。";
        procrastinationColor = "#FFC84A";
    } else {
        procrastinationDescription.textContent = "你可能較多時候都會拖延。";
        procrastinationColor = "#F48847";
    }
    
    document.getElementById('procrastinationQuestionDiv').style.display = 'none';
    document.getElementById('procrastinationResultDiv').style.display = '';
    document.querySelector('h1').style.display = '';

    //new
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: procrastination,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 36], tickvals: [0, 9, 18, 27, 36] },
                bar: { color: procrastinationColor, thickness: 1 }
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
