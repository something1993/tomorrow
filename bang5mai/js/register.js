$(function(){	
	$("form").children().focus(function(){
		$(this).addClass("active");
	})
	$("form").children().blur(function(){
		$(this).removeClass("active");
	})
	$(".txt1").focus(function(){
		$("#tel1").show();
	})	
		
	tel_phone();//输入手机号码
	img_code();//图片验证码
	pass_phone();//短信验证码
	passwords();//输入密码；
	pass_again();//确认密码
	
	var telFlag = false,imgFlag=false,passFlag=false,wordsFlag=false,againFlag=false;
		
	function tel_phone(){
		
		$(".txt1").blur(function(){
			var re=/134[0-8]\d{7}|1[34578][0-35-9]\d{8}/;				
			$("#tel1").hide();
			if(!re.test($(".txt1").val())){	
				telFlag = false;
				$("#tel2").show(0).delay(1500).hide(0);					
			}else {	
				telFlag = true;
			}
		});	
		return telFlag;
	}
	function img_code(){
		
		//图片验证码
		$(".btn1").val(getCode());//获取随机码
		$(".txt_change").click(function(){
			$(".btn1").val(getCode());
		});
		$(".txt2").focus(function(){
			$("#sec_code").show();
		});
		$(".txt2").blur(function(){
			$("#sec_code").hide();
			if($(".txt2").val().toLowerCase()!=$(".btn1").val().toLowerCase()){
				$("#sec_codef").show(0).delay(1500).hide(0);
				imgFlag = false;
			}else{
				$("#sec_code").hide();
				imgFlag = true;
			}
		})
		return imgFlag;
	}
	
	function pass_phone(){
		
		$(".phone").blur(function(){
			if($(".phone").val().length!=0){				
				passFlag = true;
			}else{				
				$("#tel_code").show(0).delay(1000).hide(0);
				passFlag = false;
			}
		})
		return passFlag;
	}
	
	function passwords(){
		$(".pwd1").focus(function(){
			$("#psw").show();
		});
		$(".pwd1").blur(function(){
			$("#psw").hide();
			var re=/^[a-zA-Z0-9]{6,15}?/;
			if(!re.test($(".pwd1").val())){
				$("#pswf").show(0).delay(1000).hide(0);
				wordsFlag = false;
			}else{wordsFlag = true;}
		})
		return wordsFlag;
	}
	
	function pass_again(){
		$(".pwd2").focus(function(){
			$("#conf").show();
		});
		$(".pwd2").blur(function(){
			$("#conf").hide();
			if($(".pwd2").val()!=$(".pwd1").val()){
				$("#confi").show(0).delay(1500).hide(0);
				againFlag = false;
			}else{againFlag = true;}		
		})
		return againFlag;
	}	
	function login(){
			
		if(telFlag&&imgFlag&&passFlag&&wordsFlag&&againFlag){
			addCookie("username",$(".txt1").val(),14);
			addCookie("passwords",$(".pwd1").val(),14);		
			window.location="login.html";	
			//alert("")
		}else{				
			return false;
		}	
	}
	$("#regbtn").click(function(){
		login();
	})
})
	
	

	
	
	
	
	
	
	
	

