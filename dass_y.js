
var number_question = 22;
var name_question = "dass_y";
var max_item_score = 3
var scale_name = "情緒自評量表 - 青少年版";

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

    
        // Define which items belong to each subscale (converting to 0-based indices)
        const depressionItems = [2, 4, 9, 12, 15, 16, 20];  // Items 3, 5, 10, 13, 16, 17, 21
        const anxietyItems = [1, 3, 6, 8, 14, 18, 19];      // Items 2, 4, 7, 9, 15, 19, 20
        const stressItems = [0, 5, 7, 10, 11, 13, 17];      // Items 1, 6, 8, 11, 12, 14, 18

        // Initialize subscale sums
        var depression_sum = 0;
        var anxiety_sum = 0;
        var stress_sum = 0;

        // Iterate over all 21 questions (0-based indices 0-20)
        for (var i = 0; i <= (number_question - 2); i++) {
        var itemScore = parseInt(
            document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
        
        // Add to appropriate subscale based on item assignment
        if (depressionItems.includes(i)) {
            depression_sum += itemScore;
        } else if (anxietyItems.includes(i)) {
            anxiety_sum += itemScore;
        } else if (stressItems.includes(i)) {
            stress_sum += itemScore;
        }
        }

        // Multiply each subscale by 2
        depression_sum *= 2;
        anxiety_sum *= 2;
        stress_sum *= 2;

        var total_score = depression_sum + anxiety_sum + stress_sum;
        

    if (document.getElementById("user_name_manual").value != "") {
        participantName.textContent = document.getElementById("user_name_manual").value;
    }

    var category = document.getElementById(`${name_question}Category`);
    var description = document.getElementById(`${name_question}Description`);

    if (total_score >= 0 && total_score <= 23) {
        category.textContent = "健康";
        description.textContent = "您的情緒健康狀況在正常範圍內。您能夠很好地應對生活挑戰，並保持良好的心理健康。";
    } else if (total_score >= 24 && total_score <= 29) {
        category.textContent = "輕度情緒困擾";
        description.textContent = "您正經歷輕度情緒困擾。雖然您可能在情緒、焦慮或壓力方面有一些挑戰，但這些通常是可控的，不會嚴重影響您的生活。";
    } else if (total_score >= 30 && total_score <= 39) {
        category.textContent = "中度情緒困擾";
        description.textContent = "您正經歷中度情緒困擾。您可能正在與抑鬱、焦慮和壓力症狀的組合作鬥爭，這些開始顯著影響您的日常功能和生活品質。";
    } else if (total_score >= 40 && total_score <= 46) {
        category.textContent = "嚴重情緒困擾";
        description.textContent = "您正經歷嚴重情緒困擾。您可能正在與抑鬱、焦慮和壓力方面的顯著症狀作鬥爭，這些嚴重干擾您在生活重要領域中有效運作的能力。";
    } else if (total_score >= 47) {
        category.textContent = "極度嚴重情緒困擾";
        description.textContent = "您正經歷極度嚴重情緒困擾。您可能被抑鬱、焦慮和壓力的強烈症狀所壓倒，嚴重損害您的日常功能。強烈建議立即尋求專業協助。";
    }

    document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
    document.getElementById(`${name_question}ResultDiv`).style.display = "";
    document.querySelector("h1").style.display = "";

    //new
  var data = [{
    type: 'scatterpolar',
    r: [depression_sum, anxiety_sum, stress_sum, depression_sum],
    theta: ['抑鬱', '焦慮', '壓力', '抑鬱'],
    fill: 'toself'
},
{
    type: 'scatterpolar',
    mode: 'lines',
    r: [42, 42, 42, 42],
    theta: ['抑鬱', '焦慮', '壓力', '抑鬱'],
    line: { color: 'grey' },
    title: { text: '理想值' }
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
            range: [0, 42]
        }
    },
    showlegend: false,
    hovermode: false,
    height: 300
}

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
