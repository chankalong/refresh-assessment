
var number_question = 14;
var name_question = "healthy_relationship";
var max_item_score = 1
var total_score = 13;
var scale_name = "健康關係問卷";

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

var form = document.getElementById(`form_${name_question}`);
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Define the scores that need to be subtracted from 4
    const inverseScores = [2, 5];
    // Initial sum
    var question_sum = 0;
    // Iterate over the score keys
    for (var i = 0; i <= (number_question - 2); i++) {
      var itemScore = parseInt(
        document.querySelector(`input[name="${name_question}_${i}"]:checked`).value);
      // Check if the score should be subtracted from 4
      if (inverseScores.includes(i)) {
        question_sum += 4 - itemScore;
      } else {
        question_sum += itemScore;
      }
    }

    if (document.getElementById("user_name_manual").value != "") {
        participantName.textContent = document.getElementById("user_name_manual").value;
    }

    var category = document.getElementById(`${name_question}Category`);
    var description = document.getElementById(`${name_question}Description`);

    if (question_sum <= 6) {
        category.textContent = "關係需要更多關心";
        description.textContent = "親愛的，看得出你很重視這段關係。目前你和對方在價值觀和行為模式上，可能還在探索磨合。這是一個很好的契機，溫柔地檢視關係，一起努力調整。別灰心，關係成長需要時間。專業協助能提供方向，陪伴你們朝更和諧親密的關係前進。";
        color = "#D0D8E0";
    } else if (question_sum <= 10) {
        category.textContent = "關係正在成長";
        description.textContent = "太好了！看得出你和對方都為關係投入心力！你們在價值觀和行為上已建立一定共識，這是很棒的開始，關係有持續成長的潛力。不妨更深入交流想法，分享生活點滴，讓關係更緊密豐富。每個用心都能為關係帶來更多美好色彩！";
        color = "#A9DFBF";
    } else {
        category.textContent = "關係真摯美好";
        description.textContent = "太棒了！看得出你和對方都非常珍惜這段關係。你們在價值觀和行為上契合度很高，真是令人羨慕的健康關係！恭喜你們！請繼續保持真誠與理解，珍惜呵護關係，讓愛與支持流動，共同創造更多美好回憶，讓這份美好關係成為彼此最堅實的後盾。";
        color = "#FAD7A0";
    }

    document.getElementById(`${name_question}QuestionDiv`).style.display = "none";
    document.getElementById(`${name_question}ResultDiv`).style.display = "";
    document.querySelector("h1").style.display = "";

    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: question_sum,
        title: { text: scale_name },
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
