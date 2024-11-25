function clearTooltip(e) {
    setTimeout(function () {
      e.setAttribute("class", "btnRound btnRound-green mx-2");
      e.removeAttribute("aria-label");
    }, 2000);
  }
  function showTooltip(elem, msg) {
    elem.setAttribute(
      "class",
      "btnRound btnRound-green mx-2 tooltipped tooltipped-s"
    );
    elem.setAttribute("aria-label", msg);
  }
  function fallbackMessage(action) {
    var actionMsg = "";
    var actionKey = action === "cut" ? "X" : "C";
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      actionMsg = "No support :(";
    } else if (/Mac/i.test(navigator.userAgent)) {
      actionMsg = "Press ⌘-" + actionKey + " to " + action;
    } else {
      actionMsg = "Press Ctrl-" + actionKey + " to " + action;
    }
    return actionMsg;
  }
  
  for (var i = 2; i <= 5; i++) {
    var targetId = "#phq_gad_" + i + "_block";
    anime({
      targets: targetId,
      translateX: 20,
    });
  }
  
  var phq_gad_1_next_button = document.getElementById("phq_gad_1_next_button");
  var phq_gad_1_next_function = function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#phq_gad_1_block",
        easing: "easeOutExpo",
        translateX: -20,
        opacity: 0,
        complete: function () {
          document.getElementById("phq_gad_1_block").style.display = "none";
          document.getElementById("phq_gad_2_block").style.display = "";
        },
      })
      .add(
        {
          targets: "#phq_gad_2_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  };
  Array.prototype.map.call(
    document.querySelectorAll("input[name=phq_gad_0]"),
    function (e) {
      e.addEventListener("click", phq_gad_1_next_function);
      e.addEventListener("click", function () {
        phq_gad_1_next_button.addEventListener(
          "click",
          phq_gad_1_next_function
        );
        phq_gad_1_next_button.style.opacity = 1;
      });
    }
  );
  
  // Common function for handling previous and next buttons
  function handlePreviousButton(previousblockId, currentBlockId) {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#" + currentBlockId + "_block",
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
          document.querySelector("#" + currentBlockId + "_block").style.display =
            "none";
          document.querySelector("#" + previousblockId + "_block").style.display =
            "";
        },
      })
      .add(
        {
          targets: "#" + previousblockId + "_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  }
  
  function handleNextButton(currentBlockId, nextBlockId) {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#" + currentBlockId + "_block",
        easing: "easeOutExpo",
        translateX: -20,
        opacity: 0,
        complete: function () {
          document.querySelector("#" + currentBlockId + "_block").style.display =
            "none";
          document.querySelector("#" + nextBlockId + "_block").style.display = "";
        },
      })
      .add(
        {
          targets: "#" + nextBlockId + "_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  }
  
  function AddFunctionListener(previousblockId, currentBlockId, nextBlockId) {
    document
      .getElementById(currentBlockId + "_previous_button")
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
          document
            .getElementById(currentBlockId + "_next_button")
            .addEventListener("click", function () {
              handleNextButton(currentBlockId, nextBlockId);
            });
          document.getElementById(
            currentBlockId + "_next_button"
          ).style.opacity = 1;
        });
      }
    );
  }
  
  for (var i = 1; i <= 3; i++) {
    AddFunctionListener(
      "phq_gad_" + i,
      "phq_gad_" + (i + 1),
      "phq_gad_" + (i + 2)
    );
  }
  
  //##last
  
  var phq_gad_5_previous_button = document.getElementById(
    "phq_gad_5_previous_button"
  );
  phq_gad_5_previous_button.addEventListener("click", function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#phq_gad_5_block",
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
          document.getElementById("phq_gad_4_block").style.display = "";
          document.getElementById("phq_gad_5_block").style.display = "none";
        },
      })
      .add(
        {
          targets: "#phq_gad_4_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  });
  
  var phq_gad_5_next_button = document.getElementById("phq_gad_5_next_button");
  var phq_gad_5_next_function = function () {
    swal
      .fire({
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
  };

    var nameInput = document.getElementById('name');
    var districtWC = document.getElementById('district_wc');
    var districtHKE = document.getElementById('district_hke');
    var districtKT = document.getElementById('district_kt');

    function checkAndHide() {
        if (nameInput.value !== '' && (document.getElementById('district_wc').checked || document.getElementById('district_hke').checked || document.getElementById('district_kt').checked)) {
            phq_gad_5_next_button.addEventListener("click", phq_gad_5_next_function);
            phq_gad_5_next_button.style.opacity = 1;
        } else {
            console.log('not fill-in')
        }
    }

    nameInput.addEventListener('input', checkAndHide);
    districtWC.addEventListener('change', checkAndHide);
    districtHKE.addEventListener('change', checkAndHide);
    districtKT.addEventListener('change', checkAndHide);
  
  var system_id_textbox = document.getElementById("system_id");
  var member_id_textbox = document.getElementById("member_id");
  var canvas_element = document.createElement("canvas");
  
  member_id_textbox.value = drupalSettings.user.member_id;
  system_id_textbox.value = drupalSettings.bokss.user_uuid;

  var uid_textbox = document.getElementById("uid");
  var member_level_textbox = document.getElementById("member_level");
  var eap_company_textbox = document.getElementById("eap_company");

  if (uid_textbox.value) {console.log("input uid value already")} else {uid_textbox.value = Math.random();}
  if (drupalSettings.user.levels === undefined) {member_level_textbox.value = 0} else {member_level_textbox.value = drupalSettings.user.levels[0]}
  if (drupalSettings.user.eap === undefined) {eap_company_textbox.value = '0'} else {eap_company_textbox.value = drupalSettings.user.eap.label}

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

var activity_name_textbox = document.getElementById("activity_name");
  activity_name_textbox.value = new URLSearchParams(window.location.search).get('activity_name');

var form = document.getElementById("form_phq_gad");
if(screen.width <= 768) {
    document.getElementById("plot_all_div").style = 'display: flex; flex-direction: column; align-items: center;';
  }

form.addEventListener("submit", function (e) {
    
  

  var phq_1_score = parseInt(
    document.querySelector('input[name="phq_gad_0"]:checked').value
  );
  var phq_2_score = parseInt(
    document.querySelector('input[name="phq_gad_1"]:checked').value
  );
  var gad_1_score = parseInt(
    document.querySelector('input[name="phq_gad_2"]:checked').value
  );
  var gad_2_score = parseInt(
    document.querySelector('input[name="phq_gad_3"]:checked').value
  );
  

  
  var phqScore = phq_1_score + phq_2_score;
  var gadScore = gad_1_score + gad_2_score;

  if (isNaN(phqScore)) {
    return; //stop the execution of function
  }

  if (isNaN(gadScore)) {
    return; //stop the execution of function
  }
  var data_form = new FormData(form);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data_form,
  });
  e.preventDefault();

  if (gadScore >= 0 && gadScore <= 2) {
    gadCategory.textContent = "良好";
    gadColor = "#4EC04E";
  } else if (gadScore == 3) {
    gadCategory.textContent = "輕微";
    gadColor = "#FFC84A";
  } else if (gadScore == 4) {
    gadCategory.textContent = "中度";
    gadColor = "#F48847";
  } else if (gadScore == 5) {
    gadCategory.textContent = "嚴重";
    gadColor = "#f45e47";
  } else if (gadScore == 6) {
    gadCategory.textContent = "非常嚴重";
    gadColor = "#EB4841";
  } else {
    console.log("no gad score");
  }

  if (phqScore >= 0 && phqScore <= 2) {
    phqCategory.textContent = "良好";
    phqColor = "#4EC04E";
  } else if (phqScore == 3) {
    phqCategory.textContent = "輕微";
    phqColor = "#FFC84A";
  } else if (phqScore == 4) {
    phqCategory.textContent = "中度";
    phqColor = "#F48847";
  } else if (phqScore == 5) {
    phqCategory.textContent = "嚴重";
    phqColor = "#f45e47";
  } else if (phqScore == 6) {
    phqCategory.textContent = "非常嚴重";
    phqColor = "#EB4841";
  } else {
    console.log("no phq score");
  }

  name_manual_member_id_answer.textContent = document.getElementById("name").value;
  complete_time_answer.textContent = dformat;
  //name_manual_member_id_answer.textContent = dformat;
  district_answer.textContent = document.querySelector('input[name="district"]:checked').value;

  //document.getElementById("description").style.display = "none";
  document.getElementById("phq_gadQuestionDiv").style.display = "none";
  document.getElementById("phq_gadResultDiv").style.display = "";


    var gad_data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: gadScore,
          title: { text: "焦慮" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 6], tickvals: [0, 3, 6] },
            bar: { color: gadColor, thickness: 1 },
            bgcolor: "white"
          },
        },
      ];  

  var phq_data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: phqScore,
      title: { text: "抑鬱" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 6], tickvals: [0, 3, 6] },
        bar: { color: phqColor, thickness: 1 },
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

  
  Plotly.newPlot("phq_plotly_div", phq_data, layout, config);
    Plotly.newPlot("gad_plotly_div", gad_data, layout, config);
  
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
      html2canvas(document.querySelector("#phq_gadResultDiv")).then(function (canvas) {
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
        document.querySelector("#phq_gadResultDiv").style.display = "none";
        document.querySelector("#svg_div").style.display = "";
        html2canvas_count = 1;
      });
    }, 1000);
  } else {
    console.log("create html2canvas");
  }
    
  
});
