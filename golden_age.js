var system_id_textbox = document.getElementById("system_id");
var member_id_textbox = document.getElementById("member_id");
member_id_textbox.value = drupalSettings.user.member_id;
system_id_textbox.value = drupalSettings.bokss.user_uuid;

var uid_textbox = document.getElementById("uid");
var member_level_textbox = document.getElementById("member_level");
var eap_company_textbox = document.getElementById("eap_company");

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

var form = document.getElementById("form_golden_age");

form.addEventListener("submit", function (e) {
  var gad_0_score = parseInt(
    document.querySelector('input[name="gad_0"]:checked').value
  );
  var gad_1_score = parseInt(
    document.querySelector('input[name="gad_1"]:checked').value
  );
  var gad_2_score = parseInt(
    document.querySelector('input[name="gad_2"]:checked').value
  );
  var gad_3_score = parseInt(
    document.querySelector('input[name="gad_3"]:checked').value
  );
  var gad_4_score = parseInt(
    document.querySelector('input[name="gad_4"]:checked').value
  );
  var gad_5_score = parseInt(
    document.querySelector('input[name="gad_5"]:checked').value
  );
  var gad_6_score = parseInt(
    document.querySelector('input[name="gad_6"]:checked').value
  );

  var phq_0_score = parseInt(
    document.querySelector('input[name="phq_0"]:checked').value
  );
  var phq_1_score = parseInt(
    document.querySelector('input[name="phq_1"]:checked').value
  );
  var phq_2_score = parseInt(
    document.querySelector('input[name="phq_2"]:checked').value
  );
  var phq_3_score = parseInt(
    document.querySelector('input[name="phq_3"]:checked').value
  );
  var phq_4_score = parseInt(
    document.querySelector('input[name="phq_4"]:checked').value
  );
  var phq_5_score = parseInt(
    document.querySelector('input[name="phq_5"]:checked').value
  );
  var phq_6_score = parseInt(
    document.querySelector('input[name="phq_6"]:checked').value
  );
  var phq_7_score = parseInt(
    document.querySelector('input[name="phq_7"]:checked').value
  );
  var phq_8_score = parseInt(
    document.querySelector('input[name="phq_8"]:checked').value
  );

  var psychological_flexibility_0_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_0"]:checked')
      .value
  );
  var psychological_flexibility_1_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_1"]:checked')
      .value
  );
  var psychological_flexibility_2_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_2"]:checked')
      .value
  );
  var psychological_flexibility_3_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_3"]:checked')
      .value
  );
  var psychological_flexibility_4_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_4"]:checked')
      .value
  );
  var psychological_flexibility_5_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_5"]:checked')
      .value
  );
  var psychological_flexibility_6_score = parseInt(
    document.querySelector('input[name="psychological_flexibility_6"]:checked')
      .value
  );

  var gadScore =
    gad_0_score +
    gad_1_score +
    gad_2_score +
    gad_3_score +
    gad_4_score +
    gad_5_score +
    gad_6_score;
  var phqScore =
    phq_0_score +
    phq_1_score +
    phq_2_score +
    phq_3_score +
    phq_4_score +
    phq_5_score +
    phq_6_score +
    phq_7_score +
    phq_8_score;
  var psychological_flexibilityScore =
    psychological_flexibility_0_score +
    psychological_flexibility_1_score +
    psychological_flexibility_2_score +
    psychological_flexibility_3_score +
    psychological_flexibility_4_score +
    psychological_flexibility_5_score +
    psychological_flexibility_6_score;

  if (isNaN(phqScore)) {
    return; //stop the execution of function
  }

  if (isNaN(psychological_flexibilityScore)) {
    return; //stop the execution of function
  }
  var data_form = new FormData(form);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data_form,
  });
  e.preventDefault();

  if (gadScore >= 0 && gadScore <= 4) {
    gadCategory.textContent = "良好";
    gadColor = "#4EC04E";
  } else if (gadScore > 4 && gadScore <= 9) {
    gadCategory.textContent = "輕微焦慮";
    gadColor = "#FFC84A";
  } else if (gadScore > 9 && gadScore <= 14) {
    gadCategory.textContent = "中度焦慮";
    gadColor = "#F48847";
  } else if (gadScore > 14 && gadScore <= 21) {
    gadCategory.textContent = "嚴重焦慮";
    gadColor = "#EB4841";
  } else {
    console.log("no gad score");
  }

  if (phqScore >= 0 && phqScore <= 4) {
    phqCategory.textContent = "良好";
    phqColor = "#4EC04E";
  } else if (phqScore > 4 && phqScore <= 9) {
    phqCategory.textContent = "輕微焦慮";
    phqColor = "#FFC84A";
  } else if (phqScore > 9 && phqScore <= 14) {
    phqCategory.textContent = "中度焦慮";
    phqColor = "#F48847";
  } else if (phqScore > 14 && phqScore <= 27) {
    phqCategory.textContent = "嚴重焦慮";
    phqColor = "#EB4841";
  } else {
    console.log("no phq score");
  }

  if (
    psychological_flexibilityScore >= 0 &&
    psychological_flexibilityScore <= 4
  ) {
    psychological_flexibilityCategory.textContent = "良好";
    psychological_flexibilityColor = "#4EC04E";
  } else if (
    psychological_flexibilityScore > 4 &&
    psychological_flexibilityScore <= 9
  ) {
    psychological_flexibilityCategory.textContent = "輕微焦慮";
    psychological_flexibilityColor = "#FFC84A";
  } else if (
    psychological_flexibilityScore > 9 &&
    psychological_flexibilityScore <= 14
  ) {
    psychological_flexibilityCategory.textContent = "中度焦慮";
    psychological_flexibilityColor = "#F48847";
  } else if (
    psychological_flexibilityScore > 14 &&
    psychological_flexibilityScore <= 42
  ) {
    psychological_flexibilityCategory.textContent = "嚴重焦慮";
    psychological_flexibilityColor = "#EB4841";
  } else {
    console.log("no psychological_flexibility score");
  }

  manual_member_id_answer.textContent = document.querySelector('#manual_member_id').value;
  phq_0_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_0"]:checked').id}"]`).innerText
  phq_1_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_1"]:checked').id}"]`).innerText
  phq_2_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_2"]:checked').id}"]`).innerText
  phq_3_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_3"]:checked').id}"]`).innerText
  phq_4_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_4"]:checked').id}"]`).innerText
  phq_5_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_5"]:checked').id}"]`).innerText
  phq_6_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_6"]:checked').id}"]`).innerText
  phq_7_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_7"]:checked').id}"]`).innerText
  phq_8_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_8"]:checked').id}"]`).innerText

  gad_0_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_0"]:checked').id}"]`).innerText
  gad_1_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_1"]:checked').id}"]`).innerText
  gad_2_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_2"]:checked').id}"]`).innerText
  gad_3_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_3"]:checked').id}"]`).innerText
  gad_4_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_4"]:checked').id}"]`).innerText
  gad_5_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_5"]:checked').id}"]`).innerText
  gad_6_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_6"]:checked').id}"]`).innerText

  const flexibilityScoreMapping = {
    0: '從不',
    1: '很少',
    2: '偶爾',
    3: '有時候',
    4: '很多時',
    5: '頗經常',
    6: '經常'
  };
  
  // Function to get the answer based on the score
  function getFlexibilityAnswer(score) {
    return flexibilityScoreMapping[score] || 'no answer';
  }
  
  // Example usage:
  psychological_flexibility_0_answer.textContent = getFlexibilityAnswer(psychological_flexibility_0_score);
  psychological_flexibility_1_answer.textContent = getFlexibilityAnswer(psychological_flexibility_1_score);
  psychological_flexibility_2_answer.textContent = getFlexibilityAnswer(psychological_flexibility_2_score);
  psychological_flexibility_3_answer.textContent = getFlexibilityAnswer(psychological_flexibility_3_score);
  psychological_flexibility_4_answer.textContent = getFlexibilityAnswer(psychological_flexibility_4_score);
  psychological_flexibility_5_answer.textContent = getFlexibilityAnswer(psychological_flexibility_5_score);
  psychological_flexibility_6_answer.textContent = getFlexibilityAnswer(psychological_flexibility_6_score);

  document.getElementById("goldenAgeQuestionresultDiv").style.display = "none";
  document.getElementById("golden_ageResultDiv").style.display = "";

  var gad_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: gadScore,
      title: { text: "分數" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 21], tickvals: [0, 10.5, 21] },
        bar: { color: gadColor, thickness: 1 },
      },
    },
  ];

  var phq_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: phqScore,
      title: { text: "分數" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 27], tickvals: [0, 13.5, 27] },
        bar: { color: phqColor, thickness: 1 },
      },
    },
  ];

  var psychological_flexibility_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: psychological_flexibilityScore,
      title: { text: "分數" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 42], tickvals: [0, 21, 42] },
        bar: { color: psychological_flexibilityColor, thickness: 1 },
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
  Plotly.newPlot("gad_plotly_div", gad_data, layout, config);
  Plotly.newPlot("phq_plotly_div", phq_data, layout, config);
  Plotly.newPlot(
    "psychological_flexibility_plotly_div",
    psychological_flexibility_data,
    layout,
    config
  );
  document
    .getElementById("block-bokss-page-title")
    .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});
