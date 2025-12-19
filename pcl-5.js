// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
const CONFIG = {
  // Total number of questions in the questionnaire (PCL-5 has 20 items, but uses 0-20 indexing)
  NUMBER_QUESTION: 21,
  // Identifier for the questionnaire form elements
  NAME_QUESTION: "pcl-5",
  // Maximum score per question item
  MAX_ITEM_SCORE: 4,
  // Maximum total possible score
  TOTAL_SCORE: 80,
  // Scale name in Chinese
  SCALE_NAME: "創傷後壓力量表",
  // Animation settings
  ANIMATION_DURATION: 200,
  ANIMATION_DELAY: 200,
  ANIMATION_OFFSET: 50,
  // Score thresholds
  LOW_THRESHOLD: 30,
  HIGH_THRESHOLD: 80,
  // Reverse score value
  REVERSE_SCORE: 4,
};

// Cleaned scale name for plotting (removes common suffixes)
const SCALE_NAME_PLOT = CONFIG.SCALE_NAME
  .replace("問卷", "")
  .replace("量表", "")
  .replace("測試", "")
  .replace("測驗", "");

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely gets an element by ID, throws error if not found
 * @param {string} id - Element ID
 * @returns {HTMLElement} - The element
 */
function getElementByIdSafe(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with id "${id}" not found`);
    throw new Error(`Element with id "${id}" not found`);
  }
  return element;
}

/**
 * Safely queries a selector, returns null if not found
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} - The element or null
 */
function querySelectorSafe(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
}

/**
 * Formats a date to YYYY-MM-DD HH:mm:ss format
 * @param {Date} date - Date object to format
 * @returns {string} - Formatted date string
 */
function formatDateTime(date) {
  const pad = (num) => String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Gets URL parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
function getURLParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

// ============================================================================
// ANIMATION FUNCTIONS
// ============================================================================

/**
 * Creates an animation timeline for transitioning between question blocks
 * @param {Object} options - Animation options
 * @param {string} options.currentBlockId - Current block ID
 * @param {string} options.targetBlockId - Target block ID
 * @param {number} options.direction - Direction: -1 for next, 1 for previous
 * @param {Function} options.onComplete - Callback when animation completes
 */
function createTransitionAnimation({ currentBlockId, targetBlockId, direction, onComplete }) {
  const translateX = direction === -1 ? -20 : 20;
  const currentSelector = `#${currentBlockId}_block`;
  const targetSelector = `#${targetBlockId}_block`;

  anime
    .timeline({
      duration: CONFIG.ANIMATION_DURATION,
      delay: CONFIG.ANIMATION_DELAY,
    })
    .add({
      targets: currentSelector,
      easing: "easeOutExpo",
      translateX: translateX,
      opacity: 0,
      complete: () => {
        const currentBlock = querySelectorSafe(currentSelector);
        const targetBlock = querySelectorSafe(targetSelector);
        if (currentBlock) currentBlock.style.display = "none";
        if (targetBlock) {
          targetBlock.style.display = "";
          if (onComplete) onComplete();
        }
      },
    })
    .add(
      {
        targets: targetSelector,
        easing: "easeInExpo",
        translateX: 0,
        opacity: 1,
      },
      `-=${CONFIG.ANIMATION_OFFSET}`
    );
}

/**
 * Handles navigation to previous question
 * @param {string} previousBlockId - Previous block ID
 * @param {string} currentBlockId - Current block ID
 */
function handlePreviousButton(previousBlockId, currentBlockId) {
  createTransitionAnimation({
    currentBlockId,
    targetBlockId: previousBlockId,
    direction: 1,
  });
}

/**
 * Handles navigation to next question
 * @param {string} currentBlockId - Current block ID
 * @param {string} nextBlockId - Next block ID
 */
function handleNextButton(currentBlockId, nextBlockId) {
  createTransitionAnimation({
    currentBlockId,
    targetBlockId: nextBlockId,
    direction: -1,
  });
}

// ============================================================================
// QUESTION NAVIGATION SETUP
// ============================================================================

