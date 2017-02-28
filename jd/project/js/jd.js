
$('.header').load("head.html");
$('.footer').load("footer.html");

$('[value="确认登录"]').click(function(){
	//var name=$('#n').val();
	//var pwd=$('#p').val();
	var result=$('#login-form').serialize(); 
	$.post('data/checkname.php',/*{'name':name,'pwd':pwd}*/result,function(data){
		if(data.status<0){
			$('.modal .waring').html(data.msg);
			$('[name="name"]').val('');
			$('[name="pwd"]').val('');
		}else{
			$('#login-msg').html(data.msg+",欢迎回来！");
			$('.modal').fadeOut();
		}
	});
});
/*
	var result=$('#login-form').serialize();  得到输入的东西  但是必须要有name这个属性
*/


$('[data-toggle="item"]').click(function(even){
	even.preventDefault();
	$(this).parent().siblings('.active').removeClass('active');
	$(this).parent().addClass('active')

	var selector=$(this).attr('href');
	$(selector).siblings('.active').removeClass('active');
	$(selector).addClass('active');

});

//$('[href="#my-order"]').click(function(even){
$('[value="确认登录"]').click(function(){
	var name=$('#n').val();	
	console.log(name);
	getMyOrder(1,name);
	});

/*抽奖次数*/
$('[value="确认登录"]').click(function(){
	var name=$('#n').val();
	$.get('data/get-lottery.php',{'name':name},function(data){
		$('#bt-lottery span').html(data.left_count);
	});
});
/*抽奖*/
/*$('#bt-lottery').click(function(){
	var name=$('#n').val();	
	$.get('data/get-lottery.php',{'name':name,'n':1},function(data){
		$('#bt-lottery span').html(data.left_count);
	});
});*/
/*function getlottery(name){
	
}
/*****/
$('#bt-lottery').click(function(){
	var name=$('#n').val();	
	var lotteryItems = ['鼓励奖','一等奖','二等奖','三等奖','特等奖'];
	var num=parseInt( Math.random()*20);
	
	var date=new Date().toLocaleDateString();
	var time=new Date().toLocaleTimeString().slice(2);
	var now=date+" "+time;
	//var now=date+time;
	console.log(now);
	if(num>=0&&num<5){
		alert('恭喜您中了'+lotteryItems[num]+'!请您有时间速来京东总部领取！');
		$.post('data/save-lottery.php',{'name':name,'date':now,'num':lotteryItems[num]});
	}else{
		alert('很遗憾，您没有中奖！');
	}
	
});
/****12345*/
$('.pager a').click(function(e){
	e.preventDefault();
	$('#orders').empty();
	var pno=$(this).text();
	console.log(pno)
	var name=$('#n').val();
	getMyOrder(pno,name);
});

function getMyOrder(pno,name){
	$.get('data/getorders.php',{'pno':pno,'name':name},function(data){
		$('#orders').empty();
		var str='';
		$.each(data.data,function(i,order){
			str+='<tr><td colspan="6">订单编号:'+order.order_num+'<a href="'+order.shop_url+'" class="n">'+order.shop_name+'</a></td></tr><tr><td>';
			$.each(order.products,function(j,p){
			str+='<img src="'+p.product_img+'" width="50" height="50">';
			});
			str+='</td><td>'+order.user_name+'</td><td>￥'+order.price+' <br>'+order.payment_mode+'</td><td>'+order.submit_time.replace('T','<br>')+'</td><td>等待发货</td><td><a href="#">查看</a> <br><a href="#">确认收货 </a><br><a href="#">取消订单</a></td></tr>';
		});
		$('#orders').append(str);
	});
}
/***设置A的样式**/
$('.pager a').click(function(event){
	event.preventDefault();
	$(this).parent().siblings('.f').removeClass('f');
	$(this).parent().addClass('f');
});
/********************************************************/

$.get('data/buystate.php',function(data){
	console.log('开始处理');
	//console.log(data);
	//drawBuyStat(data);
	//console.log(data.length);
	var d=[];
	for(var i=0;i<data.length;i++){
		//console.log(data[i].name+'-'+data[i].value+'-'+i);
		var myData={
			label:data[i].name,
			value:data[i].value
		};
		
		d.push(myData);
		//console.log(d);
		//console.log(myData);
		new FusionCharts({
			//type:'column2d',
			//type:'line',
			//type:'area2d',
			//type:'bar2d',
			//type:'bar3d',
			type:'pie2d',
			renderAt:'pay-record',
			width:'800',
			height:'500',
			dataFormat:'json',
			dataSource:{
				data:d
			},
			
		}).render();
	}
});

