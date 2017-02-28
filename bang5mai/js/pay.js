$(function(){
	$(".pay_head").load("header.html");
	$(".pay_end").load("footer.html");
	$(".pay_conr>span").html(getCookie("all"));
	$(".pay_r>span").html(getCookie("all_price"));
	$(".pay_01 span").click(function(){	
		$(this).parent().css({"border":"1px solid #ff7a4d"});		
		$(this).addClass("active");
		$(".pay_02 span").removeClass("active");
		$(".pay_02 span").parent().css({"border":"1px solid #eee"});
	
	})
	$(".pay_02 span").click(function(){	
		$(this).parent().css({"border":"1px solid #ff7a4d"});
		$(this).parent().siblings().css({"border":"1px solid #eee"});
		$(".pay_01 span").parent().css({"border":"1px solid #eee"});
		$(this).addClass("active").parent().siblings().find("span").removeClass("active");
		$(".pay_01 span").removeClass("active");
	})
	$(".pay_r a").click(function(){
		alert("支付成功");
	})
})
