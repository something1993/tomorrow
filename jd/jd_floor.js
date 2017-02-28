function getTop(elem){
	var sum=elem.offsetTop;
	while(elem.offsetParent){
	sum+=elem.offsetParent.offsetTop;
	elem=elem.offsetParent;
	}  
	return sum; 
}
window.addEventListener("load",function(){floor.init()});
var floor={
	UPLEVEL:0,//亮灯范围的上线距文档显示区顶部的距离
	DOWNLEVEL:0,//亮灯范围的下线距文档显示区顶部的距离
	distance:0,//
	DURATION:1000,//
	STEPS:100,//保存总步数
	moved:0,//保存本次已经移动的步数
	step:0,//保存每步移动的步长
	INTERVAL:0,//保存每步移动的时间间隔
	timer:null,//保存本次移动的序号

	init:function(){
		this.INTERVAL=this.DURATION/this.STEPS;
		//获得id为f1的div，计算后的样式height，转为浮点数保存在变量fHeight中
		var fHeight=parseFloat(getComputedStyle(f1).height);
		//计算UPLEVEL:（文档显示区的高度-fHeight）/2
		this.UPLEVEL=(window.innerHeight-fHeight)/2;
		//计算DOWNLEVEL:UPLEVEL+fHeight;
		this.DOWNLEVEL=this.UPLEVEL+fHeight;
		//为window绑定onscroll事件，提前绑定this
		window.addEventListener("scroll",this.checkLight.bind(this));

		//为id为elevator的div下的ul，绑定鼠标进入事件
		$("#elevator>ul").addEventListener("mouseover",this.showEtitle);
		//为id为elevator的div下的ul，绑定鼠标移出事件
		$("#elevator>ul").addEventListener("mouseout",this.hideEtitle);
		$("#elevator>ul").addEventListener("click",this.move.bind(this));
	},

	move:function(e){//负责准备启动一个动画
		var target=e.target;
		if(target.nodeName=="A"){
			if(this.timer){
				clearTimeout(this.timer);
				this.timer=null;
				this.moved=0;
			}
			var scrollTop=document.body.scrollTop;
			var i=parseInt(target.parentNode.firstElementChild.innerHTML);
			var span=$("#f"+i+">header>span");
			var totalTop=getTop(span);
			this.distance=totalTop-this.UPLEVEL-scrollTop;
			this.step=this.distance/this.STEPS;
			this.timer=setTimeout(this.moveStep.bind(this),this.INTERVAL);
		}
	},
	moveStep:function(){//移动一步
		scrollBy(0,this.step);
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this),this.INTERVAL);
		}else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
		}
	},

	showEtitle:function(e){//显示当前li下的etitle的a
		//获得目标元素target
		var target=e.target||e.srcElement;
		//如果target是a
		if(target.nodeName=="A"){
			//让target变为target的父节点（li）
			target=target.parentNode;
		} if(target.nodeName=="LI"){//如果target是li
			//在target下找第一个a，将其隐藏
			target.$("a:first-child").style.display="none";
			//在target下找第二个a，将其显示
			target.$("a:first-child+a").style.display="block";
		}
	},
	hideEtitle:function(e){//隐藏当前li下的etitle的a
		//获得目标元素target
		var target=e.target||e.srcElement;
		//如果target是a
		if(target.nodeName=="A"){
			//让target变为target的父节点（li）
			target=target.parentNode;
		}if(target.nodeName=="LI"){//如果target是li
			//在target下找第一个a，将其隐藏
			var i=parseInt(target.$("a:first-child").innerHTML);
			var span=$("#f"+i+">header>span");
			if(span.className!="hover"){
				target.$("a:first-child").style.display="block";
				//在target下找第二个a，将其显示
				target.$("a:first-child+a").style.display="none";
			}
		}
	},
	checkLight:function(){//检查每个楼层中span的亮灭状态
		//获得当前页面滚动的距离，保存在变量scrollTop中
		var scrollTop=document.body.scrollTop;
		//获得所有class为floor下的header下的直接子节点span,保存在变量spans中
		var spans=$(".floor>header>span");
		//遍历spans中每个span
		for(var i=0;i<spans.length;i++){
			//用getTop方法获得当前span距页面顶部的总距离，保存在变量totalTop中
			var totalTop=getTop(spans[i]);
			//用totalTop-scorllTop,将结果保存在变量innerTop
			var innerTop=totalTop-scrollTop;

			//查找id为elevator下的ul下的所有li中下标为i的li保存在变量li中
			
			//在li下找第一个a，保存在变量a1中
			//在li下找第二个a，保存在变量a2中
			var li=$("#elevator>ul>li")[i];
			var a1=li.$("a:first-child");
			var a2=li.$("a:first-child+a");

			//如果innerTop>=UPLEVEL且innerTop<=DOWNLEVEL	
			if(innerTop>=this.UPLEVEL&&innerTop<=this.DOWNLEVEL){
				//将当前span的class设置hover
				spans[i].className="hover";
				//设置a1隐藏，a2显示
				a1.style.display="none";
				a2.style.display="block";
			}else{//否则
				//清除当前span的class
				spans[i].className="";
				//设置a1显示，a2隐藏
				a1.style.display="block";
				a2.style.display="none";
			}
		}
		var lightSpan=$(".floor>header>span.hover");
		$("#elevator").style.display=lightSpan!=null?"block":"none";
	}
}
