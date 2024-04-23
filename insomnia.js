function clearTooltip(e) {
  setTimeout(function () {
    e.setAttribute("class", "btnRound btnRound-green mx-2");
    e.removeAttribute("aria-label");
  }, 2000);
}
function showTooltip(elem, msg) {
  elem.setAttribute(
    "class",
    "btnRound btnRound-green mx-2 tooltipped tooltipped-s"
  );
  elem.setAttribute("aria-label", msg);
}
function fallbackMessage(action) {
  var actionMsg = "";
  var actionKey = action === "cut" ? "X" : "C";
  if (/iPhone|iPad/i.test(navigator.userAgent)) {
    actionMsg = "No support :(";
  } else if (/Mac/i.test(navigator.userAgent)) {
    actionMsg = "Press ⌘-" + actionKey + " to " + action;
  } else {
    actionMsg = "Press Ctrl-" + actionKey + " to " + action;
  }
  return actionMsg;
}
var clipboardDemos = new ClipboardJS("#share_div");
clipboardDemos.on("success", function (e) {
  e.clearSelection();
  console.info("Action:", e.action);
  console.info("Text:", e.text);
  console.info("Trigger:", e.trigger);
  showTooltip(e.trigger, "已複製問卷連結!");
  clearTooltip(e.trigger);
});
clipboardDemos.on("error", function (e) {
  console.error("Action:", e.action);
  console.error("Trigger:", e.trigger);
  showTooltip(e.trigger, fallbackMessage(e.action));
});
document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector("#insomniaIntroDiv").style.display = "none";
  document.querySelector("#insomniaQuestionDiv").style.display = "";
  document.querySelector("h1").style.display = "none";
  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
});

