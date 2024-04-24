$(document).ready(function () {
  $("select").change(function () {
    $(this).blur();
  });
});
function dsqFunction() {
  var dsq_1_score = parseInt(document.querySelector('[name="dsq_1"]').value);
  var dsq_2_score = parseInt(document.querySelector('[name="dsq_2"]').value);
  var dsq_3_score = parseInt(document.querySelector('[name="dsq_3"]').value);
  var dsq_4_score = parseInt(document.querySelector('[name="dsq_4"]').value);
  var dsq_5_score = parseInt(document.querySelector('[name="dsq_5"]').value);
  var dsq_6_score = parseInt(document.querySelector('[name="dsq_6"]').value);
  var dsq_7_score = parseInt(document.querySelector('[name="dsq_7"]').value);
  var dsq_8_score = parseInt(document.querySelector('[name="dsq_8"]').value);
  var dsq_9_score = parseInt(document.querySelector('[name="dsq_9"]').value);
  var dsq_10_score = parseInt(document.querySelector('[name="dsq_10"]').value);

  var dsqScore =
    dsq_1_score +
    dsq_2_score +
    dsq_3_score +
    dsq_4_score +
    dsq_5_score +
    dsq_6_score +
    dsq_7_score +
    dsq_8_score +
    dsq_9_score +
    dsq_10_score;
  if (isNaN(dsqScore)) {
    return; //stop the execution of function
  }
  dsqResult.textContent = "結果 " + dsqScore + " 分";
  if (dsqScore >= 10 && dsqScore <= 19) {
    dsqDescription.textContent = "程度極低；你大概沒有這個人生困境";
    dsqColor = "#4EC04E";
  }
  if (dsqScore > 19 && dsqScore <= 29) {
    dsqDescription.textContent =
      "程度相常低；你的生活中可能偶爾會發生這個人生困境";
    dsqColor = "#A7C44C";
  }
  if (dsqScore > 29 && dsqScore <= 39) {
    dsqDescription.textContent = "程度中等；這個人生困境在你生活中構成一大問題";
    dsqColor = "#FFC84A";
  }
  if (dsqScore > 39 && dsqScore <= 49) {
    dsqDescription.textContent = "程度高；這是嚴重影響你的人生困境";
    dsqColor = "#F48847";
  }
  if (dsqScore > 49 && dsqScore <= 60) {
    dsqDescription.textContent = "程度極高；這是你的主要核心人生困境";
    dsqColor = "#EB4841";
  }
  document.getElementById("dsqQuestionresultDiv").style.display = "none";
  document.getElementById("dsqResultDiv").style.display = "";

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: dsqScore,
      title: { text: "分數" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [10, 60], tickvals: [10, 20, 40, 60] },
        bar: { color: dsqColor, thickness: 1 },
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