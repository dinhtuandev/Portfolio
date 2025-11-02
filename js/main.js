AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - 70
	    }, 500, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var numbers = $(this.element).find('.number');
				numbers.each(function(){
					var $this = $(this),
						num = $this.data('number'),
						append = $this.data('append') || ''; // Get the append character
					
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: $.animateNumber.numberStepFactories.separator(','),
					    easing: 'swing'
					  }, 7000,
					);
				});
				$(this.element).addClass('ftco-animated');
				
			}

		} , { offset: '95%' } );

	}
	counter();

	// Skills Counter
	var skillsCounter = function() {
		$('#skills-section').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				$(this.element).find('.progress-bar').each(function(){
					var $this = $(this),
						num = parseInt($this.attr('aria-valuenow')), // Lấy giá trị phần trăm từ thuộc tính aria-valuenow
						span = $this.find('span'); // Lấy phần tử span chứa số phần trăm
					
					// Đặt chiều rộng ban đầu của thanh tiến trình về 0% để bắt đầu animation
					$this.css('width', '0%');

					// Animate chiều rộng của thanh tiến trình
					$this.animate({
						width: num + '%'
					}, {
						duration: 4000, // Thời gian animation (miliseconds)
						easing: 'swing'
					});

					// Animate số phần trăm bên trong span
					$({ Counter: 0 }).animate({ Counter: num }, {
						duration: 1500, // Thời gian animation (miliseconds)
						easing: 'swing',
						step: function () {
							span.text(Math.ceil(this.Counter) + '%'); // Cập nhật text trong span
						}
					});
				});
				$(this.element).addClass('ftco-animated'); // Đánh dấu đã animate để không chạy lại
				
			}

		} , { offset: '95%' } ); // Kích hoạt khi 95% phần tử hiển thị trên màn hình

	}
	skillsCounter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });





// New counter animation for projects counter
var projectCounter = function() {
    $('.counter-wrap').waypoint(function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
            
            var numbers = $(this.element).find('.number');
            numbers.each(function() {
                var $this = $(this);
                var num = parseInt($this.data('number'));
                var append = $this.data('append') || '';
                var duration = parseInt($this.data('duration')) || 2000; // Default 2 seconds
                
                // Reset to 0 before starting animation
                $this.text('0' + append);
                
                // Animate the number
                $({ Counter: 0 }).animate({ Counter: num }, {
                    duration: duration,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter) + append);
                    },
                    complete: function() {
                        // Ensure final number is exact
                        $this.text(num + append);
                    }
                });
            });
            
            $(this.element).addClass('ftco-animated');
        }
    }, { offset: '95%' });
};

// Initialize the project counter
projectCounter();

// Optional: Add more counters easily
var initCounters = function() {
    $('[data-counter]').each(function() {
        var $counter = $(this);
        var target = $counter.data('counter');
        var duration = $counter.data('duration') || 2000;
        
        $counter.waypoint(function(direction) {
            if (direction === 'down' && !$counter.hasClass('animated')) {
                var endValue = parseInt(target);
                $({ Counter: 0 }).animate({ Counter: endValue }, {
                    duration: duration,
                    easing: 'swing',
                    step: function() {
                        $counter.text(Math.ceil(this.Counter));
                    },
                    complete: function() {
                        $counter.text(endValue);
                        $counter.addClass('animated');
                    }
                });
            }
        }, { offset: '95%' });
    });
};

// Initialize additional counters
initCounters();

})(jQuery);