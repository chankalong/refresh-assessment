var number_question = 21;
var name_question = "cmi";

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
  var cmi_object = {};

  //score
    // Iterate over the score keys
    for (var i = 0; i <= (number_question - 2); i++) {
      cmi_object[`${name_question}_${i}_score`] = parseInt(
        document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
      // Check if the score should be subtracted from 4
      //if (inverseScores.includes(i)) {
      //  question_sum += 4 - itemScore;
      //} else {
        //question_sum += itemScore;
      //}
    }

    var cmiScore_y = cmi_object['cmi_0_score'] - cmi_object['cmi_1_score'] + cmi_object['cmi_2_score'] - cmi_object['cmi_3_score'];
    var cmiScore_c = cmi_object['cmi_4_score'] + cmi_object['cmi_5_score'] - cmi_object['cmi_6_score'] + cmi_object['cmi_7_score'];
    var cmiScore_f = cmi_object['cmi_8_score'] - cmi_object['cmi_9_score'] + cmi_object['cmi_10_score'] - cmi_object['cmi_11_score'];
    var cmiScore_p = cmi_object['cmi_12_score'] + cmi_object['cmi_13_score'] - cmi_object['cmi_14_score'] + cmi_object['cmi_15_score'];
    var cmiScore_a = cmi_object['cmi_16_score'] - cmi_object['cmi_17_score'] + cmi_object['cmi_18_score'] - cmi_object['cmi_19_score'];

    var cmi_factor_object = { "cmiScore_y": cmiScore_y, "cmiScore_c": cmiScore_c, "cmiScore_f": cmiScore_f, "cmiScore_p": cmiScore_p, "cmiScore_a": cmiScore_a };
    var sortedKeys_cmi_factor_object = Object.keys(cmi_factor_object).sort(function (a, b) {
        return cmi_factor_object[b] - cmi_factor_object[a];
    });
      
    //const resultDiv = document.getElementById("save_result");
    const trait = sortedKeys_cmi_factor_object[0];

  if (document.getElementById("user_name_manual").value == "") {
    console.log("no name");
  } else {
    participantName.textContent =
      document.getElementById("user_name_manual").value;
  }

  var category = document.getElementById(`${name_question}Category`);
  var description = document.getElementById(`${name_question}Description`);

  if (trait == "cmiScore_y") {
    category.textContent = "屈服型";
    description.textContent =
      "屈服型風格將對方的需求放在首位，主動讓步以維護關係，適用於對方極度重視或維繫長期關係時；然而，過度屈服可能忽略自我價值，甚至讓對方得寸進尺，因此應避免長期犧牲自身權益，適時表達需求，以建立健康的職場關係。";
  } else if (trait == "cmiScore_c") {
    category.textContent = "妥協型";
    description.textContent =
      "妥協型風格強調雙方讓步，尋求各有所得的平衡，儘管能快速達成「差強人意」的協議，適用於勢均力敵、時間緊迫之情境，卻可能令各方留下不滿。為避免淪為敷衍了事，務必深入探究問題本質，方能尋求更佳方案。";
  } else if (trait == "cmiScore_f") {
    category.textContent = "強迫型";
    description.textContent =
      "強迫型風格運用權力以強勢姿態達成目標，強調效率與決斷力，適用於緊急情況；然而，過度強硬可能損害人際關係，甚至引發反彈，因此應避免濫用權力，尊重他人意見，並確保決策符合團隊整體利益。";
  } else if (trait == "cmiScore_p") {
    category.textContent = "解難型";
    description.textContent =
      "解難型風格鼓勵雙方坦誠溝通、積極聆聽，共同尋找能滿足彼此需求的解決方案，適用於問題複雜或希望建立長期關係時；然而，此風格需要投入大量時間與精力，並確保雙方都有意願合作。";
  } else {
    category.textContent = "迴避型";
    description.textContent =
      "迴避型風格暫時性地退出衝突，避免正面交鋒，看似消極，但在某些情況下能避免衝突升級，適用於問題微不足道或需要冷靜思考時；然而，應懂得適時面對問題，避免長期迴避，以免問題惡化，影響人際關係。";
  }

  document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
  document.getElementById(`${name_question}ResultDiv`).style.display = "";
  document.querySelector("h1").style.display = "";
  //document.querySelector('img.ie_result_image').src = ieUrl;

  //new
  var data = [{
    type: 'scatterpolar',
    r: [cmiScore_y, cmiScore_c, cmiScore_f, cmiScore_p, cmiScore_a, cmiScore_y],
    theta: ['屈服', '妥協', '強迫', '解難', '迴避', '屈服'],
    fill: 'toself'
},
{
    type: 'scatterpolar',
    mode: 'lines',
    r: [16, 16, 16, 16, 16, 16],
    theta: ['屈服', '妥協', '強迫', '解難', '迴避', '屈服'],
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
            range: [0, 16]
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
