document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector("#enneagramIntroDiv").style.display = "none";
  document.querySelector("#enneagramQuestionDiv").style.display = "";
  document.querySelector("h1").style.display = "none";
  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
});
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= 36; i++) {
  var targetId = "#enneagram_" + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

var enneagram_1_next_button = document.getElementById(
  "enneagram_1_next_button"
);
var enneagram_1_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#enneagram_1_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById("enneagram_1_block").style.display = "none";
        document.getElementById("enneagram_2_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#enneagram_2_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll("input[name=enneagram_0]"),
  function (e) {
    e.addEventListener("click", enneagram_1_next_function);
    e.addEventListener("click", function () {
      enneagram_1_next_button.addEventListener(
        "click",
        enneagram_1_next_function
      );
      enneagram_1_next_button.style.opacity = 1;
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

for (var i = 1; i <= 35; i++) {
  AddFunctionListener(
    "enneagram_" + i,
    "enneagram_" + (i + 1),
    "enneagram_" + (i + 2)
  );
}

//##last

var enneagram_37_previous_button = document.getElementById(
  "enneagram_37_previous_button"
);
enneagram_37_previous_button.addEventListener("click", function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#enneagram_36_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.getElementById("enneagram_36_block").style.display = "";
        document.getElementById("enneagram_37_block").style.display = "none";
      },
    })
    .add(
      {
        targets: "#enneagram_36_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
});

var enneagram_37_next_button = document.getElementById(
  "enneagram_37_next_button"
);
var enneagram_37_next_function = function () {
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
};
enneagram_37_next_button.addEventListener("click", enneagram_37_next_function);

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
subscription_textbox.value = drupalSettings.user.subscription.expire_subscription;

var form = document.getElementById("form_enneagram");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var enneagram_object = {};

  for (var i = 0; i <= 35; i++) {
    var inputName = "enneagram_" + i;
    enneagram_object[inputName + "_score"] = parseInt(
      document.querySelector('input[name="' + inputName + '"]:checked').value
    );
  }

  function hasNull(element, index, array) {
    return element === null;
  }

  if (Object.values(enneagram_object).some(hasNull)) {
    return; //stop the execution of function
  }

  //if (document.getElementById("user_name_manual").value == "") {
  //  console.log("no name");
  //} else {
  //  participantName.textContent =
  //    document.getElementById("user_name_manual").value;
  //}

  //score
  var enneagram_type_1 =
    enneagram_object["enneagram_0_score"] +
    enneagram_object["enneagram_9_score"] +
    enneagram_object["enneagram_18_score"] +
    enneagram_object["enneagram_27_score"];
  var enneagram_type_2 =
    enneagram_object["enneagram_1_score"] +
    enneagram_object["enneagram_10_score"] +
    enneagram_object["enneagram_19_score"] +
    enneagram_object["enneagram_28_score"];
  var enneagram_type_3 =
    enneagram_object["enneagram_2_score"] +
    enneagram_object["enneagram_11_score"] +
    enneagram_object["enneagram_20_score"] +
    enneagram_object["enneagram_29_score"];
  var enneagram_type_4 =
    enneagram_object["enneagram_3_score"] +
    enneagram_object["enneagram_12_score"] +
    enneagram_object["enneagram_21_score"] +
    enneagram_object["enneagram_30_score"];
  var enneagram_type_5 =
    enneagram_object["enneagram_4_score"] +
    enneagram_object["enneagram_13_score"] +
    enneagram_object["enneagram_22_score"] +
    enneagram_object["enneagram_31_score"];
  var enneagram_type_6 =
    enneagram_object["enneagram_5_score"] +
    enneagram_object["enneagram_14_score"] +
    enneagram_object["enneagram_23_score"] +
    enneagram_object["enneagram_32_score"];
  var enneagram_type_7 =
    enneagram_object["enneagram_6_score"] +
    enneagram_object["enneagram_15_score"] +
    enneagram_object["enneagram_24_score"] +
    enneagram_object["enneagram_33_score"];
  var enneagram_type_8 =
    enneagram_object["enneagram_7_score"] +
    enneagram_object["enneagram_16_score"] +
    enneagram_object["enneagram_25_score"] +
    enneagram_object["enneagram_34_score"];
  var enneagram_type_9 =
    enneagram_object["enneagram_8_score"] +
    enneagram_object["enneagram_17_score"] +
    enneagram_object["enneagram_26_score"] +
    enneagram_object["enneagram_35_score"];

  var enneagram_factor_object = {
    enneagram_type_1: enneagram_type_1,
    enneagram_type_2: enneagram_type_2,
    enneagram_type_3: enneagram_type_3,
    enneagram_type_4: enneagram_type_4,
    enneagram_type_5: enneagram_type_5,
    enneagram_type_6: enneagram_type_6,
    enneagram_type_7: enneagram_type_7,
    enneagram_type_8: enneagram_type_8,
    enneagram_type_9: enneagram_type_9,
  };
  var sortedKeys_enneagram_factor_object = Object.keys(
    enneagram_factor_object
  ).sort(function (a, b) {
    return enneagram_factor_object[b] - enneagram_factor_object[a];
  });

  const resultBgSources = {
    enneagram_type_1:
      "url('/sites/default/files/inpages/assessment/enneagram/1.png')",
    enneagram_type_2:
      "url('/sites/default/files/inpages/assessment/enneagram/2.png')",
    enneagram_type_3:
      "url('/sites/default/files/inpages/assessment/enneagram/3.png')",
    enneagram_type_4:
      "url('/sites/default/files/inpages/assessment/enneagram/4.png')",
    enneagram_type_5:
      "url('/sites/default/files/inpages/assessment/enneagram/5.png')",
    enneagram_type_6:
      "url('/sites/default/files/inpages/assessment/enneagram/6.png')",
    enneagram_type_7:
      "url('/sites/default/files/inpages/assessment/enneagram/7.png')",
    enneagram_type_8:
      "url('/sites/default/files/inpages/assessment/enneagram/8.png')",
    enneagram_type_9:
      "url('/sites/default/files/inpages/assessment/enneagram/9.png')",
    default: "",
  };

  const resultDiv = document.getElementById("save_result");
  const trait = sortedKeys_enneagram_factor_object[0];
  resultDiv.style.backgroundImage =
    resultBgSources[trait] || resultBgSources["default"];
  resultDiv.style.backgroundSize = "cover";
  //resultDiv.src = resultBgSources[trait] || resultBgSources["default"];

  const plotFillColor = {
    enneagram_type_1: "rgba(198, 137, 120, 0.8)",
    enneagram_type_2: "rgba(193, 131, 88, 0.8)",
    enneagram_type_3: "rgba(214, 163, 44, 0.8)",
    enneagram_type_4: "rgba(108, 132, 112, 0.8)",
    enneagram_type_5: "rgba(109, 149, 153, 0.8)",
    enneagram_type_6: "rgba(94, 140, 162, 0.8)",
    enneagram_type_7: "rgba(137, 112, 143, 0.8)",
    enneagram_type_8: "rgba(212, 118, 144, 0.8)",
    enneagram_type_9: "rgba(193, 131, 88, 0.8)",
    default: "rgba(247, 122, 121, 0.8)",
  };

  const plotTextColor = {
    enneagram_type_1: "rgb(138, 95, 84)",
    enneagram_type_2: "rgb(135, 91, 61)",
    enneagram_type_3: "rgb(149, 114, 37)",
    enneagram_type_4: "rgb(75, 92, 78)",
    enneagram_type_5: "rgb(76, 104, 101)",
    enneagram_type_6: "rgb(65, 98, 113)",
    enneagram_type_7: "rgb(82, 67, 85)",
    enneagram_type_8: "rgb(148, 82, 100)",
    enneagram_type_9: "rgb(121, 81, 54)",
    default: "rgba(247, 122, 121, 0.8)",
  };

  const enneagram_FillColor = plotFillColor[trait] || plotFillColor["default"];
  //const enneagram_TextColor = plotTextColor[trait] || plotTextColor["default"];

  //enneagramResult.innerHTML = "情緒耗竭感 " + enneagramScore_ee + " 分" + "<br />" + "缺乏成就感 " + enneagramScore_pa + " 分" + "<br />" + "工作冷漠感 " + enneagramScore_dp + " 分";

  //new
  var data = [
    {
      type: "scatterpolar",
      mode: "lines",
      r: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "grey", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "grey", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [20, 20, 0, 0, 0, 0, 0, 0, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 20, 20, 0, 0, 0, 0, 0, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 20, 20, 0, 0, 0, 0, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 20, 20, 0, 0, 0, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 0, 20, 20, 0, 0, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 0, 0, 20, 20, 0, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 0, 0, 0, 20, 20, 0, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 0, 0, 0, 0, 20, 20, 0],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [0, 0, 0, 0, 0, 0, 0, 0, 20, 20],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [20, 0, 0, 0, 0, 0, 0, 0, 0, 20],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      line: { color: "black", width: 0.8 },
    },
    {
      type: "scatterpolar",
      r: [
        enneagram_type_1,
        enneagram_type_2,
        enneagram_type_3,
        enneagram_type_4,
        enneagram_type_5,
        enneagram_type_6,
        enneagram_type_7,
        enneagram_type_8,
        enneagram_type_9,
        enneagram_type_1,
      ],
      theta: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "一"],
      fill: "toself",
      fillcolor: enneagram_FillColor,
      line: { color: enneagram_FillColor },
      mode: "none",
    },
  ];

  var layout = {
    margin: { b: 35, t: 35, r: 35, l: 35, pad: 0 },
    font: {
      family: "'Noto Sans HK', Arial, sans-serif",
      size: 16,
      weight: 700,
    },
    polar: {
      bgcolor: "rgba(0,0,0,0)",
      angularaxis: {
        color: "transparent",
        gridcolor: "black",
        tickfont: { color: "black", weight: "bold" },
        rotation: 130,
      },
      radialaxis: {
        visible: false,
        range: [0, 20],
      },
    },
    showlegend: false,
    hovermode: false,
    height: 260,
    width: 260,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };
  var config = {
    responsive: true,
    displaylogo: false,
    displayModeBar: false,
  };
  Plotly.newPlot("myDiv", data, layout, config);

  document.getElementById("enneagramQuestionDiv").style.display = "none";
  document.getElementById("enneagramResultDiv").style.display = "";
  document.querySelector("h1").style.display = "";

  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();

  //document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })

  //var html2canvas_count = 0;
  if (document.getElementById("img_div_content_id")) {
    console.log("do not create html2canvas");
  } else {
    //setTimeout(function () {
    html2canvas(document.querySelector("#save_result")).then(function (canvas) {
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
        .insertBefore(img_div, document.getElementById("save_div").parentNode);
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
    //}, 1000);
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
