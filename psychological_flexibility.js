document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#psychological_flexibilityIntroDiv').style.display = 'none';
    document.querySelector('#psychological_flexibilityQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 10; i++) {
    var targetId = '#psychological_flexibility_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var psychological_flexibility_1_next_button = document.getElementById('psychological_flexibility_1_next_button');
var psychological_flexibility_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#psychological_flexibility_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('psychological_flexibility_1_block').style.display = 'none';
                document.getElementById('psychological_flexibility_2_block').style.display = '';
            }
        })
        .add({
            targets: '#psychological_flexibility_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=psychological_flexibility_0]'), function (e) {
    e.addEventListener('click', psychological_flexibility_1_next_function);
    e.addEventListener('click', function () {
        psychological_flexibility_1_next_button.addEventListener('click', psychological_flexibility_1_next_function);
        psychological_flexibility_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 5; i++) {
    AddFunctionListener('psychological_flexibility_' + i, 'psychological_flexibility_' + (i + 1), 'psychological_flexibility_' + (i + 2));
}

//##last

var psychological_flexibility_7_previous_button = document.getElementById('psychological_flexibility_7_previous_button');
psychological_flexibility_7_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#psychological_flexibility_7_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('psychological_flexibility_6_block').style.display = '';
                document.getElementById('psychological_flexibility_7_block').style.display = 'none';
            }
        })
        .add({
            targets: '#psychological_flexibility_6_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var psychological_flexibility_7_next_button = document.getElementById('psychological_flexibility_7_next_button');
var psychological_flexibility_7_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=psychological_flexibility_6]'), function (e) {
    e.addEventListener('click', psychological_flexibility_7_next_function);
    e.addEventListener('click', function () {
        psychological_flexibility_7_next_button.addEventListener('click', psychological_flexibility_7_next_function);
        psychological_flexibility_7_next_button.style.opacity = 1
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

var form = document.getElementById('form_psychological_flexibility');

form.addEventListener("submit", function (e) {
    var psychological_flexibility_object = {};

    for (var i = 0; i <= 6; i++) {
        var inputName = 'psychological_flexibility_' + i;
        psychological_flexibility_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(psychological_flexibility_object).some(hasNull)) {
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
    var psychological_flexibility = 49 - (psychological_flexibility_object['psychological_flexibility_0_score'] + psychological_flexibility_object['psychological_flexibility_1_score'] + (psychological_flexibility_object['psychological_flexibility_2_score']) + psychological_flexibility_object['psychological_flexibility_3_score'] + (psychological_flexibility_object['psychological_flexibility_4_score']) + (psychological_flexibility_object['psychological_flexibility_5_score']) + psychological_flexibility_object['psychological_flexibility_6_score'])

    if (psychological_flexibility <= 20) {
        psychological_flexibilityDescription.textContent = "心理彈性偏低，很可能已出現一些情緒健康問題！你是否感到情緒困擾使你難以享受生活？是時候安頓下來，好好親親自己的心靈，回顧自己處理情緒和人生價值的取向吧！讓自己放開心懷，重新選擇活在當下，不纏繞於過去的遺憾和將來的擔憂，選擇可行的事實踐人生價值，你亦可能需要一些專業輔導支持你進行這個過程。";
        psychological_flexibilityColor = "#f45e47";
    } else if (psychological_flexibility >= 21 && psychological_flexibility <= 25) {
        psychological_flexibilityDescription.textContent = "稍欠心理彈性，你很可能有一些情緒困擾或感到受壓，需要注意情緒健康的警號！嘗試多留意此時此刻身體給你的訊息，多以觀察角度了解自己的心情和規法，靜心聆聽它們並留意本能的回應是否有幫助，選擇適合的方法去照顧這些感受，聽一首歌，畫一幅畫，提醒自己做喜歡和重要的事，用創意的方式接觸這個心情吧！";
        psychological_flexibilityColor = "#F48847";
    } else if (psychological_flexibility >= 26 && psychological_flexibility <= 33) {
        psychological_flexibilityDescription.textContent = "心理彈性屬一般，你的情緒大致上沒有妨礙你想過的生活。你有時察覺得到自己受情緒困擾並會重新選擇如何面對，使自己回復彈性。繼續抱開放態度看待情緒和想法吧，你會發現更闊的天空！";
        psychological_flexibilityColor = "#FFC84A";
    }else {
        psychological_flexibilityDescription.textContent = "心理彈性高，你能夠與你的情緒和壓力相處，活得自在。繼續保持這份心理彈性吧！這是難得的內在資源、使你能迎難而上，留意內心所重視的價值並實踐官，將會讓你人生活得精彩！";
        psychological_flexibilityColor = "#4EC04E";
    }
    
    document.getElementById('psychological_flexibilityQuestionDiv').style.display = 'none';
    document.getElementById('psychological_flexibilityResultDiv').style.display = '';
    document.querySelector('h1').style.display = '';

    //new
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: psychological_flexibility,
            title: { text: "分數" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 42], tickvals: [0, 21, 42] },
                bar: { color: psychological_flexibilityColor, thickness: 1 }
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
