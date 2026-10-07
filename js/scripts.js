var default_screen_width 			= 1280;
var default_font_size_h1 			= 90;
var default_font_size_h2 			= 28;
var default_font_size_h3 			= 42;
var default_font_size_first_span 	= 236;
var default_font_size_span 			= 72;
var default_logo_width 				= 255;
var default_nav_padding 			= 20;
var default_nav_height 				= 50;
var default_overlay_p_size 			= 46;
var default_overlay_a_size 			= 18;
var default_overlay_line_height		= 55;
var default_overlay_first_li_pbtm	= 40;
var blockquotes 					= get_tags("blockquote");
var blockquote_offsets 				= [];
var three_cols 						= get_three_col();
var three_col_offsets 				= [];
var sub_headers 					= get_class("subheader-brief");
var sub_header_offsets 				= [];
var separators 						= get_class("separator-half-width");
var separator_offsets 				= [];

var overlay_data 					= [
		{
			"click_element":document.getElementById("menu-button"),
			"check_element":document.getElementById("overlay"),
			"class_add":"overlay-open",
			"class_remove":"overlay-close",
		},
		{
			"click_element":document.getElementById("overlay"),
			"check_element":document.getElementById("overlay"),
			"class_add":"overlay-close",
			"class_remove":"overlay-open",
		}
	];

//////////////////////////////////////

// Faster to type
function window_width(){
	return window.innerWidth;
}

// Faster to type
function window_height(){
	return window.innerHeight;
}


// Applies only to the first blockquote element
function font_screen_ratio_first_blockquote_span(new_window_width){
	var text_bg = document.getElementsByTagName("blockquote")[0].getElementsByTagName("span")[0];
	if(new_window_width < default_screen_width){
		text_bg.style.fontSize = new_window_width*(default_font_size_first_span/default_screen_width) + "px";
	}
	else if (new_window_width > default_screen_width){
		text_bg.style.fontSize = default_font_size_first_span + "px";
	}
}


// Applies to all of the blockquote elements except for the first
function font_screen_ratio_span_background(new_window_width){
	var a = document.getElementsByTagName("blockquote");
	for(var b=1; b<a.length; b++){
		if(new_window_width < default_screen_width){
			a[b].getElementsByTagName("span")[0].style.fontSize = new_window_width*(default_font_size_span/default_screen_width) + "px";
		}
		else if (new_window_width > default_screen_width){
			a[b].getElementsByTagName("span")[0].style.fontSize = default_font_size_span + "px";
		}
	}
}


// Scales all text of a given set of elements
function font_screen_ratio(new_window_width, font_size, tagname){
	var el_tags = document.getElementsByTagName(tagname);
	for(var a=0; a<el_tags.length; a++){
		if(new_window_width < default_screen_width){
			el_tags[a].style.fontSize = new_window_width*(font_size/default_screen_width) + "px";
		}
		else if (new_window_width > default_screen_width){
			el_tags[a].style.fontSize = font_size + "px";
		}
	}
}

// Scales the logo
function logo_screen_ratio(new_window_width){
	var logo = document.getElementsByTagName("nav")[0].getElementsByTagName("img")[0];
	if(new_window_width < default_screen_width){
		logo.style.width = new_window_width*(1*(default_logo_width/default_screen_width)) + "px";
	}
	else if (new_window_width > default_screen_width){
		logo.style.width = default_logo_width + "px";
	}
}


function nav_screen_ratio(new_window_width){
	var navbar = document.getElementsByTagName("nav")[0];
	if(new_window_width < default_screen_width){
		navbar.style.height 	= new_window_width*(1*(default_nav_height/default_screen_width)) + "px";
		navbar.style.padding 	= new_window_width*(1*(default_nav_padding/default_screen_width)) + "px 0";
	}
	else if (new_window_width > default_screen_width){
		navbar.style.height 	= default_nav_height + "px";
		navbar.style.padding 	= default_nav_padding + "px 0";
	}
}


//////////////////////////////////////


