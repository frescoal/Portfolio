
	/**
	 * jQuery Plugin by: Arlind Nushi
	 * 
	 * Web: www.themedrops.com
	 * Personal Portfolio: www.arlindnushi.com
	 */

	(function($)
	{
		jQuery.fn.themedropsSlider = function(options)
		{
			var clearer = $('<div class="clear" />');
		
			var _o = {
				slides_expr: '> li',
				left_part: '.featured_image',
				right_part: '.featured_text',
				timeout: 4000,
				index: 0,
				
				easing: 'easeInOutQuad',
				speed_in: 500,
				speed_out: 300,
				
				auto: false,
				pause: true,
				pager: null,
				
				keyboard: true,
				
				change: function(){},
				pagerClick: function(){}
			};
			
			$.extend(_o, options);
			
			// Extract Vars
			var slides_expr = _o.slides_expr;
			var timeout = _o.timeout;
			var slider_width, slider_height;
			
			var timeout = _o.timeout;
			var speed_in = _o.speed_in;
			var speed_out = _o.speed_out;
			
			var easing = _o.easing;
			
			var auto = _o.auto; // Autoplay
			var pause = _o.pause;
			
			var left_part = _o.left_part;
			var right_part = _o.right_part;
			
			var pager = _o.pager;
			
			// Autoplay Interval
			var autoplay_interval;
			
			// Keyboard Switch
			var keyboard = _o.keyboard;
			
			// Events
			var change = _o.change;
			var pagerClick = _o.pagerClick;
			
			// Slider Container
			var $this = $(this);
			var slides = $this.find(slides_expr);
			
			
			// Container Options
			$this.css({
				position: 'relative'
			});
			
			var total_slides = slides.length;
			
			// Slider Autoplay Function			
			var autoplay_interval_fn = function()
			{
				var next_index = funcs.getNextIndex();
				funcs.switchSlide(next_index);
			};
			
			var funcs = {
				
				switchSlide: function(index)
				{
					// Direction (upside/down)
					var direction = 1;
					
					if(index <= _o.index)
						direction = -1;
					
					if(index == _o.index)
					{
						return false;
					}
					
					var current_slide = this.getCurrentSlide();
					var next_slide = this.getSlide(index);
					
					if(next_slide.length)
					{
						_o.index = index;
					}
					else
					{
						return false;
					}
					
					current_slide.css({zIndex: 50});
					next_slide.css({zIndex: 55});
					
					// Reseter
					var _reseter_out = function()
					{
						$(this).css({top: 0, opacity: 1});
						current_slide.hide();
					}
					
					var _reseter_in = function()
					{
						$(this).css({top: 0, opacity: 1});
					}
					
					// Current Slider
					var c_width = parseInt(current_slide.attr('data-width'), 10);
					var c_height = parseInt(current_slide.attr('data-height'), 10);
					
					var c_left = current_slide.find(left_part);
					var c_right = current_slide.find(right_part);
					
					// Next Slider
					var n_width = parseInt(next_slide.attr('data-width'), 10);
					var n_height = parseInt(next_slide.attr('data-height'), 10);
					
					var n_left = next_slide.find(left_part);
					var n_right = next_slide.find(right_part);
					
					// Start Animation
					c_left.add(c_right).add(n_left).add(n_right).css({position: 'relative'});
					
					c_left.stop().animate({top: -direction*c_height, opacity: 0}, {duration: speed_out, easing: easing, complete: _reseter_out});
					c_right.stop().animate({top: direction*c_height, opacity: 0}, {duration: speed_out, easing: easing, complete: _reseter_out});
					
					next_slide.show();
					
					
					n_left.css({top: direction*n_height}).stop().animate({top: 0, opacity: 1}, {duration: speed_in, easing: easing, complete: _reseter_in});
					n_right.css({top: -direction*n_height, opacity: 0}).stop().animate({top: 0, opacity: 1}, {duration: speed_in, easing: easing, complete: _reseter_in});
					
					// Update Pager
					if(pager && pager.length)
					{
						pager.find('a').removeClass('active').filter('[rel="'+index+'"]').addClass('active');
					}
					
					// Callback
					change(this);
				},
				
				setupSlides: function(){
				
					slides.each(function()
					{
						var _slide = $(this);
						
						_slide.css({
							display: 'block'
						}).append(clearer);
						
						var width = _slide.width();
						var height = _slide.height();
						
						_slide.attr('data-width', width);
						_slide.attr('data-height', height);
						
						_slide.css({
							position: 'absolute',
							width: width,
							height: height,
							overflow: 'hidden'
						});
					});
					
					this.updateSliderHeight();
				},
				
				
				hideOtherSlides: function()
				{
					slides.hide();
					
					this.getCurrentSlide().show();
				},
				
				updateSliderHeight: function()
				{
					var current_slide = this.getCurrentSlide();
					
					var height = current_slide.attr('data-height');
					
					$this.height(height);
				},
				
				getSlide: function(index)
				{
					return slides.slice(index, index+1);
				},
				
				getCurrentSlide: function()
				{						
					return this.getSlide(_o.index);
				},
				
				getNextSlide: function()
				{
					_o.index++;
					_o.index = _o.index % total_slides;
					
					return this.getSlide(_o.index);
				},
				
				getPrevSlide: function()
				{
					_o.index--;
					
					if(_o.index < 0)
						_o.index = total_slides - 1;
					
					return this.getSlide(_o.index);
				},
				
				getNextIndex: function()
				{
					var index = _o.index + 1;
					index = index % total_slides;
					
					return index;
				},
				
				getPrevIndex: function()
				{
					var index = _o.index - 1;
					
					if(index< 0)
						index = total_slides - 1;
					
					return index;
				},
				
				getIndex: function()
				{
					return _o.index;
				},
				
				createPager: function()
				{
					if(pager && pager.length)
					{
						pager.html('');
						
						slides.each(function(i)
						{
							var slide_link = $(' <a href="#" rel="'+i+'">'+(i+1)+'</a> ');
							
							if(i == _o.index)
							{
								slide_link.addClass('active');
							}
							
							pager.append(slide_link)
							
							slide_link.click(function(ev)
							{
								ev.preventDefault();
								
								var id = parseInt($(this).attr('rel'), 10);
								
								pagerClick(funcs);
								
								funcs.switchSlide(id);
							});
						});
					}
				},
				
				setAutoPlay: function(state)
				{
					window.clearInterval(autoplay_interval);
					autoplay_interval = null;
						
					if(state)
					{
						autoplay_interval = setInterval(autoplay_interval_fn, timeout);
					}
				},
				
				
				enableKeyboardSwitch: function()
				{
					$(window).keyup(function(ev)
					{
						if(ev.keyCode == 37)
						{
							var prev_index = funcs.getPrevIndex();
							funcs.switchSlide(prev_index);
							funcs.setAutoPlay(false);
						}
						else
						if(ev.keyCode == 39)
						{
							var next_index = funcs.getNextIndex();
							funcs.switchSlide(next_index);
							funcs.setAutoPlay(false);
						}
					});
				}
			};
			
			// Start Slider (hide other slides)
			funcs.setupSlides();
			funcs.hideOtherSlides();
			
			// Install Pager
			if(pager && pager.length)
			{
				funcs.createPager();
			}
			
			// Keyboard Switch
			if(keyboard)
			{
				funcs.enableKeyboardSwitch();
			}
			
			// Autoplay
			if(auto)
			{				
				autoplay_interval = setInterval(autoplay_interval_fn, timeout);
				
				if(pause)
				{
					$this.hover(function()
					{
						window.clearInterval(autoplay_interval);
						autoplay_interval = null;
					},
					function()
					{
						autoplay_interval = setInterval(autoplay_interval_fn, timeout);
					});
				}
			}		
			
			return funcs;			
		}
		
	})(jQuery);