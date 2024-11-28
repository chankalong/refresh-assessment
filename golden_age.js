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

var complete_time_textbox = document.getElementById("complete_time");

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

var radiosDistrict = document.querySelectorAll('input[name="district"]');
var workerSelect = document.getElementById('worker');
    
radiosDistrict.forEach(function(radio) {
        radio.addEventListener("change", function() {
            var val = this.value;
            workerSelect.innerHTML = options[val];
        });
    });

var options = {
    "灣仔": "<option disabled='disabled' selected='selected' value=''>-- 請選擇 --</option><option value='WC-Chan Lai Lai'>WC-Chan Lai Lai</option><option value='WC-Chan Lok Lam'>WC-Chan Lok Lam</option><option value='WC-Chan Mee Ki'>WC-Chan Mee Ki</option><option value='WC-Cheng Chiu Man'>WC-Cheng Chiu Man</option><option value='WC-Cheung Nga Wun'>WC-Cheung Nga Wun</option><option value='WC-Hui Nicky Kei Chung'>WC-Hui Nicky Kei Chung</option><option value='WC-Hui Wai Man'>WC-Hui Wai Man</option><option value='WC-Lai Sim'>WC-Lai Sim</option><option value='WC-Lam Hin Leung'>WC-Lam Hin Leung</option><option value='WC-Lam Wai Cheong'>WC-Lam Wai Cheong</option><option value='WC-Lau Pan Yuen'>WC-Lau Pan Yuen</option><option value='WC-Lee Chi Ching'>WC-Lee Chi Ching</option><option value='WC-Lee Yue Fung'>WC-Lee Yue Fung</option><option value='WC-Leung Wing Yan'>WC-Leung Wing Yan</option><option value='WC-Li Sin Ying Iris'>WC-Li Sin Ying Iris</option><option value='WC-Liu Ying Yiu Claudia'>WC-Liu Ying Yiu Claudia</option><option value='WC-Lo Yin Ling'>WC-Lo Yin Ling</option><option value='WC-Mak On Yi'>WC-Mak On Yi</option><option value='WC-Ngan Fan'>WC-Ngan Fan</option><option value='WC-Shum King Sun'>WC-Shum King Sun</option><option value='WC-Sze Nga Yan'>WC-Sze Nga Yan</option><option value='WC-Tse Wing Shan'>WC-Tse Wing Shan</option><option value='WC-Wong Shuk Fan'>WC-Wong Shuk Fan</option>",
    "港島東": "<option disabled='disabled' selected='selected' value=''>-- 請選擇 --</option><option value='HKE-Chan Hiu Yan'>HKE-Chan Hiu Yan</option><option value='HKE-Cheung Yin Mui'>HKE-Cheung Yin Mui</option><option value='HKE-Ho Kwok Fung'>HKE-Ho Kwok Fung</option><option value='HKE-Ho Suet Ying'>HKE-Ho Suet Ying</option><option value='HKE-Lai On Po'>HKE-Lai On Po</option><option value='HKE-Lam Lai Hong'>HKE-Lam Lai Hong</option><option value='HKE-Lau Kam Yu'>HKE-Lau Kam Yu</option><option value='HKE-Lau Man Ying'>HKE-Lau Man Ying</option><option value='HKE-Lee Lai Wan'>HKE-Lee Lai Wan</option><option value='HKE-Leung Ka Hei'>HKE-Leung Ka Hei</option><option value='HKE-Lo Chung Man'>HKE-Lo Chung Man</option><option value='HKE-Man Fung Yi Kat'>HKE-Man Fung Yi Kat</option><option value='HKE-Ng Fung Yi Allie'>HKE-Ng Fung Yi Allie</option><option value='HKE-Ng Tsz Chung'>HKE-Ng Tsz Chung</option><option value='HKE-Poon Po Ki'>HKE-Poon Po Ki</option><option value='HKE-Sun Chia Tsen'>HKE-Sun Chia Tsen</option><option value='HKE-Wong Man Kuen'>HKE-Wong Man Kuen</option><option value='HKE-Wong Man Yu'>HKE-Wong Man Yu</option><option value='HKE-Wong Wai Yan'>HKE-Wong Wai Yan</option><option value='HKE-Yau Yung Hon'>HKE-Yau Yung Hon</option><option value='HKE-Yim Sze Wai'>HKE-Yim Sze Wai</option><option value='HKE-Yu Wai Kit'>HKE-Yu Wai Kit</option>",
    "葵青": "<option disabled='disabled' selected='selected' value=''>-- 請選擇 --</option><option value='KT-Chan Chun Mong'>KT-Chan Chun Mong</option><option value='KT-Chan Kin Chung'>KT-Chan Kin Chung</option><option value='KT-Chan Man Hei'>KT-Chan Man Hei</option><option value='KT-Fong Ah Yung Naner'>KT-Fong Ah Yung Naner</option><option value='KT-Ho Yu Ting'>KT-Ho Yu Ting</option><option value='KT-Lai Yuk'>KT-Lai Yuk</option><option value='KT-Lau Pik Wai'>KT-Lau Pik Wai</option><option value='KT-Lee Tsz Mei'>KT-Lee Tsz Mei</option><option value='KT-Leung Chun Pong'>KT-Leung Chun Pong</option><option value='KT-Leung Lai Wan'>KT-Leung Lai Wan</option><option value='KT-Li Po Na'>KT-Li Po Na</option><option value='KT-Lo Ka Hao'>KT-Lo Ka Hao</option><option value='KT-Siu Sze Man'>KT-Siu Sze Man</option><option value='KT-So Cho Yiu'>KT-So Cho Yiu</option><option value='KT-Sze Hiu Shan'>KT-Sze Hiu Shan</option><option value='KT-To Chi Yam'>KT-To Chi Yam</option><option value='KT-Wong Kam Huen'>KT-Wong Kam Huen</option><option value='KT-Wong Kin Han'>KT-Wong Kin Han</option><option value='KT-Wong Kong Wan'>KT-Wong Kong Wan</option><option value='KT-Yau Lui Chi'>KT-Yau Lui Chi</option>",
    "其他": "<option disabled='disabled' selected='selected' value=''>-- 請選擇 --</option><option value='IMHS-Chan Ka Long'>IMHS-Chan Ka Long</option>"
};