function open_nav_overlay(){
	var button_menu = document.getElementById("menu-button");

	button_menu.addEventListener("click", function(){
		var overlay_menu 			= document.getElementById("overlay");
		var text_menu 				= document.getElementById("menu-button").getElementsByTagName("span");
		overlay_menu.style.display 	= "flex";
		get_menu_text_height()
		
		if(overlay_menu.style.pointerEvents != "auto"){	
			var lines_menu 						= button_menu.getElementsByTagName("li");
			overlay_menu.style.opacity 			= 0.9;
			overlay_menu.style.pointerEvents 	= "auto";
			document.body.style.overflow 		= "hidden";		
			
			for(var a=0; a<lines_menu.length; a++){
				lines_menu[a].classList.add("opened");
			}
			init_nav_item_animation();
			fade_in_out(text_menu[0], text_menu[1], 0);
		}
		else if(overlay_menu.style.pointerEvents == "auto"){
			close_nav_overlay();
			fade_in_out(text_menu[1], text_menu[0], 0);
		}
	});
}


// Click the menu button/x button to close the overlay menu
function close_nav_overlay(){
	var overlay_menu 					= document.getElementById("overlay");
	var button_menu 					= document.getElementById("menu-button");
	var text_menu 						= button_menu.getElementsByTagName("span");
	var lines_menu 						= button_menu.getElementsByTagName("li");
	overlay_menu.style.opacity 			= 0.0;
	overlay_menu.style.pointerEvents 	= "none";
	document.body.style.overflow 		= "visible";		
	
	for(var a=0; a<lines_menu.length; a++){
		lines_menu[a].classList.remove("opened");
	}
	
	fade_in_out(text_menu[1], text_menu[0], 0);

	setTimeout(function(){
		overlay_menu.style.display = "none";
	}, 500);
}


// Click overlay background area to close overlay
function init_close_nav_overlay(){
	var overlay_menu = document.getElementById("overlay");
	overlay_menu.addEventListener("click", function(){
		close_nav_overlay();
	});
}

// Press escape to close menu overlay
function escape_key_events(){
	// CLOSE MENU OVERLAY
	document.addEventListener("keydown", function(e){
		if(e.key == "Escape"){
			close_nav_overlay();
		}
	});

	// CLOSE SEARCH INPUT
	var search_input = document.getElementById("global-search").getElementsByTagName("input")[0];
	search_input.addEventListener("keydown", function(e){
		if(e.key == "Escape"){
			document.getElementById("global-search").getElementsByTagName("label")[0].style.opacity = "1.0";
			this.classList.remove("active-search");
		}
	});
}

// Smoothly scales the logo and nav on window resize, as long as window width is above 800px
function resize_rescale(){
	var a = window_width();

	if(a > 800){
		logo_screen_ratio(a);
		nav_screen_ratio(a);
	}
}


////////////////////////////////////// 


function active_nav_item(){
	var a = document.getElementsByClassName("active-nav-item")[0];
	var b = a.getElementsByTagName("li");
	for(var c = 0; c<b.length; c++){
		b[c].style.color = "rgba(255,255,255,1.0)";
	}
}


function init_nav_item_animation(){
	var a = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
	for(var b=0; b<a.length; b++){
		(function(c){
			setTimeout(function(){
				var d = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
				setTimeout(function(){
						d[c].getElementsByTagName("p")[0].style.opacity = "1";
						active_nav_item();
					},20);
				}, c*20);
		})(b);
	}	
}


////////////////////////////////////// 


function open_search_input(el_id){
	var a = document.getElementById(el_id);
	a.addEventListener("click", function(){
		var b = this.getElementsByTagName("input")[0];
		if(!b.classList.contains("active-search")){
			if(el_id != "mobile-search-container"){
				b.classList.add("active-search");
			}
			b.focus();
			this.getElementsByTagName("label")[0].style.opacity = "0";
		}	
	});
}


function close_search_input(el_id){
	var search_input = document.getElementById(el_id).getElementsByTagName("input")[0];
	search_input.addEventListener("blur", function(){
		if(this.value == ""){
			document.getElementById(el_id).getElementsByTagName("label")[0].style.opacity = "1.0";
		}
		this.classList.remove("active-search");
	});
}


////////////////////////////////////// 


function get_stat_elements(){
	return document.getElementById("stats").getElementsByTagName("span");
}


function get_stat_vals(stat_els){
	var store_stats	= [];

	for(var c=0; c<stat_els.length; c++){
		store_stats.push(Number(stat_els[c].innerHTML));
	}
	return store_stats;
}


function run_int(stat_els, stats_nums, loop_iter){
	var start 	= 0;  
	var dur 	= 20000;
	var end 	= stats_nums[loop_iter]; 
	var len 	= end-start;
	var step	= Math.abs(Math.floor(dur/len))
	var iter 	= 0;
	var run_cnt = setInterval(function(){
						iter+=1;
						stat_els[loop_iter].innerHTML = iter;
						if(iter>stats_nums[loop_iter]){
							clearInterval(run_cnt);
						}
					},1); 	
}


