/*全局变量*/
var canvasWidth=480;
var canvasHeight=650;
var canvas=document.getElementById('canvas');
canvas.width=canvasWidth;
canvas.height=canvasHeight;
var ctx=canvas.getContext('2d');

const PHASE_DOWNLOAD=1;//图片下载阶段
const PHASE_READY=2;//就绪阶段
const PHASE_LOADING=3;//游戏加载阶段
const PHASE_PLAY=4;//游戏进行阶段
const PHASE_PAUSE=5;//游戏暂停阶段
const PHASE_GAMEOVER=6;//游戏结束阶段

//所有的图片变量
var imgBackground;
var imgBullet1;
/*var imgEnemy1;
var imgEnemy1Down1;
var imgEnemy1Down2;
var imgEnemy1Down3;
var imgEnemy1Down4;*/
var imgsEnemy1=[];
/*var imgEnemy2;
var imgEnemy2Down1;
var imgEnemy2Down2;
var imgEnemy2Down3;
var imgEnemy2Down4;*/
var imgsEnemy2=[];
/*var imgEnemy3Down1;
var imgEnemy3Down2;
var imgEnemy3Down3;
var imgEnemy3Down4;
var imgEnemy3Down5;
var imgEnemy3Down6;
var imgEnemy3Hit;
var imgEnemy3N1;
var imgEnemy3N2;*/
var imgsEnemy3=[];
/*var imgGameLoading1;
var imgGameLoading2;
var imgGameLoading3;
var imgGameLoading4;*/
var imgsGameLoading=[];
var imgGamePauseNor;
var imgsHero=[];
/*var imgHeroBlowupN1;
var imgHeroBlowupN2;
var imgHeroBlowupN3;
var imgHeroBlowupN4;
var imgHero1;
var imgHero2;*/
var imgStart;
/**阶段1：下载图片***/
var curPhase=PHASE_DOWNLOAD;  //游戏当前所处的阶段
download();    //开始下载图片
//33个对象
function download(){
	var progress=0;  //下载进度
	ctx.font='80px Helvetica';
	ctx.fillStyle='#ddd';
	function drawProgress(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		var txt=progress+'%';
		var w=ctx.measureText(txt).width;
		ctx.fillText(txt,canvasWidth/2-w/2,canvasHeight/2+40);
		ctx.strokeText(txt,canvasWidth/2-w/2,canvasHeight/2+40);
		if(progress>=100){//所有图片加载完成开始游戏
			startGame();
		}

	}
	//1
	imgBackground=new Image();
	imgBackground.src='img/background.png';
	imgBackground.onload=function(){
		progress+=4;
		drawProgress();
	}
	
	//2
	imgBullet1=new Image();
	imgBullet1.src='img/bullet1.png';
	imgBullet1.onload=function(){
		progress+=3;
		drawProgress();
	}
	//3
	imgsEnemy1[0]=new Image();
	imgsEnemy1[0].src='img/enemy1.png';
	imgsEnemy1[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[1]=new Image();
	imgsEnemy1[1].src='img/enemy1_down1.png';
	imgsEnemy1[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[2]=new Image();
	imgsEnemy1[2].src='img/enemy1_down2.png';
	imgsEnemy1[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[3]=new Image();
	imgsEnemy1[3].src='img/enemy1_down3.png';
	imgsEnemy1[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy1[4]=new Image();
	imgsEnemy1[4].src='img/enemy1_down4.png';
	imgsEnemy1[4].onload=function(){
		progress+=3;
		drawProgress();
	}
	//4
	//5
	//6
	//7
	//8
	imgsEnemy2[0]=new Image();
	imgsEnemy2[0].src='img/enemy2.png';
	imgsEnemy2[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	//9
	//10
	//11
	//12
	imgsEnemy2[1]=new Image();
	imgsEnemy2[1].src='img/enemy2_down1.png';
	imgsEnemy2[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[2]=new Image();
	imgsEnemy2[2].src='img/enemy2_down2.png';
	imgsEnemy2[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[3]=new Image();
	imgsEnemy2[3].src='img/enemy2_down3.png';
	imgsEnemy2[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy2[4]=new Image();
	imgsEnemy2[4].src='img/enemy2_down4.png';
	imgsEnemy2[4].onload=function(){
		progress+=3;
		drawProgress();
	}
	
	//13
	//14
	//15
	//16
	//17
	//18
	//19
	//20
	//21
	imgsEnemy3[0]=new Image();
	imgsEnemy3[0].src='img/enemy3_n1.png';
	imgsEnemy3[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[1]=new Image();
	imgsEnemy3[1].src='img/enemy3_n2.png';
	imgsEnemy3[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[2]=new Image();
	imgsEnemy3[2].src='img/enemy3_hit.png';
	imgsEnemy3[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[3]=new Image();
	imgsEnemy3[3].src='img/enemy3_down1.png';
	imgsEnemy3[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[4]=new Image();
	imgsEnemy3[4].src='img/enemy3_down2.png';
	imgsEnemy3[4].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[5]=new Image();
	imgsEnemy3[5].src='img/enemy3_down3.png';
	imgsEnemy3[5].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[6]=new Image();
	imgsEnemy3[6].src='img/enemy3_down4.png';
	imgsEnemy3[6].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[7]=new Image();
	imgsEnemy3[7].src='img/enemy3_down5.png';
	imgsEnemy3[7].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsEnemy3[8]=new Image();
	imgsEnemy3[8].src='img/enemy3_down6.png';
	imgsEnemy3[8].onload=function(){
		progress+=3;
		drawProgress();
	}
	
	


	//22
	//23
	//24
	//25
	imgsGameLoading[0]=new Image();
	imgsGameLoading[0].src='img/game_loading1.png';
	imgsGameLoading[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[1]=new Image();
	imgsGameLoading[1].src='img/game_loading2.png';
	imgsGameLoading[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[2]=new Image();
	imgsGameLoading[2].src='img/game_loading3.png';
	imgsGameLoading[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsGameLoading[3]=new Image();
	imgsGameLoading[3].src='img/game_loading4.png';
	imgsGameLoading[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	
	
	//26
	imgGamePauseNor=new Image();
	imgGamePauseNor.src='img/game_pause_nor.png';
	imgGamePauseNor.onload=function(){
		progress+=3;
		drawProgress();
	}
	//27
	//28
	//29
	//30
	//31
	//32
	imgsHero[0]=new Image();
	imgsHero[0].src='img/hero1.png';
	imgsHero[0].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[1]=new Image();
	imgsHero[1].src='img/hero2.png';
	imgsHero[1].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[2]=new Image();
	imgsHero[2].src='img/hero_blowup_n1.png';
	imgsHero[2].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[3]=new Image();
	imgsHero[3].src='img/hero_blowup_n2.png';
	imgsHero[3].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[4]=new Image();
	imgsHero[4].src='img/hero_blowup_n3.png';
	imgsHero[4].onload=function(){
		progress+=3;
		drawProgress();
	}
	imgsHero[5]=new Image();
	imgsHero[5].src='img/hero_blowup_n4.png';
	imgsHero[5].onload=function(){
		progress+=3;
		drawProgress();
	}
	
	
	//33
	imgStart=new Image();
	imgStart.src='img/start.png';
	imgStart.onload=function(){
		progress+=3;
		drawProgress();
		
	}
	
}
/**阶段2：就绪****/
var sky;  //天空对象
var logo;
function startGame(){
	curPhase=PHASE_READY;
	sky=new Sky(imgBackground);//创建天空对象
	logo=new Logo(imgStart);
	startEngine();//启动整个游戏的主引擎-定时器
	//当用户点击之后，进入下一阶段
	canvas.onclick=function(){
		if(curPhase===PHASE_READY){//从就绪阶段进入加载阶段
			curPhase=PHASE_LOADING;
			loading=new Loading(imgsGameLoading);
		}
	}
}
//天空的构造函数  面向对象的思想
function Sky(img){
	this.x1=0;  //初始时第一张背景图的坐标
	this.y1=0;
	this.x2=0; //初始时第二张背景图的坐标
	this.y2=-img.height;
	this.draw=function(){//绘制天空
		ctx.drawImage(img,this.x1,this.y1);
		ctx.drawImage(img,this.x2,this.y2);
	}
	this.move=function(){
		this.y1+=3;
		this.y2+=3;
		if(this.y1>=canvasHeight){
			this.y1=this.y2-img.height;
		}
		if(this.y2>=canvasHeight){
			this.y2=this.y1-img.height;
		}
	}
}
//游戏LOGO
function Logo(img){
	this.x=canvasWidth/2-img.width/2;
	this.y=canvasHeight/2-img.height/2;
	this.draw=function(){
		ctx.drawImage(img,this.x,this.y);
	}
}
/**阶段3：加载中****/
var loading;
function Loading(imgs){
	this.x=0;
	this.y=canvasHeight-imgs[0].height;
	this.index=0;//当前绘制数组中图片的下标
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter=0;//记录了move函数的记录次数
	this.move=function(){
		this.counter++;
		if(this.counter%5===0){
			this.index++;//绘制下一张图片
		
			if(this.index>=imgs.length){
				curPhase=PHASE_PLAY;
				hero=new Hero(imgsHero);
				bulletList=new BulletList();
				enemyList=new EnemyList();
			}
		}
		
		
		
	}
}
/**阶段4：游戏进行中****/
var hero;
var heroCount=3;//飞机数量
var heroScore=0;//所得分数
//我方英雄 的构造方法
function Hero(imgs){
	this.x=canvasWidth/2-imgs[0].width/2;
	this.y=canvasHeight-imgs[0].height;
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.index=0;//带绘制的是书中的那张图片
	this.crashed=false;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter=0;
	this.move=function(){
		this.counter++;
		if(this.counter%2===0){
			if(!this.crashed){//未开始撞毁程序
				if(this.index===0){
					this.index=1;
				}else if(this.index===1){
					this.index=0;
				}
			}else{
				if(this.index===0||this.index===1){
					this.index=2;
				}else if(this.index<imgs.length-1){
					this.index++;
				}else{//坠毁程序   boold-1,创建新英雄
					heroCount--;
					if(heroCount>0){//是否还有新英雄
						hero=new Hero(imgsHero);
					}else{//命没了
						curPhase=PHASE_GAMEOVER;
					}
				}
			}
		}
		if(this.counter%5===0){//5变量  越小发射的频率越快
			this.fire();
		}
	}
	//发射子弹  边移动边边发射子弹   可以加子弹
	this.fire=function(){
		var b=new Bullet(imgBullet1);
		bulletList.add(b);
	}
}
//当鼠标在画布上方移动时，修改我方飞机的位置
canvas.onmousemove=function(e){
	if(curPhase===PHASE_PLAY){
		var x=e.offsetX;//鼠标事件相对于画布左上角的偏移量
		var y=e.offsetY;
		var w1=imgsHero[0].width/2;
		var h1=imgsHero[0].height/2;
		if(x>=w1&&x<=canvasWidth-w1&&y>=h1&&y<=canvasHeight-h1){
			hero.x=x-w1;
			hero.y=y-h1;
		}
	}
}
//子弹对象的构造方法
function Bullet(img){
	this.x=hero.x+(imgsHero[0].width/2-img.width/2);
	
	/*this.x1=hero.x+(imgsHero[0].width/2-img.width/2-20);
	this.x2=hero.x+(imgsHero[0].width/2-img.width/2+20);*/

	this.y=hero.y-img.height;
	this.width=img.width;
	this.height=img.height;
	this.removeable=false;//当前子弹能否删除

	this.draw=function(){
		ctx.drawImage(img,this.x,this.y);

		/*ctx.drawImage(img,this.x1,this.y);
		ctx.drawImage(img,this.x2,this.y);*/
	};
	this.move=function(){
		this.y-=10;//应该是全局变量子 弹移动速度
		//若飞出画布或打中敌机，应该消失
		if(this.y<=-img.height){
			this.removeable=true;
		}
	}
}
//保存当前所有的子弹 子弹列表对象
var bulletList;
function BulletList(){
	this.arr=[];//画布上的所有的子弹
	this.add=function(bullet){
		this.arr.push(bullet);
	};//
	this.remove=function(i){//删除子弹
		this.arr.splice(i,1);	
	};
	this.draw=function(){//绘制每一个子弹
		for(var i in this.arr){
			this.arr[i].draw();
		}
	};
	this.move=function(){
		for(var i in this.arr){
			this.arr[i].move();//让每一个子弹都移动
			if(this.arr[i].removeable){
				this.remove(i);	
			}
		}
	};
}
///////////////////////////////////////
//小号敌机
function Enemy1(imgs){
	this.x=Math.random()*(canvasWidth-imgs[0].width);
	this.y=-imgs[0].height;
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.index=0;
	this.speed=5;//小敌机的移动速度
	this.removeable=false;//可以删除了？
	this.blood=1;//小飞机一点血
	this.crashed=false;//是否被撞毁
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	} 
	this.counter=0;
	this.move=function(){
		this.y+=this.speed;
		//若飞出下边界或者是爆炸了就可以删除了
		this.checkHit();//碰撞检查
		this.counter++;
		if(this.crashed&&this.counter%2===0){
				if(this.index===0){this.index=1;}
				else if(this.index<imgs.length-1){this.index++;}
				else{this.removeable=true;heroScore+=5;}
		}
		//若飞出下边界或者是炸毁了就可以删除了
		if(this.y>=canvasHeight){
			this.removeable=true;
		}
	}
	///碰撞检测
	this.checkHit=function(){
		//每个敌机必须和我方的每个子弹以及英雄进行碰撞检验
		for(var i in bulletList.arr){
			var b=bulletList.arr[i];
			/*console.log(b);
			console.log(this.x+"-"+this.y);
			console.log(b.x+"-"+b.y);*/
			if(
				(this.x+this.width>=b.x)&&
				(b.x+b.width>=this.x)&&
				(this.y+this.height>=b.y)&&
				(b.y+b.height>=this.y)
			){
				this.blood--;
				if(this.blood<=0){//没有血了开始撞毁程序
					this.crashed=true;
					
				}
				b.removeable=true;
				
			}
		}
		//每个敌机必须和我方英雄做碰撞检验
		if(
			(this.x+this.width>=hero.x)&&
			(hero.x+hero.width>=this.x)&&
			(this.y+this.height>=hero.y)&&
			(hero.y+hero.height>=this.y)
		){
			hero.crashed=true;//我方英雄开始撞毁程序
		}
	}
}
//中号敌机
function Enemy2(imgs){
	this.x=Math.random()*(canvasWidth-imgs[0].width);
	this.y=-imgs[0].height;
	this.index=0;
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.speed=3;//中敌机的移动速度
	this.removeable=false;//可以删除了？
	this.blood=3;//小飞机3点血
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter=0;
	this.move=function(){
		this.y+=this.speed;
		this.checkHit();//碰撞检查
		this.counter++;
		if(this.crashed&&this.counter%2===0){
			if(this.index===0){this.index=1;}
			else if(this.index<imgs.length-1){this.index++;}
			else{this.removeable=true;heroScore+=10;}
		}
		//若飞出下边界或者是炸毁了就可以删除了
		if(this.y>=canvasHeight){
			this.removeable=true;
		}
	}
	///碰撞检测
	this.checkHit=function(){
		//每个敌机必须和我方的每个子弹以及英雄进行碰撞检验
		for(var i in bulletList.arr){
			var b=bulletList.arr[i];
			/*console.log(b);
			console.log(this.x+"-"+this.y);
			console.log(b.x+"-"+b.y);*/
			if(
				(this.x+this.width>=b.x)&&
				(b.x+b.width>=this.x)&&
				(this.y+this.height>=b.y)&&
				(b.y+b.height>=this.y)
			){
				this.blood--;
				if(this.blood<=0){//没有血了开始撞毁程序
					this.crashed=true;
				}
				b.removeable=true;
				
			}
		}
		//每个敌机必须和我方英雄做碰撞检验
		if(
			(this.x+this.width>=hero.x)&&
			(hero.x+hero.width>=this.x)&&
			(this.y+this.height>=hero.y)&&
			(hero.y+hero.height>=this.y)
		){
			hero.crashed=true;//我方英雄开始撞毁程序
		}
	}

}
//大号敌机
function Enemy3(imgs){
	this.x=Math.random()*(canvasWidth-imgs[0].width);
	this.y=-imgs[0].height;
	this.index=0;
	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.speed=2;//大敌机的移动速度
	this.removeable=false;//可以删除了？
	this.blood=6;//大飞机6点血
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.counter=0;
	this.move=function(){
		this.counter++;
		this.y+=this.speed;
		this.checkHit();//碰撞检查
		if(this.counter%2===0){
			if(!this.crashed){//未开始撞毁程序
				if(this.index===0){
					this.index=1;
				}else if(this.index===1){
					this.index=0;
				}
			}else{//开始撞毁
				if(this.index===0||this.index===1){
					this.index=3;
				}else if(this.index<imgs.length-1){
					this.index++;
				}else{
					this.removeable=true;
					heroScore+=20;
				}
			}
		}
		//this.counter++;
		
		/*if(this.crashed&&this.counter%3===0){
			if(this.index===0){this.index=1;}
			else if(this.index<imgs.length-1){this.index++;}
			else{this.removeable=true;}
		}*/
		//若飞出下边界或者是爆炸了就可以删除了
		if(this.y>=canvasHeight){
			this.removeable=true;
		}
	}
	///碰撞检测
	this.checkHit=function(){
		//每个敌机必须和我方的每个子弹以及英雄进行碰撞检验
		for(var i in bulletList.arr){
			var b=bulletList.arr[i];
			/*console.log(b);
			console.log(this.x+"-"+this.y);
			console.log(b.x+"-"+b.y);*/
			if(
				(this.x+this.width>=b.x)&&
				(b.x+b.width>=this.x)&&
				(this.y+this.height>=b.y)&&
				(b.y+b.height>=this.y)
			){
				this.blood--;
				if(this.blood<=0){//没有血了开始撞毁程序
					this.crashed=true;
				}
				b.removeable=true;
				
			}
		}
		//每个敌机必须和我方英雄做碰撞检验
		if(
			(this.x+this.width>=hero.x)&&
			(hero.x+hero.width>=this.x)&&
			(this.y+this.height>=hero.y)&&
			(hero.y+hero.height>=this.y)
		){
			hero.crashed=true;//我方英雄开始撞毁程序
		}
	}
}
//所有敌机组成的列表
function EnemyList(){
	this.arr=[];//保存所有的敌机
	this.add=function(enemy){//增加新敌机
		this.arr.push(enemy);
	}
	this.remove=function(i){
		this.arr.splice(i,1);
	}
	this.draw=function(){
		for(var i in this.arr){
			this.arr[i].draw();
		}	
	}
	this.move=function(){
		this.generate();//生成新的敌人
		for(var i in this.arr){
			var e=this.arr[i];
			e.move();
			if(e.removeable){
				this.remove(i);
			}
		}
	}
	//随机生成一个敌机
	this.generate=function(){
		var num=Math.floor(Math.random()*200);
		if(num<6){this.add(new Enemy1(imgsEnemy1));}
		else if(num<9){
			this.add(new Enemy2(imgsEnemy2));
		}else if(num<10){
			this.add(new Enemy3(imgsEnemy3));
		}
	}
}
//绘制当前的得分和剩余英雄的数量
function drawStat(){
	ctx.font='25px Helvetica';
	ctx.fillStyle='#333';
	//绘制游戏得分
	var score='SCORE:'+heroScore;
	ctx.fillText(score,10,35);
	//绘制剩余的英雄数量
	var heros='HEROS:'+heroCount;
	var w=ctx.measureText(heros).width;
	ctx.fillText(heros,canvasWidth-w-10,35);
}
/**阶段5：游戏暂停****/
/**阶段6：游戏结束****/



/*****游戏的主引擎-主定时器******/
function startEngine(){
	setInterval(function(){
		sky.draw();
		sky.move();
		switch(curPhase){
			case PHASE_READY:
				logo.draw();
				break;
			case PHASE_LOADING:
				loading.draw();
				loading.move();
				break;
			case PHASE_PLAY:
				hero.draw();
				hero.move();
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();
				drawStat();
				break;
			case PHASE_PAUSE:
				break;
			case PHASE_GAMEOVER:
				break;

		}
	},42);//每一秒动24次
}

























































































































