/**
 * Sets up event listeners for a question block
 * @param {string} previousBlockId - Previous block ID
 * @param {string} currentBlockId - Current block ID
 * @param {string} nextBlockId - Next block ID
 */
function setupQuestionListeners(previousBlockId, currentBlockId, nextBlockId) {
  // Previous button
  const previousButton = querySelectorSafe(`${currentBlockId}_previous_button`);
  if (previousButton) {
    previousButton.addEventListener("click", () => {
      handlePreviousButton(previousBlockId, currentBlockId);
    });
  }

  // Next button and radio inputs
  const nextButton = querySelectorSafe(`${currentBlockId}_next_button`);
  const radioInputs = document.querySelectorAll(`input[name="${previousBlockId}"]`);

  radioInputs.forEach((input) => {
    input.addEventListener("click", () => {
      handleNextButton(currentBlockId, nextBlockId);
      if (nextButton) {
        nextButton.style.opacity = 1;
        // Only add listener once
        if (!nextButton.dataset.listenerAdded) {
          nextButton.addEventListener("click", () => {
            handleNextButton(currentBlockId, nextBlockId);
          });
          nextButton.dataset.listenerAdded = "true";
        }
      }
    });
  });
}

/**
 * Initializes question navigation for all questions
 */
function initializeQuestionNavigation() {
  const { NAME_QUESTION, NUMBER_QUESTION } = CONFIG;

  // First question special handling
  const firstQuestionInputs = document.querySelectorAll(
    `input[name="${NAME_QUESTION}_0"]`
  );
  const firstNextButton = querySelectorSafe(`${NAME_QUESTION}_1_next_button`);

  firstQuestionInputs.forEach((input) => {
    input.addEventListener("click", () => {
      handleNextButton(`${NAME_QUESTION}_1`, `${NAME_QUESTION}_2`);
      if (firstNextButton) {
        firstNextButton.style.opacity = 1;
        if (!firstNextButton.dataset.listenerAdded) {
          firstNextButton.addEventListener("click", () => {
            handleNextButton(`${NAME_QUESTION}_1`, `${NAME_QUESTION}_2`);
          });
          firstNextButton.dataset.listenerAdded = "true";
        }
      }
    });
  });

  // Middle questions
  for (let i = 1; i <= NUMBER_QUESTION - 2; i++) {
    setupQuestionListeners(
      `${NAME_QUESTION}_${i}`,
      `${NAME_QUESTION}_${i + 1}`,
      `${NAME_QUESTION}_${i + 2}`
    );
  }

  // Last question previous button
  const lastPreviousButton = querySelectorSafe(
    `${NAME_QUESTION}_${NUMBER_QUESTION}_previous_button`
  );
  if (lastPreviousButton) {
    lastPreviousButton.addEventListener("click", () => {
      handlePreviousButton(
        `${NAME_QUESTION}_${NUMBER_QUESTION - 1}`,
        `${NAME_QUESTION}_${NUMBER_QUESTION}`
      );
    });
  }

  // Last question next button (submit confirmation)
  const lastNextButton = querySelectorSafe(
    `${NAME_QUESTION}_${NUMBER_QUESTION}_next_button`
  );
  if (lastNextButton) {
    lastNextButton.addEventListener("click", () => {
      if (typeof swal !== "undefined") {
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
          .then((result) => {
            if (result.isConfirmed) {
              const submitButton = querySelectorSafe(
                'input[value="查看測試結果"]'
              );
              if (submitButton) submitButton.click();
            }
          });
      } else {
        console.error("SweetAlert2 (swal) is not loaded");
      }
    });
  }
}

// ============================================================================
// INITIALIZATION FUNCTIONS
// ============================================================================

/**
 * Initializes the start button handler
 */
function initializeStartButton() {
  const startButton = querySelectorSafe("#start_div");
  if (!startButton) return;

  startButton.addEventListener("click", () => {
    const { NAME_QUESTION } = CONFIG;
    const introDiv = querySelectorSafe(`#${NAME_QUESTION}IntroDiv`);
    const questionDiv = querySelectorSafe(`#${NAME_QUESTION}QuestionDiv`);
    const h1 = querySelectorSafe("h1");
    const fixedButton = querySelectorSafe(".fixed.bottom-0.right-4 button");

    if (introDiv) introDiv.style.display = "none";
    if (questionDiv) questionDiv.style.display = "";
    if (h1) h1.style.display = "none";
    if (fixedButton) fixedButton.click();
  });
}

