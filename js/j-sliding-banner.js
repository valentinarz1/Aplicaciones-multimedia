$(function(){
	(function ( $ ) {
		$.fn.jSlidingBanner = function(options) {
			var settings = $.extend({
				setOverlay : true,
				overlayColor : "#000000",
				displayImageDuration : 4000,
				slideAnimationSpeed : 500,
			},options );
			displayDurationPerItem = settings.displayImageDuration;
			var $this = this;
			var sliderItemClass = ".sliding-banner-item";
			var bannerContainerClass = '.sliding-banner-container';
			var bannerImgClass = '.sliding-banner-img';
			var bannerClass = ".sliding-banner";
			var $container = this.find(bannerContainerClass);

            //set the height of banner
            setBannerHeight();

			//make the  item to be floating horizontally
			setMarginLeftOfImages();

			//set up slide function
			var currentImage= 0;
			var itemLength = $(sliderItemClass).length;
			var slide = this.width();
			var atTheLastImage = false;
			setInterval(function(){

				if(!atTheLastImage)
				{
					slideBanner();
				}

			},displayDurationPerItem);

			//resize event to handle responsive on screen resize
			$(window).resize(function(){
				screenResize();
			})

			function slideBanner()
			{
				$(bannerClass).animate(
				{ 
					"right":slide
				}
				,settings.slideAnimationSpeed,function(){
					currentImage++;
					slide = (currentImage+1) * $this.width();
					setNavIcons();
					if(currentImage==itemLength-1)
					{
						atTheLastImage = true;
						setTimeout(function(){
							setFirstImage();
						},displayDurationPerItem);
					}
				})
			}

			function screenResize()
			{
				$(bannerClass).finish();
				$(sliderItemClass).css({ "width":"100%" })
				$(bannerImgClass).css({ "width":"100%" })
				setBannerHeight();
				setFirstImage();
				
				if(currentImage==0)
				{
					slide = $(bannerImgClass).width();
				}
				else{
					slide = (currentImage+1) * $(bannerImgClass).width();
				}
				setMarginLeftOfImages();
			}

			//add overlay to banner
			if(settings.setOverlay)
			{
				var $ovl = $('<div />',{ class : "sliding-banner-overlay" })
				$ovl.css({ background : settings.overlayColor })
				$container.append(
					$ovl
				);
			}

			//add navigation circles
			setNavIcons()
			function setNavIcons()
			{
				$('.sliding-banner-nav').remove();
				var $nav = $('<div />',{ class : "sliding-banner-nav" })
				$container.append(
					$nav
					)
				$(sliderItemClass).each(function(index){
					$img = '<img data-index="'+index+'" class="sliding-banner-nav-icon" src="./image/hole_circle.png">';
					if(currentImage==index)
					{
						$img = '<img data-index="'+index+'" class="sliding-banner-nav-icon" src="./image/full_circle.png">';
					}
					$nav.append(
						$img				
						);
				})

				
			}

			$(document).on('click','.sliding-banner-nav-icon',function(e){
				$(bannerClass).finish()
				var iconIndex = parseInt($(this).attr('data-index'));
				if(iconIndex!=currentImage)
				{
					if(iconIndex==0)
					{
						$(bannerClass).animate(
						{ 
							"right":0
						}
						,settings.slideAnimationSpeed,function(){
							currentImage = 0;
							slide = (currentImage+1) * $this.width();
							setNavIcons();
						})
					}
					else{
						slide = (iconIndex)*$this.width();
						$(bannerClass).animate(
						{ 
							"right":slide
						}
						,settings.slideAnimationSpeed,function(){
							currentImage = iconIndex;
							slide = (currentImage+1) * $this.width();
							setNavIcons();
							if(currentImage==itemLength-1)
							{
								atTheLastImage = true;
								setTimeout(function(){
									setFirstImage();
								},displayDurationPerItem);
							}
						})
					}	
				}

			})

			function setFirstImage()
			{
				atTheLastImage = false;
				slide = $(bannerImgClass).width();
				currentImage = 0;
				$(bannerClass).css({ 'right':"0px" })
				setNavIcons();
			}

			function setMarginLeftOfImages()
			{
				var imgMarginLeft = 0;
				$this.find(sliderItemClass).each(function(index){
				$(this).css({ "position":"absolute" , "left": imgMarginLeft + "px" })
					imgMarginLeft = imgMarginLeft + parseInt($(this).width());
					imageWidth = parseInt($(this).width());
				})
			}

			function setBannerHeight()
			{
				var bannerHeight = $(bannerImgClass).first().height();
				$this.find(bannerContainerClass).css({ "height" : bannerHeight})
			}
			return this;
		};
	}( jQuery ));
});
