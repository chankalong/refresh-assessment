document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector("#phqIntroDiv").style.display = "none";
  document.querySelector("#phqQuestionDiv").style.display = "";
  document.querySelector("h1").style.display = "none";
  document
    .querySelector(".fixed.bottom-0.right-4")
    .querySelector("button")
    .click();
});
//document.querySelector('.node-container').classList.remove('my-6')
//document.querySelector('.node-container').classList.remove('pt-4')
document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= 10; i++) {
  var targetId = "#phq_" + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

var phq_1_next_button = document.getElementById("phq_1_next_button");
var phq_1_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#phq_1_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById("phq_1_block").style.display = "none";
        document.getElementById("phq_2_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#phq_2_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll("input[name=phq_0]"),
  function (e) {
    e.addEventListener("click", phq_1_next_function);
    e.addEventListener("click", function () {
      phq_1_next_button.addEventListener("click", phq_1_next_function);
      phq_1_next_button.style.opacity = 1;
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

for (var i = 1; i <= 9; i++) {
  AddFunctionListener("phq_" + i, "phq_" + (i + 1), "phq_" + (i + 2));
}

//##last

var phq_11_previous_button = document.getElementById("phq_11_previous_button");
phq_11_previous_button.addEventListener("click", function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#phq_10_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.getElementById("phq_10_block").style.display = "";
        document.getElementById("phq_11_block").style.display = "none";
      },
    })
    .add(
      {
        targets: "#phq_10_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
});

var phq_11_next_button = document.getElementById("phq_11_next_button");
var phq_11_next_function = function () {
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
phq_11_next_button.addEventListener("click", phq_11_next_function);

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

var form = document.getElementById("form_phq");

form.addEventListener("submit", function (e) {
    e.preventDefault();
  var phq_object = {};

  for (var i = 0; i <= 8; i++) {
    var inputName = "phq_" + i;
    phq_object[inputName + "_score"] = parseInt(
      document.querySelector('input[name="' + inputName + '"]:checked').value
    );
  }

  function hasNull(element, index, array) {
    return element === null;
  }

  if (Object.values(phq_object).some(hasNull)) {
    return; //stop the execution of function
  }

  //score
    var phqScore = phq_object["phq_0_score"] + phq_object["phq_1_score"] + phq_object["phq_2_score"] + phq_object["phq_3_score"] + phq_object["phq_4_score"] + phq_object["phq_5_score"] + phq_object["phq_6_score"] + phq_object["phq_7_score"] + phq_object["phq_8_score"];
    if (isNaN(phqScore)) {
        return; //stop the execution of function
    }

  if (phqScore >= 0 && phqScore <= 4) {
    phqCategory.textContent = '良好';
    phqDescription.textContent = "恭喜你，你的情緒很健康啊，真好！";
    phqColor = "#4EC04E";
  } else if (phqScore >= 5 && phqScore <= 9) {
    phqCategory.textContent = '輕微抑鬱';
    phqDescription.textContent =
      "你可能出現輕微抑鬱的病徵，不妨散散步讓自己輕鬆一下，向你的朋友及家人分享你的感受，還可以看看我們為你準備的身心健康貼士，或參加我們在線舉辦的工作坊啊！";
    phqColor = "#FFC84A";
  } else if (phqScore >= 10 && phqScore <= 14) {
    phqCategory.textContent = '中度抑鬱';
    phqDescription.textContent =
      "你可能出現中度抑鬱的病徵，開始要好好照顧你的情緒，可多探索不同的處理壓力方法，相信我們為你準備的身心健康自助課程及工作坊會對你十分有幫助啊！";
    phqColor = "#F48847";
  } else if (phqScore >= 15 && phqScore <= 19) {
    phqCategory.textContent = '嚴重抑鬱';
    phqDescription.textContent =
      "你可能出現嚴重抑鬱的病徵，請盡快尋求專業協助，例如醫生及社工。";
    phqColor = "#f45e47";
  } else {
    phqCategory.textContent = '非常嚴重抑鬱';
    phqDescription.textContent =
      "你可能出現非常嚴重抑鬱的病徵，請盡快尋求專業協助，例如醫生及社工。";
    phqColor = "#EB4841";
  }

  document.getElementById("phqQuestionDiv").style.display = "none";
  document.getElementById("phqResultDiv").style.display = "";
  document.querySelector("h1").style.display = "";

  //new
  var phq_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: phqScore,
      title: { text: "抑鬱" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 27], tickvals: [0, 13.5, 27] },
        bar: { color: phqColor, thickness: 1 },
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

  
  Plotly.newPlot("myDiv", phq_data, layout, config);
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
    url: document.location.origin + document.location.pathname + '?utm_source=website&utm_medium=utm_source',
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