function animate_stats(){
	var stat_els 	= get_stat_elements();
	var stats_nums 	= [486, 186, 286, 15];

	for(var b=0; b<stats_nums.length; b++){
		run_int(stat_els, stats_nums, b);
	}
}


////////////////////////////////////// 


function test_get_stats_li(){
	return document.getElementById("stats").getElementsByTagName("li");
}


function fade_in(el){
	setTimeout(function(){
		el.style.display = "block";
		el.style.opacity = 1;
	}, 200);	
}


function fade_out(el){
	el.style.opacity = 0;
	setTimeout(function(){
		el.style.display = "none";
	}, 200);
}


function fade_in_out(el_a, el_b, timing){
	el_a.style.opacity = 0;
	setTimeout(function(){
		el_a.style.display = "none";
		el_b.style.display = "block";
		setTimeout(function(){
			el_b.style.opacity = 1;
		}, timing);
	}, timing);
}


function test_animate_stats(){
	var stat_els 	= test_get_stats_li();
	var stats_nums 	= [486, 186, 286, 15];
	var el_index 	= 0;

	var run_el_index = setInterval(function(){
		if(el_index == 0){
			fade_in_out(stat_els[stat_els.length-1], stat_els[el_index], 200);
		}
		else if(el_index >= stat_els.length){
			fade_in_out(stat_els[el_index-1], stat_els[0], 200);
		}
		else{
			fade_in_out(stat_els[el_index-1], stat_els[el_index], 200);
		}

		var stat_inc = 0;
		setTimeout(function(){
			var run_cnt = setInterval(function(){
								stat_inc+=1;
								stat_els[el_index-1].getElementsByTagName("span")[0].innerHTML = stat_inc;
								if(stat_inc>stats_nums[el_index-1]){
									clearInterval(run_cnt);
								}
							},1);
						}, 400); 

		if(el_index >= stat_els.length){
			el_index = 0;
		}
		el_index+=1
	},3000); 
}


////////////////////////////////////// 


function get_tags(tagname){
	return document.getElementsByTagName(tagname);
}


function get_class(class_name){
	return document.getElementsByClassName(class_name);
}


function get_offsets(collection_of_els){
	var b = [];
	for(var c=0;c<collection_of_els.length; c++){
		var d = collection_of_els[c].offsetTop;
		b.push(d);
	}
	return b
}


function trigger_animation(tags_offset, scroll_position, collection_of_els, class_remove){
	for(var a=0; a<tags_offset.length; a++){
		if(scroll_position > tags_offset[a]-(blockquote_offsets[0]*2) && collection_of_els[a].classList.contains(class_remove)){
			collection_of_els[a].classList.remove(class_remove);
		}
	}
}


////////////////////////////////////// 

function adjust_menu_text_size(el, val){
	for(var a=0; a<el.length; a++){
		el[a].style.fontSize = val + "px";
	}
}

function adjust_menu_line_height(overlay, line_height_val, padding_btm_val){
	var a = overlay.children; 
	for(var b=0; b<a.length; b++){
		var c = a[b].getElementsByTagName("ul")[0].getElementsByTagName("li");
		a[b].style.maxHeight 		= c[0].offsetHeight*(c.length+3)+"px";
		a[b].style.paddingBottom 	= padding_btm_val+"px"; 
		for(var d=0; d<c.length; d++){
			c[d].style.lineHeight = line_height_val + "px";
		}
	}
}

function adjust_menu_size(){
	var a = document.getElementsByTagName("nav")[0];
	var b = a.offsetHeight;
	var c = document.getElementById("overlay").getElementsByTagName("ul")[0];
	var d = c.offsetHeight;
	var e = 0;
	for(var f=0; f<c.children.length; f++){
		e+=c.children[f].offsetHeight;
	}

	var g = c.getElementsByTagName("p");
	var h = c.getElementsByTagName("a");

	if(d<e){
		adjust_menu_text_size(g, (d/e)*default_overlay_p_size);
		adjust_menu_text_size(h, (d/e)*default_overlay_a_size);
		// adjust_menu_line_height(c, (d/e)*default_overlay_line_height, (d/e)*default_overlay_first_li_pbtm);
	}
	else{
		adjust_menu_text_size(g, default_overlay_p_size);
		adjust_menu_text_size(h, default_overlay_a_size);	
		// adjust_menu_line_height(c, default_overlay_line_height, default_overlay_first_li_pbtm);
	}
}


