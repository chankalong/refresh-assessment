var number_question = 51;
var name_question = "big_five";

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
  //const inverseScores = [0, 3, 7, 8, 10, 11];
  // Initial sum
  //var question_sum = 0;
  var big_five_object = {};

  //score
    // Iterate over the score keys
    for (var i = 0; i <= (number_question - 2); i++) {
      big_five_object[`"${name_question}_${i}"`] = parseInt(
        document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
      // Check if the score should be subtracted from 4
      //if (inverseScores.includes(i)) {
      //  question_sum += 4 - itemScore;
      //} else {
        //question_sum += itemScore;
      //}
    }

    var big_five_extraversion = (20 + big_five_object['big_five_0_score'] - big_five_object['big_five_5_score'] + big_five_object['big_five_10_score'] - big_five_object['big_five_15_score'] + big_five_object['big_five_20_score'] - big_five_object['big_five_25_score'] + big_five_object['big_five_30_score'] - big_five_object['big_five_35_score'] + big_five_object['big_five_40_score'] - big_five_object['big_five_45_score']) / 10;
    var big_five_agreeableness = (14 - big_five_object['big_five_1_score'] + big_five_object['big_five_6_score'] - big_five_object['big_five_11_score'] + big_five_object['big_five_16_score'] - big_five_object['big_five_21_score'] + big_five_object['big_five_26_score'] - big_five_object['big_five_31_score'] + big_five_object['big_five_36_score'] + big_five_object['big_five_41_score'] + big_five_object['big_five_46_score']) / 10;
    var big_five_conscientiousness = (14 + big_five_object['big_five_2_score'] - big_five_object['big_five_7_score'] + big_five_object['big_five_12_score'] - big_five_object['big_five_17_score'] + big_five_object['big_five_22_score'] - big_five_object['big_five_27_score'] + big_five_object['big_five_32_score'] - big_five_object['big_five_37_score'] + big_five_object['big_five_42_score'] + big_five_object['big_five_47_score']) / 10;
    var big_five_neuroticism = (38 - big_five_object['big_five_3_score'] + big_five_object['big_five_8_score'] - big_five_object['big_five_13_score'] + big_five_object['big_five_18_score'] - big_five_object['big_five_23_score'] - big_five_object['big_five_28_score'] - big_five_object['big_five_33_score'] - big_five_object['big_five_38_score'] - big_five_object['big_five_43_score'] - big_five_object['big_five_48_score']) / 10;
    var big_five_openness = (8 + big_five_object['big_five_4_score'] - big_five_object['big_five_9_score'] + big_five_object['big_five_14_score'] - big_five_object['big_five_19_score'] + big_five_object['big_five_24_score'] - big_five_object['big_five_29_score'] + big_five_object['big_five_34_score'] + big_five_object['big_five_39_score'] + big_five_object['big_five_44_score'] + big_five_object['big_five_49_score']) / 10;



    var big_five_factor_object = { "big_five_extraversion": big_five_extraversion, "big_five_agreeableness": big_five_agreeableness, "big_five_conscientiousness": big_five_conscientiousness, "big_five_neuroticism": big_five_neuroticism, "big_five_openness": big_five_openness };
    var sortedKeys_big_five_factor_object = Object.keys(big_five_factor_object).sort(function (a, b) {
        return big_five_factor_object[b] - big_five_factor_object[a];
    });
    //var sortedKeys_big_five_factor_object_high_two = sortedKeys_big_five_factor_object[0] + sortedKeys_big_five_factor_object[1]
    //var sortedKeys_big_five_factor_object_high_one = sortedKeys_big_five_factor_object[0]

      const resultBgSources = {
        big_five_extraversion_big_five_agreeableness: "url('/sites/default/files/inpages/assessment/big-five/ea.png')",
big_five_extraversion_big_five_conscientiousness: "url('/sites/default/files/inpages/assessment/big-five/ec.png')",
big_five_extraversion_big_five_neuroticism: "url('/sites/default/files/inpages/assessment/big-five/en.png')",
big_five_extraversion_big_five_openness: "url('/sites/default/files/inpages/assessment/big-five/eo.png')",
big_five_agreeableness_big_five_extraversion: "url('/sites/default/files/inpages/assessment/big-five/ae.png')",
big_five_agreeableness_big_five_conscientiousness: "url('/sites/default/files/inpages/assessment/big-five/ac.png')",
big_five_agreeableness_big_five_neuroticism: "url('/sites/default/files/inpages/assessment/big-five/an.png')",
big_five_agreeableness_big_five_openness: "url('/sites/default/files/inpages/assessment/big-five/ao.png')",
big_five_conscientiousness_big_five_extraversion: "url('/sites/default/files/inpages/assessment/big-five/ce.png')",
big_five_conscientiousness_big_five_agreeableness: "url('/sites/default/files/inpages/assessment/big-five/ca.png')",
big_five_conscientiousness_big_five_neuroticism: "url('/sites/default/files/inpages/assessment/big-five/cn.png')",
big_five_conscientiousness_big_five_openness: "url('/sites/default/files/inpages/assessment/big-five/co.png')",
big_five_neuroticism_big_five_extraversion: "url('/sites/default/files/inpages/assessment/big-five/ne.png')",
big_five_neuroticism_big_five_agreeableness: "url('/sites/default/files/inpages/assessment/big-five/na.png')",
big_five_neuroticism_big_five_conscientiousness: "url('/sites/default/files/inpages/assessment/big-five/nc.png')",
big_five_neuroticism_big_five_openness: "url('/sites/default/files/inpages/assessment/big-five/no.png')",
big_five_openness_big_five_extraversion: "url('/sites/default/files/inpages/assessment/big-five/oe.png')",
big_five_openness_big_five_agreeableness: "url('/sites/default/files/inpages/assessment/big-five/oa.png')",
big_five_openness_big_five_conscientiousness: "url('/sites/default/files/inpages/assessment/big-five/oc.png')",
big_five_openness_big_five_neuroticism: "url('/sites/default/files/inpages/assessment/big-five/on.png')",
default: ""
      };
      
      const resultDiv = document.getElementById("save_result");
      const trait = sortedKeys_big_five_factor_object[0];
      const trait_high_low = sortedKeys_big_five_factor_object[0]+ "_"+sortedKeys_big_five_factor_object[4];
      resultDiv.style.backgroundImage = resultBgSources[trait_high_low] || resultBgSources["default"];
      resultDiv.style.backgroundSize = "cover";

      const divColor = {
        "big_five_extraversion": "#EFEBDE",
        "big_five_agreeableness": "#FFEEC7",
        "big_five_conscientiousness": "#D5ECF4",
        "big_five_neuroticism": "#C3F6E9",
        "default": "#FFD7D7"
      };

      const plotFillColor = {
        "big_five_extraversion": "rgba(155, 147, 121, 0.8)",
        "big_five_agreeableness": "rgba(216, 166, 51, 0.8)",
        "big_five_conscientiousness": "rgba(105, 193, 224, 0.8)",
        "big_five_neuroticism": "rgba(35, 215, 168, 0.8)",
        "default": "rgba(247, 122, 121, 0.8)"
      };

      const plotTextColor = {
        "big_five_extraversion": "#9B9379",
        "big_five_agreeableness": "#D8A633",
        "big_five_conscientiousness": "#69C1E0",
        "big_five_neuroticism": "#23D7A8",
        "default": "#F77A79"
      };
      
      const big_FillColor = plotFillColor[trait] || plotFillColor["default"];
      const big_TextColor = plotTextColor[trait] || plotTextColor["default"];

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent =
      document.getElementById("user_name_manual").value;
  }

  var category = document.getElementById(`${name_question}Category`);
  var description = document.getElementById(`${name_question}Description`);

  //if (question_sum < 17) {
  //  category.textContent = "內向型";
  //  description.textContent =
  //    "你偏向安靜低調，大部份時間喜歡獨處，以免被社交活動耗費大量精力。不過，你並非拒絕與人接觸，只是更著重個人空間，享受專注地思考，並以獨處來恢復精神及平靜。";
  //    color = "#8EACCD";
  //    ieUrl = "/sites/default/files/inpages/post%201.3%20內向vs外向人休息方法大不同_v2_cms_アートボード%201_0.png"
  //} else {
  //  category.textContent = "外向型";
  //  description.textContent =
  //    "你熱衷於人際交往，喜歡說話及參與社交聚會。比起獨處，你更傾向與他人共處，融入所在的環境，並從身邊的人事物及反應汲取能量，變得精力充沛。當你獨處時，反而會感到無聊及失去動力。";
  //    color = "#FFB0B0";
  //    ieUrl = "/sites/default/files/inpages/post%201.2%20內向vs外向人休息方法大不同_v3_cms_アートボード%201.png"
  //}

  document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
  document.getElementById(`${name_question}ResultDiv`).style.display = "";
  document.querySelector("h1").style.display = "";
  document.querySelector('img.ie_result_image').src = ieUrl;

  //new
  var data = [
    {
      type: "scatterpolar",
      mode: "lines",
      r: [3, 3, 3, 3, 3, 3],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [2, 2, 2, 2, 2, 2],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [1, 1, 1, 1, 1, 1],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [4, 4, 0, 0, 0, 0],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 4, 4, 0, 0, 0],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 4, 4, 0, 0],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 4, 4, 0],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [8, 0, 0, 0, 4, 4],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      line: { color: "black", width: 1 },
    },
    {
      type: "scatterpolar",
      r: [
          big_five_extraversion,big_five_agreeableness,big_five_conscientiousness,big_five_neuroticism,big_five_openness,big_five_extraversion
      ],
      theta: [
        "外向特質",
        "親和<br>特質",
        "盡責特質",
        "情緒敏感度",
        "好奇<br>特質",
        "外向特質",
      ],
      fill: "toself",
      fillcolor: big_FillColor,
      line: { color: big_FillColor },
      mode: "none",
    },
  ];

  var layout = {
    margin: { b: 35, t: 45, r: 25, l: 25, pad: 0 },
    font: {
      family: "'Noto Sans HK', Arial, sans-serif",
      size: 16,
    },
    polar: {
      bgcolor: "rgba(0,0,0,0)",
      angularaxis: {
        color: "transparent",
        gridcolor: "black",
        tickfont: { color: big_TextColor, weight: "bold" },
        rotation: 90,
      },
      radialaxis: {
        visible: false,
        range: [0, 4],
      },
    },
    showlegend: false,
    hovermode: false,
    height: 280,
    width: 290,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };
  var config = {
    responsive: true,
    displaylogo: false,
    displayModeBar: false,
  };
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
