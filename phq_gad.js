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
  var clipboardDemos = new ClipboardJS("#share_div");
  clipboardDemos.on("success", function (e) {
    e.clearSelection();
    console.info("Action:", e.action);
    console.info("Text:", e.text);
    console.info("Trigger:", e.trigger);
    showTooltip(e.trigger, "已複製問卷連結!");
    clearTooltip(e.trigger);
  });
  clipboardDemos.on("error", function (e) {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
    showTooltip(e.trigger, fallbackMessage(e.action));
  });
  document.querySelector("#start_div").addEventListener("click", function () {
    document.querySelector("#phq_gadIntroDiv").style.display = "none";
    document.querySelector("#phq_gadQuestionDiv").style.display = "";
    document.querySelector("h1").style.display = "none";
    document
      .querySelector(".fixed.bottom-0.right-4")
      .querySelector("button")
      .click();
  });
  
  document.querySelector(".page-title").style.marginBottom = "0px";
  for (var i = 2; i <= 7; i++) {
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
  var form = document.getElementById("form_phq_gad");
  
