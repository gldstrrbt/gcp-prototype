// var scaled_logo_width 		= 162;
var default_screen_width 	= 1280;
var default_font_size 		= 56;
var default_logo_width 		= 260;
var default_nav_padding 	= 20;
var default_nav_height 		= 40;

var overlay_closed 			= true;

var overlay_data = [
	{
		"click_element":document.getElementsByTagName("nav")[0].getElementsByTagName("button")[0],
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


function window_width(){
	return window.innerWidth;
}

function font_screen_ratio(new_window_width){
	var a = document.getElementsByTagName("h1")[0];
	// if(new_window_width < default_screen_width && new_window_width > 500){
	if(new_window_width < default_screen_width){
		a.style.fontSize = new_window_width*(default_font_size/default_screen_width) + "px";
	}
	else if (new_window_width > default_screen_width){
		a.style.fontSize = default_font_size + "px";
	}
}

function logo_screen_ratio(new_window_width){
	var a = document.getElementsByTagName("nav")[0].getElementsByTagName("img")[0];
	// if(new_window_width < default_screen_width && new_window_width > 500){
	if(new_window_width < default_screen_width){
		a.style.width = new_window_width*(1*(default_logo_width/default_screen_width)) + "px";
	}
	else if (new_window_width > default_screen_width){
		a.style.width = default_logo_width + "px";
	}
}

function nav_screen_ratio(new_window_width){
	var a = document.getElementsByTagName("nav")[0];
	// if(new_window_width < default_screen_width && new_window_width > 500){
	if(new_window_width < default_screen_width){
		a.style.height 	= new_window_width*(1*(default_nav_height/default_screen_width)) + "px";
		a.style.padding = new_window_width*(1*(default_nav_padding/default_screen_width)) + "px 0";
	}
	else if (new_window_width > default_screen_width){
		a.style.height 	= default_nav_height + "px";
		a.style.padding = default_nav_padding + "px 0";
	}
	console.log(default_screen_width*(1.2*(default_nav_height/default_screen_width)) + "px");
}

// function test_nav_overlay(click_element, check_element, class_add, class_remove){
// 	var a = click_element;
// 	a.addEventListener("click", function(){
// 		var b = check_element;
// 		if(b.classList.contains(class_remove)){
// 			b.classList.remove(class_remove);
// 			b.classList.add(class_add);
// 			if(class_remove == "overlay-open"){
// 				check_element.style.pointerEvents = "none";
// 			}
// 			else{
// 				check_element.style.pointerEvents = "auto";
// 			}
// 			console.log(check_element.style.pointerEvents);
// 		}
// 	});
// }

// function apply_overlay_event(){
// 	for(var a=0; a<overlay_data.length; a++){
// 		test_nav_overlay(overlay_data[a]["click_element"], overlay_data[a]["check_element"], overlay_data[a]["class_add"], overlay_data[a]["class_remove"]);
// 	}
// }

// function prevent_close_nav_item_hover(){
// 	var a = document.getElementById("overlay").getElementsByTagName("li");
// 	for(var b=0; b<a.length; b++){	
// 		a[b].addEventListener("mouseenter", function(){
// 			var d = document.getElementById("overlay");
// 			// if(d.classList.contains("overlay-open")){	
// 				d.style.pointerEvents = "none";
// 			// }
// 			// console.log(check_element.style.pointerEvents);
// 		});

// 		a[b].addEventListener("mouseout", function(){
// 			var d = document.getElementById("overlay");
// 			// if(d.classList.contains("overlay-open")){	
// 				var d = document.getElementById("overlay");
// 				d.style.pointerEvents = "auto";
// 			// }
// 			console.log(d.style.pointerEvents);
// 		});
// 	}
// }

function open_nav_overlay(){
	var a = document.getElementsByTagName("nav")[0].getElementsByTagName("button")[0];
	a.addEventListener("click", function(){
		var b = document.getElementById("overlay");
		console.log(b.style.pointerEvents);
		if(b.style.pointerEvents != "auto"){	
			b.style.opacity 				= 0.9;
			b.style.pointerEvents 			= "auto";
			document.body.style.overflow 	= "hidden";		
			var c 							= a.getElementsByTagName("li");
			for(var d=0; d<c.length; d++){
				c[d].classList.add("opened");
			}
			init_nav_item_animation();
		}
		else if(b.style.pointerEvents == "auto"){
			close_nav_overlay();
		}
	});
}

function close_nav_overlay(){
	var a 							= document.getElementById("overlay");
	a.style.opacity 				= 0.0;
	a.style.pointerEvents 			= "none";
	document.body.style.overflow 	= "visible";		
	var b 							= document.getElementsByTagName("nav")[0].getElementsByTagName("button")[0];
	var c 							= b.getElementsByTagName("li");
	for(var d=0; d<c.length; d++){
		c[d].classList.remove("opened");
	}
}

function init_close_nav_overlay(){
	var a = document.getElementById("overlay");
	a.addEventListener("click", function(){
		close_nav_overlay();
	});
}

function resize_rescale(){
	var a = window_width();
	font_screen_ratio(a);
	logo_screen_ratio(a);
	nav_screen_ratio(a);
}

////////////////////////////////////// 

function init_nav_item_animation(){
	var a = document.getElementById("overlay").getElementsByTagName("a");
	for(var b=0; b<a.length; b++){
		var c =  a[b].getElementsByTagName("ul");
		// var c =  document.getElementsByTagName("ul");
		var d = c[1].getElementsByTagName("li");
		var e = c[0].getElementsByTagName("li");
		nav_rotate_letters_x(d, e);
	}	
}

function nav_rotate_letters_x(first_letter_set, second_letter_set){
	for(var a=0; a<first_letter_set.length; a++){
		(function(b){
			setTimeout(function(){
				first_letter_set[b].style.transform 	= "rotateX(360deg)";
				first_letter_set[b].style.color 		= "rgba(255, 255, 255, 1.0)";
				first_letter_set[b].style.background 	= "";
				second_letter_set[b].style.color 		= "rgba(255, 255, 255, 1.0)";
			}, b*20);
		})(a);
	}
}

////////////////////////////////////// 

function init(){
	resize_rescale();
	window.addEventListener("resize",function(){
		resize_rescale();
	});
	// apply_overlay_event();
	// prevent_close_nav_item_hover(); 
	open_nav_overlay();
	close_nav_overlay();
}

init();