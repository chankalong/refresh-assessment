var number_question = 19;
var name_question = "emotional_blackmail";

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

  var emotional_blackmail_object = {};

    for (var i = 0; i <= 17; i++) {
        var inputName = 'emotional_blackmail_' + i;
        emotional_blackmail_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

  // Define the scores that need to be subtracted from 4
  //const inverseScores = [3, 4, 5];
  // Initial sum
  //var question_sum = 0;

  //score
    // Iterate over the score keys
    //for (var i = 0; i <= (number_question - 2); i++) {
      //var itemScore = parseInt(
        //document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
      // Check if the score should be subtracted from 4
      //if (inverseScores.includes(i)) {
        //question_sum += 4 - itemScore;
      //} else {
        //question_sum += itemScore;
      //}
    //}

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent =
      document.getElementById("user_name_manual").value;
  }

  var category = document.getElementById(`${name_question}Category`);
  var description = document.getElementById(`${name_question}Description`);

  var emotional_blackmail_fear = emotional_blackmail_object['emotional_blackmail_0_score'] + emotional_blackmail_object['emotional_blackmail_1_score'] + emotional_blackmail_object['emotional_blackmail_2_score'] + emotional_blackmail_object['emotional_blackmail_3_score'] + emotional_blackmail_object['emotional_blackmail_4_score'] + emotional_blackmail_object['emotional_blackmail_5_score'] + 6;
    var emotional_blackmail_guilt = emotional_blackmail_object['emotional_blackmail_6_score'] + emotional_blackmail_object['emotional_blackmail_7_score'] + emotional_blackmail_object['emotional_blackmail_8_score'] + emotional_blackmail_object['emotional_blackmail_9_score'] + emotional_blackmail_object['emotional_blackmail_10_score'] + emotional_blackmail_object['emotional_blackmail_11_score'] + 6;
    var emotional_blackmail_obligate = emotional_blackmail_object['emotional_blackmail_12_score'] + emotional_blackmail_object['emotional_blackmail_13_score'] + emotional_blackmail_object['emotional_blackmail_14_score'] + emotional_blackmail_object['emotional_blackmail_15_score'] + emotional_blackmail_object['emotional_blackmail_16_score'] + emotional_blackmail_object['emotional_blackmail_17_score'] + 6;

    if (emotional_blackmail_fear > 10 || emotional_blackmail_guilt > 10 || emotional_blackmail_obligate > 10) {
      category.textContent = "被人情緒勒索";
      description.textContent = "你可能開始被人情緒勒索，為了自己的情緒健康著想，可參考以下由英國公營醫療服務（NHS）認可的資訊網站BPDFamily.com提出的建議，5個步驟助你走出情緒勒索。";
    } else {
      category.textContent = "較少被人情緒勒索";
      description.textContent = "你較少被人情緒勒索，如果你察覺到有人被人情緒勒索，你可參考以下由英國公營醫療服務（NHS）認可的資訊網站BPDFamily.com提出的建議，5個步驟助他走出情緒勒索。";
    }

  //if (question_sum <= 8) {
  //  category.textContent = "心理韌性程度低";
  //  description.textContent =
  //    "你的心理韌性程度低，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受。除了放鬆心情之外，我們建議你可以考慮輔導服務，我們很樂意為你提供一對一免費線上諮詢服務，讓你進一步了解自己的狀況。";
  //    color = "#F48847";
  //} else if (question_sum <= 16) {
  //  category.textContent = "心理韌性程度中";
  //  description.textContent =
  //    "你的心理韌性程度中，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
  //    color = "#FFC84A";
  //} else {
  //  category.textContent = "心理韌性程度高";
  //  description.textContent =
  //    "你的情緒很健康啊，真好！";
  //    color = "#4EC04E";
  //}

  document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
  document.getElementById(`${name_question}ResultDiv`).style.display = "";
  document.querySelector("h1").style.display = "";


  var data = [{
    type: 'scatterpolar',
    r: [emotional_blackmail_fear, emotional_blackmail_guilt, emotional_blackmail_obligate, emotional_blackmail_fear],
    theta: ['恐懼', '內疚', '義務', '恐懼'],
    fill: 'toself'
},
{
    type: 'scatterpolar',
    mode: 'lines',
    r: [30, 30, 30, 30],
    theta: ['恐懼', '內疚', '義務', '恐懼'],
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
            range: [0, 30]
        }
    },
    showlegend: false,
    hovermode: false,
    height: 300
}

  //new
  //var data = [
  //  {
  //    domain: { x: [0, 1], y: [0, 1] },
  //    value: question_sum,
  //    title: { text: "心理韌性" },
  //    type: "indicator",
  //    mode: "gauge+number",
  //    gauge: {
  //      axis: { range: [0, 24], tickvals: [0, 12, 24] },
  //      bar: { color: color, thickness: 1 },
  //      bgcolor: "white",
  //    },
  //  },
  //];

  //var layout = {
  //  margin: { l: 35, r: 35, b: 10, t: 80, pad: 0 },
  //  height: 200,
  //  autosize: true,
  //  font: {
  //    family: "Arial, sans-serif",
  //  },
  //};

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