////////////////////////////////////// 

function overlay_sub_hover(){
	var a = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
	for(var b=0; b<a.length; b++){
		var c = a[b].getElementsByTagName("ul")[0].children;
		for(var d=0; d<c.length; d++){
			c[d].addEventListener("mouseover", function(){
				var e = document.createElement("hr");
				this.appendChild(e);
			});
		}
	}
}

////////////////////////////////////// 


function get_three_col(){
	return document.getElementById("about-three-col");
}


function start_three_col_reveal(counter){
	if(counter<3){
		setTimeout(function(){
			three_cols.getElementsByTagName("li")[counter].style.opacity = "1";
			counter++
			start_three_col_reveal(counter);
		},200);
	}
}


function three_col_transition(three_cols, scroll_position, three_col_top){
	var a = 0;
	if(scroll_position > three_col_top-blockquote_offsets[0]){
		start_three_col_reveal(a);
	}
}


////////////////////////////////////// 


function hover_sub(){
	var a = document.getElementById("subnav");
	var b = a.getElementsByTagName("li");
	
	for(var c=0; c<b.length; c++){
		b[c].addEventListener("mouseover", function(){
			var d = document.getElementById("under");
			d.style.left = this.offsetLeft+10 + "px";
			d.style.width = this.offsetWidth - 20 + "px";
		});
	}
}


////////////////////////////////////// 


function close_old_overlay_sub_menu(this_item){
	var overlay_items 	= document.getElementById("overlay").getElementsByTagName("ul")[0].children;
	// overlay_items = overlay_items.splice()
	for(var a=0; a<overlay_items.length; a++){
		var b = overlay_items[a].getElementsByTagName("ul")[0].getElementsByTagName("li");
		
		if(this_item == overlay_items[a]){
			overlay_items[a].classList.add("active-nav-item");
				menu_sub_items(b);
		}
		else{
			overlay_items[a].classList.remove("active-nav-item");
		}
	}
}



function click_overlay_items(){
	var overlay_items = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
	
	for(var a=0; a<overlay_items.length; a++){
		// overlay_items[a].addEventListener("click", function(e){
		// 	if(this.classList.contains("active-nav-item")){
		// 		// var b = get_expansion_height(this);
		// 		// console.log(this.children);
		// 		// var splice_items = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
		// 		// if(document.getElementsByClassName("active-nav-item").length > 0){
					

		// 			document.getElementsByClassName("active-nav-item")[0].getElementsByTagName("ul")[0].style.maxHeight = "10px";

		// 			// this..classList.remove("active-nav-item");
		// 			// document.getElementsByClassName("active-nav-sub")[0].classList.remove("active-nav-sub");
		// 		}
		// 		// this.classList.add("active-nav-item");
		// 	// }	
		// });

		overlay_items[a].addEventListener("click", function(e){
			if(!this.classList.contains("active-nav-item")){
				var b = get_expansion_height(this);
				if(document.getElementsByClassName("active-nav-item").length > 0){
					document.getElementsByClassName("active-nav-item")[0].getElementsByTagName("ul")[0].style.maxHeight = "0px";
					document.getElementsByClassName("active-nav-item")[0].classList.remove("active-nav-item");
				}
				// this.getElementsByTagName("ul")[0].style.maxHeight = b-20+"px";
				this.getElementsByTagName("ul")[0].style.maxHeight = "200px";
				this.classList.add("active-nav-item");
			}
			else if(this.classList.contains("active-nav-item")){
					this.getElementsByTagName("ul")[0].style.maxHeight = "0px";
					document.getElementsByClassName("active-nav-item")[0].getElementsByTagName("ul")[0].style.maxHeight = "0px";
					this.getElementsByTagName("ul")[0].style.maxHeight = "0px";
					this.classList.remove("active-nav-item");
			}	
		});

	}
}


function collapse_overlay_item(){
	var overlay_items = document.getElementsByClassName("active-nav-item")[0];
	
	overlay_items.addEventListener("click", function(e){
		// var b = get_expansion_height(this);
		// console.log(this.children);
		// var splice_items = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
		// document.getElementsByClassName("active-nav-item")[0].getElementsByTagName("ul")[0].style.maxHeight = "10px";
		// this.getElementsByTagName("ul")[0].style.maxHeight = b-20+"px";
		// this..classList.remove("active-nav-item");
		// document.getElementsByClassName("active-nav-sub")[0].classList.remove("active-nav-sub");
		// document.getElementsByClassName("active-nav-item")[0].classList.remove("active-nav-item");
		this.getElementsByTagName("ul")[0].style.maxHeight = "10px";
		console.log(this);
	});
}


