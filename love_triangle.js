document.querySelector('#start_div').addEventListener('click', function () {
    document.querySelector('#love_triangularIntroDiv').style.display = 'none';
    document.querySelector('#love_triangularQuestionDiv').style.display = '';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()
})
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector('.page-title').style.marginBottom = '0px';
for (var i = 2; i <= 15; i++) {
    var targetId = '#love_triangular_' + i + '_block';
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var love_triangular_1_next_button = document.getElementById('love_triangular_1_next_button');
var love_triangular_1_next_function = function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#love_triangular_1_block',
            easing: 'easeOutExpo',
            translateX: -20,
            opacity: 0, complete: function () {
                document.getElementById('love_triangular_1_block').style.display = 'none';
                document.getElementById('love_triangular_2_block').style.display = '';
            }
        })
        .add({
            targets: '#love_triangular_2_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
};
Array.prototype.map.call(document.querySelectorAll('input[name=love_triangular_0]'), function (e) {
    e.addEventListener('click', love_triangular_1_next_function);
    e.addEventListener('click', function () {
        love_triangular_1_next_button.addEventListener('click', love_triangular_1_next_function);
        love_triangular_1_next_button.style.opacity = 1
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

for (var i = 1; i <= 13; i++) {
    AddFunctionListener('love_triangular_' + i, 'love_triangular_' + (i + 1), 'love_triangular_' + (i + 2));
}

//##last

var love_triangular_15_previous_button = document.getElementById('love_triangular_15_previous_button');
love_triangular_15_previous_button.addEventListener('click', function () {
    anime.timeline({
        duration: 200,
        delay: 200
    })
        .add({
            targets: '#love_triangular_15_block',
            easing: 'easeOutExpo',
            translateX: 20,
            opacity: 0, complete: function () {
                document.getElementById('love_triangular_14_block').style.display = '';
                document.getElementById('love_triangular_15_block').style.display = 'none';
            }
        })
        .add({
            targets: '#love_triangular_14_block',
            easing: 'easeInExpo',
            translateX: 0,
            opacity: 1
        }, '-=50')
})

var love_triangular_15_next_button = document.getElementById('love_triangular_15_next_button');
var love_triangular_15_next_function = function () {
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

Array.prototype.map.call(document.querySelectorAll('input[name=love_triangular_14]'), function (e) {
    e.addEventListener('click', love_triangular_15_next_function);
    e.addEventListener('click', function () {
        love_triangular_15_next_button.addEventListener('click', love_triangular_15_next_function);
        love_triangular_15_next_button.style.opacity = 1
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

var form = document.getElementById('form_love_triangular');

form.addEventListener("submit", function (e) {
    var love_triangular_object = {};

    for (var i = 0; i <= 14; i++) {
        var inputName = 'love_triangular_' + i;
        love_triangular_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(love_triangular_object).some(hasNull)) {
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

    var love_triangular_intimacy = love_triangular_object['love_triangular_0_score'] + love_triangular_object['love_triangular_1_score'] + love_triangular_object['love_triangular_2_score'] + love_triangular_object['love_triangular_3_score'] + love_triangular_object['love_triangular_4_score'];
    var love_triangular_passion = love_triangular_object['love_triangular_5_score'] + love_triangular_object['love_triangular_6_score'] + love_triangular_object['love_triangular_7_score'] + love_triangular_object['love_triangular_8_score'] + love_triangular_object['love_triangular_9_score'];
    var love_triangular_commitment = love_triangular_object['love_triangular_10_score'] + love_triangular_object['love_triangular_11_score'] + love_triangular_object['love_triangular_12_score'] + love_triangular_object['love_triangular_13_score'] + love_triangular_object['love_triangular_14_score'];

    var love_triangular_factor_object = { "love_triangular_intimacy": love_triangular_intimacy, "love_triangular_passion": love_triangular_passion, "love_triangular_commitment": love_triangular_commitment };
    var sortedKeys_love_triangular_factor_object = Object.keys(love_triangular_factor_object).sort(function (a, b) {
        return love_triangular_factor_object[b] - love_triangular_factor_object[a];
    });
    var sortedKeys_love_triangular_factor_object_high_two = sortedKeys_love_triangular_factor_object[0] + sortedKeys_love_triangular_factor_object[1]
    var sortedKeys_love_triangular_factor_object_high_one = sortedKeys_love_triangular_factor_object[0]

    //group

    var love_triangular_intimacy_group;
    if (love_triangular_intimacy >= 19) {
        love_triangular_intimacy_group = 'h';
    } else if (love_triangular_intimacy >= 16) {
        love_triangular_intimacy_group = 'm';
    } else {
        love_triangular_intimacy_group = 'l'
    }

    var love_triangular_passion_group;
    if (love_triangular_passion >= 18) {
        love_triangular_passion_group = 'h';
    } else if (love_triangular_passion >= 14) {
        love_triangular_passion_group = 'm';
    } else {
        love_triangular_passion_group = 'l'
    }

    var love_triangular_commitment_group;
    if (love_triangular_commitment >= 19) {
        love_triangular_commitment_group = 'h';
    } else if (love_triangular_commitment >= 16) {
        love_triangular_commitment_group = 'm';
    } else {
        love_triangular_commitment_group = 'l'
    }

    var love_triangular_factor_group_object = { "love_triangular_intimacy_group": love_triangular_intimacy_group, "love_triangular_passion_group": love_triangular_passion_group, "love_triangular_commitment_group": love_triangular_commitment_group };
    var love_triangular_factor_group_object_value_l_count = 0;
    var love_triangular_factor_group_object_value_m_count = 0;
    var love_triangular_factor_group_object_value_h_count = 0;

    // Iterate over the values of the object
    for (var key in love_triangular_factor_group_object) {
        if (love_triangular_factor_group_object.hasOwnProperty(key)) {
            var value = love_triangular_factor_group_object[key];
            if (value === 'l') {
                love_triangular_factor_group_object_value_l_count++;
            } else if (value === 'm') {
                love_triangular_factor_group_object_value_m_count++;
            } else if (value === 'h') {
                love_triangular_factor_group_object_value_h_count++;
            }
        }
    }

    // grouping
    var love_triangular_final_group;
    if (love_triangular_factor_group_object_value_h_count == 3) {
        love_triangular_final_group = 'consummate';
    } else if (love_triangular_factor_group_object_value_h_count == 2 | love_triangular_factor_group_object_value_m_count >= 2) {
        if (sortedKeys_love_triangular_factor_object_high_two.includes('intimacy') && sortedKeys_love_triangular_factor_object_high_two.includes('passion')) {
            love_triangular_final_group = 'romantic'
        } else if (sortedKeys_love_triangular_factor_object_high_two.includes('commitment') && sortedKeys_love_triangular_factor_object_high_two.includes('passion')) {
            love_triangular_final_group = 'fatuous'
        } else if (sortedKeys_love_triangular_factor_object_high_two.includes('commitment') && sortedKeys_love_triangular_factor_object_high_two.includes('intimacy')) {
            love_triangular_final_group = 'companionate'
        }
    } else if (love_triangular_factor_group_object_value_m_count == 1) {
        if (sortedKeys_love_triangular_factor_object_high_one.includes('intimacy')) {
            love_triangular_final_group = 'friend'
        } else if (sortedKeys_love_triangular_factor_object_high_one.includes('passion')) {
            love_triangular_final_group = 'infatuous'
        } else if (sortedKeys_love_triangular_factor_object_high_one.includes('commitment')) {
            love_triangular_final_group = 'empty'
        }
    } else if (love_triangular_factor_group_object_value_l_count == 3) {
        love_triangular_final_group = 'non_love';
    }

    if (love_triangular_final_group == 'consummate') {
        love_triangularCategory.textContent = "完整的愛";
        love_triangularDescription.innerHTML = "<p>兩人之間充滿激情、親密和承諾。這是大部分人追求的理想愛情境界。</p>";
    } else if (love_triangular_final_group == 'companionate') {
        love_triangularCategory.textContent = "伴侶之愛";
        love_triangularDescription.innerHTML = "<p>雖沒有激情，兩人之間維持親密和承諾。俗語所謂老夫老妻，肉體的滿足不再是關係的重要元素。</p>";
    } else if (love_triangular_final_group == 'fatuous') {
        love_triangularCategory.textContent = "愚愛";
        love_triangularDescription.innerHTML = "<p>兩人之間雖有激情和承諾，但承諾只建基在激情之上。因為沒有親密的交流，兩人的關係十分不穩定，時好時壞。</p>";
    } else if (love_triangular_final_group == 'romantic') {
        love_triangularCategory.textContent = "浪漫之愛";
        love_triangularDescription.innerHTML = "<p>兩人之間充滿激情和親密，但卻沒有建立彼此的承諾。因為沒有承諾，浪漫之愛很容易結束。</p>";
    } else if (love_triangular_final_group == 'friend') {
        love_triangularCategory.textContent = "喜歡";
        love_triangularDescription.innerHTML = "<p>兩人之間有親密，但沒有激情或承諾的交流。這是真摯友誼的特色，彼此感到默契和親切。</p>";
    } else if (love_triangular_final_group == 'empty') {
        love_triangularCategory.textContent = "空愛";
        love_triangularDescription.innerHTML = "<p>兩人之間維持彼此的承諾，但卻沒有了激情和親密。在婚姻裏，可稱為情感上的離婚。</p>";
    } else if (love_triangular_final_group == 'infatuous') {
        love_triangularCategory.textContent = "迷戀";
        love_triangularDescription.innerHTML = "<p>兩人之間只有激情，沒有親密或承諾。俗語所謂一見鍾情，因為沒有親密或承諾，迷戀式的愛情可以在剎那間消失。</p>";
    } else if (love_triangular_final_group == 'non_love') {
        love_triangularCategory.textContent = "無愛";
        love_triangularDescription.innerHTML = "<p>兩人之間沒有愛情。激情、親密和承諾任何一個元素都不存在。</p>";
    }

    document.getElementById('love_triangularQuestionDiv').style.display = 'none';
    document.getElementById('love_triangularResultDiv').style.display = '';
    document.querySelector('h1').innerText = '你的「感情狀況」';
    document.title = '你的「感情狀況」 | Re:Fresh線上精神健康自助平台';

    //new
    var data = [{
        type: 'scatterpolar',
        r: [love_triangular_intimacy, love_triangular_passion, love_triangular_commitment, love_triangular_intimacy],
        theta: ['親密', '激情', '承諾', '親密'],
        fill: 'toself'
    },
    {
        type: 'scatterpolar',
        mode: 'lines',
        r: [20, 20, 20, 20],
        theta: ['親密', '激情', '承諾', '親密'],
        line: { color: 'grey' }
    }]

    var layout = {
        margin: { b: 30, t: 30, r: 70, l: 70, pad: 0 }, font: {
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
                range: [0, 20]
            }
        },
        showlegend: false,
        hovermode: false,
        height: 300
    }
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    //document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })

    //old


    document.querySelector('.fixed.bottom-0.right-4').querySelector('button').click()

    html2canvas(document.querySelector('#save_result'), {
        backgroundColor: null,
        onclone: function (document) {
            document.querySelector("#save_result_logo").style.display = 'flex';
            //document.querySelector("#save_result_header").style.display = '';
            //document.querySelector("#love_triangular_category_description_div").style.borderBottomRightRadius = '0px';
            //document.querySelector("#love_triangular_category_description_div").style.borderBottomLeftRadius = '0px';
            document.querySelector("#love_triangular_footer").style.display = '';
        }
    }).then(function (canvas) {
        canvas_element = canvas;
    })
})
document.querySelector('#save_div').addEventListener('click', function () {
    var img = canvas_element.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = 'love_triangular_result.png';
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
