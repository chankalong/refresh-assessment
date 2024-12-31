document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector("#procrastinationIntroDiv").style.display = "none";
  document.querySelector("#procrastinationQuestionDiv").style.display = "";
  document.querySelector("h1").style.display = "none";
  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
});
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= 9; i++) {
  var targetId = "#procrastination_" + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

var procrastination_1_next_button = document.getElementById("procrastination_1_next_button");
var procrastination_1_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#procrastination_1_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById("procrastination_1_block").style.display = "none";
        document.getElementById("procrastination_2_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#procrastination_2_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll("input[name=procrastination_0]"),
  function (e) {
    e.addEventListener("click", procrastination_1_next_function);
    e.addEventListener("click", function () {
      procrastination_1_next_button.addEventListener("click", procrastination_1_next_function);
      procrastination_1_next_button.style.opacity = 1;
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

for (var i = 1; i <= 8; i++) {
  AddFunctionListener("procrastination_" + i, "procrastination_" + (i + 1), "procrastination_" + (i + 2));
}

//##last

var procrastination_10_previous_button = document.getElementById("procrastination_10_previous_button");
procrastination_10_previous_button.addEventListener("click", function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#procrastination_9_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.getElementById("procrastination_9_block").style.display = "";
        document.getElementById("procrastination_10_block").style.display = "none";
      },
    })
    .add(
      {
        targets: "#procrastination_9_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
});

var procrastination_10_next_button = document.getElementById("procrastination_10_next_button");
var procrastination_10_next_function = function () {
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
procrastination_10_next_button.addEventListener("click", procrastination_10_next_function);

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

var form = document.getElementById("form_procrastination");

form.addEventListener("submit", function (e) {
    e.preventDefault();
  var procrastination_object = {};

  for (var i = 0; i <= 7; i++) {
    var inputName = "procrastination_" + i;
    procrastination_object[inputName + "_score"] = parseInt(
      document.querySelector('input[name="' + inputName + '"]:checked').value
    );
  }

  function hasNull(element, index, array) {
    return element === null;
  }

  if (Object.values(procrastination_object).some(hasNull)) {
    return; //stop the execution of function
  }

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent = document.getElementById("user_name_manual").value;
  }

  //score
    var procrastinationScore = procrastination_object["procrastination_0_score"] + procrastination_object["procrastination_1_score"] + procrastination_object["procrastination_2_score"] + procrastination_object["procrastination_3_score"] + procrastination_object["procrastination_4_score"] + procrastination_object["procrastination_5_score"] + procrastination_object["procrastination_6_score"] + procrastination_object["procrastination_7_score"] + procrastination_object["procrastination_8_score"];
    if (isNaN(procrastinationScore)) {
        return; //stop the execution of function
    }

  if (procrastinationScore >= 0 && procrastinationScore <= 18) {
    procrastinationCategory.textContent = '良好';
    procrastinationDescription.textContent = "恭喜你，你沒有拖延症的問題，真好！";
    procrastinationColor = "#4EC04E";
  } else if (procrastinationScore >= 19 && procrastinationScore <= 27) {
    procrastinationCategory.textContent = '輕微拖延';
    procrastinationDescription.textContent =
      "你在生活中可能少許拖延的行為，我們建議你用不同的方式去調節情緒，然後學會擺脫自我批評，為即將到來的事情做好準備。";
    procrastinationColor = "#FFC84A";
  } else {
    procrastinationCategory.textContent = '中度拖延或以上';
    procrastinationDescription.textContent =
      "你可能已經養成拖延的習慣，我們建議你運用方法，訓練自己去意識到逃避和拖延的傾向，然後學會擺脫自我批評，為即將到來的事情做好準備。";
    procrastinationColor = "#F48847";
  }

  document.getElementById("procrastinationQuestionDiv").style.display = "none";
  document.getElementById("procrastinationResultDiv").style.display = "";
  document.querySelector("h1").style.display = "";

  //new
  var procrastination_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: procrastinationScore,
      title: { text: "拖延" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 36], tickvals: [0, 9, 18, 27, 36] },
        bar: { color: procrastinationColor, thickness: 1 },
        bgcolor: "white"
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
    paper_bgcolor: "transparent"
  };
  var config = { responsive: true, displaylogo: false, displayModeBar: false };

  
  Plotly.newPlot("myDiv", procrastination_data, layout, config);
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
      html2canvas(document.querySelector("#save_result")).then(function (canvas) {
        canvas_element = canvas;
        var img_png = canvas_element.toDataURL("image/png");
        var img_div = document.createElement("div");
        var img_div_content = document.createElement("img");
        img_div_content.id = "img_div_content_id";
        var base64_svg = document.getElementById("base64_svg")
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
    url: document.location.origin + document.location.pathname + '?utm_source=website&utm_medium=referral',
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
