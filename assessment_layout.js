document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  var mixer_count = 0;
  if (mixer_count == 0) {
    var mixer = mixitup("#assessment_div");
    mixer_count = 1;
  } else {
    console.log("already mixer render");
  }
});


