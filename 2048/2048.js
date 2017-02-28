var game={
	data:null,//保存一个二维数组，二维数组中保存了所有游戏数据
	RN:4,//保存总行数
	CN:4,//保存总列数
	score:0,//保存游戏的当前的得分
	state:1,//保存游戏的状态，0就是结束
	GAMEOVER:0,//当常量用，结束状态
	RUNNING:1,//运行状态
	CELLSIZE:100,//保存每个格之间的间距
	OFFSET:16,//保存每个格的宽和高
	top:0,//最高分
//对象自己的方法，要使用自己的属性或其他方法，都要用this.
//每个属性和方法结尾，必须用逗号隔开
	init:function(){//初始化游戏格子
		
		for(var r=0,arr=[];r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				arr.push(""+r+c);
			}
		}
		gridPanel.innerHTML='<div id="g'+arr.join('" class="grid"></div><div id="g')+'"class="grid"></div>';
		gridPanel.innerHTML+='<div id="c'+arr.join('" class="cell"></div><div id="c')+'"class="cell"></div>';
		var width=this.CELLSIZE*this.CN+this.OFFSET*(this.CN+1);
		gridPanel.style.width=width+"px";
		var height=this.CELLSIZE*this.RN+this.OFFSET*(this.RN+1);
		gridPanel.style.height=height+"px";
	},
	start:function(){
		if(document.cookie.trim()!=""){
			this.top=document.cookie.slice(4);
		}
		this.init();
		this.state=this.RUNNING;//初始化游戏状态为运行中
		this.score=0;//分数清0
		this.data=[];//初始化二维数组，创建空数组，保存在当前对象的data对象中
		for(var r=0;r<this.RN;r++){
			this.data[r]=[];//
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;
			}
		}
		this.randomNum();
		this.randomNum();
		this.updataView();
		//响应键盘事件
		var me=this;
		document.onkeydown=function(e){
			switch(e.keyCode){
				case 37:me.moveLeft();break;
				case 38:me.moveUp();break;
				case 39:me.moveRight();break;
				case 40:me.moveDown();break;
			}
		}
	},//启动游戏
	randomNum:function(){//负责生成一个随机数
		while(true){
			var r=parseInt(Math.random()*this.RN);
			var c=parseInt(Math.random()*this.CN);
			if(this.data[r][c]==0){
				this.data[r][c]=Math.random()<0.5?2:4;
				break;
			}
		}
	},
	updataView:function(){//专门将data中的元素，更新到页面
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var div=document.getElementById("c"+r+c);
				if(this.data[r][c]==0){div.innerHTML="";div.className="cell";}
				else{
					div.innerHTML=this.data[r][c];
					div.className="cell n"+this.data[r][c];
				}

			}
		}
		 score.innerHTML=this.score;
		 top1.innerHTML=this.top;
		 if(this.state==this.GAMEOVER){
		 gameOver.style.display="block";}
		 else{gameOver.style.display="none";}
		 finalScore.innerHTML=this.score;
	},
	//游戏结束
	isGameOver:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){return false;}
				else if((c<this.CN-1)&&(this.data[r][c]==this.data[r][c+1])){return false;}
				else if((r<this.RN-1)&&(this.data[r][c]==this.data[r+1][c])){return false;}
			}
		}
		return true;
	},
	move:function(fun){
		var before=String(this.data);
		fun();
		var after=String(this.data);
		if(before!=after){
			this.randomNum();
			if(this.isGameOver()){
				this.state=this.GAMEOVER;
				if(this.score>this.top){
					var date=new Date("2020/11/11");
					document.cookie="top="+this.score+";expires="+date.toGMTString();
				}
			};
			this.updataView();
		}
	},
	//下移
	moveDown:function(){
		var me=this;
		this.move(function(){
			for(var c=0;c<me.CN;c++){
			me.moveDownInCol(c);
			}
		});
	},
	moveDownInCol:function(c){
		for(var r=this.RN-1;r>0;r--){
			var prevr=this.getUpInCol(r,c);
			if(prevr==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[prevr][c];
				this.data[prevr][c]=0;
				r++;
			}
			else if(this.data[r][c]==this.data[prevr][c]){
				this.score+=(this.data[r][c]*=2);
				this.data[prevr][c]=0;
				//将当前元素的值累加到score上
			}
		}
	},//下移第c列
	getUpInCol:function(r,c){
		for(var prevr=r-1;prevr>=0;prevr--){
			if(this.data[prevr][c]!=0){return prevr;}
		}
		return -1;
	},

	//上移
	moveUp:function(){
		var me=this;
		this.move(function(){
			for(var c=0;c<me.CN;c++){
			me.moveUpInCol(c);
			}
		});
	},
	moveUpInCol:function(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getDownInCol(r,c);
			if(nextr==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[nextr][c];
				this.data[nextr][c]=0;
				r--;
			}
			else if(this.data[r][c]==this.data[nextr][c]){
				this.score+=(this.data[r][c]*=2);
				this.data[nextr][c]=0;
			}
		}
	},//上移第c列
	getDownInCol:function(r,c){
		for(var nextr=r+1;nextr<this.RN;nextr++){
			if(this.data[nextr][c]!=0){return nextr;}
		}
		return -1;
	},
	//右移
	moveRight:function(){
		var me=this;
		this.move(function(){
			for(var r=0;r<me.RN;r++){
				me.moveRightInRow(r);
			}
		});
	},

	moveRightInRow:function(r){
		for(var c=this.CN-1;c>0;c--){
			var prevc=this.getPrevInRow(r,c);
			if(prevc==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[r][prevc];
				this.data[r][prevc]=0;
				c++;
			}else if(this.data[r][c]==this.data[r][prevc]){
				this.score+=(this.data[r][c]*=2);
				this.data[r][prevc]=0;
			}
		}
	},
	getPrevInRow:function(r,c){
		for(var prevc=c-1;prevc>=0;prevc--){
			if(this.data[r][prevc]!=0){return prevc;}
		}
		return -1;
	},

	
	//左移
	moveLeft:function(){
		var me=this;
		this.move(function(){
			for(var r=0;r<me.RN;r++){
				me.moveLeftInRow(r);
			}
		});
	},
	moveLeftInRow:function(r){
		for(var c=0;c<this.CN-1;c++){
			var nextc=this.getNextInRow(r,c);
			if(nextc==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[r][nextc];
				this.data[r][nextc]=0;
				c--;
			}else if(this.data[r][c]==this.data[r][nextc]){
				this.score+=(this.data[r][c]*=2);
				this.data[r][nextc]=0;
			}
		}
	},
	getNextInRow:function(r,c){
		for(var nextc=c+1;nextc<this.CN;nextc++){
			if(this.data[r][nextc]!=0){return nextc;}
		}
		return -1;
	},
}
	
//事件:当页面加载完成后，自动触发
window.onload=function(){
	game.start();
}