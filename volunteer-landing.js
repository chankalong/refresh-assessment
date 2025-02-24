var functionTime;

if (typeof functionTime != 'undefined') {
  new Splide(document.getElementById("header_splide"), {
    type: "loop",
    autoplay: true,
    perPage: 1,
  }).mount();
  new Splide(document.getElementById("volunteer-project_splide"), {
    type: "loop",
    autoplay: true,
    gap: "1.2em",
    perPage: 2,
    breakpoints: {
      640: {
        perPage: 1,
      },
    },
  }).mount();

  var video_splide_element = new Splide(
    document.getElementById("video_splide"),
    {
      pagination: false,
      arrows: false,
      video: {
        loop: true,
        mute: true,
        //playerOptions: {
        //  youtube: { ... },
        //},
      },
    }
  );

  var thumbnail_splide_element = new Splide(
    document.getElementById("thumbnail_splide"),
    {
      rewind: true,
      pagination: false,
      isNavigation: true,
      //fixedWidth: 640,
      //fixedHeight: 360,
      perPage: 3,
      gap: 5,
      focus: "center",
      video: {
        loop: true,
        mute: false,
        disableOverlayUI: true,
        hideControls: true,
        //playerOptions: {
        //  youtube: { ... },
        //},
      },
    }
  );

  video_splide_element.sync(thumbnail_splide_element);
  video_splide_element.mount(window.splide.Extensions);
  thumbnail_splide_element.mount(window.splide.Extensions);
  thumbnail_splide_element.Components.Video.disable(true);
  functionTime = 1;
} else {
  //header_splide.destroy();
  console.log("mounted already");
  functionTime = undefined
  
}