/**
 * Initializes animation setup for question blocks
 */
function initializeAnimations() {
  const pageTitle = querySelectorSafe(".page-title");
  if (pageTitle) {
    pageTitle.style.marginBottom = "0px";
  }

  // Pre-position all question blocks (except first) off-screen to the right
  const { NAME_QUESTION, NUMBER_QUESTION } = CONFIG;
  for (let i = 2; i <= NUMBER_QUESTION - 1; i++) {
    const targetId = `#${NAME_QUESTION}_${i}_block`;
    if (typeof anime !== "undefined") {
      anime({
        targets: targetId,
        translateX: 20,
      });
    } else {
      console.warn("Anime.js is not loaded");
    }
  }
}

/**
 * Initializes form field values from Drupal settings and URL parameters
 */
function initializeFormFields() {
  // Check if drupalSettings exists
  if (typeof drupalSettings === "undefined") {
    console.warn("drupalSettings is not defined");
    return;
  }

  const { NAME_QUESTION } = CONFIG;

  // System and member IDs
  const systemIdInput = querySelectorSafe("system_id");
  const memberIdInput = querySelectorSafe("member_id");
  if (systemIdInput && drupalSettings.bokss?.user_uuid) {
    systemIdInput.value = drupalSettings.bokss.user_uuid;
  }
  if (memberIdInput && drupalSettings.user?.member_id) {
    memberIdInput.value = drupalSettings.user.member_id;
  }

  // UID
  const uidInput = querySelectorSafe("uid");
  if (uidInput && !uidInput.value) {
    uidInput.value = Math.random().toString();
  }

  // Member level
  const memberLevelInput = querySelectorSafe("member_level");
  if (memberLevelInput) {
    memberLevelInput.value =
      drupalSettings.user?.levels?.[0] ?? 0;
  }

  // EAP company
  const eapCompanyInput = querySelectorSafe("eap_company");
  if (eapCompanyInput) {
    eapCompanyInput.value = drupalSettings.user?.eap?.label ?? "0";
  }

  // Complete time
  const completeTimeInput = querySelectorSafe("complete_time");
  if (completeTimeInput) {
    completeTimeInput.value = formatDateTime(new Date());
  }

  // Activity name
  const activityNameInput = querySelectorSafe("activity_name");
  if (activityNameInput) {
    activityNameInput.value = getURLParam("activity_name") || "NA_public";
  }

  // Worker
  const workerInput = querySelectorSafe("worker");
  if (workerInput) {
    workerInput.value = getURLParam("worker") || "";
  }

  // Subscription
  const subscriptionInput = querySelectorSafe("subscription");
  if (subscriptionInput && drupalSettings.user?.subscription?.expire_subscription) {
    subscriptionInput.value = drupalSettings.user.subscription.expire_subscription;
  }
}

/**
 * Calculates the total score from all answered questions
 * @returns {number} - Total score
 */
function calculateScore() {
  const { NAME_QUESTION, NUMBER_QUESTION, REVERSE_SCORE } = CONFIG;
  const inverseScores = []; // Empty array means no scores will be inverted
  let questionSum = 0;

  for (let i = 0; i <= NUMBER_QUESTION - 2; i++) {
    const selectedInput = document.querySelector(
      `input[name="${NAME_QUESTION}_${i}"]:checked`
    );

    if (!selectedInput) {
      console.warn(`No answer selected for question ${i + 1}`);
      continue;
    }

    const itemScore = parseInt(selectedInput.value, 10);
    if (isNaN(itemScore)) {
      console.warn(`Invalid score for question ${i + 1}`);
      continue;
    }

    // Check if the score should be inverted
    if (inverseScores.includes(i)) {
      questionSum += REVERSE_SCORE - itemScore;
    } else {
      questionSum += itemScore;
    }
  }

  return questionSum;
}

