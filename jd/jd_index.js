/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
/*广告图片数组*/
var imgs=[
    {"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
//为window绑定load事件
window.addEventListener("load",function(){slider.init();});
//轮播广告
var slider={
	LWIDTH:670,//保存每个li的宽度
	distance:0,//保存本次移动的总距离
	DURATION:1000,//保存本次移动的总时间
	STEPS:100,//保存本次移动的总步数
	moved:0,//保存本次移动的步数，控制动画停止
	step:0,//保存每一步的步长
	INTERVAL:0,//保存每一步的时间间隔
	WAIT:3000,
	canAuto:true,
	timer:null,//保存当前正在播放的动画的序号，专用于停止动画
	init:function(){
		this.INTERVAL=this.DURATION/this.STEPS;
		this.updateView();
		var me=this;
		$("#idxs").addEventListener("mouseover",function(e){
			if(e.target.nodeName=="LI"&&e.target.className!="hover"){
				var starti=$("#idxs>.hover").innerHTML;
				var endi=e.target.innerHTML;
				me.move(endi-starti);
			}
		});
		//为id为slider的dic绑定鼠标进入事件
		$("#slider").addEventListener("mouseover",function(e){
			me.canAuto=false;
		});
		$("#slider").addEventListener("mouseout",function(e){
			me.canAuto=true;
		});
		this.autoMove();
	},
	autoMove:function(){
		var me=this;
		this.timer=setTimeout(function(){
		if(me.canAuto){me.move(1);}else{me.autoMove();}
		},this.WAIT);
	},
	move:function(n){//将imgs的ul左移或右移n个
		if(this.timer!=null){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			$("#imgs").style.left="";
		}
		this.distance=n*this.LWIDTH;
		this.step=this.distance/this.STEPS;
		if(n<0){//右移之前要提前调整数组内容
			var dels=imgs.splice(imgs.length+n,-n);
			//imgs=dels.concat(imgs);
			Array.prototype.unshift.apply(imgs,dels);
			$("#imgs").style.left=n*this.LWIDTH+"px";
			this.updateView();
		}
		this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
	},
	moveStep:function(n){//让imgs的ul移动一步
		var left=parseFloat(getComputedStyle($("#imgs")).left);
		$("#imgs").style.left=left-this.step+"px";
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(this.moveStep.bind(this,n),this.INTERVAL);
		}else{
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			if(n>0){//左移结束才需要调整数组
				var dels=imgs.splice(0,n);
				Array.prototype.push.apply(imgs,dels);
				//imgs=imgs.concat(imgs.splice(0,n));
				this.updateView();
			}
			$("#imgs").style.left="";
			this.autoMove();
		}
	},
	updateView:function(){//将img数组中的图片更新到页面
		$("#imgs").style.width=imgs.length*this.LWIDTH+"px";
		for(var i=0,strImg="",strIdx="";i<imgs.length;i++){
			strImg+='<li><img src="'+imgs[i].img+'"></li>';
			strIdx+="<li>"+(i+1)+"</li>";
		}
		$("#imgs").innerHTML=strImg;
		$("#idxs").innerHTML=strIdx;
		$("#idxs>li")[imgs[0].i].className="hover";
	},
	
}