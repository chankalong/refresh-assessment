var header_splide = new Splide( document.getElementById( 'header_splide' ), {
  type: 'loop',
  autoplay: true,
  perPage: 1,
} );

if ( header_splide.state.is( Splide.STATES.IDLE ) ) {
  // do something
	console.log("mounted already")
} else {
	header_splide.mount();
}

var volunteer-project_splide = new Splide( document.getElementById( 'volunteer-project_splide' ), {
  type: 'loop',
  autoplay: true,
  gap: '1.2em',
  perPage: 2,
  breakpoints: {
		640: {
			perPage: 1,
		},
  }
} );

if ( project_splide.state.is( Splide.STATES.IDLE ) ) {
  // do something
	console.log("mounted already")
} else {
	project_splide.mount();
}
  
var content_splide = new Splide( document.getElementById( 'content_splide' ), {
  type: 'loop',
  autoplay: true,
  gap: '1.2em',
  perPage: 3,
  breakpoints: {
		640: {
			perPage: 1,
		},
  }
} );

if ( content_splide.state.is( Splide.STATES.IDLE ) ) {
  // do something
	console.log("mounted already")
} else {
	content_splide.mount();
}

var video_splide_element = new Splide( document.getElementById( 'video_splide' ), {
  pagination: false,
  arrows: false,
  video: {
    loop: true,
    mute: true,
    //playerOptions: {
    //  youtube: { ... },
    //},
  },
} );

  
  
var thumbnail_splide_element = new Splide( document.getElementById( 'thumbnail_splide' ), {
  rewind: true,
  pagination: false,
  isNavigation: true,
  //fixedWidth: 640,
  //fixedHeight: 360,
  perPage: 3,
  gap: 5,
  focus: 'center',
  video: {
    loop: true,
    mute: false,
    disableOverlayUI: true,
    hideControls: true
    //playerOptions: {
    //  youtube: { ... },
    //},
  },
} );

if ( video_splide_element.state.is( Splide.STATES.IDLE ) ) {
  // do something
	console.log("mounted already")
} else {
	  video_splide_element.sync( thumbnail_splide_element );
  video_splide_element.mount( window.splide.Extensions );
  thumbnail_splide_element.mount( window.splide.Extensions );
  thumbnail_splide_element.Components.Video.disable(true)
}