var form = document.getElementById("form_golden_age");

form.addEventListener("submit", function (e) {
    try {
        var gad_0_score = parseInt(
          document.querySelector('input[name="gad_0"]:checked').value
        );
      }
      catch(err) {
        var gad_0_score = 'missing'
        console.log('no gad_0_score')
      }

      try {
        var gad_1_score = parseInt(
          document.querySelector('input[name="gad_1"]:checked').value
        );
      }
      catch(err) {
        var gad_1_score = 'missing'
        console.log('no gad_1_score')
      }

      try {
        var gad_2_score = parseInt(
          document.querySelector('input[name="gad_2"]:checked').value
        );
      }
      catch(err) {
        var gad_2_score = 'missing'
        console.log('no gad_2_score')
      }

      try {
        var gad_3_score = parseInt(
          document.querySelector('input[name="gad_3"]:checked').value
        );
      }
      catch(err) {
        var gad_3_score = 'missing'
        console.log('no gad_3_score')
      }

      try {
        var gad_4_score = parseInt(
          document.querySelector('input[name="gad_4"]:checked').value
        );
      }
      catch(err) {
        var gad_4_score = 'missing'
        console.log('no gad_4_score')
      }

      try {
        var gad_5_score = parseInt(
          document.querySelector('input[name="gad_5"]:checked').value
        );
      }
      catch(err) {
        var gad_5_score = 'missing'
        console.log('no gad_5_score')
      }

      try {
        var gad_6_score = parseInt(
          document.querySelector('input[name="gad_6"]:checked').value
        );
      }
      catch(err) {
        var gad_6_score = 'missing'
        console.log('no gad_6_score')
      }
  

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

  if (gad_6_score =='missing') {
    var gadScore = 'missing'
  } else {
    var gadScore =
    gad_0_score +
    gad_1_score +
    gad_2_score +
    gad_3_score +
    gad_4_score +
    gad_5_score +
    gad_6_score;
  }

  
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
  var psychological_flexibilityScore = 42 -
    (psychological_flexibility_0_score +
    psychological_flexibility_1_score +
    psychological_flexibility_2_score +
    psychological_flexibility_3_score +
    psychological_flexibility_4_score +
    psychological_flexibility_5_score +
    psychological_flexibility_6_score);

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
    gadCategory.textContent = "輕微";
    gadColor = "#FFC84A";
  } else if (gadScore > 9 && gadScore <= 14) {
    gadCategory.textContent = "中度";
    gadColor = "#F48847";
  } else if (gadScore > 14 && gadScore <= 21) {
    gadCategory.textContent = "嚴重";
    gadColor = "#EB4841";
  } else {
    console.log("no gad score");
  }

  if (phqScore >= 0 && phqScore <= 4) {
    phqCategory.textContent = "良好";
    phqColor = "#4EC04E";
  } else if (phqScore > 4 && phqScore <= 9) {
    phqCategory.textContent = "輕微";
    phqColor = "#FFC84A";
  } else if (phqScore > 9 && phqScore <= 14) {
    phqCategory.textContent = "中度";
    phqColor = "#F48847";
  } else if (phqScore > 14 && phqScore <= 19) {
    phqCategory.textContent = "嚴重";
    phqColor = "#f45e47";
  } else if (phqScore > 19 && phqScore <= 27) {
    phqCategory.textContent = "非常嚴重";
    phqColor = "#EB4841";
  } else {
    console.log("no phq score");
  }

  if (
    psychological_flexibilityScore >= 0 &&
    psychological_flexibilityScore <= 20
  ) {
    psychological_flexibilityCategory.textContent = "偏低";
    psychological_flexibilityColor = "#EB4841";
  } else if (
    psychological_flexibilityScore > 20 &&
    psychological_flexibilityScore <= 25
  ) {
    psychological_flexibilityCategory.textContent = "少許";
    psychological_flexibilityColor = "#F48847";
  } else if (
    psychological_flexibilityScore > 25 &&
    psychological_flexibilityScore <= 33
  ) {
    psychological_flexibilityCategory.textContent = "一般";
    psychological_flexibilityColor = "#FFC84A";
  } else if (
    psychological_flexibilityScore > 33 &&
    psychological_flexibilityScore <= 42
  ) {
    psychological_flexibilityCategory.textContent = "較高";
    psychological_flexibilityColor = "#4EC04E";
  } else {
    console.log("no psychological_flexibility score");
  }

  name_manual_member_id_answer.textContent = document.getElementById("name").value.concat(" （", document.querySelector('#manual_member_id').value, "）");
  complete_time_answer.textContent = dformat;
  //name_manual_member_id_answer.textContent = dformat;
  district_answer.textContent = document.querySelector('input[name="district"]:checked').value;
  
  phq_0_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_0"]:checked').id}"]`).innerText
  phq_1_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_1"]:checked').id}"]`).innerText
  phq_2_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_2"]:checked').id}"]`).innerText
  phq_3_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_3"]:checked').id}"]`).innerText
  phq_4_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_4"]:checked').id}"]`).innerText
  phq_5_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_5"]:checked').id}"]`).innerText
  phq_6_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_6"]:checked').id}"]`).innerText
  phq_7_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_7"]:checked').id}"]`).innerText
  phq_8_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="phq_8"]:checked').id}"]`).innerText
