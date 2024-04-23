var assessment_div = document.querySelector('ol');
var progress_div = document.getElementById('progress_div');

window.FloatingUIDOM.autoUpdate(assessment_div, progress_div, function () {
    window.FloatingUIDOM.computePosition(assessment_div, progress_div, {
        placement: 'bottom', // 'bottom' by default
        strategy: 'fixed',
        middleware: [window.FloatingUIDOM.offset(10), window.FloatingUIDOM.shift({ crossAxis: true, })],
    }).then(function (result) {
        Object.assign(progress_div.style, {
            left: result.x + "px",
            top: result.y + "px",
        });
    });
})
document.querySelectorAll("input[type=radio]").forEach(
    function (input) {
        input.addEventListener('click', function (event) {
            var numberTickedBoxes =
                document.querySelectorAll("input[type=radio]:checked").length;
            console.log(numberTickedBoxes)
            var numberTickedBoxes_percentage = Math.round(numberTickedBoxes / 36 * 100)
            document.querySelector('.progress-container').style.cssText = '--tooltip-width: ' + numberTickedBoxes_percentage + '%; width: 75%;'
            //document.querySelector('progress').value = numberTickedBoxes
            document.getElementById('progress_label').innerText = numberTickedBoxes + " / 36"
        })
    }
);

var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");

member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;
var form = document.getElementById('form_enneagram');

