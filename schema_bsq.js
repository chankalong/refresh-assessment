$(document).ready(function () {
  $("select").change(function () {
    $(this).blur();
  });
});
function bsqFunction() {
  var bsq_1_score = parseInt(document.querySelector('[name="bsq_1"]').value);
  var bsq_2_score = parseInt(document.querySelector('[name="bsq_2"]').value);
  var bsq_3_score = parseInt(document.querySelector('[name="bsq_3"]').value);
  var bsq_4_score = parseInt(document.querySelector('[name="bsq_4"]').value);
  var bsq_5_score = parseInt(document.querySelector('[name="bsq_5"]').value);
  var bsq_6_score = parseInt(document.querySelector('[name="bsq_6"]').value);
  var bsq_7_score = parseInt(document.querySelector('[name="bsq_7"]').value);
  var bsq_8_score = parseInt(document.querySelector('[name="bsq_8"]').value);
  var bsq_9_score = parseInt(document.querySelector('[name="bsq_9"]').value);
  var bsq_10_score = parseInt(document.querySelector('[name="bsq_10"]').value);

  var bsqScore_aband = bsq_1_score + bsq_2_score;
  var bsqScore_mistrust = bsq_3_score + bsq_4_score;
  var bsqScore_emotion = bsq_5_score + bsq_6_score;
  var bsqScore_defect = bsq_7_score + bsq_8_score;
  var bsqScore_subjugate = bsq_9_score + bsq_10_score;

  var bsqScore_aband_yes =
    bsq_1_score > 4 || bsq_2_score > 4 ? "害怕被離棄" : "no";
  var bsqScore_mistrust_yes =
    bsq_3_score > 4 || bsq_4_score > 4 ? "無法信任和傷害受虐" : "no";
  var bsqScore_emotion_yes =
    bsq_5_score > 4 || bsq_6_score > 4 ? "情感被剝奪" : "no";
  var bsqScore_defect_yes =
    bsq_7_score > 4 || bsq_8_score > 4 ? "缺陷自輕" : "no";
  var bsqScore_subjugate_yes =
    bsq_9_score > 4 || bsq_10_score > 4 ? "屈從討好" : "no";

  var bsqScore_yes_array = [
    bsqScore_aband_yes,
    bsqScore_mistrust_yes,
    bsqScore_emotion_yes,
    bsqScore_defect_yes,
    bsqScore_subjugate_yes,
  ];

  function checkScore(bsqScore_yes_array) {
    return bsqScore_yes_array != "no";
  }

  function printScore(value) {
    bsqScore_yes_array_final_text += value + "<br>";
  }

  var bsqScore_yes_array_final = bsqScore_yes_array.filter(checkScore);

  if (bsqScore_yes_array_final.length > 0) {
    var bsqScore_yes_array_final_text = "你可能擁有以下的人生困境︰" + "<br>";

    bsqScore_yes_array_final.forEach(printScore);
  } else {
    var bsqScore_yes_array_final_text = "你暫時未擁有任何的人生困境";
  }

  if (
    isNaN(bsqScore_aband) ||
    isNaN(bsqScore_mistrust) ||
    isNaN(bsqScore_emotion) ||
    isNaN(bsqScore_defect) ||
    isNaN(bsqScore_subjugate)
  ) {
    return; //stop the execution of function
  }
  bsqResult.innerHTML =
    "害怕被離棄 " +
    bsqScore_aband +
    " 分" +
    "<br />" +
    "無法信任和傷害受虐 " +
    bsqScore_mistrust +
    " 分" +
    "<br />" +
    "情感被剝奪 " +
    bsqScore_emotion +
    " 分" +
    "<br />" +
    "缺陷自輕 " +
    bsqScore_defect +
    " 分" +
    "<br />" +
    "屈從討好 " +
    bsqScore_subjugate +
    " 分";
  bsqCategory.innerHTML = bsqScore_yes_array_final_text;

  document.getElementById("bsqQuestionresultDiv").style.display = "none";
  document.getElementById("bsqResultDiv").style.display = "";

  var data = [
    {
      type: "scatterpolar",
      r: [
        bsqScore_aband,
        bsqScore_mistrust,
        bsqScore_emotion,
        bsqScore_defect,
        bsqScore_subjugate,
        bsqScore_aband,
      ],
      theta: [
        "害怕被離棄",
        "無法信任和傷害受虐",
        "情感被剝奪",
        "缺陷自輕立",
        "屈從討好",
        "害怕被離棄",
      ],
      fill: "toself",
    },
    {
      type: "scatterpolar",
      mode: "lines",
      r: [12, 12, 12, 12, 12, 12],
      theta: [
        "害怕被離棄",
        "無法信任和傷害受虐",
        "情感被剝奪",
        "缺陷自輕立",
        "屈從討好",
        "害怕被離棄",
      ],
      line: { color: "grey" },
    },
  ];

  var layout = {
    margin: { b: 30, t: 20, r: 70, l: 70, pad: 0 },
    font: {
      family: "Arial, sans-serif",
    },
    polar: {
      angularaxis: {
        color: "transparent",
        gridcolor: "grey",
        tickfont: { color: "grey" },
        rotation: 90,
      },
      radialaxis: {
        visible: false,
        range: [0, 12],
      },
    },
    showlegend: false,
    hovermode: false,
    height: 350,
  };

  var config = { responsive: true, displaylogo: false, displayModeBar: false };
  Plotly.newPlot("myDiv", data, layout, config);
  document
    .getElementById("block-bokss-page-title")
    .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}