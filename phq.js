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
  
  for (var i = 2; i <= 10; i++) {
    var targetId = "#phq_" + i + "_block";
    anime({
      targets: targetId,
      translateX: 20,
    });
  }
  
  var phq_1_next_button = document.getElementById("phq_1_next_button");
  var phq_1_next_function = function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#phq_1_block",
        easing: "easeOutExpo",
        translateX: -20,
        opacity: 0,
        complete: function () {
          document.getElementById("phq_1_block").style.display = "none";
          document.getElementById("phq_2_block").style.display = "";
        },
      })
      .add(
        {
          targets: "#phq_2_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  };
  Array.prototype.map.call(
    document.querySelectorAll("input[name=phq_0]"),
    function (e) {
      e.addEventListener("click", phq_1_next_function);
      e.addEventListener("click", function () {
        phq_1_next_button.addEventListener(
          "click",
          phq_1_next_function
        );
        phq_1_next_button.style.opacity = 1;
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
  
  for (var i = 1; i <= 8; i++) {
    AddFunctionListener(
      "phq_" + i,
      "phq_" + (i + 1),
      "phq_" + (i + 2)
    );
  }
  
  //##last
  
  var phq_10_previous_button = document.getElementById(
    "phq_10_previous_button"
  );
  phq_10_previous_button.addEventListener("click", function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#phq_10_block",
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
          document.getElementById("phq_9_block").style.display = "";
          document.getElementById("phq_10_block").style.display = "none";
        },
      })
      .add(
        {
          targets: "#phq_9_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  });
  
  var phq_10_next_button = document.getElementById("phq_10_next_button");
  var phq_10_next_function = function () {
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
    var districtOther = document.getElementById('district_other');

    function checkAndHide() {
        if (nameInput.value !== '' && (districtWC.checked || districtHKE.checked || districtKT.checked || districtOther.checked)) {
            phq_10_next_button.addEventListener("click", phq_10_next_function);
            phq_10_next_button.style.opacity = 1;
        } else {
            console.log('not fill-in')
        }
    }

    nameInput.addEventListener('input', checkAndHide);
    districtWC.addEventListener('change', checkAndHide);
    districtHKE.addEventListener('change', checkAndHide);
    districtKT.addEventListener('change', checkAndHide);
    districtOther.addEventListener('change', checkAndHide);
  
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

var worker_textbox = document.getElementById("worker");
  worker_textbox.value = new URLSearchParams(window.location.search).get('worker');

var form = document.getElementById("form_phq");

form.addEventListener("submit", function (e) {

  var phq_object = {};

    for (var i = 0; i <= 8; i++) {
        var inputName = 'phq_' + i;
        phq_object[inputName + '_score'] = parseInt(document.querySelector('input[name="' + inputName + '"]:checked').value);
    }

    function hasNull(element, index, array) {
        return element === null;
    }

    if (Object.values(phq_object).some(hasNull)) {
      return; //stop the execution of function
  }

  var phqScore = 0;

for (var key in phq_object) {
    if (key.startsWith('phq_') && !isNaN(phq_object[key])) {
      phqScore += phq_object[key];
    }
}  

  var data_form = new FormData(form);
  var action = e.target.action;
  fetch(action, {
    method: "POST",
    body: data_form,
  });
  e.preventDefault();

  if (phqScore >= 0 && phqScore <= 4) {
    phqCategory.textContent = "良好";
    phqColor = "#4EC04E";
  } else if (phqScore >= 5 && phqScore <= 9) {
    phqCategory.textContent = "輕微";
    phqColor = "#FFC84A";
  } else if (phqScore >= 10 && phqScore <= 14) {
    phqCategory.textContent = "中度";
    phqColor = "#F48847";
  } else if (phqScore >= 15 && phqScore <= 19) {
    phqCategory.textContent = "嚴重";
    phqColor = "#f45e47";
  } else if (phqScore >= 20 && phqScore <= 27) {
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
  document.getElementById("phqQuestionDiv").style.display = "none";
  document.getElementById("phqResultDiv").style.display = "";

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
      html2canvas(document.querySelector("#phqResultDiv")).then(function (canvas) {
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
        document.querySelector("#phqResultDiv").style.display = "none";
        document.querySelector("#svg_div").style.display = "";
        html2canvas_count = 1;
      });
    }, 1000);
  } else {
    console.log("create html2canvas");
  }
    
  
});
