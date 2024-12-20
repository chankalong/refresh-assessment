document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector("#mbiIntroDiv").style.display = "none";
  document.querySelector("#mbiQuestionDiv").style.display = "";
  document.querySelector("h1").style.display = "none";
  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
});
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= 22; i++) {
  var targetId = "#mbi_" + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

var mbi_1_next_button = document.getElementById("mbi_1_next_button");
var mbi_1_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#mbi_1_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById("mbi_1_block").style.display = "none";
        document.getElementById("mbi_2_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#mbi_2_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll("input[name=mbi_0]"),
  function (e) {
    e.addEventListener("click", mbi_1_next_function);
    e.addEventListener("click", function () {
      mbi_1_next_button.addEventListener("click", mbi_1_next_function);
      mbi_1_next_button.style.opacity = 1;
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

for (var i = 1; i <= 21; i++) {
  AddFunctionListener("mbi_" + i, "mbi_" + (i + 1), "mbi_" + (i + 2));
}

//##last

var mbi_23_previous_button = document.getElementById("mbi_23_previous_button");
mbi_23_previous_button.addEventListener("click", function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#mbi_22_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.getElementById("mbi_22_block").style.display = "";
        document.getElementById("mbi_23_block").style.display = "none";
      },
    })
    .add(
      {
        targets: "#mbi_22_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
});

var mbi_23_next_button = document.getElementById("mbi_23_next_button");
var mbi_23_next_function = function () {
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
mbi_23_next_button.addEventListener("click", mbi_23_next_function);

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
  activity_name_textbox.value = "public";
}


var worker_textbox = document.getElementById("worker");
worker_textbox.value = new URLSearchParams(window.location.search).get(
  "worker"
);

var form = document.getElementById("form_mbi");

form.addEventListener("submit", function (e) {
  var mbi_object = {};

  for (var i = 0; i <= 21; i++) {
    var inputName = "mbi_" + i;
    mbi_object[inputName + "_score"] = parseInt(
      document.querySelector('input[name="' + inputName + '"]:checked').value
    );
  }

  function hasNull(element, index, array) {
    return element === null;
  }

  if (Object.values(mbi_object).some(hasNull)) {
    return; //stop the execution of function
  }
  var data = new FormData(form);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data,
  });
  e.preventDefault();

  //score
    var mbiScore_ee = mbi_object["mbi_0_score"] + mbi_object["mbi_1_score"] + mbi_object["mbi_2_score"] + mbi_object["mbi_3_score"] + mbi_object["mbi_4_score"] + mbi_object["mbi_5_score"] + mbi_object["mbi_6_score"] + mbi_object["mbi_7_score"] + mbi_object["mbi_8_score"];
    var mbiScore_pa = (6 - mbi_object["mbi_9_score"]) + (6 - mbi_object["mbi_10_score"]) + (6 - mbi_object["mbi_11_score"]) + (6 - mbi_object["mbi_12_score"]) + (6 - mbi_object["mbi_13_score"]) + (6 - mbi_object["mbi_14_score"]) + (6 - mbi_object["mbi_15_score"]) + (6 - mbi_object["mbi_16_score"]);
    var mbiScore_dp = mbi_object["mbi_17_score"] + mbi_object["mbi_18_score"] + mbi_object["mbi_19_score"] + mbi_object["mbi_20_score"] + mbi_object["mbi_21_score"];
    if (isNaN(mbiScore_ee) || isNaN(mbiScore_pa) || isNaN(mbiScore_dp)) {
        return; //stop the execution of function
    }

    var mbiScore_ee_plot = mbiScore_ee / 9;
    var mbiScore_pa_plot = mbiScore_pa / 8;
    var mbiScore_dp_plot = mbiScore_dp / 5;
    //mbiResult.innerHTML = "情緒耗竭感 " + mbiScore_ee + " 分" + "<br />" + "缺乏成就感 " + mbiScore_pa + " 分" + "<br />" + "工作冷漠感 " + mbiScore_dp + " 分";

  if (mbiScore_ee < 20 && mbiScore_pa < 20 && mbiScore_dp < 8) {
    mbiCategory.textContent = '健康';
    mbiDescription.textContent = "恭喜你，你沒有工作過勞的問題。";
    //mbiColor = "#4EC04E";
  } else if (mbiScore_ee >= 20 && mbiScore_pa < 20 && mbiScore_dp < 8) {
    mbiCategory.textContent = '勞累不堪型';
    mbiDescription.textContent =
      "持續的身心勞累正在消耗您的能量，雖然仍保持專業態度，但內心已感到極度疲憊。建議學習壓力管理技巧，適當休息和放鬆，善用週末和假期調理身心，維持工作與生活的平衡。";
    //mbiColor = "#FFC84A";
  } else if (mbiScore_ee < 20 && mbiScore_pa >= 20 && mbiScore_dp < 8) {
    mbiCategory.textContent = '成就匱乏型';
    mbiDescription.textContent =
      "您正面臨專業自信的低谷，對自身能力產生懷疑，感覺難以達到工作期望。建議尋求專業技能培訓，與上司討論職業發展，設定可實現的短期目標，逐步重建職業成就感。";
    //mbiColor = "#FFC84A";
  } else if (mbiScore_ee < 20 && mbiScore_pa < 20 && mbiScore_dp >= 8) {
    mbiCategory.textContent = '工作冷感型';
    mbiDescription.textContent =
      "您對工作環境充滿負面情緒，對公司和同事的信任感降低，工作態度變得消極冷漠。建議嘗試改變視角，與同事建立正面的溝通方式，或考慮調整工作環境，重建職場歸屬感。";
    //mbiColor = "#FFC84A";
  } else {
    mbiCategory.textContent = '職場枯竭型';
    mbiDescription.textContent =
      "您正處於職業生涯的極限狀態，身心靈同時承受巨大壓力，工作和生活失去平衡。建議立即調整作息，尋求專業心理輔導，並與上級溝通工作壓力，給自己一個喘息和療癒的空間。";
    //mbiColor = "#F48847";
  }

  document.getElementById("mbiQuestionDiv").style.display = "none";
  document.getElementById("mbiResultDiv").style.display = "";
  document.querySelector("h1").style.display = "";

  //new
  var data = [{
    type: 'scatterpolar',
    r: [mbiScore_ee_plot, mbiScore_pa_plot, mbiScore_dp_plot, mbiScore_ee_plot],
    theta: ['情緒耗竭感', '缺乏成就感', '工作冷漠感', '情緒耗竭感'],
    fill: 'toself'
},
{
    type: 'scatterpolar',
    mode: 'lines',
    r: [6, 6, 6, 6],
    theta: ['情緒耗竭感', '缺乏成就感', '工作冷漠感', '情緒耗竭感'],
    line: { color: 'grey' }
}]

var layout = {
    margin: { b: 0, t: 30, r: 60, l: 60, pad: 0 }, font: {
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
            range: [0, 6]
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
  
  var html2canvas_count = 0;
  if (html2canvas_count == 0) {
    setTimeout(function () {
      html2canvas(document.querySelector("#mbiResultDiv")).then(function (canvas) {
        canvas_element = canvas;
        var img_png = canvas_element.toDataURL("image/png");
        var img_div = document.createElement("div");
        var img_div_content = document.createElement("img");
        img_div.style = "display: flex; justify-content: center;";
        img_div.appendChild(img_div_content);
        img_div_content.src = img_png;
        document
          .getElementById("svg_div")
          .insertBefore(
            img_div,
            document.getElementById("save_div").parentNode
          );
        document.querySelector("#mbiResultDiv").style.display = "none";
        document.querySelector("#svg_div").style.display = "";
        html2canvas_count = 1;
      });
    }, 1000);
  } else {
    console.log("create html2canvas");
  }
});

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
