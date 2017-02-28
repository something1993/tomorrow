
//封装$：接受一个字符串格式的选择器，返回指定的元素
//HTMLElement.prototype是所有html元素的父对象
window.$=HTMLElement.prototype.$=function(selector){
	var r=(this==window?document:this).querySelectorAll(selector);
	return  r.length==0?null:
			r.length==1?r[0]:
						   r;
}
//$()整个页面查找
//div.$();仅在div下查找

window.onload=function(){
	//顶部菜单展开
	//找到class为app_jd的元素，为其绑定鼠标进入事件
	$(".app_jd").addEventListener("mouseover",topShow);
	$(".app_jd").addEventListener("mouseout",topHide);
	$(".service").addEventListener("mouseover",topShow);
	$(".service").addEventListener("mouseout",topHide);
	//商品分类
	$("#category").addEventListener("mouseover",showAll);
	$("#category").addEventListener("mouseout",hideAll);
	var lis=$("#cate_box>li");
	for(var i=0;i<lis.length;i++){
		lis[i].addEventListener("mouseover",showSub);
		lis[i].addEventListener("mouseout",hideSub)
	}
	//标签页
	$("#product_detail>.main_tabs").addEventListener("click",showTab);
	zoom.init();
}

//移动下方图片
var zoom={
	LIWIDTH:0,//保存li的宽度
	OFFSET:0,//保存ul的起始left值
	count:0,
	moved:0,
	MAX:0,
	MSIZE:0,
	init:function(){
		this.MSIZE=parseFloat(getComputedStyle($("#mask")).height);
		this.MAX=parseFloat(getComputedStyle($("#superMask")).height)-this.MSIZE;
		this.LIWIDTH=parseFloat(getComputedStyle($("#icon_list>li:first-child")).width);
		this.OFFSET=parseFloat(getComputedStyle($("#icon_list")).left);
		this.count=$("#icon_list>li").length;
		$("#preview>h1>.forward").addEventListener("click",this.moveLeft.bind(this));
		$("#preview>h1>a:first-child").addEventListener("click",this.moveRight.bind(this));
		$("#icon_list").addEventListener("mouseover",this.changeImg);
		$("#superMask").addEventListener("mouseover",this.showMask);
		$("#superMask").addEventListener("mouseout",this.hideMask);
		$("#superMask").addEventListener("mousemove",this.moveMask.bind(this));
	},
	moveMask:function(e){
		var x=e.offsetX,y=e.offsetY;
		var l=x-this.MSIZE/2;
		var t=y-this.MSIZE/2;
		if(l<0){l=0;}else if(l>this.MAX){l=this.MAX;}
		if(t<0){t=0;}else if(t>this.MAX){t=this.MAX;}
		$("#mask").style.left=l+"px";
		$("#mask").style.top=t+"px";
		$("#largeDiv").style.backgroundPosition=-16/7*l+"px "+-16/7*t+"px";

	},
	showMask:function(){
		$("#mask").style.display="block";
		$("#largeDiv").style.display="block";
		var src=$("#mImg").src;
		var i=src.lastIndexOf(".");
		$("#largeDiv").style.backgroundImage="url("+(src.slice(0,i-1)+"l"+src.slice(i))+")";
	},
	hideMask:function(){
		$("#mask").style.display="none";
		$("#largeDiv").style.display="none"
	},
	//图片的切换
	
	changeImg:function(e){
		if(e.target.nodeName=="IMG"){
			var src=e.target.src;
			var i=src.lastIndexOf(".");
			$("#mImg").src=src.slice(0,i)+"-m"+src.slice(i);
		}
	},
	moveLeft:function(e){//将ul左移一次
		if(e.target.className.indexOf("_disabled")==-1){
			this.moved++;
			$("#icon_list").style.left=(-1)*this.moved*this.LIWIDTH+this.OFFSET+"px";
			this.checkA();
		}
		
	},
	moveRight:function(e){
		if(e.target.className.indexOf("_disabled")==-1){
			this.moved--;
			$("#icon_list").style.left=(-1)*this.moved*this.LIWIDTH+this.OFFSET+"px";
			this.checkA();
		}
		
	},
	checkA:function(){//检查并修改a的状态
		if(this.count-this.moved==5){
			$("#preview>h1>.forward").className+="_disabled";
		}else if(this.moved==0){
			$("#preview>h1>.backward").className+="_disabled";
		}else{
			$("#preview>h1>a:first-child").className="backward";
			$("#preview>h1>a:nth-child(2)").className="forward";
		}
	},
}


//标签页
function showTab(e){
	var target=e.target;
	if(target.nodeName=="A"){
		target=target.parentNode;
	}
	if(target.nodeName=="LI"&&target.className!="current"){
		this.$(".current").className="";
		target.className="current";
		
		var containers=$("#product_detail>[id^='product_']");
		for(var i=0;i<containers.length;i++){
			containers[i].style.display="none";
		}
		var tar=target.dataset.tar;
		if(tar!="comment"){
			$("#product_"+tar).style.display="block";
		}
	}
}

//

function showSub(){
	this.$(".sub_cate_box").style.display="block";
	this.$("h3").className="hover";
}
function hideSub(){
	this.$(".sub_cate_box").style.display="none";
	this.$("h3").className="";
}
//全部商品分类

function showAll(){
	this.$("#cate_box").style.display="block";
}
function hideAll(){
	this.$("#cate_box").style.display="none";
}
//顶部菜单的展开
function topShow(){
	this.$("[id$='_items']").style.display="block";
	this.$("b+a").className="hover";
}
function topHide(){
	this.$("[id$='_items']").style.display="none";
	this.$("b+a").className="";
}