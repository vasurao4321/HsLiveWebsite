
// fancy entrance or some shit
window.addEventListener('load',()=>{

	document.body.classList.add('ready');
	
})


/************ COPY EVERYTHING HERE: my soundcloud weeee https://soundcloud.com/samapitongzabala ***************/


document.addEventListener('DOMContentLoaded',()=>{

	function doParallax(){
		
		const
			scrollTop = window.scrollY, //yes
			viewportOffset = window.pageYOffset, //yes
			viewportHeight = window.innerHeight, //yes
			documentHeight = document.documentElement.offsetHeight, // yes
			documentTop = document.documentElement.clientTop, // yes
			parallaxers = document.querySelectorAll('[data-parallax-y],[data-parallax-x],[data-parallax-custom]')
			;


		if(!parallaxers) return;

		parallaxers.forEach((parallaxer) => {



			// resets transforms in the viewpoer if it fucks up the body scroll
			parallaxer.style.transform = '';
			parallaxer.style.setProperty('--parallax-calculation','0');

		
			// limit it to above mobile size for performance
			if(window.innerWidth > 767){

				const
					height = parallaxer.offsetHeight,
					offset = parallaxer.getBoundingClientRect().top + viewportOffset - documentTop, //¯\_(ツ)_/¯
					paraVX = !isNaN( parseFloat(parallaxer.getAttribute("data-parallax-x")) )
						? parseFloat(parallaxer.getAttribute("data-parallax-x"))
						: 0,
					paraVY = !isNaN( parseFloat(parallaxer.getAttribute("data-parallax-y")) )
						? parseFloat(parallaxer.getAttribute("data-parallax-y"))
						: 0,
					paraVOrigin = !isNaN( parseFloat(parallaxer.getAttribute("data-parallax-origin")) )
						? parseFloat(parallaxer.getAttribute("data-parallax-origin"))
						: .5,
					parallaxPad = !isNaN( parseFloat(parallaxer.getAttribute("data-parallax-pad")) )
						? parseFloat(parallaxer.getAttribute("data-parallax-pad"))
						: .5;
						
				const parallaxStart = scrollTop + (viewportHeight * (1 + parallaxPad)) >= 0
					? scrollTop + (viewportHeight * (1 + parallaxPad))
					: 0;
				const parallaxEnd = scrollTop - (viewportHeight * parallaxPad) <= documentHeight
					? scrollTop - (viewportHeight * parallaxPad)
					: documentHeight;

				const scrollOffset = ( (viewportHeight * paraVOrigin) - (height * paraVOrigin));
				let calcedTransform = ( ((scrollTop - offset) + scrollOffset) / viewportHeight );
				
				// if(calcedTransform > 1) {
				// 	calcedTransform = 1;
				// }else if(calcedTransform < -1){
				// 	calcedTransform = -1;
				// }
				
				
				const x = Math.round(calcedTransform * paraVX);
				const y = Math.round(calcedTransform * paraVY);
				
				if (parallaxStart > offset && offset + height > parallaxEnd) {
					if(!parallaxer.hasAttribute('data-parallax-custom')) {
						parallaxer.style.transform = "translateX("+ x + "px)" + "translateY(" +y + "px)";
					}
					parallaxer.style.setProperty('--parallax-calculation',calcedTransform);
				}
			// }else {
			// 		parallaxer.style.transform = '';
			// 		parallaxer.style.setProperty('--parallax-calculation','0');
			}

		});
	}
	doParallax();
	window.addEventListener('resize', doParallax);
	window.addEventListener('scroll', doParallax);
});