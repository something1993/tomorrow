//定义格子类型
function Cell(r,c){
	this.r=r;
	this.c=c;
	this.src="";
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){
//定义构造函数state接受八个参数
	this.r0=r0;
	this.c0=c0;
	this.r1=r1;
	this.c1=c1;
	this.r2=r2;
	this.c2=c2;
	this.r3=r3;
	this.c3=c3;
}

function Shape(src,cells,orgi,states){
	this.cells=cells;
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].src=src;
	}
	this.orgi=orgi;
	this.states=states;
	this.statei=0;
}

Shape.prototype.moveDown=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].r++;
	}
}
Shape.prototype.moveLeft=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c--;
	}
}
Shape.prototype.moveRight=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c++;
	}
}


Shape.prototype.IMGS={
	T:"img/T.png",
	O:"img/O.png",
	I:"img/I.png",
	J:"img/J.png",
	L:"img/L.png",
	S:"img/S.png",
	Z:"img/Z.png",
}//SHAPE原型中添加一个共有属性imgs

Shape.prototype.rotate=function(){
	var state=this.states[this.statei];
	var orgCell=this.cells[this.orgi];
	for(var i=0;i<this.cells.length;i++){
		if(i!=this.orgi){
			var cell=this.cells[i];
			cell.r=orgCell.r+state["r"+i];
			cell.c=orgCell.c+state["c"+i];
		}
	}
}
Shape.prototype.rotateR=function(){
	this.statei++;
	if(this.statei==this.states.length){this.statei=0;}
	this.rotate();
}

Shape.prototype.rotateL=function(){
	this.statei--;
	if(this.statei==-1){this.statei=this.states.length-1;}
	this.rotate();
}

function T(){
	Shape.call(this,this.IMGS.T,[new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,4)],1,
		[new State(0,-1,0,0,0,+1,+1,0),new State(-1,0,0,0,+1,0,0,-1),new State(0,+1,0,0,0,-1,-1,0),new State(+1,0,0,0,-1,0,0,+1)]);
}
Object.setPrototypeOf(T.prototype,Shape.prototype);//让t类型的原型继承shape类型的原型


function O(){
	Shape.call(this,this.IMGS.O,[new Cell(0,4),new Cell(0,5),new Cell(1,4),new Cell(1,5)],0,[new State(0,0,0,+1,+1,0,+1,+1)]);
}
Object.setPrototypeOf(O.prototype,Shape.prototype);

function I(){
	Shape.call(this,this.IMGS.I,[new Cell(0,4),new Cell(0,5),new Cell(0,6),new Cell(0,7)],1,
	[new State(0,-1,0,0,0,+1,0,+2),new State(-1,0,0,0,+1,0,+2,0)]);
}
Object.setPrototypeOf(I.prototype,Shape.prototype);

function S(){
	Shape.call(this,this.IMGS.S,[new Cell(0,4),new Cell(0,5),new Cell(1,3),new Cell(1,4)],3,
		[new State(-1,0,-1,+1,0,-1,0,0),new State(0,+1,+1,+1,-1,0,0,0)]);
}
Object.setPrototypeOf(S.prototype,Shape.prototype);
function Z(){
	Shape.call(this,this.IMGS.Z,[new Cell(0,3),new Cell(0,4),new Cell(1,4),new Cell(1,5)],2,
		[new State(-1,-1,-1,0,0,0,0,+1),new State(-1,+1,0,+1,0,0,+1,0)]);
}
Object.setPrototypeOf(Z.prototype,Shape.prototype);

function L(){
	Shape.call(this,this.IMGS.L,[new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,3)],1,
		[new State(0,-1,0,0,0,+1,+1,-1),new State(-1,0,0,0,+1,0,-1,-1),new State(0,+1,0,0,0,-1,-1,-1),new State(+1,0,0,0,-1,0,+1,+1)]);
}
Object.setPrototypeOf(L.prototype,Shape.prototype);

function J(){
	Shape.call(this,this.IMGS.J,[new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,5)],1,
		[new State(0,-1,0,0,0,+1,+1,+1),new State(-1,0,0,0,+1,0,+1,-1),new State(0,+1,0,0,0,-1,-1,-1),new State(+1,0,0,0,-1,0,-1,+1)]);
}
Object.setPrototypeOf(J.prototype,Shape.prototype);
