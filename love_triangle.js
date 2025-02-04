var number_question = 16;
var name_question = "love_triangular";

document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector(`#${name_question}IntroDiv`).style.display = "none";
  document.querySelector(`#${name_question}QuestionDiv`).style.display = "";
  document.querySelector("h1").style.display = "none";
  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
});
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= (number_question - 1); i++) {
  var targetId = `#${name_question}_` + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

//var scs_1_next_button = document.getElementById(`${name_question}_1_next_button`);
var first_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: `#${name_question}_1_block`,
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById(`${name_question}_1_block`).style.display = "none";
        document.getElementById(`${name_question}_2_block`).style.display = "";
      },
    })
    .add(
      {
        targets: `#${name_question}_2_block`,
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll(`input[name=${name_question}_0]`),
  function (e) {
    e.addEventListener("click", first_next_function);
    e.addEventListener("click", function () {
      document.getElementById(`${name_question}_1_next_button`).addEventListener("click", first_next_function);
      document.getElementById(`${name_question}_1_next_button`).style.opacity = 1;
    });
  }
);

// Common function for handling previous and next buttons
function handlePreviousButton(previousblockId, currentBlockId) {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#" + currentBlockId + "_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.querySelector("#" + currentBlockId + "_block").style.display =
          "none";
        document.querySelector("#" + previousblockId + "_block").style.display =
          "";
      },
    })
    .add(
      {
        targets: "#" + previousblockId + "_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
}

function handleNextButton(currentBlockId, nextBlockId) {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#" + currentBlockId + "_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.querySelector("#" + currentBlockId + "_block").style.display =
          "none";
        document.querySelector("#" + nextBlockId + "_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#" + nextBlockId + "_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
}

function AddFunctionListener(previousblockId, currentBlockId, nextBlockId) {
  document
    .getElementById(currentBlockId + "_previous_button")
    .addEventListener("click", function () {
      handlePreviousButton(previousblockId, currentBlockId);
    });
  Array.prototype.map.call(
    document.querySelectorAll("input[name=" + previousblockId + "]"),
    function (e) {
      e.addEventListener("click", function () {
        handleNextButton(currentBlockId, nextBlockId);
      });
      e.addEventListener("click", function () {
        document
          .getElementById(currentBlockId + "_next_button")
          .addEventListener("click", function () {
            handleNextButton(currentBlockId, nextBlockId);
          });
        document.getElementById(
          currentBlockId + "_next_button"
        ).style.opacity = 1;
      });
    }
  );
}

for (var i = 1; i <= (number_question - 2); i++) {
  AddFunctionListener(`${name_question}_${i}`, `${name_question}_${i + 1}`, `${name_question}_${i + 2}`);
}

//##last
document
  .getElementById(`${name_question}_${number_question}_previous_button`)
  .addEventListener("click", function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: `#${name_question}_${number_question - 1}_block`,
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
          document.getElementById(
            `${name_question}_${number_question - 1}_block`
          ).style.display = "";
          document.getElementById(
            `${name_question}_${number_question}_block`
          ).style.display = "none";
        },
      })
      .add(
        {
          targets: `#${name_question}_${number_question - 1}_block`,
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  });

document
  .getElementById(`${name_question}_${number_question}_next_button`)
  .addEventListener("click", function () {
    swal
      .fire({
        text: "確定提交嗎？",
        showCloseButton: true,
        cancelButtonText: "取消",
        showCancelButton: true,
        confirmButtonText: "確定",
        customClass: {
          confirmButton: "btnRound-thin btnRound-orange mx-2",
          cancelButton: "btnRound-thin btnRound-green mx-2",
        },
        buttonsStyling: false,
        focusConfirm: false,
      })
      .then(function (result) {
        if (result.isConfirmed) {
          document.querySelector("input[value=查看測試結果]").click();
        }
      });
  });

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement("canvas");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;

var uid_textbox = document.getElementById("uid");
var member_level_textbox = document.getElementById("member_level");
var eap_company_textbox = document.getElementById("eap_company");
var complete_time_textbox = document.getElementById("complete_time");

if (uid_textbox.value) {
  console.log("input uid value already");
} else {
  uid_textbox.value = Math.random();
}
if (drupalSettings.user.levels === undefined) {
  member_level_textbox.value = 0;
} else {
  member_level_textbox.value = drupalSettings.user.levels[0];
}
if (drupalSettings.user.eap === undefined) {
  eap_company_textbox.value = "0";
} else {
  eap_company_textbox.value = drupalSettings.user.eap.label;
}

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

