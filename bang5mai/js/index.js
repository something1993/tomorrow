$(function(){
	$("#index_tp").load("header.html");
	bc();
	banner();
	little();//商品图片稍微向左动,luan
	lunbo1();//商品下的小轮播
	lunbo2();
	lunbo3();
	lunbo4();
	roll();//商品图片稍微向左动,tongyi
	tab1();//商品分类切换
	tab2();
	tab3();
	tab4();
	side();//侧边栏滑入画出
	ceiling();//吸顶菜单；
//	$("#index_footer").load("footer.html");
	//二级菜单；
	$(".index_b>p").hover(function(){
		$index=$(this).index();
		$(".index_p").eq($index).show();
	},function(){
		$(".index_p").eq($index).hide();
	})
})
function bc(){
	$(".id_conleft01").mouseenter(function(){
		$(".id_conleft02").animate({"width":"60px"},0);
		$(".id_conleft01").hide();		
	})
	$(".id_conleft02").mouseleave(function(){
		$(".id_conleft02").animate({"width":"0"},0);
		$(".id_conleft01").show();
	})
	$(".id_conleft02 li").click(function(){
		$(this).find("em").addClass("active");
		$(this).siblings().find("em").removeClass("active");
	})
}
function banner(){	
	var $index=0;//图片的索引
	var $index1=0;//滚动条的索引
	var $l=$(".id_con_center_ul>li").size();	
	var timer=setInterval(move,2000);
	function move(){
		//图片滚动变化
		$index++;					
		if($index==$l){
			$index=1;
			$(".id_con_center_ul").css("left",0);
		}					
		var $x=$index*$(".id_con_center_ul li").width();
		$(".id_con_center_ul").stop().animate({"left":-$x},1000);
		//滚动条的变化
		$index1++;
		if($index1==($l-1)){
			$index1=0;
		}
		$(".id_con_center_ul01 li").eq($index1).find("span").hide();
		$(".id_con_center_ul01 li").eq($index1).siblings().find("span").show();
		$(".id_con_center_ul01 li").eq($index1).addClass("active").siblings().removeClass("active");
	}
	$(".id_con_center .lb").hover(function(){
		$("#btn1").show();
		$("#btn2").show();
	},function(){
		$("#btn1").hide();
		$("#btn2").hide();
	})
	$("#btn1").click(function(){		
		clearInterval(timer);
		if($index==0&&$index1==0){
			$index=$l-3;
			$index1=$l-3;
		}else{
			$index=$index-2;
			$index1=$index1-2;
		}										
		move();
		timer=setInterval(move,2000);
	})
	$("#btn2").click(function(){
		clearInterval(timer);
		move();
		timer=setInterval(move,2000)
	})
	$(".id_con_center_ul01 li").mouseover(function(){
		clearInterval(timer);
		$index=$(this).index()-1;
		$index1=$(this).index()-1;
		move();
		timer=setInterval(move,2000);
	})	
}
function little(){
		$(".f1_ul>li").hover(function(){
			$(this).find("span").show();
		},function(){
			$(this).find("span").hide();
		});
		$(".f1_down_right01>a").find("img").hover(function(){
			$(this).stop().animate({"margin-left":"18px"},500);
		},function(){
			$(this).stop().animate({"margin-left":"34px"},500);
		});
		$(".f1_down_right01>.f1_2").find("img").hover(function(){
			$(this).stop().animate({"left":"-10px"},500);
		},function(){
			$(this).stop().animate({"left":"0px"},500);
		});
		$(".f1_down_right01>.f1_3").find("img").hover(function(){
			$(this).stop().animate({"left":"-15px"},500);
		},function(){
			$(this).stop().animate({"left":"0px"},500);
		});
	}
