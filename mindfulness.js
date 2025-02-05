var number_question = 16;
var name_question = "maas";
var max_item_score = 5
var total_score = (number_question - 1) * max_item_score;
var scale_name = "靜觀覺察";

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

  // Define the scores that need to be subtracted from 4
  //const inverseScores = [3, 4, 5];
  // Initial sum
  var question_sum = 0;

  //score
    // Iterate over the score keys
    for (var i = 0; i <= (number_question - 2); i++) {
      var itemScore = parseInt(
        document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
      // Check if the score should be subtracted from 4
      //if (inverseScores.includes(i)) {
        question_sum += 5 - itemScore;
      //} else {
      //  question_sum += itemScore;
      //}
    }

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent =
      document.getElementById("user_name_manual").value;
  }

  var category = document.getElementById(`${name_question}Category`);
  var description = document.getElementById(`${name_question}Description`);

  if (question_sum <= 19) {
    category.textContent = "靜心種子";
    description.textContent =
      "親愛的，您的靜觀覺察如靜心種子，等待萌芽。也許您感到思緒紛亂，覺察尚待滋養。溫柔呵護靜心種子，積極培養靜觀，尋求溫暖支持，溫柔照顧自己，靜待靜心種子破土，綻放美好。這是一個充滿潛力的開始，請耐心溫柔，相信種子終將成長。";
      color = "#D7CCC8";
  } else if (question_sum <= 38) {
    category.textContent = "靜心啟航";
    description.textContent =
      "沒關係的，我們一起溫柔地探索靜觀，您的靜觀覺察正處靜心啟航階段。您準備開啟靜心之旅，初期或有摸索，思緒偶起伏。溫柔鼓勵自己，邁出啟航第一步，嘗試靜觀練習，溫柔地將注意力帶回當下。這是一個充滿希望的起點，請相信靜心將帶來平靜與力量。";
      color = "#FFE0B2";
  } else if (question_sum <= 57) {
    category.textContent = "靜心之翼";
    description.textContent =
      "很棒的開始！您的靜觀覺察正如靜心之翼，逐漸豐滿，準備輕盈飛翔。您已具備一定覺察力，專注力穩步提升。溫柔滋養靜心之翼，透過練習，讓它帶領您輕盈飛向更自在的生命旅程。請給予自己鼓勵與耐心，感受成長的美好。";
      color = "#C8E6C9";
  } else {
    category.textContent = "澄心之境";
    description.textContent =
      "真棒！您的得分顯示您已達澄心之境，內心清澈寧靜。您擁有高度靜觀覺察，溫柔覺察當下，享受平穩情緒與幸福感。請為自己喝采！讓靜觀之光照亮您每一天。";
      color = "#E0F7FA";
  }

  document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
  document.getElementById(`${name_question}ResultDiv`).style.display = "";
  document.querySelector("h1").style.display = "";

  //new
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: question_sum,
      title: { text: scale_name },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, total_score], tickvals: [0, total_score/2, total_score] },
        bar: { color: color, thickness: 1 },
        bgcolor: "white",
      },
    },
  ];

  var layout = {
    margin: { l: 35, r: 35, b: 10, t: 80, pad: 0 },
    height: 200,
    autosize: true,
    font: {
      family: "Arial, sans-serif",
    },
  };

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
