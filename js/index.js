var fss;
$(function() {
	fss = new ddfullscreenslider({
		sliderid: 'dowebok',
		onslide: function($slide, index) {
			if(index==0){
				$(".about").fadeIn(1500);
			}else if(index==1){
				
				$(".skill_text").fadeIn("slow");
				$("#list1").animate({width:"90%"},2000);
				$("#list2").animate({width:"50%"},2000);
				$("#list3").animate({width:"30%"},2000);
				$("#list4").animate({width:"25%"},2000);
				$("#list5").animate({width:"20%"},2000);
			}else if(index==2){

				$(".work_list").fadeIn(1500);
			
			}

			else if(index==3){
				$(".Education").fadeIn(1500);
				$("#major2,#major3,#major4").mouseenter(function(){
					$(this).animate({top:"-10px"},500);
				});
				$("#major2,#major3,#major4").mouseleave(function(){
					$(this).animate({top:"0px"},200);
				});
			}else if(index==4){
				$(".reason").fadeIn(1500);
				$("#reason_tab_bar1").click(function(){
					$(".reason_tab_list1").show();
					$(".reason_tab_list2").hide();
					$("#reason_tab_bar1").css({"background-color":"#fff","color":"#993366"});
					$("#reason_tab_bar2").css({"background-color":"transparent","color":"#fff"});
					
				});

				$("#reason_tab_bar2").click(function(){
					$(".reason_tab_list2").show();
					$(".reason_tab_list1").hide();
					$("#reason_tab_bar2").css({"background-color":"#fff","color":"#993366"});
					$("#reason_tab_bar1").css({"background-color":"transparent","color":"#fff"});
				});
			
			}else if(index==5){
				$(".thank").fadeIn(1500);
			
			}

		}

	});
});
