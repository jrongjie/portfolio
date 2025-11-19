// toggle to switch classes between .light and .dark
// if no class is present (initial state), then assume current state based on system color scheme
// if system color scheme is not supported, then assume current state is dark
function toggleDarkMode() {
  if (document.documentElement.classList.contains("light")) {
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
  } else if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.add("light")
    }
  }
}

// Dialog open/close
window.onload = function () {

  // Initialize all dialog elements
  document.querySelectorAll('[name="dialog"]').forEach(function (dlg) {
    if (typeof dlg.showModal !== "function") {
      console.error("This browser does not support <dialog> elements.");
    }
  });

  // Set up openers
  document.querySelectorAll('[name="opener"]').forEach(function (opener) {

    // Find the associated dialog:
    // ↓ Assumes the dialog is the next sibling element
    var panel = opener.nextElementSibling;

    // Safety check
    if (!panel || panel.getAttribute("name") !== "dialog") {
      console.error("No <dialog> element found for opener:", opener);
      return;
    }

    opener.addEventListener("click", function () {
      panel.showModal();
    });

    // Optional: add a close button inside the dialog
    var closeBtn = panel.querySelector('[name="close"]');
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.close();
      });
    }
  });
};

// Intro text change
document.addEventListener("DOMContentLoaded", () => {
  let i = 0;

  const randomNum = (num, max) => {
    let j = Math.floor(Math.random() * max);
    // prevent same index
    if (j === num) {
      j = (j + 1) % max;
    }
    return j;
  };

  const getAnimationTime = () => {
    const phrase = document.getElementById("textChange");

    if (!phrase) return 1000; // fallback

    const compStyles = window.getComputedStyle(phrase);

    // Try shorthand first, then prefixed duration properties
    let animation =
      compStyles.getPropertyValue("animation") ||
      compStyles.getPropertyValue("animation-duration") ||
      compStyles.getPropertyValue("-moz-animation-duration") ||
      compStyles.getPropertyValue("-webkit-animation-duration") ||
      "";

    const match = animation.match(/\d*\.?\d+/);
    if (!match) return 1000;
    return parseFloat(match[0]) * 1000;
  };

  const randomizeText = () => {
    const phrase = document.getElementById("textChange");
    if (!phrase) return; // element missing

    const compStyles = window.getComputedStyle(phrase);
    const animation = compStyles.getPropertyValue("animation");
    const match = animation.match(/\d*\.?\d+/);
    const animationTime = match ? parseFloat(match[0]) * 1200 : 1200;

    const phrases = [
      "super humid",
      "gator filled",
      "mosquito infested",
      "salty-air living",
      "gator-filled",
      "cotton candy sunset",
      "all-too-sunny",
    ];

    i = randomNum(i, phrases.length);
    setTimeout(() => {
      phrase.textContent = phrases[i];
    }, 500);
  };

  // Start
  randomizeText();
  setInterval(randomizeText, getAnimationTime());
});