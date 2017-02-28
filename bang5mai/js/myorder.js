$(function(){
	$(".order_head").load("header.html");
	$(".order_end").load("footer.html");
	$("form").validate();
	$("#button1").click(function(){		
		$(".address>p").html($("#text_name").val());
		$(".address>span").html($("#text_tel").val());
		$(".address>em").html($("#loc_province").find("option:selected").text());
		$(".address>i").html($("#loc_city").find("option:selected").text());
		$(".address>strong").html($("#loc_town").find("option:selected").text());		
		$(".add").html($(".addressbox").html());
		//$(".addressbox").show();
	})
	
	//添加cookie
	var allCookie = queryAllCookie();	//获取全部cookie；
	var proList = allCookie.split(";");//将cookie进行切割；
	var proListLength = proList.length;
	for(var i=0;i<proListLength;i++){		
		if(proList[i].indexOf("blue")!=-1){//获取想要的cookie；
			var pro = getCookie("blue");
			var proStr = pro.split(",");
				$li=$('<li>'+
							'<div class="order_src l"><img src='+proStr[1]+'/></div>'+
							'<a href="item_detail.html l"><div class="order_name l">'+proStr[0]+'</div></a>'+
							'<div class="order_cs l">颜色分类:'+proStr[2]+';尺寸:'+proStr[3]+'</div>'+
							'<div class="order_all l">'+Number(proStr[4])*Number(proStr[5])+'</div>'+
							'<div class="order_number l">'+proStr[5]+'</div>'+				
						'</li>');
			$(".order_ul").append($li);
		}else if(proList[i].indexOf("grey")!=-1){//获取想要的cookie；
			var pro = getCookie("grey");
			var proStr = pro.split(",");
				$li=$('<li>'+
			'<div class="order_src l"><img src='+proStr[1]+'/></div>'+
			'<a href="item_detail.html l"><div class="order_name l">'+proStr[0]+'</div></a>'+
			'<div class="order_cs l">颜色分类:'+proStr[2]+';尺寸:'+proStr[3]+'</div>'+
			'<div class="order_all l">'+Number(proStr[4])*Number(proStr[5])+'</div>'+
			'<div class="order_number l">'+proStr[5]+'</div>'+				
		'</li>');
			$(".order_ul").append($li);
		}
	
	}
//总金额
	var $count=0;	
	var $c=$(".order_ul>li").length;
	//alert($c);
	//alert($(".shop_all").html());
	for(var i=0;i<$c;i++){
		$count+=parseFloat($(".order_ul>li").eq(i).find(".order_all").html());
	}	
	$(".sum>span").html($count);
	addCookie("all",$(".sum>span").html(),14);
})
