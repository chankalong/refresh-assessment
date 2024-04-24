$(document).ready(function () {
  $("select").change(function () {
    $(this).blur();
  });
});
function asqFunction() {
  var asq_1_score = parseInt(document.querySelector('[name="asq_1"]').value);
  var asq_2_score = parseInt(document.querySelector('[name="asq_2"]').value);
  var asq_3_score = parseInt(document.querySelector('[name="asq_3"]').value);
  var asq_4_score = parseInt(document.querySelector('[name="asq_4"]').value);
  var asq_5_score = parseInt(document.querySelector('[name="asq_5"]').value);
  var asq_6_score = parseInt(document.querySelector('[name="asq_6"]').value);
  var asq_7_score = parseInt(document.querySelector('[name="asq_7"]').value);
  var asq_8_score = parseInt(document.querySelector('[name="asq_8"]').value);
  var asq_9_score = parseInt(document.querySelector('[name="asq_9"]').value);
  var asq_10_score = parseInt(document.querySelector('[name="asq_10"]').value);

  var asqScore =
    asq_1_score +
    asq_2_score +
    asq_3_score +
    asq_4_score +
    asq_5_score +
    asq_6_score +
    asq_7_score +
    asq_8_score +
    asq_9_score +
    asq_10_score;
  if (isNaN(asqScore)) {
    return; //stop the execution of function
  }
  asqResult.textContent = "結果 " + asqScore + " 分";
  if (asqScore >= 10 && asqScore <= 19) {
    asqDescription.textContent = "程度極低；你大概沒有這個人生困境";
    asqColor = "#4EC04E";
  }
  if (asqScore > 19 && asqScore <= 29) {
    asqDescription.textContent =
      "程度相常低；你的生活中可能偶爾會發生這個人生困境";
    asqColor = "#A7C44C";
  }
  if (asqScore > 29 && asqScore <= 39) {
    asqDescription.textContent = "程度中等；這個人生困境在你生活中構成一大問題";
    asqColor = "#FFC84A";
  }
  if (asqScore > 39 && asqScore <= 49) {
    asqDescription.textContent = "程度高；這是嚴重影響你的人生困境";
    asqColor = "#F48847";
  }
  if (asqScore > 49 && asqScore <= 60) {
    asqDescription.textContent = "程度極高；這是你的主要核心人生困境";
    asqColor = "#EB4841";
  }
  document.getElementById("asqQuestionresultDiv").style.display = "none";
  document.getElementById("asqResultDiv").style.display = "";

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: asqScore,
      title: { text: "分數" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [10, 60], tickvals: [10, 20, 40, 60] },
        bar: { color: asqColor, thickness: 1 },
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
  };
  var config = { responsive: true, displaylogo: false, displayModeBar: false };
  Plotly.newPlot("myDiv", data, layout, config);
  document
    .getElementById("block-bokss-page-title")
    .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}