function lunbo1(){	
	var $index=0;//图片的索引
	var $index1=0;//滚动条的索引
	var $l=$(".f1 .big_01>li").size();		
	var timer=setInterval(move,2000);
	function move(){
		//图片滚动变化
		$index++;					
		if($index==$l){
			$index=1;
			$(".f1 .big_01").css("left",0);
		}					
		var $x=$index*$(".f1 .big_01>li>a").width();
		$(".f1 .big_01").stop().animate({"left":-$x},1000);
		//滚动条的变化
		$index1++;
		if($index1==($l-1)){
			$index1=0;
		}
		$(".f1 .big_02 li").eq($index1).addClass("active").siblings().removeClass("active");
	}

	$(".f1 .big").hover(function(){		
		$(".f1 .big>#btn1").show();
		$(".f1 .big>#btn2").show();
	},function(){
		$(".f1 .big>#btn1").hide();
		$(".f1 .big>#btn2").hide();
	})
	$(".f1 .big>#btn1").click(function(){		
		clearInterval(timer);
		if($index==0&&$index1==0){
			$index=$l-3;
			$index1=$l-3;
		}else{
			$index=$index-2;
			$index1=$index1-2;
		}										
		move();
		timer=setInterval(move,2000);
	})
	$(".f1 .big>#btn2").click(function(){
		clearInterval(timer);
		move();
		timer=setInterval(move,2000)
	})
}
function roll(){
	$(".f1_down_right02>a").find("img").hover(function(){
		$(this).stop().animate({"margin-left":"18px"},500);
	},function(){
		$(this).stop().animate({"margin-left":"34px"},500);
	});
}
function tab1(){
	$(".f1 .f1_ul>li").mouseover(function(){
		var $index=$(this).index();
		$(".f1 .f1_down_right>div").eq($index).show().siblings().hide();
	})
}
function lunbo2(){	
	var $index=0;//图片的索引
	var $index1=0;//滚动条的索引
	var $l=$(".f2 .big_01>li").size();		
	var timer=setInterval(move,2000);
	function move(){
		//图片滚动变化
		$index++;					
		if($index==$l){
			$index=1;
			$(".f2 .big_01").css("left",0);
		}					
		var $x=$index*$(".f2 .big_01>li>a").width();
		$(".f2 .big_01").stop().animate({"left":-$x},1000);
		//滚动条的变化
		$index1++;
		if($index1==($l-1)){
			$index1=0;
		}
		$(".f2 .big_02 li").eq($index1).addClass("active").siblings().removeClass("active");
	}

	$(".f2 .big").hover(function(){		
		$(".f2 .big>#btn1").show();
		$(".f2 .big>#btn2").show();
	},function(){
		$(".f2 .big>#btn1").hide();
		$(".f2 .big>#btn2").hide();
	})
	$(".f2 .big>#btn1").click(function(){		
		clearInterval(timer);
		if($index==0&&$index1==0){
			$index=$l-3;
			$index1=$l-3;
		}else{
			$index=$index-2;
			$index1=$index1-2;
		}										
		move();
		timer=setInterval(move,2000);
	})
	$(".f2 .big>#btn2").click(function(){
		clearInterval(timer);
		move();
		timer=setInterval(move,2000)
	})
}
function tab2(){
	$(".f2 .f1_ul>li").mouseover(function(){
		var $index=$(this).index();
		$(".f2 .f1_down_right>div").eq($index).show().siblings().hide();
	})
}
function lunbo3(){	
	var $index=0;//图片的索引
	var $index1=0;//滚动条的索引
	var $l=$(".f3 .big_01>li").size();		
	var timer=setInterval(move,2000);
	function move(){
		//图片滚动变化
		$index++;					
		if($index==$l){
			$index=1;
			$(".f3 .big_01").css("left",0);
		}					
		var $x=$index*$(".f3 .big_01>li>a").width();
		$(".f3 .big_01").stop().animate({"left":-$x},1000);
		//滚动条的变化
		$index1++;
		if($index1==($l-1)){
			$index1=0;
		}
		$(".f3 .big_02 li").eq($index1).addClass("active").siblings().removeClass("active");
	}

	$(".f3 .big").hover(function(){		
		$(".f3 .big>#btn1").show();
		$(".f3 .big>#btn2").show();
	},function(){
		$(".f3 .big>#btn1").hide();
		$(".f3 .big>#btn2").hide();
	})
	$(".f3 .big>#btn1").click(function(){		
		clearInterval(timer);
		if($index==0&&$index1==0){
			$index=$l-3;
			$index1=$l-3;
		}else{
			$index=$index-2;
			$index1=$index1-2;
		}										
		move();
		timer=setInterval(move,2000);
	})
	$(".f3 .big>#btn2").click(function(){
		clearInterval(timer);
		move();
		timer=setInterval(move,2000)
	})
}
function tab3(){
	$(".f3 .f1_ul>li").mouseover(function(){
		var $index=$(this).index();
		$(".f3 .f1_down_right>div").eq($index).show().siblings().hide();
	})
}
function lunbo4(){	
	var $index=0;//图片的索引
	var $index1=0;//滚动条的索引
	var $l=$(".f4 .big_01>li").size();		
	var timer=setInterval(move,2000);
	function move(){
		//图片滚动变化
		$index++;					
		if($index==$l){
			$index=1;
			$(".f4 .big_01").css("left",0);
		}					
		var $x=$index*$(".f4 .big_01>li>a").width();
		$(".f4 .big_01").stop().animate({"left":-$x},1000);
		//滚动条的变化
		$index1++;
		if($index1==($l-1)){
			$index1=0;
		}
		$(".f4 .big_02 li").eq($index1).addClass("active").siblings().removeClass("active");
	}

	$(".f4 .big").hover(function(){		
		$(".f4 .big>#btn1").show();
		$(".f4 .big>#btn2").show();
	},function(){
		$(".f4 .big>#btn1").hide();
		$(".f4 .big>#btn2").hide();
	})
	$(".f4 .big>#btn1").click(function(){		
		clearInterval(timer);
		if($index==0&&$index1==0){
			$index=$l-3;
			$index1=$l-3;
		}else{
			$index=$index-2;
			$index1=$index1-2;
		}										
		move();
		timer=setInterval(move,2000);
	})
	$(".f4 .big>#btn2").click(function(){
		clearInterval(timer);
		move();
		timer=setInterval(move,2000)
	})
}
function tab4(){
	$(".f4 .f1_ul>li").mouseover(function(){
		var $index=$(this).index();
		$(".f4 .f1_down_right>div").eq($index).show().siblings().hide();
	})
}

function side(){
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
}
function ceiling(){	
	$(window).scroll(function(){
		
		if($(window).scrollTop()>=200){
			
			$(".ceilb").show();
		}else{$(".ceilb").hide();}
	})
	
}

