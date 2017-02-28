$(function(){
	$(".list_head").load("header.html");
	$(".list_foot").load("footer.html");
	$(".list_con li img").hover(function(){
		$(this).css({"border":"2px solid #fe9900",});
	},function(){
		$(this).css({"border":"2px solid #ccc"});
	})
	$(".list_con li a").hover(function(){
		$(this).css({"color":"#fe9900","text-decoration":"underline"})
	},function(){
		$(this).css({"color":"#666","text-decoration":"none"})
	})
	$(".list_end div").hover(function(){
		$(this).css({"background":"#fe9900","color":"#fff"})
	},function(){
		$(this).css({"background":"#fcfcfc","color":"#666"})
	})
	
})
