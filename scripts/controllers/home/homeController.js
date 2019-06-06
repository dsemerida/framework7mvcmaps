	
define(["scripts/utils","app","jquery"],function (utils) {
	//# variables iniciales

	
	function init() 
	{
		  
		regUi.init();
		//localStorage.setItem("context_cn","");
	}

	


	function eventListener()
	{
		
       	$(".btnrecovery").on("click",recovery);
	       	

	}

	return {
		init:init
	};
	

});