document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= 7; i++) {
  var targetId = "#insomnia_" + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

var insomnia_1_next_button = document.getElementById("insomnia_1_next_button");
var insomnia_1_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#insomnia_1_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById("insomnia_1_block").style.display = "none";
        document.getElementById("insomnia_2_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#insomnia_2_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll("input[name=insomnia_0]"),
  function (e) {
    e.addEventListener("click", insomnia_1_next_function);
    e.addEventListener("click", function () {
      insomnia_1_next_button.addEventListener(
        "click",
        insomnia_1_next_function
      );
      insomnia_1_next_button.style.opacity = 1;
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

for (var i = 1; i <= 5; i++) {
  AddFunctionListener(
    "insomnia_" + i,
    "insomnia_" + (i + 1),
    "insomnia_" + (i + 2)
  );
}

//##last

var insomnia_7_previous_button = document.getElementById(
  "insomnia_7_previous_button"
);
insomnia_7_previous_button.addEventListener("click", function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#insomnia_7_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.getElementById("insomnia_6_block").style.display = "";
        document.getElementById("insomnia_7_block").style.display = "none";
      },
    })
    .add(
      {
        targets: "#insomnia_6_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
});

var insomnia_7_next_button = document.getElementById("insomnia_7_next_button");
var insomnia_7_next_function = function () {
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

Array.prototype.map.call(
  document.querySelectorAll("input[name=insomnia_6]"),
  function (e) {
    e.addEventListener("click", insomnia_7_next_function);
    e.addEventListener("click", function () {
      insomnia_7_next_button.addEventListener(
        "click",
        insomnia_7_next_function
      );
      insomnia_7_next_button.style.opacity = 1;
    });
  }
);
var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
var canvas_element = document.createElement("canvas");

member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById("form_insomnia");

form.addEventListener("submit", function (e) {
  var insomnia_object = {};

  for (var i = 0; i <= 6; i++) {
    var inputName = "insomnia_" + i;
    insomnia_object[inputName + "_score"] = parseInt(
      document.querySelector('input[name="' + inputName + '"]:checked').value
    );
  }
  function hasNull(element, index, array) {
    return element === null;
  }

  var insomniaScore = Object.values(insomnia_object);
  var insomniaScore_sum = insomniaScore.reduce(function (accumulator, value) {
    return accumulator + value;
  }, 0); // the source is already revise item 1

  if (insomniaScore.some(hasNull)) {
    return; //stop the execution of function
  }
  var data = new FormData(form);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data,
  });
  e.preventDefault();

  if (insomniaScore_sum < 8) {
    test_result.style.backgroundImage =
      "url('/sites/default/files/inpages/assessment/insomnia/isi_normal.png')";
  }
  if ((insomniaScore_sum >= 8) & (insomniaScore_sum < 15)) {
    test_result.style.backgroundImage =
      "url('/sites/default/files/inpages/assessment/insomnia/isi_sub.png')";
  }
  if ((insomniaScore_sum >= 15) & (insomniaScore_sum < 22)) {
    test_result.style.backgroundImage =
      "url('/sites/default/files/inpages/assessment/insomnia/isi_moderate.png')";
  }
  if ((insomniaScore_sum >= 22) & (insomniaScore_sum < 29)) {
    test_result.style.backgroundImage =
      "url('/sites/default/files/inpages/assessment/insomnia/isi_severe.png')";
  }

  document.getElementById("insomniaQuestionDiv").style.display = "none";
  document.getElementById("insomniaQuestionFinishDiv").style.display = "";
  document.getElementById("insomniaQuestionFinishDiv").style =
    "display: flex; flex-direction: column; align-items: center;";
  document
    .getElementById("see_result_div")
    .addEventListener("click", function () {
      document.getElementById("insomniaQuestionFinishDiv").style.display =
        "none";
      document.getElementById("insomniaResultDiv").style.display = "";
    });
  document.querySelector("h1").innerText = "你的睡眠狀況";
  document.title = "你的睡眠狀況 | Re:Fresh線上精神健康自助平台";

  //var d3 = Plotly.d3;
  var svg_div = document.querySelector("#svg_div");

  var chart = Highcharts.chart("myDiv", {
    chart: {
      type: "solidgauge",
      height: "112%",
      backgroundColor: "rgba(0,0,0,0)",
    },

    title: {
      text: undefined,
      style: {
        fontSize: "24px",
      },
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          // Track for Conversion
          outerRadius: "112%",
          innerRadius: "75%",
          backgroundColor: "#91a9b0",
          borderWidth: 0,
        },
      ],
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: true,
          borderColor: undefined,
          verticalAlign: "middle",
          y: 55,
          color: "#516a7e",
          padding: 0,
          style: {
            textOutline: "none",
          },
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:80px">{(multiply (divide y 100) 28):.0f}</span>' +
            '<span style="font-size:80px">' +
            " / 28" +
            "</span>" +
            "</div>",
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },

    series: [
      {
        name: "Conversion",
        data: [
          {
            color: "#516a7e",
            radius: "112%",
            innerRadius: "75%",
            y: (insomniaScore_sum / 28) * 100,
          },
        ],
      },
    ],
    exporting: { enabled: false, sourceWidth: 600, sourceHeight: 600 },
    credits: {
      enabled: false,
    },
  });

  // Get Actual SVG of a chart

  var svgString = chart.getSVG();
  var decoded = unescape(encodeURIComponent(svgString));
  var base64 = btoa(decoded);
  var imgSource = "data:image/svg+xml;base64," + base64;

  svg_div.src = imgSource;

  // Use DOMParser to parse new svg element from svgString
  //var parser = new DOMParser();
  //var svgElem = parser.parseFromString(svgString, "image/svg+xml").documentElement;

  // Use toDataURL extension to generate Base64 string
  //var b64 = svgElem.toDataURL()
  //svg_div.src = b64;

  // Log string in console

  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
  setTimeout(function () {
    html2canvas(document.querySelector("#test_result"), {
      scale: 1,
      onclone: function (document) {
        document.querySelector("#test_result").style.display = "";
      },
    }).then(function (canvas) {
      canvas_element = canvas;
      var img_png = canvas_element.toDataURL("image/png");
      var img_div = document.createElement("div");
      var img_div_content = document.createElement("img");
      img_div.style = "display: flex; justify-content: center;";
      img_div.appendChild(img_div_content);
      img_div_content.src = img_png;
      document
        .getElementById("save_result")
        .insertBefore(img_div, document.getElementById("save_div").parentNode);
    });
  }, 1000);
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
