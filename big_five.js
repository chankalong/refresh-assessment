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
    document.querySelector("#big_fiveIntroDiv").style.display = "none";
    document.querySelector("#big_fiveQuestionDiv").style.display = "";
    document.querySelector("h1").style.display = "none";
    document
      .querySelector(".fixed.bottom-0.right-4")
      .querySelector("button")
      .click();
  });

  document.querySelector(".page-title").style.marginBottom = "0px";
  for (var i = 2; i <= 50; i++) {
    var targetId = "#big_five_" + i + "_block";
    anime({
      targets: targetId,
      translateX: 20,
    });
  }

  var big_five_1_next_button = document.getElementById(
    "big_five_1_next_button"
  );
  var big_five_1_next_function = function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#big_five_1_block",
        easing: "easeOutExpo",
        translateX: -20,
        opacity: 0,
        complete: function () {
          document.getElementById("big_five_1_block").style.display =
            "none";
          document.getElementById("big_five_2_block").style.display = "";
        },
      })
      .add(
        {
          targets: "#big_five_2_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  };
  Array.prototype.map.call(
    document.querySelectorAll("input[name=big_five_0]"),
    function (e) {
      e.addEventListener("click", big_five_1_next_function);
      e.addEventListener("click", function () {
        big_five_1_next_button.addEventListener(
          "click",
          big_five_1_next_function
        );
        big_five_1_next_button.style.opacity = 1;
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
          document.querySelector(
            "#" + currentBlockId + "_block"
          ).style.display = "none";
          document.querySelector(
            "#" + previousblockId + "_block"
          ).style.display = "";
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
          document.querySelector(
            "#" + currentBlockId + "_block"
          ).style.display = "none";
          document.querySelector("#" + nextBlockId + "_block").style.display =
            "";
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

  for (var i = 1; i <= 48; i++) {
    AddFunctionListener(
      "big_five_" + i,
      "big_five_" + (i + 1),
      "big_five_" + (i + 2)
    );
  }

  //##last

  var big_five_50_previous_button = document.getElementById(
    "big_five_50_previous_button"
  );
  big_five_50_previous_button.addEventListener("click", function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#big_five_50_block",
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
          document.getElementById("big_five_49_block").style.display = "";
          document.getElementById("big_five_50_block").style.display =
            "none";
        },
      })
      .add(
        {
          targets: "#big_five_49_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  });

  var big_five_50_next_button = document.getElementById(
    "big_five_50_next_button"
  );
  var big_five_50_next_function = function () {
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

  Array.prototype.map.call(
    document.querySelectorAll("input[name=big_five_49]"),
    function (e) {
      e.addEventListener("click", big_five_50_next_function);
      e.addEventListener("click", function () {
        big_five_50_next_button.addEventListener(
          "click",
          big_five_50_next_function
        );
        big_five_50_next_button.style.opacity = 1;
      });
    }
  );

  var system_id_textbox = document.getElementById("system_id");
  var member_id_textbox = document.getElementById("member_id");
  var uid_textbox = document.getElementById("uid");
  var canvas_element = document.createElement("canvas");

  member_id_textbox.value = drupalSettings.user.member_id;
  system_id_textbox.value = drupalSettings.bokss.user_uuid;
  if (uid_textbox.value) {console.log("input uid value already")} else {uid_textbox.value = Math.random();}
  
  var form = document.getElementById("form_big_five");

  form.addEventListener("submit", function (e) {
    var big_five_object = {};

    

    for (var i = 0; i <= 49; i++) {
      var inputName = "big_five_" + i;
      big_five_object[inputName + "_score"] = document.querySelector(
        'input[name="' + inputName + '"]:checked'
      ).value;
    }

    function hasNull(element, index, array) {
      return element === null;
    }

    var big_fiveScore = Object.values(big_five_object);

    if (big_fiveScore.some(hasNull)) {
      return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    });
    e.preventDefault();

    //score

    var big_five_extraversion = 20 + big_five_object['big_five_0_score'] - big_five_object['big_five_5_score'] + big_five_object['big_five_10_score'] - big_five_object['big_five_15_score'] + big_five_object['big_five_20_score'] - big_five_object['big_five_25_score'] + big_five_object['big_five_30_score'] - big_five_object['big_five_35_score'] + big_five_object['big_five_40_score'] - big_five_object['big_five_45_score'];
    var big_five_agreeableness = 14 - big_five_object['big_five_1_score'] + big_five_object['big_five_6_score'] - big_five_object['big_five_11_score'] + big_five_object['big_five_16_score'] - big_five_object['big_five_21_score'] + big_five_object['big_five_26_score'] - big_five_object['big_five_31_score'] + big_five_object['big_five_36_score'] + big_five_object['big_five_41_score'] + big_five_object['big_five_46_score'];
    var big_five_conscientiousness = 14 + big_five_object['big_five_2_score'] - big_five_object['big_five_7_score'] + big_five_object['big_five_12_score'] - big_five_object['big_five_17_score'] + big_five_object['big_five_22_score'] - big_five_object['big_five_27_score'] + big_five_object['big_five_32_score'] - big_five_object['big_five_37_score'] + big_five_object['big_five_42_score'] + big_five_object['big_five_47_score'];
    var big_five_neuroticism = 38 - big_five_object['big_five_3_score'] + big_five_object['big_five_8_score'] - big_five_object['big_five_13_score'] + big_five_object['big_five_18_score'] - big_five_object['big_five_23_score'] - big_five_object['big_five_28_score'] - big_five_object['big_five_33_score'] - big_five_object['big_five_38_score'] - big_five_object['big_five_43_score'] - big_five_object['big_five_48_score'];
    var big_five_openness = 8 + big_five_object['big_five_4_score'] - big_five_object['big_five_9_score'] + big_five_object['big_five_14_score'] - big_five_object['big_five_19_score'] + big_five_object['big_five_24_score'] - big_five_object['big_five_29_score'] + big_five_object['big_five_34_score'] + big_five_object['big_five_39_score'] + big_five_object['big_five_44_score'] + big_five_object['big_five_49_score'];



    var big_five_factor_object = { "big_five_extraversion": big_five_extraversion, "big_five_agreeableness": big_five_agreeableness, "big_five_conscientiousness": big_five_conscientiousness, "big_five_neuroticism": big_five_neuroticism, "big_five_openness": big_five_openness };
    var sortedKeys_big_five_factor_object = Object.keys(big_five_factor_object).sort(function (a, b) {
        return big_five_factor_object[b] - big_five_factor_object[a];
    });
    //var sortedKeys_big_five_factor_object_high_two = sortedKeys_big_five_factor_object[0] + sortedKeys_big_five_factor_object[1]
    //var sortedKeys_big_five_factor_object_high_one = sortedKeys_big_five_factor_object[0]

      const resultBgSources = {
        "big_five_extraversion": "/sites/default/files/inpages/assessment/big-five/e.jpg",
        "big_five_agreeableness": "/sites/default/files/inpages/assessment/big-five/a.jpg",
        "big_five_conscientiousness": "/sites/default/files/inpages/assessment/big-five/c.jpg",
        "big_five_neuroticism": "/sites/default/files/inpages/assessment/big-five/n.jpg",
        "default": "/sites/default/files/inpages/assessment/big-five/o.jpg"
      };
      
      const resultDiv = document.getElementById("test_result_img");
      const trait = sortedKeys_big_five_factor_object[0];
      resultDiv.src = resultBgSources[trait] || resultBgSources["default"];

      const divColor = {
        "big_five_extraversion": "#EFEBDE",
        "big_five_agreeableness": "#FFEEC7",
        "big_five_conscientiousness": "#D5ECF4",
        "big_five_neuroticism": "#C3F6E9",
        "default": "#FFD7D7"
      };

      const plotFillColor = {
        "big_five_extraversion": "rgba(155, 147, 121, 0.8)",
        "big_five_agreeableness": "rgba(216, 166, 51, 0.8)",
        "big_five_conscientiousness": "rgba(105, 193, 224, 0.8)",
        "big_five_neuroticism": "rgba(35, 215, 168, 0.8)",
        "default": "rgba(247, 122, 121, 0.8)"
      };

      const plotTextColor = {
        "big_five_extraversion": "#9B9379",
        "big_five_agreeableness": "#D8A633",
        "big_five_conscientiousness": "#69C1E0",
        "big_five_neuroticism": "#23D7A8",
        "default": "#F77A79"
      };
      
      const big_FillColor = plotFillColor[trait] || plotFillColor["default"];
      const big_TextColor = plotTextColor[trait] || plotTextColor["default"];
      const plotBgDiv = document.getElementById("svg_div");
      plotBgDiv.style.backgroundColor = divColor[trait] || divColor["default"];

    document.getElementById("big_fiveQuestionDiv").style.display = "none";
    document.getElementById("big_fiveQuestionFinishDiv").style.display =
      "";
    document.getElementById("big_fiveQuestionFinishDiv").style =
      "display: flex; flex-direction: column; align-items: center;";
    document
      .getElementById("see_result_div")
      .addEventListener("click", function () {
        document.getElementById(
          "big_fiveQuestionFinishDiv"
        ).style.display = "none";
        document.getElementById("big_fiveResultDiv").style.display = "";
      });
    document.querySelector("h1").innerText = "你的「愛的語言」";
    //document.title = "你的「愛的語言」 | Re:Fresh線上精神健康自助平台";
    //test_result.style.backgroundColor = big_fiveColor_bg + ",1)";
    //big_fiveImage_div.style.backgroundColor = big_fiveColor_inbox;
    //big_fiveSuggestion_div.style.backgroundColor =
    //  big_fiveColor_inbox;
    //big_fiveDescription_div.style.backgroundColor =
    //  big_fiveColor_inbox;
    //big_fiveDescriptionHeader.style.color = big_fiveColor_header;
    //big_fiveTag_1.style.backgroundColor = big_fiveColor_tag;
    //big_fiveTag_2.style.backgroundColor = big_fiveColor_tag;
    //big_fiveTag_3.style.backgroundColor = big_fiveColor_tag;

    

    //var d3 = Plotly.d3;
    var svg_div = document.querySelector("#svg_div");

    var data = [
      {
        type: "scatterpolar",
        mode: "lines",
        r: [3, 3, 3, 3, 3, 3],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "#D3D3D3", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [2, 2, 2, 2, 2, 2],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "black", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [1, 1, 1, 1, 1, 1],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "#D3D3D3", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [4, 4, 0, 0, 0, 8],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "black", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 4, 4, 0, 0, 0],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "black", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 0, 4, 4, 0, 0],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "black", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [0, 0, 0, 4, 4, 0],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "black", width: 1 },
      },
      {
        type: "scatterpolar",
        mode: "lines",
        r: [8, 0, 0, 0, 4, 4],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        line: { color: "black", width: 1 },
      },
      {
        type: "scatterpolar",
        r: [
            big_five_extraversion,big_five_agreeableness,big_five_conscientiousness,big_five_neuroticism,big_five_openness,big_five_extraversion
        ],
        theta: [
          "肯定<br>言語",
          "精心<br>時刻",
          "真心<br>禮物",
          "服務<br>行動",
          "身體<br>接觸",
          "肯定<br>言語",
        ],
        fill: "toself",
        fillcolor: big_FillColor,
        line: { color: big_FillColor },
        mode: "none",
      },
    ];

    var layout = {
      margin: { b: 35, t: 45, r: 25, l: 25, pad: 0 },
      font: {
        family: "'Noto Sans HK', Arial, sans-serif",
        size: 11,
      },
      polar: {
        angularaxis: {
          color: "transparent",
          gridcolor: "black",
          tickfont: { color: "black" },
          rotation: 90,
        },
        radialaxis: {
          visible: false,
          range: [0, 4],
        },
      },
      showlegend: false,
      hovermode: false,
      height: 150,
      width: 158,
    };
    var config = {
      responsive: true,
      displaylogo: false,
      displayModeBar: false,
    };
    Plotly.newPlot("myDiv", data, layout, config).then(function (gd) {
      Plotly.toImage(gd, { format: "svg" }).then(function (url) {
        svg_div.src = url;
      });
    });

    document
      .querySelector(".fixed.bottom-0.right-4")
      .querySelector("button")
      .click();
    setTimeout(function () {
      html2canvas(document.querySelector("#test_result"), {
        scale: 1,
        onclone: function (document) {
          document.querySelector("#test_result").style.display = "";
        },
      }).then(function (canvas) {
        canvas_element = canvas;
        var img_png = canvas_element.toDataURL("image/png");
        var img_div = document.createElement("div");
        var img_div_content = document.createElement("img");
        img_div.style = "display: flex; justify-content: center;";
        img_div.appendChild(img_div_content);
        img_div_content.src = img_png;
        document
          .getElementById("save_result")
          .insertBefore(
            img_div,
            document.getElementById("save_div").parentNode
          );
      });
    }, 1000);
  });

  document
    .querySelector("#share_div")
    .setAttribute("data-clipboard-text", window.location.href);

  document.querySelector("#share_div").addEventListener("click", function () {
    var shareData = {
      url: window.location.href,
    };

    try {
      window.navigator.canShare(shareData);
    } catch (err) {
    }

    if (window.navigator.canShare(shareData)) {
      try {
        window.navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
            console.error(err.name, err.message)
        }
      }
    } else {
      console.warn("Sharing not supported", shareData);
    }
  });
