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
    document.querySelector("#love_languageIntroDiv").style.display = "none";
    document.querySelector("#love_languageQuestionDiv").style.display = "";
    document.querySelector("h1").style.display = "none";
    document
      .querySelector(".fixed.bottom-0.right-4")
      .querySelector("button")
      .click();
  });

  document.querySelector(".page-title").style.marginBottom = "0px";
  for (var i = 2; i <= 20; i++) {
    var targetId = "#love_language_" + i + "_block";
    anime({
      targets: targetId,
      translateX: 20,
    });
  }

  var love_language_1_next_button = document.getElementById(
    "love_language_1_next_button"
  );
  var love_language_1_next_function = function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#love_language_1_block",
        easing: "easeOutExpo",
        translateX: -20,
        opacity: 0,
        complete: function () {
          document.getElementById("love_language_1_block").style.display =
            "none";
          document.getElementById("love_language_2_block").style.display = "";
        },
      })
      .add(
        {
          targets: "#love_language_2_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  };
  Array.prototype.map.call(
    document.querySelectorAll("input[name=love_language_0]"),
    function (e) {
      e.addEventListener("click", love_language_1_next_function);
      e.addEventListener("click", function () {
        love_language_1_next_button.addEventListener(
          "click",
          love_language_1_next_function
        );
        love_language_1_next_button.style.opacity = 1;
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

  for (var i = 1; i <= 18; i++) {
    AddFunctionListener(
      "love_language_" + i,
      "love_language_" + (i + 1),
      "love_language_" + (i + 2)
    );
  }

  //##last

  var love_language_20_previous_button = document.getElementById(
    "love_language_20_previous_button"
  );
  love_language_20_previous_button.addEventListener("click", function () {
    anime
      .timeline({
        duration: 200,
        delay: 200,
      })
      .add({
        targets: "#love_language_20_block",
        easing: "easeOutExpo",
        translateX: 20,
        opacity: 0,
        complete: function () {
          document.getElementById("love_language_19_block").style.display = "";
          document.getElementById("love_language_20_block").style.display =
            "none";
        },
      })
      .add(
        {
          targets: "#love_language_19_block",
          easing: "easeInExpo",
          translateX: 0,
          opacity: 1,
        },
        "-=50"
      );
  });

  var love_language_20_next_button = document.getElementById(
    "love_language_20_next_button"
  );
  var love_language_20_next_function = function () {
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
    document.querySelectorAll("input[name=love_language_19]"),
    function (e) {
      e.addEventListener("click", love_language_20_next_function);
      e.addEventListener("click", function () {
        love_language_20_next_button.addEventListener(
          "click",
          love_language_20_next_function
        );
        love_language_20_next_button.style.opacity = 1;
      });
    }
  );

  var system_id_textbox = document.getElementById("system_id");
  var member_id_textbox = document.getElementById("member_id");
  var uid_textbox = document.getElementById("uid");
  var member_level_textbox = document.getElementById("member_level");
  var eap_company_textbox = document.getElementById("eap_company");
  var canvas_element = document.createElement("canvas");

  member_id_textbox.value = drupalSettings.user.member_id;
  system_id_textbox.value = drupalSettings.bokss.user_uuid;
  if (uid_textbox.value) {console.log("input uid value already")} else {uid_textbox.value = Math.random();}
  if (drupalSettings.user.levels === undefined) {member_level_textbox.value = 0} else {member_level_textbox.value = drupalSettings.user.levels[0]}
  if (drupalSettings.user.eap === undefined) {eap_company_textbox.value = '0'} else {eap_company_textbox.value = drupalSettings.user.eap.label}
  
  var form = document.getElementById("form_love_language");

  form.addEventListener("submit", function (e) {
    var love_language_object = {};

    for (var i = 0; i <= 19; i++) {
      var inputName = "love_language_" + i;
      love_language_object[inputName + "_score"] = document.querySelector(
        'input[name="' + inputName + '"]:checked'
      ).value;
    }
    function hasNull(element, index, array) {
      return element === null;
    }

    var love_languageScore = Object.values(love_language_object);

    if (love_languageScore.some(hasNull)) {
      return; //stop the execution of function
    }
    var data = new FormData(form);
    var action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    });
    e.preventDefault();

    var love_language_count = {};

    for (var i = 0; i < love_languageScore.length; i++) {
      var num = love_languageScore[i];
      love_language_count[num] = love_language_count[num]
        ? love_language_count[num] + 1
        : 1;
    }

    var love_language_maxKey,
      love_language_maxValue = 0;

    for (var key in love_language_count) {
      if (love_language_count.hasOwnProperty(key)) {
        var value = love_language_count[key];
        if (value > love_language_maxValue) {
          love_language_maxValue = value;
          love_language_maxKey = key;
        }
      }
    }

    var love_languageColor_bg;
    var love_languageColor_inbox;
    //var love_languageColor_header;
    var love_languageColor_tag;

    if (love_language_maxKey == "a") {
      love_languageCategory.textContent = "肯定的言語";
      love_languageDescription.textContent =
        "伴侶的稱讚、鼓勵或向你表達謝意，對你而言都是愛的表現，比起嘮叨或挑剔，正面的話語更能滿足你被賞識及肯定的需求。";
      love_languageSuggestion.textContent =
        "你可以嘗試邀請伴侶多讚賞你，或讓對方記下感恩事項，一段時間後一起閱讀。對方若難以宣之於口，可透過轉發影片、貼圖或音樂來寄意。";
      love_languageColor_bg = "rgba(239, 162, 111";
      love_languageColor_inbox = "#EB5E10";
      //love_languageColor_header = '#fae9db';
      love_languageColor_tag = "#783C05";
      love_languageTag_1.textContent = "#保持正面";
      love_languageTag_2.textContent = "#甜言蜜語";
      love_languageTag_3.textContent = "#愛要說出口";
      love_languageOther.textContent = "有19%的人與你相似";
      icon_div.src =
        "/sites/default/files/inpages/assessment/love_language/1 肯定的言語_v3.png";
    }
    if (love_language_maxKey == "b") {
      love_languageCategory.textContent = "精心的時刻";
      love_languageDescription.textContent =
        "你喜歡伴侶把專注力放在你身上，一起做喜歡的活動，眼睛看著你而不是手機，全心全意陪你聊天，透過相處感受到被愛。";
      love_languageSuggestion.textContent =
        "你可以嘗試邀請伴侶一起精心安排一場約會，也可以是一起處理買餸、洗車等平常事務，為關係製造美好的回憶。";
      love_languageColor_bg = "rgba(125, 183, 134";
      love_languageColor_inbox = "#2A4B30";
      //love_languageColor_header = '#d7e9db';
      love_languageColor_tag = "#101C12";
      love_languageTag_1.textContent = "#DeepTalk";
      love_languageTag_2.textContent = "#全神貫注";
      love_languageTag_3.textContent = "#彼此陪伴";
      love_languageOther.textContent = "有34%的人與你相似";
      icon_div.src =
        "/sites/default/files/inpages/assessment/love_language/4 精心的時刻_v2.png";
    }
    if (love_language_maxKey == "c") {
      love_languageCategory.textContent = "真心的禮物";
      love_languageDescription.textContent =
        "對你而言，禮物是一種「看得見、摸得到」的愛，是否值錢、買來的或自製的都無關緊要，重要的是能令對方想起你。";
      love_languageSuggestion.textContent =
        "你可以嘗試邀請伴侶列一張清單，寫出過往收到甚麼感興奮的禮物，以了解並送一些對方喜歡收到的禮物，以此表達對你的愛意。";
      love_languageColor_bg = "rgba(197, 153, 224";
      love_languageColor_inbox = "#562f6e";
      //love_languageColor_header = '#e9e0ef';
      love_languageColor_tag = "#311b3f";
      love_languageTag_1.textContent = "#送禮人";
      love_languageTag_2.textContent = "#最緊要真心";
      love_languageTag_3.textContent = "#具體的愛";
      love_languageOther.innerHTML =
        '有<span style="color: transparent">3</span>3%的人與你相似';
      icon_div.src =
        "/sites/default/files/inpages/assessment/love_language/3 真心的禮物_v2.png";
    }
    if (love_language_maxKey == "d") {
      love_languageCategory.textContent = "服務的行動";
      love_languageDescription.textContent =
        "你視實際的幫助比甜言蜜語更為重要，伴侶真誠地為你辦事，例如做家務、煮飯等，切實行動都能讓你感受到被重視及照顧。";
      love_languageSuggestion.textContent =
        "你可以嘗試邀請伴侶定期處理你的一項請求，利用其長處，依你的習慣及喜惡，為你辦一些事，把它當成一種愛的表現。";
      love_languageColor_bg = "rgba(104, 167, 215";
      love_languageColor_inbox = "#005F8C";
      //love_languageColor_header = '#DCF2ED';
      love_languageColor_tag = "#023047";
      love_languageTag_1.textContent = "#做實事";
      love_languageTag_2.textContent = "#行動最實際";
      love_languageTag_3.textContent = "#真心誠意";
      love_languageOther.textContent = "有11%的人與你相似";
      icon_div.src =
        "/sites/default/files/inpages/assessment/love_language/2 服務的行動_v2.png";
    }
    if (love_language_maxKey == "e") {
      love_languageCategory.textContent = "身體的接觸";
      love_languageDescription.textContent =
        "在你的字典裡，牽手、接吻、擁抱都是愛的溝通方式，彼此傳達愛與關心、安慰、支持及親密的感覺，建立情感上的連結。";
      love_languageSuggestion.textContent =
        "你可以嘗試邀請伴侶主動在街上牽著你的手，或是在你感到傷心難過時擁抱你，讓你可以透過身體接觸，感受愛與安全感。";
      love_languageColor_bg = "rgba(226, 141, 174";
      love_languageColor_inbox = "#982651";
      //love_languageColor_header = '#f5d9e4';
      love_languageColor_tag = "#3D0F21";
      love_languageTag_1.textContent = "#我要攬攬";
      love_languageTag_2.textContent = "#安全感";
      love_languageTag_3.textContent = "#拖住我";
      love_languageOther.textContent = "有33%的人與你相似";
      icon_div.src =
        "/sites/default/files/inpages/assessment/love_language/5 身體的接觸_v2.png";
    }

    document.getElementById("love_languageQuestionDiv").style.display = "none";
    document.getElementById("love_languageQuestionFinishDiv").style.display =
      "";
    document.getElementById("love_languageQuestionFinishDiv").style =
      "display: flex; flex-direction: column; align-items: center;";
    document
      .getElementById("see_result_div")
      .addEventListener("click", function () {
        document.getElementById(
          "love_languageQuestionFinishDiv"
        ).style.display = "none";
        document.getElementById("love_languageResultDiv").style.display = "";
      });
    document.querySelector("h1").innerText = "你的「愛的語言」";
    //document.title = "你的「愛的語言」 | Re:Fresh線上精神健康自助平台";
    test_result.style.backgroundColor = love_languageColor_bg + ",1)";
    love_languageImage_div.style.backgroundColor = love_languageColor_inbox;
    love_languageSuggestion_div.style.backgroundColor =
      love_languageColor_inbox;
    love_languageDescription_div.style.backgroundColor =
      love_languageColor_inbox;
    //love_languageDescriptionHeader.style.color = love_languageColor_header;
    love_languageTag_1.style.backgroundColor = love_languageColor_tag;
    love_languageTag_2.style.backgroundColor = love_languageColor_tag;
    love_languageTag_3.style.backgroundColor = love_languageColor_tag;

    //new

    if (isNaN(love_language_count.a)) {
      love_language_count.a = 0;
    }

    if (isNaN(love_language_count.b)) {
      love_language_count.b = 0;
    }

    if (isNaN(love_language_count.c)) {
      love_language_count.c = 0;
    }

    if (isNaN(love_language_count.d)) {
      love_language_count.d = 0;
    }

    if (isNaN(love_language_count.e)) {
      love_language_count.e = 0;
    }

    //var d3 = Plotly.d3;
    var svg_div = document.querySelector("#svg_div");

    var data = [
      {
        type: "scatterpolar",
        mode: "lines",
        r: [6, 6, 6, 6, 6, 6],
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
        r: [4, 4, 4, 4, 4, 4],
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
        r: [2, 2, 2, 2, 2, 2],
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
        r: [8, 8, 0, 0, 0, 8],
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
        r: [0, 8, 8, 0, 0, 0],
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
        r: [0, 0, 8, 8, 0, 0],
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
        r: [0, 0, 0, 8, 8, 0],
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
        r: [8, 0, 0, 0, 8, 8],
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
          love_language_count.a,
          love_language_count.b,
          love_language_count.c,
          love_language_count.d,
          love_language_count.e,
          love_language_count.a,
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
        fillcolor: love_languageColor_bg + ",0.8)",
        line: { color: love_languageColor_bg + ",0.8)" },
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
          range: [0, 8],
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
        backgroundColor: love_languageColor_bg + ",1)",
        scale: 4,
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