form.addEventListener("submit", function (e) {
    var enneagram_1_score = parseInt(document.querySelector('input[name="enneagram_1"]:checked').value);
    var enneagram_2_score = parseInt(document.querySelector('input[name="enneagram_2"]:checked').value);
    var enneagram_3_score = parseInt(document.querySelector('input[name="enneagram_3"]:checked').value);
    var enneagram_4_score = parseInt(document.querySelector('input[name="enneagram_4"]:checked').value);
    var enneagram_5_score = parseInt(document.querySelector('input[name="enneagram_5"]:checked').value);
    var enneagram_6_score = parseInt(document.querySelector('input[name="enneagram_6"]:checked').value);
    var enneagram_7_score = parseInt(document.querySelector('input[name="enneagram_7"]:checked').value);
    var enneagram_8_score = parseInt(document.querySelector('input[name="enneagram_8"]:checked').value);
    var enneagram_9_score = parseInt(document.querySelector('input[name="enneagram_9"]:checked').value);
    var enneagram_10_score = parseInt(document.querySelector('input[name="enneagram_10"]:checked').value);
    var enneagram_11_score = parseInt(document.querySelector('input[name="enneagram_11"]:checked').value);
    var enneagram_12_score = parseInt(document.querySelector('input[name="enneagram_12"]:checked').value);
    var enneagram_13_score = parseInt(document.querySelector('input[name="enneagram_13"]:checked').value);
    var enneagram_14_score = parseInt(document.querySelector('input[name="enneagram_14"]:checked').value);
    var enneagram_15_score = parseInt(document.querySelector('input[name="enneagram_15"]:checked').value);
    var enneagram_16_score = parseInt(document.querySelector('input[name="enneagram_16"]:checked').value);
    var enneagram_17_score = parseInt(document.querySelector('input[name="enneagram_17"]:checked').value);
    var enneagram_18_score = parseInt(document.querySelector('input[name="enneagram_18"]:checked').value);
    var enneagram_19_score = parseInt(document.querySelector('input[name="enneagram_19"]:checked').value);
    var enneagram_20_score = parseInt(document.querySelector('input[name="enneagram_20"]:checked').value);
    var enneagram_21_score = parseInt(document.querySelector('input[name="enneagram_21"]:checked').value);
    var enneagram_22_score = parseInt(document.querySelector('input[name="enneagram_22"]:checked').value);
    var enneagram_23_score = parseInt(document.querySelector('input[name="enneagram_23"]:checked').value);
    var enneagram_24_score = parseInt(document.querySelector('input[name="enneagram_24"]:checked').value);
    var enneagram_25_score = parseInt(document.querySelector('input[name="enneagram_25"]:checked').value);
    var enneagram_26_score = parseInt(document.querySelector('input[name="enneagram_26"]:checked').value);
    var enneagram_27_score = parseInt(document.querySelector('input[name="enneagram_27"]:checked').value);
    var enneagram_28_score = parseInt(document.querySelector('input[name="enneagram_28"]:checked').value);
    var enneagram_29_score = parseInt(document.querySelector('input[name="enneagram_29"]:checked').value);
    var enneagram_30_score = parseInt(document.querySelector('input[name="enneagram_30"]:checked').value);
    var enneagram_31_score = parseInt(document.querySelector('input[name="enneagram_31"]:checked').value);
    var enneagram_32_score = parseInt(document.querySelector('input[name="enneagram_32"]:checked').value);
    var enneagram_33_score = parseInt(document.querySelector('input[name="enneagram_33"]:checked').value);
    var enneagram_34_score = parseInt(document.querySelector('input[name="enneagram_34"]:checked').value);
    var enneagram_35_score = parseInt(document.querySelector('input[name="enneagram_35"]:checked').value);
    var enneagram_36_score = parseInt(document.querySelector('input[name="enneagram_36"]:checked').value);

    var enneagram_type_1 = enneagram_1_score + enneagram_10_score + enneagram_19_score + enneagram_28_score;
    var enneagram_type_2 = enneagram_2_score + enneagram_11_score + enneagram_20_score + enneagram_29_score;
    var enneagram_type_3 = enneagram_3_score + enneagram_12_score + enneagram_21_score + enneagram_30_score;
    var enneagram_type_4 = enneagram_4_score + enneagram_13_score + enneagram_22_score + enneagram_31_score;
    var enneagram_type_5 = enneagram_5_score + enneagram_14_score + enneagram_23_score + enneagram_32_score;
    var enneagram_type_6 = enneagram_6_score + enneagram_15_score + enneagram_24_score + enneagram_33_score;
    var enneagram_type_7 = enneagram_7_score + enneagram_16_score + enneagram_25_score + enneagram_34_score;
    var enneagram_type_8 = enneagram_8_score + enneagram_17_score + enneagram_26_score + enneagram_35_score;
    var enneagram_type_9 = enneagram_9_score + enneagram_18_score + enneagram_27_score + enneagram_36_score;

    if (isNaN(enneagram_type_1) || isNaN(enneagram_type_2) || isNaN(enneagram_type_3) || isNaN(enneagram_type_4) || isNaN(enneagram_type_5) || isNaN(enneagram_type_6) || isNaN(enneagram_type_7) || isNaN(enneagram_type_8) || isNaN(enneagram_type_9)) {
        return; //stop the execution of function
    }

    var data_form = new FormData(form);
    var action = e.target.action;
    fetch(action, {
        method: 'POST',
        body: data_form,
    })
    e.preventDefault();

    enneagramResult.innerHTML = "第一型 " + enneagram_type_1 + " 分" + "<br />" + "第二型 " + enneagram_type_2 + " 分" + "<br />" + "第三型 " + enneagram_type_3 + " 分" + "<br />" + "第四型 " + enneagram_type_4 + " 分" + "<br />" + "第五型 " + enneagram_type_5 + " 分" + "<br />" + "第六型 " + enneagram_type_6 + " 分" + "<br />" + "第七型 " + enneagram_type_7 + " 分" + "<br />" + "第八型 " + enneagram_type_8 + " 分" + "<br />" + "第九型 " + enneagram_type_9 + " 分";

    var enneagram_dictionary = { "第一型 理想崇高者": enneagram_type_1, "第二型 古道熱腸者": enneagram_type_2, "第三型 追求成功者": enneagram_type_3, "第四型 個人風格者": enneagram_type_4, "第五型 博學多聞者": enneagram_type_5, "第六型 謹慎忠誠者": enneagram_type_6, "第七型 樂於嘗新者": enneagram_type_7, "第八型 勇於領導者": enneagram_type_8, "第九型 愛好和平者": enneagram_type_9 };

    var enneagram_description_dictionary = { "第一型 理想崇高者<br />理想崇高者以正直、有道德觀、重視倫理道德為特點。他們追求真理和正義，對自己和他人要求公正無私。外表上，他們以整齊的外表和認真的態度示人。建議他們學會寬容和接受自己和他人的不完美之處，這樣可以減輕自我壓力並建立更和諧的關係。": enneagram_type_1, "第二型 古道熱腸者<br />古道熱腸者注重情感投入、體貼他人、關心他人和樂於助人。他們樂於幫助他人，常常把他人的需求放在自己之上。他們渴望被愛和感受愛的存在。建議他們要尊重他人的私人空間，平衡工作和人際關係，不要過度追求他人的讚賞。": enneagram_type_2, "第三型 追求成功者<br />追求成功者性格具有自信、有魅力、追求成就和優秀表現的特點。他們渴望被接受和感覺有價值，追求事業上的成功。然而，他們也需要避免急功近利，停下來反思自己的動機，並學會坦誠面對自己的弱點。": enneagram_type_3, "第四型 個人風格者<br />個人風格者性格以浪漫、情感豐富、追求個人獨特性為特點。他們渴望尋找特別和獨特的存在，追求深度和情感的體驗。建議他們避免盲目追求浪漫，停下來反思自己的情感，接受自己的內在並與他人建立聯繫。": enneagram_type_4, "第五型 博學多聞者<br />博學多聞者性格以理性、好奇心強、獨立思考和追求知識與理論為特點。他們渴望獲得知識，理解世界，喜歡獨立思考。建議他們不要過度與現實脫節，培養與他人的聯繫，勇於實踐自己的想法。": enneagram_type_5, "第六型 謹慎忠誠者<br />謹慎忠誠者性格以忠誠、負責任、戒心重和追求安全感為特點。他們常常感到不安全，因此追求安全感和得到他人的支持。建議他們要學會信任自己的直覺，面對恐懼，並發展獨立思考能力。": enneagram_type_6, "第七型 樂於嘗新者<br />樂於嘗新者性格以樂觀、富創意、追求快樂和尋求刺激為特點。他們渴望追求快樂，尋找刺激和新的體驗。然而，建議他們要學會專注內省，面對不適和責任，尋找內在的平靜。": enneagram_type_7, "第八型 勇於領導者<br />勇於領導者性格以自信、堅定、權威和積極主動為特點。他們追求自由、獨立和掌控權力，並具有保護自己和他人的傾向。挑戰者性格通常勇於面對困難，並努力達成目標。然而，建議他們要學會尊重他人的需求，容忍和諒解他人的觀點，並表達出自己的脆弱和柔情，以建立更和諧的關係。": enneagram_type_8, "第九型 愛好和平者<br />愛好和平者性格以和諧、冷靜、避免衝突和追求內在平靜為特點。他們渴望和諧的環境，避免爭執和緊張局勢。他們傾向於保持內心的平靜和穩定，並希望與他人建立和諧的關係。然而，他們也需要學會表達自己的需求和意見，不要過度迎合他人的期望。": enneagram_type_9 };

    var enneagram_max_value = Object.entries(enneagram_dictionary)
        .sort(function (a, b) {
            return b[1] - a[1];
        })
        .slice(0, 1)
        .map(function (arr) {
            return arr[1];
        });

    var enneagram_array = Object.entries(enneagram_dictionary);

    var select_enneagram_array = enneagram_array.filter(function (a) { return a[1] == enneagram_max_value[0] });

    var enneagram_top = select_enneagram_array.map(function (arr) {
        return arr[0];
    });

    var enneagram_description_array = Object.entries(enneagram_description_dictionary);

    var select_description_enneagram_array = enneagram_description_array.filter(function (a) { return a[1] == enneagram_max_value[0] });

    var enneagram_description_top = select_description_enneagram_array.map(function (arr) {
        return arr[0];
    });

    enneagramCategory.innerHTML = "以下是你最有可能屬於的九型人格<br />" + enneagram_top.join("、");

    enneagramDescription.innerHTML = "以下是你的九型人格描述<br />" + enneagram_description_top.join("<br /><br />");

    document.getElementById('enneagramQuestionresultDiv').style.display = 'none';
    document.getElementById('enneagramResultDiv').style.display = '';

    var data = [{
        type: 'scatterpolar',
        r: [enneagram_type_1, enneagram_type_2, enneagram_type_3, enneagram_type_4, enneagram_type_5, enneagram_type_6, enneagram_type_7, enneagram_type_8, enneagram_type_9, enneagram_type_1],
        theta: ['第一型', '第二型', '第三型', '第四型', '第五型', '第六型', '第七型', '第八型', '第九型', '第一型'],
        fill: 'toself'
    },
    {
        type: 'scatterpolar',
        mode: 'lines',
        r: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
        theta: ['第一型', '第二型', '第三型', '第四型', '第五型', '第六型', '第七型', '第八型', '第九型', '第一型'],
        line: { color: 'grey' }
    }]

    var layout = {
        margin: { b: 30, t: 30, r: 60, l: 60, pad: 0 }, font: {
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
                range: [0, 20]
            }
        },
        showlegend: false,
        hovermode: false,
        height: 300
    }
    var config = { responsive: true, displaylogo: false, displayModeBar: false }
    Plotly.newPlot('myDiv', data, layout, config);
    document.getElementById('block-bokss-page-title').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    
})
