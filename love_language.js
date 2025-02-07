
var number_question = 21;
var name_question = "love_language";
//var max_item_score = 1
//var total_score = 20;
//var scale_name = "愛的語言問卷";

document.querySelector("#start_div").addEventListener("click", function () {
    document.querySelector(`#${name_question}IntroDiv`).style.display = "none";
    document.querySelector(`#${name_question}QuestionDiv`).style.display = "";
    document.querySelector("h1").style.display = "none";
    document.querySelector(".fixed.bottom-0.right-4").querySelector("button").click();
});

document.querySelector(".page-title").style.marginBottom = "0px";
for (var i = 2; i <= (number_question - 1); i++) {
    var targetId = `#${name_question}_` + i + "_block";
    anime({
        targets: targetId,
        translateX: 20,
    });
}

var first_next_function = function () {
    anime.timeline({
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
    .add({
        targets: `#${name_question}_2_block`,
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
    }, "-=50");
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

function handlePreviousButton(previousblockId, currentBlockId) {
    anime.timeline({
        duration: 200,
        delay: 200,
    })
    .add({
        targets: "#" + currentBlockId + "_block",
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
            document.querySelector("#" + currentBlockId + "_block").style.display = "none";
            document.querySelector("#" + previousblockId + "_block").style.display = "";
        },
    })
    .add({
        targets: "#" + previousblockId + "_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
    }, "-=50");
}

function handleNextButton(currentBlockId, nextBlockId) {
    anime.timeline({
        duration: 200,
        delay: 200,
    })
    .add({
        targets: "#" + currentBlockId + "_block",
        easing: "easeOutExpo",
        translateX: -20,
        opacity: 0,
        complete: function () {
            document.querySelector("#" + currentBlockId + "_block").style.display = "none";
            document.querySelector("#" + nextBlockId + "_block").style.display = "";
        },
    })
    .add({
        targets: "#" + nextBlockId + "_block",
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
    }, "-=50");
}

function AddFunctionListener(previousblockId, currentBlockId, nextBlockId) {
    document.getElementById(currentBlockId + "_previous_button")
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
                document.getElementById(currentBlockId + "_next_button")
                    .addEventListener("click", function () {
                        handleNextButton(currentBlockId, nextBlockId);
                    });
                document.getElementById(currentBlockId + "_next_button").style.opacity = 1;
            });
        }
    );
}

for (var i = 1; i <= (number_question - 2); i++) {
    AddFunctionListener(
        `${name_question}_${i}`,
        `${name_question}_${i + 1}`,
        `${name_question}_${i + 2}`
    );
}

document.getElementById(`${name_question}_${number_question}_previous_button`)
    .addEventListener("click", function () {
        anime.timeline({
            duration: 200,
            delay: 200,
        })
        .add({
            targets: `#${name_question}_${number_question - 1}_block`,
            easing: "easeOutExpo",
            translateX: 20,
            opacity: 0,
            complete: function () {
                document.getElementById(`${name_question}_${number_question - 1}_block`).style.display = "";
                document.getElementById(`${name_question}_${number_question}_block`).style.display = "none";
            },
        })
        .add({
            targets: `#${name_question}_${number_question - 1}_block`,
            easing: "easeInExpo",
            translateX: 0,
            opacity: 1,
        }, "-=50");
    });