/**
 * Determines result category and description based on score
 * @param {number} score - Total score
 * @returns {Object} - Object with category, description, and result link
 */
function getResultCategory(score) {
  const { LOW_THRESHOLD, HIGH_THRESHOLD } = CONFIG;

  if (score <= LOW_THRESHOLD) {
    return {
      category: "低",
      description:
        "你的結果顯示，創傷事件困擾你的程度屬較輕或一般壓力反應範圍內。若有短暫失眠、緊張或心情起伏，這在經歷重大事件後很常見。建議你繼續留意自己的狀況；如感到困擾加重或影響日常生活，可考慮尋求專業支援。",
      resultLink: "/sites/default/files/inpages/assessment/pcl-5/low/PCL-5_Result.webp",
    };
  } else if (score <= HIGH_THRESHOLD) {
    return {
      category: "高",
      description:
        "你的結果顯示，你正經歷較明顯的創傷相關症狀，可能已影響到你的生活，建議盡早尋求專業協助，以作進一步診斷，陪你一起尋找合適的支援方法。",
      resultLink: "/sites/default/files/inpages/assessment/pcl-5/high/PCL-5_Result.webp",
    };
  } else {
    console.warn(`Score ${score} is out of expected range`);
    return {
      category: "未知",
      description: "分數超出預期範圍，請聯繫管理員。",
      resultLink: "",
    };
  }
}

/**
 * Initializes form submission handler
 */
function initializeFormSubmission() {
  const { NAME_QUESTION } = CONFIG;
  const form = querySelectorSafe(`form_${NAME_QUESTION}`);
  if (!form) {
    console.error(`Form with id "form_${NAME_QUESTION}" not found`);
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Calculate score
    const questionSum = calculateScore();

    // Update participant name if provided
    const userNameInput = querySelectorSafe("user_name_manual");
    if (userNameInput?.value && typeof participantName !== "undefined") {
      participantName.textContent = userNameInput.value;
    }

    // Get result category
    const result = getResultCategory(questionSum);

    // Update result elements
    const categoryElement = querySelectorSafe(`${NAME_QUESTION}Category`);
    const descriptionElement = querySelectorSafe(`${NAME_QUESTION}Description`);
    if (categoryElement) categoryElement.textContent = result.category;
    if (descriptionElement) descriptionElement.textContent = result.description;

    // Update result image
    const saveResult = querySelectorSafe("save_result");
    if (saveResult) {
      let img = saveResult.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        saveResult.appendChild(img);
      }
      img.src = result.resultLink;
      img.alt = "測試結果";
    }

    // Show result div
    const questionDiv = querySelectorSafe(`${NAME_QUESTION}QuestionDiv`);
    const resultDiv = querySelectorSafe(`${NAME_QUESTION}ResultDiv`);
    const h1 = querySelectorSafe("h1");

    if (questionDiv) questionDiv.style.display = "none";
    if (resultDiv) resultDiv.style.display = "";
    if (h1) h1.style.display = "";
  });
}

/**
 * Initializes share functionality
 */
function initializeShare() {
  const shareDiv = querySelectorSafe("#share_div");
  if (!shareDiv) return;

  shareDiv.setAttribute("data-clipboard-text", window.location.href);

  shareDiv.addEventListener("click", () => {
    const shareData = {
      url:
        document.location.origin +
        document.location.pathname +
        "?utm_source=website&utm_medium=referral",
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator
        .share(shareData)
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Share error:", err.name, err.message);
          }
        });
    } else {
      // Fallback: copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).catch((err) => {
          console.error("Clipboard error:", err);
        });
      } else {
        console.warn("Sharing not supported", shareData);
      }
    }
  });
}

// ============================================================================
// MAIN INITIALIZATION
// ============================================================================

/**
 * Initializes the entire questionnaire application
 */
function initializeQuestionnaire() {
  try {
    initializeStartButton();
    initializeAnimations();
    initializeQuestionNavigation();
    initializeFormFields();
    initializeFormSubmission();
    initializeShare();
  } catch (error) {
    console.error("Error initializing questionnaire:", error);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeQuestionnaire);
} else {
  initializeQuestionnaire();
}
