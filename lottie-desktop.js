var params = {
			container: document.getElementById('lottie-desktop'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animationData,
			rendererSettings:{
				viewBoxOnly: true,
				preserveAspectRatio: 'xMidYMin slice',
				className: 'some-css-class-name',
				focusable: true,
				filterSize: {
					width: '100%',
					height: '200%',
				}
			}
    };
var anim = lottie.loadAnimation(params);