// JavaScript Document
function addEvent(obj, type, fn) { //添加事件兼容
if (obj.addEventListener) {
obj.addEventListener(type, fn);
} else if (obj.attachEvent) {
obj.attachEvent('on' + type, fn);
}
}
function removeEvent(obj, type, fn) { //移除事件兼容
if (obj.removeEventListener) {
obj.removeEventListener(type, fn);
} else if (obj.detachEvent) {
obj.detachEvent('on' + type, fn);
}
}
function getTarget(evt) { //得到事件目标
if (evt.target) {
return evt.target;
} else if (window.event.srcElement) {
return window.event.srcElement;
}
}

function setCookie(name,value,iDate){
	oDate=new Date();
	oDate.setDate(oDate.getDate()+iDate);
	document.cookie=name+'='+value+';expires='+oDate;
	
	
	}
function getCookie(name){
	arr=document.cookie.split('; ')
	for(i=0;i<arr.length;i++){
		arr2=arr[i].split('=')
		if(arr2[0]==name){
			return arr2[1]
			}
		}
	return '';
	}
	
	
function removeCookie(name){
     setCookie(name,'1',-1)	
	}
	
function getCode(){
	var arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
	var str = ''
	for(var i=0; i<5; i++){
		var iNum = parseInt(Math.random()*100);
						
			while(iNum>35){
				iNum = parseInt(Math.random()*100);
							
			}
						
		str += arr[iNum]
	}
					
return str.toUpperCase();
}	
	
