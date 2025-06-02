
var number_question = 26;
var name_question = "strengths_difficulties_questionnaire";
var max_item_score = 2
var scale_name = "長處和困難量表";
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

    
        // Define the scores that need to be subtracted from 2 (0-based indices)
        const inverseScores = [6, 10, 13, 20, 24];  // Empty array means no scores will be inverted
        const reverseScore = 2;
        // Indices for each scale (0-based)
        const emotionalIndices = [2, 7, 12, 15, 23];
        const conductIndices = [4, 6, 11, 17, 21];
        const hyperactivityIndices = [1, 9, 14, 20, 24];
        const peerIndices = [5, 10, 13, 18, 22];
        const prosocialIndices = [0, 3, 8, 16, 19];

        // Function to get score for a given item index, handling reverse scoring
        function getItemScore(name_question, i) {
            let score = parseInt(document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
            if (inverseScores.includes(i)) {
            score = reverseScore - score;
            }
            return score;
        }

        // Calculate scale sum
        function sumScale(indices, name_question) {
            return indices.reduce((sum, i) => sum + getItemScore(name_question, i), 0);
        }

        // Main calculation
        const emotional = sumScale(emotionalIndices, name_question);
        const conduct = sumScale(conductIndices, name_question);
        const hyperactivity = sumScale(hyperactivityIndices, name_question);
        const peer = sumScale(peerIndices, name_question);
        const prosocial = sumScale(prosocialIndices, name_question);

        // Total difficulties: sum of all except prosocial
        const totalDifficulties = emotional + conduct + hyperactivity + peer;        

    if (document.getElementById("user_name_manual").value != "") {
        participantName.textContent = document.getElementById("user_name_manual").value;
    }

    var category = document.getElementById(`${name_question}Category`);
    var description = document.getElementById(`${name_question}Description`);

        if (totalDifficulties <= 13) {
        category.textContent = "沒有/輕微徵狀";
        description.textContent = "在情緒、行為或人際關係等方面幾乎沒有或僅有輕微困難，屬於大多數人群的正常範圍";
        color = "#bcf0c2"; } else if (totalDifficulties <= 16) {
        category.textContent = "臨床門檻邊界";
        description.textContent = "在情緒、行為或人際關係等方面可能存在一定程度的困難，已接近需要關注的程度，如有需要，應尋求專業協助";
        color = "#ffcd94"; } else {
        category.textContent = "達臨床門檻邊界";
        description.textContent = "在情緒、行為或人際關係等方面有明顯的困難，可能存在較嚴重的情緒或行為問題。建議進行專業評估或介入";
        color = "#ffa3a3"; }

    document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
    document.getElementById(`${name_question}ResultDiv`).style.display = "";
    document.querySelector("h1").style.display = "";

    //new
  var data = [{
    type: 'scatterpolar',
    r: [emotional, conduct, hyperactivity, peer, prosocial, emotional],
    theta: ['情緒症狀', '行為問題', '注意力不足', '社交問題', '親社會行為', '情緒症狀'],
    fill: 'toself'
},
{
    type: 'scatterpolar',
    mode: 'lines',
    r: [10, 10, 10, 10, 10, 10],
    theta: ['情緒症狀', '行為問題', '注意力不足', '社交問題', '親社會行為', '情緒症狀'],
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
            range: [0, 10]
        }
    },
    showlegend: false,
    hovermode: false,
    height: 300
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
