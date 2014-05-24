
	/* 
	 * Custom Code for Tauno Template
	 * 
	 * Designed and Developed by: ThemeDrops
	 * URL: www.themedrops.com
	 *
	 */
	
	
	jQuery(document).ready(function($)
	{
	
	
		// ThemeDrops Slider
		var themedrops_slider = $("#themedrops_slider");
		
		if(themedrops_slider.length)
		{
			var opts = {
				auto: true,
				timeout: 4000,
				pager: $(".slider_buttons"),
				pagerClick: function(s)
				{
					s.setAutoPlay(false);
				}
			};
			
			var slider = themedrops_slider.themedropsSlider(opts);
		}
		
		
		
		
		// Featured Videos Slider
		var featured_videos_slider = $("#featured_videos_slider");
		
		if(featured_videos_slider.length)
		{
			var opts_videos = {
				pager: $(".featured_videos_buttons"),
				activePagerClass: 'active',
				fx: 'scrollHorz'
			};
			
			featured_videos_slider.cycle(opts_videos);
		}
		
		
		
		
		// Read Also Posts Slider
		var read_also_posts = $("#read_also_posts");
		
		if(read_also_posts.length)
		{
			var opts_ralso = {
				pager: $(".read_also_buttons"),
				activePagerClass: 'active'
			};
			
			read_also_posts.cycle(opts_ralso);
		}
		
		
		
		
		
		
		// Tweets (Footer)
		var _show_tweets	= 2; // Tweets per row
		var _tweet_timeout	= 3; // Seconds to switch tweets
		
		var tweets = $(".tweets");
		var tweets_ch = tweets.children();
		
		tweets_ch.hide().slice(0, _show_tweets).show();
		
		var _tw_options = {
			container: tweets, 
			tweets: tweets_ch, 
			tweets_per_page: _show_tweets,
			timeout: _tweet_timeout * 1000,
			pause_on_hover: true
		};
		
		var tweet_roller = new tweetRoller(_tw_options);
		tweet_roller.start();
		
		
		
		
		
		// Image Overlay
		var add_overlays = function(already_loaded)
		{
			$(".overlay").hoverZoom({
				overlay: true,
				overlayColor: '#1a1a1a',
				overlayOpacity: 0.7,
				zoom: 0,
				speed: 300,
				already_loaded: already_loaded ? true : false
			});
		}
		
			
		var overlay_images = $(".overlay img");
		
		overlay_images.each(function()
		{
			var $this = $(this);
			
			var margin_top = parseInt($this.css('margin-top'), 10);
			var margin_bottom = parseInt($this.css('margin-bottom'), 10);
			var margin_left = parseInt($this.css('margin-left'), 10);
			var margin_right = parseInt($this.css('margin-right'), 10);
			
			if(margin_bottom != 0 || margin_top != 0 || margin_left != 0 || margin_right != 0)
			{
				var parent = $this.parent();
				
				$this.css({marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0});
				
				parent.css({
					marginTop: margin_top,
					marginBottom: margin_bottom,
					marginLeft: margin_left,
					marginRight: margin_right
				});
			}
		});
		
		add_overlays();
		
		
		
		
		
		// Play Videos
		$(".play_video").prettyPhoto({
			social_tools: '',
			width: 600,
			height: 350,
			show_title: false
		});
		
		
		
		
		
		// View Images
		$(".view_image").prettyPhoto({
			social_tools: '',
			show_title: false
		})




		
		// Post A Comment (Scroll To Form)
		var scroll_to_comment_form = $("#scroll_to_comment_form");
		var comment_form = $("#comment_form");
		
		$(".comment_reply").click(function(ev)
		{
			ev.preventDefault();
			
			go_to_comments_form();
		});
		
		scroll_to_comment_form.click(function(ev)
		{
			ev.preventDefault();
			
			go_to_comments_form();
		});
		
		var go_to_comments_form = function(){
			
			var offset_top = comment_form.offset().top;
			
			$("html,body").animate({scrollTop: offset_top}, {easing: 'easeInOutSine', duration: 500, complete: function()
			{
				$("#name").focus();
			}});
		}
		
		
		
		// Sidebar Tabs
		$(".tabs").each(function()
		{
			var $this = $(this);
			
			var tabs_titles = $this.find('.tabs_titles a');
			
			var tab_contents = $this.find('.tab_content > div');
			
			tab_contents.each(function()
			{
				var height = $(this).height();
				
				$(this).attr('data-height', height);
			});
			
			tabs_titles.click(function(ev)
			{
				ev.preventDefault();
				
				var id = $(this).attr('href');
				
				if($(this).hasClass('active'))
					return false;
				
				tabs_titles.removeClass('active');
				$(this).addClass('active');
				
				// To Hide
				var to_hide = tab_contents.filter(':visible');
				var to_show = tab_contents.filter(id);
				
				var to_show_height = parseInt(to_show.attr('data-height'), 10);
				
				to_hide.css({position: 'relative', zIndex: 9, overflow: 'hidden'}).stop().animate({height: 0, opacity: 0});
				to_show.show().css({position: 'relative', zIndex: 10, overflow: 'hidden', height: 0, opacity: 0}).stop().animate({height: to_show_height, opacity: 1});
			});
			
			tab_contents.hide();
			
			var active_tab = tabs_titles.filter('[class="active"]').attr('href');
			tab_contents.filter(active_tab).show();
			
		});
		
		
		
		
		// About Popup (Footer)
		$(".about_popup_open").prettyPhoto({social_tools: ''});
		
		
		
		
		// Post Filtering (Homepage)
		var homepage_posts = $("#homepage_posts > div[data-id]");
		var homepage_posts_cloned = homepage_posts.clone();
		
		homepage_posts.css({display: 'block'});
		
		var homepage_post_categories_menu = $("#homepage_post_categories_menu");
		
		var homepage_post_categories_menu_items = homepage_post_categories_menu.find('li a');
		
		homepage_post_categories_menu_items.click(function(ev)
		{
			ev.preventDefault();
			
			var item = $(this);
			
			homepage_post_categories_menu_items.removeClass('active');
			item.addClass('active');
			
			var category = item.attr('data-category');
			
			
			filterPosts(category);
		});
		
		function filterPosts(category)
		{
			var to_show = homepage_posts_cloned.filter(function(i)
			{
				var categories = $(this).attr('data-category');
				
				if(categories.indexOf(category) != -1 || category == 'all' || category == '*')
				{
					return true;
				}
				
				return false;
			});
			
			$("#homepage_posts").quicksand(to_show, {adjustHeight: 'dynamic'}, function()
			{
				add_overlays(true);
			});
		}
		
		
		
		
		
		
		// Post Filtering (Portfolio)
		var portfolio_posts = $("#portfolio_posts > div[data-id]");
		var portfolio_posts_cloned = portfolio_posts.clone();
		
		portfolio_posts.css({display: 'block'});
		
		var portfolio_post_categories_menu = $("#portfolio_categories_menu");
		
		var portfolio_post_categories_menu_items = portfolio_post_categories_menu.find('li a');
		
		portfolio_post_categories_menu_items.click(function(ev)
		{
			ev.preventDefault();
			
			var item = $(this);
			
			portfolio_post_categories_menu_items.removeClass('active');
			item.addClass('active');
			
			var category = item.attr('data-category');
			
			
			filterPortfolioPosts(category);
		});
		
		function filterPortfolioPosts(category)
		{
			var to_show = portfolio_posts_cloned.filter(function(i)
			{
				var categories = $(this).attr('data-category');
				
				if(categories.indexOf(category) != -1 || category == 'all' || category == '*')
				{
					return true;
				}
				
				return false;
			});
			
			$("#portfolio_posts").quicksand(to_show, {adjustHeight: 'dynamic'}, function()
			{
				add_overlays(true);
			});
		}
		
		
		
		
		// Alert Boxes
		$(".alert_success, .alert_error").each(function()
		{
			var $this = $(this);
			
			var close_button = $('<a href="#" class="close">Close</a>');
			
			$this.prepend(close_button);
			
			close_button.click(function(ev)
			{
				ev.preventDefault();
				
				var parent = $(this).parent();

				parent.css({position: 'relative', overflow: 'hidden'}).stop().animate({'padding-top': 0, 'padding-bottom' : 0, height: 0, opacity: 0}, {
					complete: function()
					{
						parent.remove();
					}
				});
			});
		});
		
		
		
		
		// Form Validator
		var validate_form = $(".validate_form");
		
		if(validate_form.length > 0)
		{
			validate_form.validate();
		}
		
		
		
		
		// Submenus
		var hover_timeout = 250;
		var duration = 500;
		
		$(".menu_container ul ul").each(function()
		{
			var is_hovered = false;
			var timeout;
		
			var $this = $(this);
			var submenu_arrow = $('<div class="submenu_arrow" />');
			
			submenu_arrow.show().fadeTo(0,0);
			
			$this.before(submenu_arrow);
			$this.show();
			
			// Submenu Height
			var submenu_height = parseInt($this.height(), 10);
			$this.attr('data-height', submenu_height);
			
			// Collapse Menu
			$this.css({height: 0}).fadeTo(0,0);
			
			var link = $this.parent().find('> a');
			
			
			$this.hover(function()
			{
				is_hovered = true;
				timeout.clearTimeout(timeout);
			},
			function()
			{
				is_hovered = false;
				hover_timeout_fn();
			});
			
			var hover_timeout_fn = function()
			{
				if(is_hovered)
				{
					return true;
				}
				
				$this.stop().fadeTo(duration, 0, function()
				{
					$this.stop().css({height: 0});
				});
				
				submenu_arrow.stop().fadeTo(duration-50, 0);
			};
			
			link.hover(function()
			{
				submenu_arrow.stop().fadeTo(0,1);
				
				$this.stop().fadeTo(0, 1, function()
				{
					$this.stop().animate({height: submenu_height}, {duration: duration})
				});
			},
			function()
			{
				setTimeout(hover_timeout_fn, hover_timeout);
				
			});
		});
		
		
		
		// Contact Form Process
		var contact_form = $(".contact_form");
		var form_elements = $(".form_elements");
		
		var contact_form_success_message = $(".contact_form_success_message");
		
		if( contact_form.find('form').hasClass('validate_form'))
		{
			contact_form.submit(function(ev)
			{
				ev.preventDefault();
				
				var fields = {};
				
				contact_form.find('input,textarea,button').each(function()
				{
					var field_name = $(this).attr('name');
					var field_value = $(this).val();
					
					eval('fields.'+field_name+' = field_value');
				});
				
				form_elements.find("#send").fadeTo(500, 0.5).attr('disabled', true);
					
				$.post('contact_request.php', fields, function(data)
				{
					form_elements.css({overflow: 'hidden'}).animate({height: 0});
					
					contact_form_success_message.slideDown('normal');
				});
			});
		
		}
	});
	
	
	/* Tweet Roller plugin by Arlind Nushi */
	var tweetRoller = function(_options)
	{
		var self = this;
		
		var options = {
			container: null,
			tweets: null,
			tweets_per_page: 2,
			timeout: 0,
			pause_on_hover: true,
			show_hide_speed: 500
		};
		
		$.extend(options, _options);
		
		// Define Variables
		var container = options.container;
		var tweets = options.tweets;
		var tweets_per_page = options.tweets_per_page;
		var timeout = options.timeout;
		var pause_on_hover = options.pause_on_hover;
		var show_hide_speed = options.show_hide_speed;
		
		var interval = null;
		
		container.css({
			position: 'relative'
		});
		
		// Class Variables
		this.index = 0;
		this.total = tweets.length;
		
		
		return {
			next: function()
			{
				var indexes = this.get_indexes();
				
				var to_hide = tweets.slice(indexes[0], indexes[1]);
				
				this.next_index();
				
				indexes = this.get_indexes();
				var to_show = tweets.slice(indexes[0], indexes[1]);
				
				to_hide.stop().css({position: 'relative'}).animate({top: -20, opacity: 0}, {
					duration: show_hide_speed,
					complete: function()
					{
						to_hide.css({top: 0}).hide();
						
						to_show.fadeTo(0,0);
						
						to_show.stop().css({
							top: 20,
							position: 'relative'
						}).animate({
							top: 0,
							opacity: 1
						}, {
							duration: show_hide_speed
						});
					}
				});
			},
			
			get_indexes: function()
			{
				var index_1 = self.index;
				var index_2 = self.index + tweets_per_page;
				index_2 %= self.total;
				
				if(index_2 < index_1)
				{
					var diff = index_1 - index_2 - tweets_per_page;
					
					index_1 -= index_2 - diff;
					index_2 = index_1 + tweets_per_page;
				}
				
				return [index_1, index_2];
			},
			
			next_index: function()
			{
				self.index += tweets_per_page;
				self.index = self.index % self.total;
			},
			
			start: function()
			{
				var _self = this;
				
				// Auto Scroller
				if(timeout > 0)
				{
					var auto_scroller = function()
					{
						_self.next();
					};
					
					interval = setInterval(auto_scroller, timeout);
					
					// Pause on Hove
					if(pause_on_hover)
					{
						container.hover(function()
						{
							window.clearInterval(interval);
							interval = null;
						},
						function()
						{
							interval = setInterval(auto_scroller, timeout);
						});
					}
				}
			}
		};
	}