function get_expansion_height(clicked_nav_item){
	var a = clicked_nav_item.getElementsByTagName("li");
	var b = 0;
	var c = a[0].offsetHeight;
	for(var c=0; c<a.length; c++){
		b += a[c].offsetHeight;
	}
	// clicked_nav_item.getElementsByTagName("ul")[0].style.maxHeight = b + "px";
	return b+(3*c);
}


////////////////////////////////////// 


function get_menu_text_height(){
	var overlay_items = document.getElementById("overlay").children[0];
	var total_height = 0;
	for(var a=0; a<overlay_items.children.length; a++){
		total_height += overlay_items.children[a].offsetHeight;
	}
}


function vertical_scale_overlay(){
	window_height();
	get_menu_text_height();
	var overlay_items = document.getElementById("overlay").getElementsByTagName("ul")[0].children;
	for(var a=0; a<overlay_items.length; a++){

	}
}


////////////////////////////////////// 


function asdf(){
	var a = document.getElementById("overlay").children[0];
	var b = a.offsetHeight;
	var z = window_height();
	var y = 0;
	
	var d 			= a.getElementsByTagName("p");
	var p_font_size = Number(window.getComputedStyle(d[0]).getPropertyValue('font-size').split("px")[0]);
	var e 			= a.getElementsByTagName("a");
	var a_font_size = Number(window.getComputedStyle(e[0]).getPropertyValue('font-size').split("px")[0]);
	

	for(var c=0; c<d.length; c++){
		y += d[c].offsetHeight;
	}
	var overlay_window_ratio = (y/z);
	
	

	// console.log(overlay_window_ratio > 1);
	if(overlay_window_ratio > 0.60){
			for(var c=0; c<d.length; c++){
				
				// y+=d[c].offsetHeight;
				// console.log(e);
				// console.log(y);
				// console.log(y);
				// console.log(y);
				// console.log(p_font_size);
				// console.log(p_font_size);
				// console.log(p_font_size);
				d[c].style.fontSize = (y/z)*p_font_size+"px"; 
	
				// d[c].style.fontSize = (b/z)*p_font_size;
			}
	
			for(var c=0; c<e.length; c++){
				
				// y+=d[c].offsetHeight;
				// console.log(e);
				// console.log(y);
				// console.log(y);
				// console.log(y);
				// console.log(a_font_size);
				// console.log(a_font_size);
				// console.log(a_font_size);
				e[c].style.fontSize = (y/z)*a_font_size+"px"; 
				// d[c].style.fontSize = (b/z)*p_font_size;
			}
	
			// console.log("---------------------------");
			// console.log((y/z)*p_font_size);
			// console.log((y/z)*p_font_size);
			// console.log((y/z)*p_font_size);
			
			// console.log((y/z)*a_font_size);
			// console.log((y/z)*a_font_size);
			// console.log((y/z)*a_font_size);
			
			// for(var c=0; c<e.length; c++){
			// 	console.log(e[c]);
			// }
	}
	// console.log(overlay_window_ratio);
	// console.log(overlay_window_ratio);
	// console.log(overlay_window_ratio > 0.60);
	// console.log(overlay_window_ratio > 0.60);

}

////////////////////////////////////// 


