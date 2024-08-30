document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#self_blameIntroDiv').style.display = 'none';
    document.querySelector('#self_blameQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 10; i++) {
    var targetId = '#self_blame_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var self_blame_1_next_button = document.getElementById('self_blame_1_next_button');
var self_blame_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#self_blame_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('self_blame_1_block').style.display = 'none';
                document.getElementById('self_blame_2_block').style.display = '';
            }
        })
        .add({
            targets: '#self_blame_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=self_blame_0]'), function (e) {
    e.addEventListener('click', self_blame_1_next_function);
    e.addEventListener('click', function () {
        self_blame_1_next_button.addEventListener('click', self_blame_1_next_function);
        self_blame_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 20; i++) {
    AddFunctionListener('self_blame_' + i, 'self_blame_' + (i + 1), 'self_blame_' + (i + 2));
}

//##last

var self_blame_22_previous_button = document.getElementById('self_blame_22_previous_button');
self_blame_22_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#self_blame_22_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('self_blame_21_block').style.display = '';
                document.getElementById('self_blame_22_block').style.display = 'none';
            }
        })
        .add({
            targets: '#self_blame_21_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var self_blame_22_next_button = document.getElementById('self_blame_22_next_button');
var self_blame_22_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=self_blame_21]'), function (e) {
    e.addEventListener('click', self_blame_22_next_function);
    e.addEventListener('click', function () {
        self_blame_22_next_button.addEventListener('click', self_blame_22_next_function);
        self_blame_22_next_button.style.opacity = 1
    });
})
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement('canvas');
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_self_blame');

form.addEventListener("submit", function (e) {
    var self_blame_object = {};

    for (var i = 0; i <= 21; i++) {
        var inputName = 'self_blame_' + i;
        self_blame_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(self_blame_object).some(hasNull)) {
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
    var self_blame = self_blame_object['self_blame_0_score'] + self_blame_object['self_blame_1_score'] + (self_blame_object['self_blame_2_score']) + self_blame_object['self_blame_3_score'] + (self_blame_object['self_blame_4_score']) + (self_blame_object['self_blame_5_score']) + self_blame_object['self_blame_6_score'] + self_blame_object['self_blame_7_score'] + self_blame_object['self_blame_8_score'] + self_blame_object['self_blame_9_score'] + self_blame_object['self_blame_10_score'] + self_blame_object['self_blame_11_score'] + (self_blame_object['self_blame_12_score']) + self_blame_object['self_blame_13_score'] + (self_blame_object['self_blame_14_score']) + (self_blame_object['self_blame_15_score']) + self_blame_object['self_blame_16_score'] + self_blame_object['self_blame_17_score'] + self_blame_object['self_blame_18_score'] + self_blame_object['self_blame_19_score'] + self_blame_object['self_blame_20_score'] + self_blame_object['self_blame_21_score']

    if (self_blame < 13) {
        self_blameDescription.textContent = "恭喜你，你沒有自我批評的問題。";
        self_blameColor = "#4EC04E";
    } else if (self_blame < 30) {
        self_blameDescription.textContent = "你在生活中可能有少許自我批評的問題，我們建議你用不同的方式去調節情緒，然後學會擺脫自我批評的惡性循環，為即將到來的事情做好準備。";
        self_blameColor = "#afc04e";
    } else if (self_blame < 50) {
        self_blameDescription.textContent = "你在生活中可能有時會批評自己，我們建議你用不同的方式去調節情緒，然後學會擺脫自我批評的惡性循環，為即將到來的事情做好準備。";
        self_blameColor = "#FFC84A";
    } else if (self_blame < 68) {
        self_blameDescription.textContent = "你在生活中可能經常批評自己，我們建議你用不同的方式去調節情緒，然後學會擺脫自我批評的惡性循環，為即將到來的事情做好準備。";
        self_blameColor = "#F48847";
    } else {
        self_blameDescription.textContent = "你可能已經養成自我批評的習慣，我們建議你運用方法，訓練自己去意識到自我批評的傾向，然後學會擺脫自我批評的惡性循環，為即將到來的事情做好準備。";
        self_blameColor = "#EB4841";
    }
    
    document.getElementById('self_blameQuestionDiv').style.display = 'none';
    document.getElementById('self_blameResultDiv').style.display = '';
    document.querySelector('h1').style.display = '';

    //new
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: self_blame,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 40], tickvals: [0, 10, 20, 30, 40] },
                bar: { color: self_blameColor, thickness: 1 }
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