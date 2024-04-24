$(document).ready(function () {
  $("select").change(function () {
    $(this).blur();
  });
});
function ssqFunction() {
  var ssq_1_score = parseInt(document.querySelector('[name="ssq_1"]').value);
  var ssq_2_score = parseInt(document.querySelector('[name="ssq_2"]').value);
  var ssq_3_score = parseInt(document.querySelector('[name="ssq_3"]').value);
  var ssq_4_score = parseInt(document.querySelector('[name="ssq_4"]').value);
  var ssq_5_score = parseInt(document.querySelector('[name="ssq_5"]').value);
  var ssq_6_score = parseInt(document.querySelector('[name="ssq_6"]').value);
  var ssq_7_score = parseInt(document.querySelector('[name="ssq_7"]').value);
  var ssq_8_score = parseInt(document.querySelector('[name="ssq_8"]').value);
  var ssq_9_score = parseInt(document.querySelector('[name="ssq_9"]').value);
  var ssq_10_score = parseInt(document.querySelector('[name="ssq_10"]').value);

  var ssqScore =
    ssq_1_score +
    ssq_2_score +
    ssq_3_score +
    ssq_4_score +
    ssq_5_score +
    ssq_6_score +
    ssq_7_score +
    ssq_8_score +
    ssq_9_score +
    ssq_10_score;
  if (isNaN(ssqScore)) {
    return; //stop the execution of function
  }
  ssqResult.textContent = "結果 " + ssqScore + " 分";
  if (ssqScore >= 10 && ssqScore <= 19) {
    ssqDescription.textContent = "程度極低；你大概沒有這個人生困境";
    ssqColor = "#4EC04E";
  }
  if (ssqScore > 19 && ssqScore <= 29) {
    ssqDescription.textContent =
      "程度相常低；你的生活中可能偶爾會發生這個人生困境";
    ssqColor = "#A7C44C";
  }
  if (ssqScore > 29 && ssqScore <= 39) {
    ssqDescription.textContent = "程度中等；這個人生困境在你生活中構成一大問題";
    ssqColor = "#FFC84A";
  }
  if (ssqScore > 39 && ssqScore <= 49) {
    ssqDescription.textContent = "程度高；這是嚴重影響你的人生困境";
    ssqColor = "#F48847";
  }
  if (ssqScore > 49 && ssqScore <= 60) {
    ssqDescription.textContent = "程度極高；這是你的主要核心人生困境";
    ssqColor = "#EB4841";
  }
  document.getElementById("ssqQuestionresultDiv").style.display = "none";
  document.getElementById("ssqResultDiv").style.display = "";

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: ssqScore,
      title: { text: "分數" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [10, 60], tickvals: [10, 20, 40, 60] },
        bar: { color: ssqColor, thickness: 1 },
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
