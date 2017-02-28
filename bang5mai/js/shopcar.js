$(function(){
	$(".shop_header").load("header.html");
	//$(".intro_c4>p>.pro_color").html()=="加州蓝"?proCode="blue":proCode="grey";
	var allCookie = queryAllCookie();	//获取全部cookie；
	var proList = allCookie.split(";");//将cookie进行切割；
	var proListLength = proList.length;
	for(var i=0;i<proListLength;i++){		
		if(proList[i].indexOf("blue")!=-1){//获取想要的cookie；
			var pro = getCookie("blue");
			var proStr = pro.split(",");
			$li=$("<li><div class='shop_src'><img src="+proStr[1]+"/></div>"+
					"<a href='item_detail.html'><div class='shop_name'>"+proStr[0]+"</div></a>"+
					"<div class='shop_cs'>颜色分类:<a>"+proStr[2]+"</a>;尺寸:<a>"+proStr[3]+"</a></div>"+
					"<div class='shop_price l'>"+proStr[4]+"</div>"+
					"<div class='shop_number l'><a>-</a><b>"+proStr[5]+"</b><a>+</a></div>"+
					"<div class='shop_all l'>"+Number(proStr[4])*Number(proStr[5])+"</div>"+
					"<a><div class='shop_del l'>删除</div></a>"+
				"</li>")
			$(".shop_ul").append($li);
		}else if(proList[i].indexOf("grey")!=-1){//获取想要的cookie；
			var pro = getCookie("grey");
			var proStr = pro.split(",");
			$li=$("<li><div class='shop_src'><img src="+proStr[1]+"/></div>"+
					"<a href='item_detail.html'><div class='shop_name'>"+proStr[0]+"</div></a>"+
					"<div class='shop_cs'>颜色分类:<a>"+proStr[2]+"</a>;尺寸:<a>"+proStr[3]+"</a></div>"+
					"<div class='shop_price l'>"+proStr[4]+"</div>"+
					"<div class='shop_number l'><a>-</a><b>"+proStr[5]+"</b><a>+</a></div>"+
					"<div class='shop_all l'>"+Number(proStr[4])*Number(proStr[5])+"</div>"+
					"<a><div class='shop_del l'>删除</div></a>"+
				"</li>")
			$(".shop_ul").append($li);
		}
	
	}
	//删除cookie;
	$(".shop_del").click(function(){
		if($(this).parent().parent().find(".shop_cs").html().indexOf("加州蓝")!=-1){
			deleteCookie("blue");
		}
		else{deleteCookie("grey");}
		$(this).parent().parent().remove();
		var $count=0;	
		var $c=$(".shop_ul>li").length;	
		for(var i=0;i<$c;i++){
			$count+=parseFloat($(".shop_ul>li").eq(i).find(".shop_all").html());
		}	
		$(".setbox>span").html($count);
		addCookie("all_price",$(".setbox>span").html(),14);
	})
	
	//点击改变数量；
//	$(".shop_number>a").click(function(){		
//		if($(this).html()=="+"){
//			var $a=$(this).prev().html();
//			$a=$a-(-1);			
//			$(this).prev().html($a);
//			$(this).parent().next().html(Number(Number($a)*parseFloat($(this).parent().prev().html()).toFixed(2)));
//			var $i=parseFloat($(".setbox>span").html());
//			$i+=parseFloat($(this).parent().prev().html());
//			$(".setbox>span").html($i);
//			addCookie("all_price",$(".setbox>span").html(),14);
//		}else if($(this).html()=="-"){
//			var $a=$(this).next().html();
//			$a=$a-(1);
//			if($a==0){
//				$a=1;				
//			}
//			$(this).next().html($a);
//			$(this).parent().next().html(Number($a)*parseFloat($(this).parent().prev().html()).toFixed(1));
//			var $i=parseFloat($(".setbox>span").html());
//			$i-=parseFloat($(this).parent().prev().html());
//			$(".setbox>span").html($i);
//			addCookie("all_price",$(".setbox>span").html(),14);
//		}
//		
//	})
	$(".shop_number>a").click(function(){
			
		if($(this).html()=="+"){
			var $a=$(this).prev().html();
			$a=$a-(-1);			
			$(this).prev().html($a);
			$(this).parent().next().html(Number(Number($a)*parseFloat($(this).parent().prev().html()).toFixed(2)));
			var $i=parseFloat($(".setbox>span").html());
			$i+=parseFloat($(this).parent().prev().html());
			$(".setbox>span").html($i);	
			addCookie("all_price",$(".setbox>span").html(),14);
		}else if($(this).html()=="-"){
			var $a=$(this).next().html();
			$a=$a-(1);
			if($a==0){
				$a=1;				
			}
			$(this).next().html($a);
			$(this).parent().next().html(Number($a)*parseFloat($(this).parent().prev().html()).toFixed(1));
			var $i=parseFloat($(".setbox>span").html());
			$i-=parseFloat($(this).parent().prev().html());
			$(".setbox>span").html($i);
			addCookie("all_price",$(".setbox>span").html(),14);
		}
		var proName = $(this).parent().parent().find(".shop_name").html();
		var proImgSrc = $(this).parent().parent().find(".shop_src>img").attr("src");
		var proColor =$(this).parent().parent().find(".shop_cs>a").eq(0).html();
		var proSize =$(this).parent().parent().find(".shop_cs>a").eq(1).html();
		var proPrice = $(this).parent().parent().find(".shop_price").html();
		var proNum=$(this).parent().parent().find(".shop_number>b").html();
		var str = proName+","+proImgSrc+","+proColor+","+proSize+","+proPrice+","+proNum;
		if($(this).parent().prev().prev().html().indexOf("加州蓝")!=-1){
			updateCookie("blue",str);
		}else if($(this).parent().prev().prev().html().indexOf("梦幻银")!=-1){
			updateCookie("grey",str);
		}		
	})
	//总金额
	var $count=0;	
	var $c=$(".shop_ul>li").length;	
	for(var i=0;i<$c;i++){
		$count+=parseFloat($(".shop_ul>li").eq(i).find(".shop_all").html());
	}	
	$(".setbox>span").html($count);
	addCookie("all_price",$(".setbox>span").html(),14);
//获取尾部；
$(".shopend").load("footer.html");
})
