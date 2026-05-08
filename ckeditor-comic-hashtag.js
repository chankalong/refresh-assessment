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
    if (!root || root.getAttribute("data-peanuts-init") === "1") {
      return;
    }
    root.setAttribute("data-peanuts-init", "1");

    var hashList = queryOne(root, ["#peanuts-hash-list", "[data-hash-list]"]);
    if (hashList) {
      var baseItems = Array.prototype.slice.call(hashList.children);
      var fragmentBefore = document.createDocumentFragment();
      var fragmentAfter = document.createDocumentFragment();

      baseItems.forEach(function (node) {
        fragmentBefore.appendChild(node.cloneNode(true));
        fragmentAfter.appendChild(node.cloneNode(true));
      });

      hashList.insertBefore(fragmentBefore, hashList.firstChild);
      hashList.appendChild(fragmentAfter);

      var originalWidth = 0;
      baseItems.forEach(function (node) {
        originalWidth += node.getBoundingClientRect().width;
      });
      if (originalWidth <= 0) {
        originalWidth = hashList.scrollWidth / 3;
      }

      var hashOffset = -originalWidth;
      var hashSpeed = 38;
      var previousHashTime = 0;

      function animateHash(time) {
        if (!previousHashTime) previousHashTime = time;
        var delta = (time - previousHashTime) / 1000;
        previousHashTime = time;

        hashOffset += hashSpeed * delta;
        if (hashOffset >= 0) hashOffset -= originalWidth;

        hashList.style.transform = "translate3d(" + hashOffset.toFixed(2) + "px, 0, 0)";
        window.requestAnimationFrame(animateHash);
      }

      window.requestAnimationFrame(animateHash);
    }

    var comicsWrap = queryOne(root, ["#peanuts-comics-wrap", "[data-comics-wrap]"]);
    var comicsCarousel = queryOne(root, ["#peanuts-comics-carousel", "[data-comics-carousel]"]);
    if (!comicsCarousel) return;

    var cards = Array.prototype.slice.call(queryAll(comicsCarousel, ["[data-comic-card]", ".comic-card", "article"]));
    if (!cards.length) return;

    var activeIndex = 0;
    var autoplayDelay = 2800;
    var autoplayId = null;

    function wrapDistance(index, center, total) {
      var distance = index - center;
      if (distance > total / 2) distance -= total;
      if (distance < -total / 2) distance += total;
      return distance;
    }

    function applyComicTransforms() {
      var total = cards.length;
      var spacing = 190;
      var maxVisibleProgress = 2.8;
      var angleStep = 34;
      var radius = 260;

      cards.forEach(function (card, index) {
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
      stopAutoplay();
      autoplayId = window.setInterval(slideNext, autoplayDelay);
    }

    function stopAutoplay() {
      if (!autoplayId) return;
      window.clearInterval(autoplayId);
      autoplayId = null;
    }

    var prevButton = queryOne(root, ["#peanuts-comics-prev", "[data-comics-prev]"]);
    var nextButton = queryOne(root, ["#peanuts-comics-next", "[data-comics-next]"]);

    function applyResponsiveStyles() {
      var isMobile = window.innerWidth <= 780;

      if (comicsWrap) {
        comicsWrap.style.height = isMobile ? "460px" : "500px";
      }
      if (prevButton) {
        prevButton.style.left = isMobile ? "0.4rem" : "30%";
      }
      if (nextButton) {
        nextButton.style.right = isMobile ? "0.4rem" : "30%";
      }
    }

    function bindButtonHover(button) {
      if (!button) return;
      var baseStyle = button.getAttribute("data-btn-base") || "";

      button.addEventListener("mouseenter", function () {
        var sideStyle = button === prevButton ? "left:" + button.style.left + ";" : "right:" + button.style.right + ";";
        button.style.cssText = baseStyle + "transform:translateY(-50%) scale(1.06);" + sideStyle;
      });

      button.addEventListener("mouseleave", function () {
        var sideStyle = button === prevButton ? "left:" + button.style.left + ";" : "right:" + button.style.right + ";";
        button.style.cssText = baseStyle + sideStyle;
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        slidePrev();
        startAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        slideNext();
        startAutoplay();
      });
    }

    comicsCarousel.addEventListener("mouseenter", stopAutoplay);
    comicsCarousel.addEventListener("mouseleave", startAutoplay);
    comicsCarousel.addEventListener("touchstart", stopAutoplay, { passive: true });
    comicsCarousel.addEventListener("touchend", startAutoplay);

    applyResponsiveStyles();
    bindButtonHover(prevButton);
    bindButtonHover(nextButton);
    applyComicTransforms();
    window.setTimeout(applyComicTransforms, 30);
    window.setTimeout(applyComicTransforms, 120);
    startAutoplay();
    window.addEventListener("resize", function () {
      applyResponsiveStyles();
      applyComicTransforms();
    });
  }

  function initPeanutsCkeditorSections(scope) {
    var rootScope = scope || document;
    var roots = rootScope.querySelectorAll(".peanuts-ckeditor, #peanuts-ckeditor-root");
    Array.prototype.forEach.call(roots, initSingleRoot);
  }

  window.initPeanutsCkeditorSections = initPeanutsCkeditorSections;
  initPeanutsCkeditorSections(document);
})();