document.getElementById(`${name_question}_${number_question}_next_button`)
    .addEventListener("click", function () {
        swal.fire({
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

    var love_language_object = {};

    for (var i = 0; i <= 19; i++) {
      var inputName = "love_language_" + i;
      love_language_object[inputName + "_score"] = document.querySelector(
        'input[name="' + inputName + '"]:checked'
      ).value;
    }

    var love_languageScore = Object.values(love_language_object);

    var love_language_count = {};

    for (var i = 0; i < love_languageScore.length; i++) {
      var num = love_languageScore[i];
      love_language_count[num] = love_language_count[num]
        ? love_language_count[num] + 1
        : 1;
    }

    var love_language_maxKey,
      love_language_maxValue = 0;

    for (var key in love_language_count) {
      if (love_language_count.hasOwnProperty(key)) {
        var value = love_language_count[key];
        if (value > love_language_maxValue) {
          love_language_maxValue = value;
          love_language_maxKey = key;
        }
      }
    }

    const resultBgSources = {
        a:
          "url('/sites/default/files/inpages/assessment/love_language/affirmation.webp')",
        b:
          "url('/sites/default/files/inpages/assessment/love_language/time.webp')",
        c:
          "url('/sites/default/files/inpages/assessment/love_language/gift.webp')",
        d:
          "url('/sites/default/files/inpages/assessment/love_language/act.webp')",
        e:
          "url('/sites/default/files/inpages/assessment/love_language/touch.webp')",
        default: "",
      };

      const resultDiv = document.getElementById("save_result");
  resultDiv.style.backgroundImage =
    resultBgSources[love_language_maxKey] || resultBgSources["default"];
  resultDiv.style.backgroundSize = "cover";

  const plotFillColor = {
    a: "rgba(219, 183, 183,0.8)",
    b: "rgba(226, 141, 174,0.8)",
    c: "rgba(197, 153, 224,0.8)",
    d: "rgba(239, 162, 111,0.8)",
    e: "rgba(125, 183, 134,0.8)",
    default: "rgba(247, 122, 121, 0.8)",
  };

    const plotTextColor = {
    a: "rgba(219, 183, 183,1)",
    b: "rgba(226, 141, 174,1)",
    c: "rgba(197, 153, 224,1)",
    d: "rgba(239, 162, 111,1)",
    e: "rgba(125, 183, 134,1)",
    default: "rgba(247, 122, 121, 1)",
  };

  const love_language_FillColor = plotFillColor[love_language_maxKey] || plotFillColor["default"];
    const love_language_TextColor = plotTextColor[love_language_maxKey] || plotTextColor["default"];

  ['a', 'b', 'c', 'd', 'e'].forEach(key => {
    if (isNaN(love_language_count[key])) {
      love_language_count[key] = 0;
    }
  });

  

    // Define the scores that need to be subtracted from 4
    //const inverseScores = [2, 5];
    // Initial sum
    //var question_sum = 0;
    // Iterate over the score keys
    //for (var i = 0; i <= (number_question - 2); i++) {
    //  var itemScore = parseInt(
    //    document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);

      // Check if the score should be subtracted from 4
      //if (inverseScores.includes(i)) {
      //  question_sum += 4 - itemScore;
      //} else {
      //  question_sum += itemScore;
      //}

    //}

    //if (document.getElementById("user_name_manual").value != "") {
    //    participantName.textContent = document.getElementById("user_name_manual").value;
    //}



    //var category = document.getElementById(`${name_question}Category`);
    //var description = document.getElementById(`${name_question}Description`);


    //if (question_sum <= total_score * 0.3) {
    //    category.textContent = "初階";
    //    description.textContent = "您正處於學習階段...";
    //    color = "#D0D8E0";

    //} else if (question_sum <= total_score * 0.7) {
    //    category.textContent = "中階";
    //    description.textContent = "您已具備基本能力...";
    //    color = "#A9DFBF";

    //} else {
    //    category.textContent = "高階";
    //    description.textContent = "您展現出優秀的能力...";
    //    color = "#FAD7A0";
    //}


    document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
    document.getElementById(`${name_question}ResultDiv`).style.display = "";
    document.querySelector("h1").style.display = "";
    

    var data = [
        {
          type: "scatterpolar",
          mode: "lines",
          r: [6, 6, 6, 6, 6, 6],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "#D3D3D3", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [4, 4, 4, 4, 4, 4],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "black", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [2, 2, 2, 2, 2, 2],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "#D3D3D3", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [8, 8, 0, 0, 0, 8],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "black", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [0, 8, 8, 0, 0, 0],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "black", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [0, 0, 8, 8, 0, 0],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "black", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [0, 0, 0, 8, 8, 0],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "black", width: 1 },
        },
        {
          type: "scatterpolar",
          mode: "lines",
          r: [8, 0, 0, 0, 8, 8],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          line: { color: "black", width: 1 },
        },
        {
          type: "scatterpolar",
          r: [
            love_language_count.a,
            love_language_count.b,
            love_language_count.c,
            love_language_count.d,
            love_language_count.e,
            love_language_count.a,
          ],
          theta: [
            "肯定<br>言語",
            "精心<br>時刻",
            "真心<br>禮物",
            "服務<br>行動",
            "身體<br>接觸",
            "肯定<br>言語",
          ],
          fill: "toself",
          fillcolor: love_language_FillColor,
          line: { color: love_language_FillColor },
          mode: "none",
        },
      ];

    var layout = {
    margin: { b: 30, t: 55, r: 30, l: 30, pad: 0 },
    font: {
      family: "'Noto Sans HK', Arial, sans-serif",
      size: 18,
      weight: 800,
    },
    polar: {
      bgcolor: "rgba(0,0,0,0)",
      angularaxis: {
        color: "transparent",
        gridcolor: "black",
        tickfont: { color: love_language_TextColor, weight: "bold" },
        rotation: 90,
      },
      radialaxis: {
        visible: false,
        range: [0, 8],
      },
    },
    showlegend: false,
    hovermode: false,
    height: 300,
    width: 300,
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };
  var config = {
    responsive: true,
    displaylogo: false,
    displayModeBar: false,
  };

    var config = { responsive: true, displaylogo: false, displayModeBar: false };
    Plotly.newPlot("myDiv", data, layout, config);

    

    if (!document.getElementById("img_div_content_id")) {
        setTimeout(function () {
            html2canvas(document.querySelector("#save_result"), { scale: 2 }).then(function (canvas) {
                var img_png = canvas.toDataURL("image/png");
                var img_div = document.createElement("div");
                var img_div_content = document.createElement("img");
                img_div_content.id = "img_div_content_id";
                var base64_svg = document.getElementById("base64_svg");
                img_div.style = "display: flex; justify-content: center;";
                img_div.appendChild(img_div_content);
                img_div_content.src = img_png;
                base64_svg.value = img_png;
                document.getElementById("svg_div").insertBefore(
                    img_div,
                    document.getElementById("save_div").parentNode
                );
                document.querySelector("#save_result").style.display = "none";
                document.querySelector("#svg_div").style.display = "";

                
                var data = new FormData(form);
                var action = e.target.action;
                fetch(action, {
                    method: "POST",
                    body: data,
                });
            });
        }, 1000);
    }
});

document.querySelector("#share_div")
    .setAttribute("data-clipboard-text", window.location.href);

document.querySelector("#share_div").addEventListener("click", function () {
    var shareData = {
        url: document.location.origin + document.location.pathname + 
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
