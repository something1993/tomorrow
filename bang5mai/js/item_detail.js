$(function(){
	$(".header_right .h_phone").hover(function(){
		$(".header_right .h_phone .h_phone_img").slideDown(200);
	},
	function(){
		$(".header_right .h_phone .h_phone_img").slideUp(200);
	})
	//图片滑过
	$(".intro_left02>li").mouseover(function(){
		$(".intro_left01>img").attr("src",$(this).find("img").attr("src"));
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	//选中规格
	var a=false,b=false,proCode="";
		$(".intro_c1 a").click(function(){
		a=true;
		$(this).css({"background":"url(img/item.img/bg2.jpg)","border":0}).siblings().css({"background":"none","border":"1px solid #ccc"});
		//选中不同颜色后，左边图片的大图会相应的改变；
		var $img=["img/item.img/blue_b.jpeg","img/item.img/bag2.jpeg"];	
		$(".intro_left01>img").attr("src",$img[$(this).index()]);
		//选择信息的颜色
		$(".intro_c4>p>.pro_color").html($(".intro_c1 a").eq($(this).index()).find("i").html());
		$(".intro_c4>p>.pro_color").html()=="加州蓝"?proCode="blue":proCode="grey";
		//当信息全部选中后，显示购买物品的信息；
		if(a&&b){
			$(".intro_c4>p").show();			
		}
	})
	$(".intro_c2 a").click(function(){
		b=true;
		//当尺寸确定后，价格也确定；三目运算；
		$(this).html()=="20寸"?$(".s_yu").html("175"):$(".s_yu").html("189");
		$(this).css({"background":"url(img/item.img/bg3.jpg)","border":0}).siblings().css({"background":"none","border":"1px solid #ccc"});
		//选择信息的型号
		$(".intro_c4>p>.pro_size").html($(".intro_c2 a").eq($(this).index()).html());
		//当信息全部选中后，显示购买物品的信息；
		if(a&&b){
			$(".intro_c4>p").show();			
		}
	})
	
	//数量加减
	$(".intro_c3>.a1").click(function(){
		var $reduce=$(".intro_c3>.a2").html();
		$reduce=$reduce-1;
		if($reduce==0){
			$reduce=1;
		}
		$(".intro_c3>.a2").html($reduce);
		$(".shopc>h3").html($(".a2").html());
	})	
	$(".intro_c3>.a3").click(function(){
		var $reduce=$(".intro_c3>.a2").html();
		$reduce=Number($reduce)+1;		
		$(".intro_c3>.a2").html($reduce);
		$(".shopc>h3").html($(".a2").html());
	})
	//侧边栏
		$(".side>div").hover(function(){
			$(this).stop().animate({"left":"0px"},100)
		},function(){
			$(this).stop().animate({"left":"86px"},100)
		})
		$(".telapp").hover(function(){
			$(this).stop().animate({"left":"0px"},100);
			$(this).find("span").animate({"top":"160px"},100);
			$(this).find("em").show(100);
			
		},function(){
			$(this).stop().animate({"left":"86px"},100);
			$(this).find("span").animate({"top":"50px"},100);
			$(this).find("em").hide(100);
		})
		
	//加入购物车，出现一个大框框	
	$(".intro_c5 i").click(function(){
		//当两个选项都选上后，点击才能购物成功；
		if(getCookie("username")&&getCookie("passwords")){
			if(a&&b){
			$(".succses").show();
			$(".flo").show();
			$("body").css({"overflow":"hidden"});
		}else{
			$(".intro_tip").css({"border":"1px solid #ff5800"});
			$(".intro_tip>h4").show();
		}
		//存cookie；
		var proName = $(".intro_lr>h3").html();
		var proImgSrc = $(".intro_left01>img").attr("src");
		var proColor = $(".intro_c4 span").eq(2).html();
		var proSize =$(".intro_c4 span").eq(4).html();
		var proPrice = $(".s_yu").html();
		var proNum=$(".a2").html();
		var str = proName+","+proImgSrc+","+proColor+","+proSize+","+proPrice+","+proNum;
		//procode:型号名；
		addCookie(proCode,str,14);
		}
		else{window.location="login.html";}
		
	})
	$(".intro_tip>h4>a").click(function(){
		$(".intro_tip").css({"border":"0"});
		$(".intro_tip>h4").hide();
	})	
	//吸顶菜单出现时机	
	$(window).scroll(function(){
		$t=$(window).scrollTop();
		$h=$(".detail_img_right>.dir_ul").offset().top;
		if($t>=$h){
			$(".xceil").show();			
		}else{$(".xceil").hide();}
	})
	//商品详情Tab切换
	$(".dir_ul>li").click(function(){		
		$(".detail_img_right>.dir_ul>li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		$(".detail_img_right>.dir_p>p").eq($(this).index()).addClass("active").siblings().removeClass("active");
		$(".xceil>.dir_ul>li").eq($(this).index()).addClass("active").siblings().removeClass("active");
		$(".xceil>.dir_p>p").eq($(this).index()).addClass("active").siblings().removeClass("active");
		if($t>=$h){
			$("html,body").animate({"scrollTop":$h},200,function(){
				$(".xceil").hide(0);
			});
		}		
	})		
})
