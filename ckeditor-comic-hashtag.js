(function () {
  "use strict";

  function queryOne(root, selectors) {
    for (var i = 0; i < selectors.length; i += 1) {
      var found = root.querySelector(selectors[i]);
      if (found) return found;
    }
    return null;
  }

  function queryAll(root, selectors) {
    for (var i = 0; i < selectors.length; i += 1) {
      var found = root.querySelectorAll(selectors[i]);
      if (found && found.length) return found;
    }
    return [];
  }

  function initSingleRoot(root) {
    if (!root) return;

    if (typeof root.__peanutsCleanup === "function") {
      root.__peanutsCleanup();
    }

    var cleanups = [];
    var retryTimers = [];
    var hashRafId = null;
    var autoplayId = null;

    function addListener(el, type, handler, options) {
      if (!el) return;
      el.addEventListener(type, handler, options);
      cleanups.push(function () {
        el.removeEventListener(type, handler, options);
      });
    }

    function addTimer(id) {
      retryTimers.push(id);
    }

    function cleanup() {
      if (hashRafId !== null && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(hashRafId);
      }
      hashRafId = null;

      if (autoplayId !== null) {
        window.clearInterval(autoplayId);
      }
      autoplayId = null;

      while (retryTimers.length) {
        window.clearTimeout(retryTimers.pop());
      }

      while (cleanups.length) {
        var fn = cleanups.pop();
        fn();
      }
    }

    root.__peanutsCleanup = cleanup;

    var hashList = queryOne(root, ["#peanuts-hash-list", "[data-hash-list]"]);
    if (hashList) {
      var oldClones = hashList.querySelectorAll('[data-peanuts-clone="1"]');
      Array.prototype.forEach.call(oldClones, function (node) {
        if (node && node.parentNode) node.parentNode.removeChild(node);
      });

      var baseItems = Array.prototype.slice.call(hashList.children);
      var beforeFragment = document.createDocumentFragment();
      var afterFragment = document.createDocumentFragment();

      baseItems.forEach(function (node) {
        var beforeClone = node.cloneNode(true);
        beforeClone.setAttribute("data-peanuts-clone", "1");
        beforeFragment.appendChild(beforeClone);

        var afterClone = node.cloneNode(true);
        afterClone.setAttribute("data-peanuts-clone", "1");
        afterFragment.appendChild(afterClone);
      });

      hashList.insertBefore(beforeFragment, hashList.firstChild);
      hashList.appendChild(afterFragment);

      function startHashLoop(retryCount) {
        var originalWidth = 0;
        baseItems.forEach(function (node) {
          originalWidth += node.getBoundingClientRect().width;
        });
        if (originalWidth <= 0) {
          originalWidth = hashList.scrollWidth / 3;
        }

        if (!originalWidth || originalWidth < 10) {
          if (retryCount < 30) {
            addTimer(
              window.setTimeout(function () {
                startHashLoop(retryCount + 1);
              }, 120)
            );
          }
          return;
        }

        var hashOffset = -originalWidth;
        var hashSpeed = 38;
        var previousTime = 0;

        function animateHash(time) {
          if (!hashList.isConnected) return;
          if (!previousTime) previousTime = time;
          var delta = (time - previousTime) / 1000;
          previousTime = time;

          hashOffset += hashSpeed * delta;
          if (hashOffset >= 0) hashOffset -= originalWidth;

          hashList.style.transform = "translate3d(" + hashOffset.toFixed(2) + "px, 0, 0)";
          hashRafId = window.requestAnimationFrame(animateHash);
        }

        hashRafId = window.requestAnimationFrame(animateHash);
      }

      startHashLoop(0);
    }

    var comicsWrap = queryOne(root, ["#peanuts-comics-wrap", "[data-comics-wrap]"]);
    var comicsCarousel = queryOne(root, ["#peanuts-comics-carousel", "[data-comics-carousel]"]);
    if (!comicsCarousel) return;

    var cards = Array.prototype.slice.call(queryAll(comicsCarousel, ["[data-comic-card]", ".comic-card", "article"]));
    if (!cards.length) return;

    var activeIndex = 0;
    var autoplayDelay = 2800;
    var prevButton = queryOne(root, ["#peanuts-comics-prev", "[data-comics-prev]"]);
    var nextButton = queryOne(root, ["#peanuts-comics-next", "[data-comics-next]"]);

    function wrapDistance(index, center, total) {
      var distance = index - center;
      if (distance > total / 2) distance -= total;
      if (distance < -total / 2) distance += total;
      return distance;
    }

    function applyResponsiveStyles() {
      var isMobile = window.innerWidth <= 780;
      if (comicsWrap) comicsWrap.style.height = isMobile ? "460px" : "500px";
      if (prevButton) prevButton.style.left = isMobile ? "0.4rem" : "30%";
      if (nextButton) nextButton.style.right = isMobile ? "0.4rem" : "30%";
    }

    function applyComicTransforms() {
      var total = cards.length;
      var spacing = 190;
      var maxVisibleProgress = 2.8;
      var angleStep = 34;
      var radius = 260;

      cards.forEach(function (card, index) {
        if (!card.isConnected) return;
        var progress = wrapDistance(index, activeIndex, total);
        var abs = Math.abs(progress);
        var clamped = Math.max(-maxVisibleProgress, Math.min(maxVisibleProgress, progress));
        var angle = clamped * angleStep;
        var angleRadian = (Math.abs(angle) * Math.PI) / 180;
        var arcOffsetY = radius - Math.cos(angleRadian) * radius;
        var scale = Math.max(0.55, 1 - abs * 0.17);
        var focusLift = abs < 0.15 ? -30 : 0;
        var lowerSideSlides = abs < 0.15 ? 0 : Math.min(42, abs * 18);
        var finalY = arcOffsetY + lowerSideSlides + focusLift;
        var finalX = clamped * spacing;
        var opacity = abs > 3 ? 0 : abs > 1.1 ? 0.2 : 1;
        var zIndex = Math.round(40 - abs * 10);
        var rotate = angle * -0.35;

        card.style.transform =
          "translate3d(" +
          finalX.toFixed(1) +
          "px, " +
          Math.round(finalY) +
          "px, 0) scale(" +
          scale.toFixed(3) +
          ") rotate(" +
          rotate.toFixed(2) +
          "deg)";
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
      });
    }

    function slideNext() {
      activeIndex = (activeIndex + 1) % cards.length;
      applyComicTransforms();
    }

    function slidePrev() {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      applyComicTransforms();
    }

    function startAutoplay() {
      if (autoplayId !== null) window.clearInterval(autoplayId);
      autoplayId = window.setInterval(slideNext, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayId === null) return;
      window.clearInterval(autoplayId);
      autoplayId = null;
    }

    function bindButtonHover(button, isPrev) {
      if (!button) return;
      var baseStyle = button.getAttribute("data-btn-base") || "";

      addListener(button, "mouseenter", function () {
        var sideValue = isPrev ? button.style.left : button.style.right;
        var sideStyle = (isPrev ? "left:" : "right:") + sideValue + ";";
        button.style.cssText = baseStyle + "transform:translateY(-50%) scale(1.06);" + sideStyle;
      });

      addListener(button, "mouseleave", function () {
        var sideValue = isPrev ? button.style.left : button.style.right;
        var sideStyle = (isPrev ? "left:" : "right:") + sideValue + ";";
        button.style.cssText = baseStyle + sideStyle;
      });
    }

    addListener(prevButton, "click", function () {
      slidePrev();
      startAutoplay();
    });
    addListener(nextButton, "click", function () {
      slideNext();
      startAutoplay();
    });
    addListener(comicsCarousel, "mouseenter", stopAutoplay);
    addListener(comicsCarousel, "mouseleave", startAutoplay);
    addListener(comicsCarousel, "touchstart", stopAutoplay, { passive: true });
    addListener(comicsCarousel, "touchend", startAutoplay);
    addListener(window, "resize", function () {
      applyResponsiveStyles();
      applyComicTransforms();
    });

    applyResponsiveStyles();
    bindButtonHover(prevButton, true);
    bindButtonHover(nextButton, false);
    applyComicTransforms();
    addTimer(window.setTimeout(applyComicTransforms, 30));
    addTimer(window.setTimeout(applyComicTransforms, 120));
    startAutoplay();
  }

  function initPeanutsCkeditorSections(scope) {
    var rootScope = scope || document;
    var roots = rootScope.querySelectorAll(".peanuts-ckeditor, #peanuts-ckeditor-root");
    Array.prototype.forEach.call(roots, initSingleRoot);
    return roots.length;
  }

  var scheduledInitTimer = null;
  function scheduleInit() {
    if (scheduledInitTimer) return;
    scheduledInitTimer = window.setTimeout(function () {
      scheduledInitTimer = null;
      initPeanutsCkeditorSections(document);
    }, 80);
  }

  function robustBoot() {
    var attempts = 0;
    function tryInit() {
      attempts += 1;
      var count = initPeanutsCkeditorSections(document);
      if (count > 0 || attempts >= 20) return;
      window.setTimeout(tryInit, 120);
    }
    tryInit();

    if (!window.__peanutsObserverAttached && window.MutationObserver && document.body) {
      window.__peanutsObserverAttached = true;
      var observer = new MutationObserver(function () {
        scheduleInit();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  window.initPeanutsCkeditorSections = initPeanutsCkeditorSections;
  robustBoot();
})();