var d = new Date();
var dformat =
  [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join(
    "-"
  ) +
  " " +
  [
    d.getHours().padLeft(),
    d.getMinutes().padLeft(),
    d.getSeconds().padLeft(),
  ].join(":");

complete_time_textbox.value = dformat;

var activity_name_textbox = document.getElementById("activity_name");
var urlParamsActivity = new URLSearchParams(window.location.search).get(
  "activity_name"
);

if (urlParamsActivity) {
  activity_name_textbox.value = new URLSearchParams(window.location.search).get(
    "activity_name"
  );
} else {
  activity_name_textbox.value = "NA_public";
}

var worker_textbox = document.getElementById("worker");
worker_textbox.value = new URLSearchParams(window.location.search).get(
  "worker"
);

var subscription_textbox = document.getElementById("subscription");
subscription_textbox.value =
  drupalSettings.user.subscription.expire_subscription;

var form = document.getElementById(`form_${name_question}`);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var love_triangular_object = {};

  // Define the scores that need to be subtracted from 4
  //const inverseScores = [1, 2];
  // Initial sum
  //var question_sum = 0;

  //score
    // Iterate over the score keys
    for (var i = 0; i <= (number_question - 2); i++) {
      love_triangular_object[`${name_question}_${i}_score`] = parseInt(
        document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
      // Check if the score should be subtracted from 4
      //if (inverseScores.includes(i)) {
      //  question_sum += 4 - itemScore;
      //} else {
        //question_sum += itemScore;
      //}
    }

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

  var category = document.getElementById(`${name_question}Category`);
  var description = document.getElementById(`${name_question}Description`);

    if (love_triangular_final_group == 'consummate') {
        category.textContent = "完整的愛";
        description.textContent = "兩人之間充滿激情、親密和承諾。這是大部分人追求的理想愛情境界。";
    } else if (love_triangular_final_group == 'companionate') {
        category.textContent = "伴侶之愛";
        description.textContent = "雖沒有激情，兩人之間維持親密和承諾。俗語所謂老夫老妻，肉體的滿足不再是關係的重要元素。";
    } else if (love_triangular_final_group == 'fatuous') {
        category.textContent = "愚愛";
        description.textContent = "兩人之間雖有激情和承諾，但承諾只建基在激情之上。因為沒有親密的交流，兩人的關係十分不穩定，時好時壞。";
    } else if (love_triangular_final_group == 'romantic') {
        category.textContent = "浪漫之愛";
        description.textContent = "兩人之間充滿激情和親密，但卻沒有建立彼此的承諾。因為沒有承諾，浪漫之愛很容易結束。";
    } else if (love_triangular_final_group == 'friend') {
        category.textContent = "喜歡";
        description.textContent = "兩人之間有親密，但沒有激情或承諾的交流。這是真摯友誼的特色，彼此感到默契和親切。";
    } else if (love_triangular_final_group == 'empty') {
        category.textContent = "空愛";
        description.textContent = "兩人之間維持彼此的承諾，但卻沒有了激情和親密。在婚姻裏，可稱為情感上的離婚。";
    } else if (love_triangular_final_group == 'infatuous') {
        category.textContent = "迷戀";
        description.textContent = "兩人之間只有激情，沒有親密或承諾。俗語所謂一見鍾情，因為沒有親密或承諾，迷戀式的愛情可以在剎那間消失。";
    } else if (love_triangular_final_group == 'non_love') {
        category.textContent = "無愛";
        description.textContent = "兩人之間沒有愛情。激情、親密和承諾任何一個元素都不存在。";
    }

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent =
      document.getElementById("user_name_manual").value;
  }

  var category = document.getElementById(`${name_question}Category`);
  var description = document.getElementById(`${name_question}Description`);

  //if (question_sum <= 50) {
  //  category.textContent = "情緒困擾";
  //  description.textContent =
  //    "你可能有情緒困擾，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受。除了放鬆心情之外，我們建議你可以考慮輔導服務，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
  //    color = "#EB4841";
  //} else {
  //  category.textContent = "非常幸福";
  //  description.textContent =
  //    "恭喜，你非常幸福啊，真好！";
  //    color = "#4EC04E";
  //}

  document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
  document.getElementById(`${name_question}ResultDiv`).style.display = "";
  document.querySelector("h1").style.display = "";

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
    margin: { b: 0, t: 30, r: 100, l: 100, pad: 0 }, font: {
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

  var config = { responsive: true, displaylogo: false, displayModeBar: false };
  Plotly.newPlot("myDiv", data, layout, config);

  //document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })

  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();

  //var html2canvas_count = 0;
  if (document.getElementById("img_div_content_id")) {
    console.log("do not create html2canvas");
  } else {
    setTimeout(function () {
      html2canvas(document.querySelector("#save_result")).then(function (
        canvas
      ) {
        canvas_element = canvas;
        var img_png = canvas_element.toDataURL("image/png");
        var img_div = document.createElement("div");
        var img_div_content = document.createElement("img");
        img_div_content.id = "img_div_content_id";
        var base64_svg = document.getElementById("base64_svg");
        img_div.style = "display: flex; justify-content: center;";
        img_div.appendChild(img_div_content);
        img_div_content.src = img_png;
        base64_svg.value = img_png;
        document
          .getElementById("svg_div")
          .insertBefore(
            img_div,
            document.getElementById("save_div").parentNode
          );
        document.querySelector("#save_result").style.display = "none";
        document.querySelector("#svg_div").style.display = "";
        //html2canvas_count = 1;
        var data = new FormData(form);
        var action = e.target.action;
        fetch(action, {
          method: "POST",
          body: data,
        });
        e.preventDefault();
      });
    }, 1000);
  }
  console.log("create html2canvas");
});

document
  .querySelector("#share_div")
  .setAttribute("data-clipboard-text", window.location.href);

document.querySelector("#share_div").addEventListener("click", function () {
  var shareData = {
    url:
      document.location.origin +
      document.location.pathname +
      "?utm_source=website&utm_medium=referral",
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