/*
function drawBuyStat(data){
	var w=800,h=500;
	var buyStat=$('#canvas-buy-stat')[0];
	buyStat.width=w;
	buyStat.height=h;

	/*绘制消费统计图需要用到的变量*/
	/*
	
	var canvasWidth=buyStat.width;
	var canvasHeight=buyStat.height;
	var bgColoe="#fff";//画布的背景颜色
	var fontColoe="#333";//画布上字体的颜色
	var fontSize=16;//画布上字体的大小
	var padding=60;//画布上内容距离画布边境的距离
	var exisEndSpace=50;//坐标轴距离最后一个坐标的距离
	var origin={x:padding,y:canvasHeight-padding};//坐标原点的坐标
	var xExisEnd={x:canvasWidth-padding,y:canvasHeight-padding};//x轴最后一点的坐标
	var yExisEnd={x:padding,y:padding};//y轴端点的坐标
	var count=data.length;//要绘制数据的个数
	var xGridSpace=(canvasWidth-2*padding-exisEndSpace)/count;//X轴上每个单元格的位置
	var yGridSpace=(canvasHeight-2*padding-exisEndSpace)/6;//Y轴上每个单元格的位置
	var ctx=buyStat.getContext('2d');
	ctx.font=fontSize+'px SimHei';

	//获取金额中的最大值
	var maxValue=0;
	for(var i=0;i<count;i++){
		if(data[i].value>maxValue){
			maxValue=data[i].value;
		}
	}
	var avgValue=parseInt(maxValue/6);//y轴上对应值的间隔

	//绘制X轴
	ctx.beginPath();
	ctx.moveTo(origin.x,origin.y);
	ctx.lineTo(xExisEnd.x,xExisEnd.y);
	ctx.lineTo(xExisEnd.x-15,xExisEnd.y-15);
	ctx.moveTo(xExisEnd.x,xExisEnd.y);
	ctx.lineTo(xExisEnd.x-15,xExisEnd.y+15);
	var maxValue=0;
	for(var i=0;i<count;i++){
		if(data[i].value>maxValue){
			maxValue=data[i].value;
		}
	}
	var avgValue=parseInt(maxValue/6);
	for(var i=0;i<count;i++){
		
		var x=(i+1)*xGridSpace+origin.x;
		var y=origin.y;
		ctx.moveTo(x,y);
		ctx.lineTo(x,y-10);
		ctx.stroke();

		console.log(data[i].name+'-'+data[i].value);


	//绘制柱状图
		var linearGradient=ctx.createLinearGradient(0,0,0,500);
		linearGradient.addColorStop(0,'#f00');
		linearGradient.addColorStop(0.5,'#ff0');
		linearGradient.addColorStop(1,'#fff');
		ctx.fillStyle=linearGradient;
		
		var w=xGridSpace/2;
		var h=data[i].value*(canvasHeight-2*padding-exisEndSpace)/maxValue;

		ctx.fillRect(x-w/2,y-h,w,h);
		ctx.fillStyle="#000";
		//console.log(x-w/2);
		//console.log(y-h);
		
		var txt=data[i].name;
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt,x-txtWidth+10,origin.y+20);
		
		var txt2=data[i].value;
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt2,x-txtWidth+10,xExisEnd.y-h-5);
		
		
	}
	/**/
	/*ctx.moveTo(origin.x,origin.y);
	for(var i=0;i<count;i++){
		var x=(i+1)*xGridSpace+origin.x;
		var y=origin.y;
		var w=xGridSpace/2;
		var h=data[i].value*(canvasHeight-2*padding-exisEndSpace)/maxValue;
		
		ctx.lineTo(x,y-h);

	}*/
	//绘制Y轴
	/*
	
	ctx.moveTo(origin.x,origin.y);
	ctx.lineTo(yExisEnd.x,yExisEnd.y);
	ctx.lineTo(yExisEnd.x-15,yExisEnd.y+15);
	ctx.lineTo(yExisEnd.x,yExisEnd.y);
	ctx.lineTo(yExisEnd.x+15,yExisEnd.y+15);
	ctx.stroke();
	for(var i=0;i<6;i++){
		ctx.fillStyle="#000";
		var x=origin.x;
		var y=origin.y-(i+1)*yGridSpace;
		ctx.moveTo(x,y);
		ctx.lineTo(x+10,y);
		ctx.stroke();
		var txt=(i+1)*avgValue;
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt,x-txtWidth-4,y+5);
	}
}
*/

//抽奖
drawLottery();
function drawLottery(){
	var ctx=$('#canvas-lottery')[0].getContext('2d');
	var canvasWidth=500;
	var canvasHeight=500;
	var pan=new Image();
	pan.src="img/pan.png";
	var panLoaded=false;
	pan.onload=function(){
		panLoaded=true;
		if(pinLoaded){
			startLottery();
		}
	}
	var pin=new Image();
	pin.src="img/pin.png";
	var pinLoaded=false;
	pin.onload=function(){
		pinLoaded=true;
		if(panLoaded){
			startLottery();
		}
	}

	function startLottery(){
		$('#bt-lottery').attr('disabled',false);
		ctx.drawImage(pan,0,0);
		ctx.drawImage(pin,canvasWidth/2-pin.width/2,canvasHeight/2-pin.height/2);
		ctx.translate(canvasWidth/2,canvasHeight/2);
		$('#bt-lottery').click(function(){
			//var duration=Math.random()*3000+2000;
			var durtime=20;
			var m=Math.random()*3000 + 5000;
			m+= m%20?20-(m%20):0;
			m+= m/20%2? 0:(-20);
			var duration =m;
			var deg=0;
			var last=0;
			var i=0;
			var DEGMAX=9;
			var XMIDDLE=3;
			var XVAR=(XMIDDLE*2)/((duration/durtime)+1);
			var totalTime=0;	
			var timer=setInterval(function(){
				/*deg+=3;
				if(deg>=90){
					for(var i=0;i<2;i++){
						deg++;
					}
				}
				if(deg>500){deg-=2;}*/
			deg +=(-Math.pow(XVAR*(i++)-XMIDDLE,2))+DEGMAX;
			
				//if(deg>=360){deg+=5;}
				//deg%=360
				ctx.rotate(deg*Math.PI/180);
				ctx.drawImage(pan,-pan.width/2,-pan.height/2);
				ctx.rotate(-deg*Math.PI/180);
				ctx.drawImage(pin,-pin.width/2,-pin.height/2);
				last+=30;
				$('#bt-lottery').attr('disabled',true);
				totalTime+=durtime;
				if(totalTime>=duration){
					clearInterval(timer);
					$('#bt-lottery').attr('disabled',false);
					var sum=deg%30%12;
					//console.log(sum);
				}
			},durtime);
		});

	}
}