if (gadScore == 'missing') {
    console.log('no gad score')
} else {
    gad_0_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_0"]:checked').id}"]`).innerText
    gad_1_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_1"]:checked').id}"]`).innerText
    gad_2_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_2"]:checked').id}"]`).innerText
    gad_3_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_3"]:checked').id}"]`).innerText
    gad_4_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_4"]:checked').id}"]`).innerText
    gad_5_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_5"]:checked').id}"]`).innerText
    gad_6_answer.textContent = document.querySelector(`label[for="${document.querySelector('input[name="gad_6"]:checked').id}"]`).innerText
}


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

  document.getElementById("description").style.display = "none";
  document.getElementById("goldenAgeQuestionresultDiv").style.display = "none";
  document.getElementById("golden_ageResultDiv").style.display = "";

  if (gadScore == 'missing') {
    console.log('no gad score')
} else {
    var gad_data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: gadScore,
          title: { text: "焦慮" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 21], tickvals: [0, 10.5, 21] },
            bar: { color: gadColor, thickness: 1 },
            bgcolor: "white"
          },
        },
      ];
}

  

  var phq_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: phqScore,
      title: { text: "抑鬱" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 27], tickvals: [0, 13.5, 27] },
        bar: { color: phqColor, thickness: 1 },
        bgcolor: "white"
      },
    },
  ];

  var psychological_flexibility_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: psychological_flexibilityScore,
      title: { text: "心理彈性" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 42], tickvals: [0, 21, 42] },
        bar: { color: psychological_flexibilityColor, thickness: 1 },
        bgcolor: "white"
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
    paper_bgcolor: "transparent"
  };
  var config = { responsive: true, displaylogo: false, displayModeBar: false };


  if (gadScore == 'missing') {
    console.log('no gad score')
    var gad_plotly_div_parent_element = document.getElementById("gad_plotly_div_parent");
    gad_plotly_div_parent_element.parentNode.removeChild(gad_plotly_div_parent_element);
    var gad_answer_hr_element = document.getElementById("gad_answer_hr");
    gad_answer_hr_element.parentNode.removeChild(gad_answer_hr_element);
    var gad_answer_header_element = document.getElementById("gad_answer_header");
    gad_answer_header_element.parentNode.removeChild(gad_answer_header_element);
    var gad_answer_ol_element = document.getElementById("gad_answer_ol");
    gad_answer_ol_element.parentNode.removeChild(gad_answer_ol_element);

} else {
    Plotly.newPlot("gad_plotly_div", gad_data, layout, config);
}

  
  Plotly.newPlot("phq_plotly_div", phq_data, layout, config);
  Plotly.newPlot(
    "psychological_flexibility_plotly_div",
    psychological_flexibility_data,
    layout,
    config
  );
  //document
  //  .getElementById("block-bokss-page-title")
  //  .scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  document
      .querySelector(".fixed.bottom-0.right-4")
      .querySelector("button")
      .click();
  var html2canvas_count = 0;
  if (html2canvas_count == 0) {
    setTimeout(function () {
      html2canvas(document.querySelector("#golden_ageResultDiv")).then(function (canvas) {
        canvas_element = canvas;
        var img_png = canvas_element.toDataURL("image/png");
        var img_div = document.createElement("div");
        var img_div_content = document.createElement("img");
        img_div.style = "display: flex; justify-content: center;";
        img_div.appendChild(img_div_content);
        img_div_content.src = img_png;
        document
          .getElementById("svg_div")
          .insertBefore(
            img_div,
            document.getElementById("save_div").parentNode
          );
        document.querySelector("#golden_ageResultDiv").style.display = "none";
        document.querySelector("#svg_div").style.display = "";
        html2canvas_count = 1;
      });
    }, 1000);
  } else {
    console.log("create html2canvas");
  }
    
  
});

