document.querySelector("#start_div").addEventListener("click", function () {
  document.querySelector("#scsIntroDiv").style.display = "none";
  document.querySelector("#scsQuestionDiv").style.display = "";
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
  var targetId = "#scs_" + i + "_block";
  anime({
    targets: targetId,
    translateX: 20,
  });
}

var scs_1_next_button = document.getElementById("scs_1_next_button");
var scs_1_next_function = function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#scs_1_block",
      easing: "easeOutExpo",
      translateX: -20,
      opacity: 0,
      complete: function () {
        document.getElementById("scs_1_block").style.display = "none";
        document.getElementById("scs_2_block").style.display = "";
      },
    })
    .add(
      {
        targets: "#scs_2_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
};
Array.prototype.map.call(
  document.querySelectorAll("input[name=scs_0]"),
  function (e) {
    e.addEventListener("click", scs_1_next_function);
    e.addEventListener("click", function () {
      scs_1_next_button.addEventListener("click", scs_1_next_function);
      scs_1_next_button.style.opacity = 1;
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

for (var i = 1; i <= 11; i++) {
  AddFunctionListener("scs_" + i, "scs_" + (i + 1), "scs_" + (i + 2));
}

//##last

var scs_13_previous_button = document.getElementById("scs_13_previous_button");
scs_13_previous_button.addEventListener("click", function () {
  anime
    .timeline({
      duration: 200,
      delay: 200,
    })
    .add({
      targets: "#scs_12_block",
      easing: "easeOutExpo",
      translateX: 20,
      opacity: 0,
      complete: function () {
        document.getElementById("scs_12_block").style.display = "";
        document.getElementById("scs_13_block").style.display = "none";
      },
    })
    .add(
      {
        targets: "#scs_12_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      "-=50"
    );
});

var scs_13_next_button = document.getElementById("scs_13_next_button");
var scs_13_next_function = function () {
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
scs_13_next_button.addEventListener("click", scs_13_next_function);

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

var form = document.getElementById("form_scs");

form.addEventListener("submit", function (e) {
    e.preventDefault();
  var scs_object = {};

  for (var i = 0; i <= 11; i++) {
    var inputName = "scs_" + i;
    scs_object[inputName + "_score"] = parseInt(
      document.querySelector('input[name="' + inputName + '"]:checked').value
    );
  }

  function hasNull(element, index, array) {
    return element === null;
  }

  if (Object.values(scs_object).some(hasNull)) {
    return; //stop the execution of function
  }

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent = document.getElementById("user_name_manual").value;
  }

  //score
    var scs_sum = ((4 - scs_object['scs_0_score']) + scs_object['scs_1_score'] + (scs_object['scs_2_score']) + (4 - scs_object['scs_3_score']) + (scs_object['scs_4_score']) + (scs_object['scs_5_score']) + scs_object['scs_6_score'] + (4 - scs_object['scs_7_score']) + (4 - scs_object['scs_8_score']) + scs_object['scs_9_score'] + (4 - scs_object['scs_10_score']) + (4 - scs_object['scs_11_score']));
    if (isNaN(scs_sum)) {
        return; //stop the execution of function
    }

   // var scsScore_ee_plot = scsScore_ee / 9;
    //var scsScore_pa_plot = scsScore_pa / 8;
    //var scsScore_dp_plot = scsScore_dp / 5;
    //scsResult.innerHTML = "情緒耗竭感 " + scsScore_ee + " 分" + "<br />" + "缺乏成就感 " + scsScore_pa + " 分" + "<br />" + "工作冷漠感 " + scsScore_dp + " 分";

  if (scs_sum < 18) {
    scsCategory.textContent = '自我關懷程度較低';
    scsDescription.textContent = "這意味著你對自己比較嚴厲或在面對困難時對自己過於苛刻。培養自我關懷對你的身心健康將有很大的幫助，但可能需要更多的耐心和時間來培養。試著在日常生活中對自己多一些理解和包容，這將有助於提升你的幸福感。";
    scsColor = "#F48847";
  } else if (scs_sum < 31) {
    scsCategory.textContent = '自我關懷程度適中';
    scsDescription.textContent =
      "這意味著你在某些情況下你能夠善待自己。培養更多的自我關懷將有助於你提升應對壓力的能力，並增強內心的平靜和滿意感。繼續學習在日常生活中多給予自己一些理解和支持吧！";
    scsColor = "#FFC84A";
  } else {
    scsCategory.textContent = '自我關懷程度較高';
    scsDescription.textContent =
      "很好！這顯示你有好好關懷自己並在面對困難時能夠給予自己支持。繼續保持這種自我關懷的態度，有助於你保持心理健康，並提升應對壓力的能力。";
    scsColor = "#4EC04E";
  }

  document.getElementById("scsQuestionDiv").style.display = "none";
  document.getElementById("scsResultDiv").style.display = "";
  document.querySelector("h1").style.display = "";

  //new
  var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: scs_sum,
        title: { text: "自我關懷" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [0, 48], tickvals: [0, 24.5, 48] },
            bar: { color: scsColor, thickness: 1 },
        bgcolor: "white"
        }
    }
];

var layout = {
    margin: { l: 35, r: 35, b: 10, t: 80, pad: 0 }, height: 200, autosize: true, font: {
        family: 'Arial, sans-serif'
    }
};

var config = { responsive: true, displaylogo: false, displayModeBar: false }
Plotly.newPlot('myDiv', data, layout, config);

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