function init(){
	resize_rescale();
	open_nav_overlay();
	close_nav_overlay();
	open_search_input("global-search");
	close_search_input("global-search");
	open_search_input("mobile-search-container");
	close_search_input("mobile-search-container");
	escape_key_events();
	animate_stats();
	click_overlay_items();
	// collapse_overlay_item();
	// adjust_menu_size();
	// overlay_sub_hover();

	three_cols 			= get_three_col()
	three_col_offsets 	= three_cols.offsetTop;

	blockquotes 		= get_tags("blockquote");
	blockquote_offsets 	= get_offsets(blockquotes);
	trigger_animation(blockquote_offsets, 1, blockquotes, "blockquote-transition");

	sub_headers 		= get_class("subheader-brief");
	sub_header_offsets 	= get_offsets(sub_headers);

	separators 			= get_class("separator-half-width");
	separator_offsets 	= get_offsets(separators);

	window.addEventListener("resize", function(){
		// document.addEventListener("mouseup", function(){
		// 	setTimeout(function(){
		// 		resize_columns();
		// 	}, 300);
		// });
		
		resize_rescale();
		three_cols 			= get_three_col()
		three_col_offsets 	= three_cols.offsetTop;

		blockquotes 		= get_tags("blockquote");
		blockquote_offsets 	= get_offsets(blockquotes);
	
		sub_headers 		= get_class("subheader-brief");
		sub_header_offsets 	= get_offsets(sub_headers);

		separators 			= get_class("separator-half-width");
		separator_offsets 	= get_offsets(separators);

		// console.log(document.getElementById("overlay").children[0].offsetHeight);
		// console.log(document.getElementById("overlay").children[0].style.margin);

		// adjust_menu_size();
	});

	window.addEventListener('resizeend', function() {
		resize_columns();
		adjust_menu_size();
	});

	document.addEventListener("scroll", function(e){
		scroll_position = window.pageYOffset;
		trigger_animation(sub_header_offsets, scroll_position, sub_headers, "subheader-transition");
		trigger_animation(blockquote_offsets, scroll_position, blockquotes, "blockquote-transition");
		trigger_animation(separator_offsets, scroll_position, separators, "separator-transition");
		three_col_transition(three_cols, scroll_position, three_col_offsets);
	});
}


function on_load_sections(){
	scroll_position = window.pageYOffset+window.innerHeight-300;
	trigger_animation(sub_header_offsets, scroll_position, sub_headers, "subheader-transition");
	trigger_animation(blockquote_offsets, scroll_position, blockquotes, "blockquote-transition");
	trigger_animation(separator_offsets, scroll_position, separators, "separator-transition");
	three_col_transition(three_cols, scroll_position, three_col_offsets);
}


////////////////////////////////////// 

var col_min_height;
// var col_min_height;

function get_tallest_column(cols){
	var a = 0;
	for(var b=0; b<cols.length; b++){
		if(cols[b].offsetHeight > a){
			cols[b].style.minHeight = 0;
			a = cols[b].offsetHeight;
		}
	}
	return a
}

function resize_columns(){
	var a = document.getElementById("about-three-col");
	var b = a.getElementsByTagName("p");
	var c = get_tallest_column(b);
	for(var d=0; d<b.length; d++){
		b[d].style.minHeight = c+"px";
	}
	console.log(c);
}


////////////////////////////////////// 


function about_col_mobile_container_resize(){
	var a = document.getElementById("about-three-col");
	var b = a.getElementsByTagName("li");
	var c = window_width();
	var d = document.getElementById("core-content");
	a.style.minWidth = (d.offsetWidth*((b[0].offsetWidth*3)/d.offsetWidth))+20 + "px";
}


////////////////////////////////////// 


function center_footer_img(){
	var footer_img 			= document.getElementById("footer-bg-container").getElementsByTagName("img")[0];
	var footer_img_width 	= footer_img.width;
	var half_img_width 		= footer_img_width/2;
	var half_win_width 		= window_width()/2;
	// footer_img.
}



////////////////////////////////////// 


window.onload = function(){
	init();
	on_load_sections();
	about_col_mobile_container_resize();
	vertical_scale_overlay();
	resize_columns();
	// test_click_menu();
}


function test_click_menu(){
	var a = document.getElementById("menu-button");
	var b = document.getElementById("overlay").children[1];
	var c = b.children[0];

	console.log(c);
	var d = b.children[1];
	var e = true;
	console.log(d);
	setTimeout(function(){
		a.click();
		setTimeout(function(){
			console.log(c);
			setInterval(function(){
				console.log(e);
				if(e==true){
					c.click();
					e=false;
					console.log(c.innerHTML);
				}
				else{
					d.click();
					e=true;
					console.log(d.innerHTML);
				}
			}, 1000);
		}, 300);
	}, 500);
}












// function shit(){
// 	// Create a new instance
// 	var svg = new Walkway("#test");
// 	// Draw when ready, providing an optional callback
// 	svg.draw();

// 	// Options passed in as an object, see options below.
// 	var svg = new Walkway({ selector: '#test'});

// 	// Overwriting defaults
// 	var svg = new Walkway({
// 	  selector: '#test',
// 	  duration: '2000',
// 	  // can pass in a function or a string like 'easeOutQuint'
// 	  easing: function (t) {
// 	    return t * t;
// 	  }
// 	});

// 	svg.draw();

// 	// If you don't want to change the default options you can
// 	// also supply the constructor with a selector string.
// 	var svg = new Walkway('#test');

// 	svg.draw(function() {
// 	  console.log('Animation finished');
// 	});
// }

// shit();