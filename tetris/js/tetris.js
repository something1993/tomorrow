var tetris={
	OFFSET:15,//保存容器的内边距
	CSIZE:26,//保存每个格子的宽高
	shape:null,//正在下落的主角的图形
	timer:null,//保存当前动画的序号
	interval:200,//保存图形下落的间隔
	wall:null,//保存所有已经停止下落的方块的二维数组
	RN:20,//总行数
	CN:10,//总列数
	lines:0,//保存消除的总行数
	score:0,//保存当前得分
	SCORES:[0,10,50,120,200],//分数
	nextShape:null,
	state:1,//保存当前游戏状态
	RUNNING:1,//运行
	PAUSE:2,//暂停
	GAMEOVER:0,//游戏结束
	LN:10,//每十行一级
	LNINTERVAL:100,//每升一级interval减100ms
	MIN:100,//interval最小的毫秒数
	level:1,//保存当前游戏的等级
	start:function(){
		this.level=1;
		this.interval=1000;
		this.state=this.RUNNING;
		this.lines=0;//清零
		this.score=0;
		this.wall=[];//将wall初始化为空数组
		for(var r=0;r<this.RN;r++){//r从0开始，到<RN结束，每次增1
			this.wall[r]=new Array(this.CN);//设置wall中r位置的行为CN个元素的空数组
		}
		this.shape=this.randomShape();//随机生成主角图形，保存在shape中
		this.nextShape=this.randomShape();
		this.paint();//调用paintShape绘制主角图形
		this.timer=setInterval(this.moveDown.bind(this),this.interval); //启动周期性定时器,设置任务函数为moveDown，提前绑定this,时间间隔为interval
		//为当前页面绑定键盘下事件
		var me=this;
		document.onkeydown=function(e){
		//判断键盘号
			switch(e.keyCode){
				case 37:(me.state==me.RUNNING)&&me.moveLeft();break;
				case 38:(me.state==me.RUNNING)&&me.rotateR();break;//右转
				case 39:(me.state==me.RUNNING)&&me.moveRight();break;
				case 40:(me.state==me.RUNNING)&&me.moveDown();break;
				case 90:(me.state==me.RUNNING)&&me.rotateL();break;//左转
				case 83:if(me.state==me.GAMEOVER){me.start()};break;//重启
				case 80:(me.state==me.RUNNING)&&me.pause();break;
				case 67:(me.state==me.PAUSE)&&me.myContinue();break;
				case 81:(me.state!=me.GAMEOVER)&&me.quit();break;
				case 32:(me.state==me.RUNNING)&&me.hardDrop();break;
			}
		}
		
	},
	hardDrop:function(){
		while(this.canDown()){
			this.shape.moveDown();
		}
		this.paint();
	},
	quit:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	myContinue:function(){
		this.state=this.RUNNING;
		this.paint();
	},
	pause:function(){
		this.state=this.PAUSE;
		this.paint();
	},
	rotateR:function(){
		this.shape.rotateR();
		if(!this.canRotate()){
			this.shape.rotateL();}else{
				this.paint();
			}
	},
	rotateL:function(){
		this.shape.rotateL();
		if(!this.canRotate()){
			this.shape.rotateR();}else{
				this.paint();
			}
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){//遍历shape中每个cell
			var cell=this.shape.cells[i];//将当前cell临时存储在变量cell中
			if(cell.r>19||cell.r<0||cell.c>9||cell.c<0||this.wall[cell.r][cell.c]!==undefined){ //如果cell的r已经等于19
					//或wall中cell的下方位置不等于undefined
				return false;//返回false//(遍历结束)//返回true
			}
		}
		return true;
	},
	deleteRows:function(){//遍历所有行检查能否消除
		for(var r=this.RN-1,ln=0;r>=0&&this.wall[r].join("")!="";r--){
			if(this.isFull(r)){
				this.deleteRow(r);
				r++;
				ln++;
				if(ln==4){break;}
			}
		}
		return ln;
	},
	deleteRow:function(delr){//删除第r行
		for(var r=delr;r>0;r--){
			this.wall[r]=this.wall[r-1];
			this.wall[r-1]=new Array(this.CN);
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
				if(cell){
					cell.r++;	
				}
			}
			if(this.wall[r-2].join("")==""){break;}
		}
	},
	isFull:function(r){//该不该删除
		var reg=/^,|,,|,$/;
		return String(this.wall[r]).search(reg)==-1?true:false;
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){//遍历shape中每个cell
			var cell=this.shape.cells[i];//将当前cell临时存储在变量cell中
			if(cell.c==0||this.wall[cell.r][cell.c-1]!==undefined){ //如果cell的r已经等于19
					//或wall中cell的下方位置不等于undefined
				return false;//返回false//(遍历结束)//返回true
			}
		}
		return true;
	},
	canRight:function(){
		for(var i=0;i<this.shape.cells.length;i++){//遍历shape中每个cell
			var cell=this.shape.cells[i];//将当前cell临时存储在变量cell中
			if(cell.c==9||this.wall[cell.r][cell.c+1]!==undefined){ //如果cell的r已经等于19
					//或wall中cell的下方位置不等于undefined
				return false;//返回false//(遍历结束)//返回true
			}
		}
		return true;
	},
	moveLeft:function(){//左移一次
		if(this.canLeft()){
			this.shape.moveLeft();
			this.paint();
		}
	},
	
	moveRight:function(){//右移一次
		if(this.canRight()){
			this.shape.moveRight();
			this.paint();
		}
	},
	
	canDown:function(){//能不能下落
		for(var i=0;i<this.shape.cells.length;i++){//遍历shape中每个cell
			var cell=this.shape.cells[i];//将当前cell临时存储在变量cell中
			if(cell.r==19||this.wall[cell.r+1][cell.c]!==undefined){ //如果cell的r已经等于19
					//或wall中cell的下方位置不等于undefined
				return false;//返回false//(遍历结束)//返回true
			}
		}
		return true;
	},	

	moveDown:function(){//负责将图形下落一次
		if(this.state==this.RUNNING){
			if(this.canDown()){//如果可以下落
				this.shape.moveDown();//调用shape的moveDown方法
			}else{
				this.landIntoWall();//调用landIntoWall，将shape放入墙中
				var ln=this.deleteRows();//调用删除行
				this.lines+=ln;
				this.score+=this.SCORES[ln];
				if(this.lines>this.level*this.LN){
					this.level++;
					if(this.interval>this.MIN){
						this.interval-=this.LNINTERVAL;
						clearInterval(this.timer);
						this.timer=setInterval(this.moveDown.bind(this),this.interval);
					}
				}
				if(this.isGameOver()){
					this.quit();
				}else{
					this.shape=this.nextShape;//备胎转正
					this.nextShape=this.randomShape();//生成新的备胎调用randomShape方法，随机生成图形，保存在shape中
				}
			}
			this.paint();//调用paint,绘制主角图形
		}
	},
	isGameOver:function(){
		for(var i=0;i<this.nextShape.cells.length;i++){
			if(this.wall[this.nextShape.cells[i].r][this.nextShape.cells[i].c]!==undefined){
				return true;
			}
		}return false;
	},
	paintState:function(){
	//专门根据游戏状态显示图片
		if(this.state==this.PAUSE){
			var img=new Image();
			img.src="img/pause.png";
			pg.appendChild(img);
		}else if(this.state==this.GAMEOVER){
			var img=new Image();
			img.src="img/game-over.png";
			pg.appendChild(img);
		}
	},
	randomShape:function(){//专门随机创建一个图形
		var r=parseInt(Math.random()*7);
		switch(r){
			case 0:return new O();
			case 1:return new I();
			case 2:return new T();
			case 3:return new J();
			case 4:return new L();
			case 5:return new S();
			case 6:return new Z();
		}
	},

	landIntoWall:function(){//专门负责将主角放入wall中
		for(var i=0;i<this.shape.cells.length;i++){//遍历shape中每个cell
			var cell=this.shape.cells[i];//将当前cell临时存储在变量cell中
			this.wall[cell.r][cell.c]=cell;//将当前cell赋值给wall中相同位置
		}
	},

	paint:function(){//重绘一切
		var reg=/<img[^>]*>/g;
		pg.innerHTML=pg.innerHTML.replace(reg,"");
		this.paintShape();
		this.paintWall();
		this.paintScore();
		this.painNext();
		this.paintState();
	},
	
	paintScore:function(){
	//填充分数和行数
		lines.innerHTML=this.lines;
		score.innerHTML=this.score;
		level.innerHTML=this.level;
	},

	painNext:function(){
		var frag=document.createDocumentFragment();//创建文档片段，保存在变量frag中
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.top=this.OFFSET+(cell.r+1)*this.CSIZE+"px";
			img.style.left=this.OFFSET+(cell.c+10)*this.CSIZE+"px";
			frag.appendChild(img);
		}
		pg.appendChild(frag);
	},
	paintWall:function(){//绘制墙中的所有方块
		var frag=document.createDocumentFragment();
		for(var r=this.RN-1;r>=0&&this.wall[r].join("")!="";r--){
			//无缝拼接后 不为空
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
				if(cell){
					var img=new Image();
					img.src=cell.src;//设置img的src为cell的src
					//设置img的top为OFFSET+cell的r*CSIZE
					img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
					//设置img的left为OFFSET+cell的c*CSIZE
					img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
					frag.appendChild(img);//将img追加到frag中
				}
			}
			
		}
		pg.appendChild(frag);
	},

	paintShape:function(){//绘制主角图形
		var frag=document.createDocumentFragment();//创建文档片段，保存在变量frag中
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
			img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
			frag.appendChild(img);
		}
		pg.appendChild(frag);
	},
}
window.onload=function(){
		tetris.start();
}