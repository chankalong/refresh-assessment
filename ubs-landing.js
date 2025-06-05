new Splide( document.getElementById( 'content_splide' ), {
  type: 'loop',
  autoplay: true,
  gap: '1.2em',
  perPage: 3,
  breakpoints: {
		640: {
			perPage: 1,
		},
  }
} ).mount(); ;
