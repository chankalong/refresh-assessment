const Shuffle = window.Shuffle;
const shuffleInstance = new Shuffle(document.getElementById("assessment_div"), {
  itemSelector: ".assessment-item",
  sizer: ".js-shuffle-sizer",
});

document.querySelector(".emotion-filter").addEventListener("click", (e) => {
  shuffleInstance.filter("emotion");
});

document
  .querySelector(".communication-filter")
  .addEventListener("click", (e) => {
    shuffleInstance.filter("communication");
  });

document.querySelector(".work-filter").addEventListener("click", (e) => {
  shuffleInstance.filter("work");
});

document.querySelector(".personality-filter").addEventListener("click", (e) => {
  shuffleInstance.filter("personality");
});

document
  .querySelector(".relationship-filter")
  .addEventListener("click", (e) => {
    shuffleInstance.filter("relationship");
  });

document.querySelector(".other-filter").addEventListener("click", (e) => {
  shuffleInstance.filter("other");
});

document.querySelector(".all-filter").addEventListener("click", (e) => {
  shuffleInstance.filter(Shuffle.ALL_ITEMS);
});
