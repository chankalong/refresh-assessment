
var number_question = 16;
var name_question = "child_parent_relationship";
var max_item_score = 5
var total_score = 75;
var scale_name = "親子關係量表";
var scale_name_plot = scale_name.replace('問卷','').replace('量表', '').replace('測試', '').replace('測驗', '');

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

    
        // Define the scores that need to be subtracted from 5 (0-based indices)
        const inverseScores = [1, 3, 7, 9, 10, 11, 12, 13];  // Empty array means no scores will be inverted
        const reverseScore = 5;
        // Initial sum
        var question_sum = 0;
        // Iterate over the score keys
        for (var i = 0; i <= (number_question - 2); i++) {
          var itemScore = parseInt(
            document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
          // Check if the score should be subtracted from reverseScore
          if (inverseScores.includes(i)) {
            question_sum += reverseScore - itemScore;
          } else {
            question_sum += itemScore;
          }
        }
        

    if (document.getElementById("user_name_manual").value != "") {
        participantName.textContent = document.getElementById("user_name_manual").value;
    }

    var category = document.getElementById(`${name_question}Category`);
    var description = document.getElementById(`${name_question}Description`);

        if (question_sum <= 25) {
        category.textContent = "親子關係有待加強";
        description.textContent = "您正用溫柔耐心澆灌親子關係，每次努力都是邁向更親近未來的希望。";
        color = "#f99a90"; } else if (question_sum <= 50) {
        category.textContent = "親子關係普通";
        description.textContent = "您的親子關係穩健前行，每一次對話和傾聽都在慢慢累積深厚的連結。";
        color = "#ffe09e"; } else if (question_sum <= 75) {
        category.textContent = "親子關係良好";
        description.textContent = "您與孩子之間洋溢理解與關愛，彼此心意相通，是生活中最溫暖的陪伴。";
        color = "#ceffbd"; }

    document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
    document.getElementById(`${name_question}ResultDiv`).style.display = "";
    document.querySelector("h1").style.display = "";

    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: question_sum,
        title: { text: scale_name_plot },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [0, total_score], tickvals: [0, total_score/2, total_score] },
            bar: { color: color, thickness: 1 },
            bgcolor: "white",
        },
    }];

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

    if (!document.getElementById("img_div_content_id")) {
        setTimeout(function () {
            html2canvas(document.querySelector("#save_result")).then(function (canvas) {
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
