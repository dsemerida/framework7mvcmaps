define(["scripts/utils","app"],function (utils,app) 
{

	function init(query)
	{
		var div = document.getElementById("map_canvas");

	      // Create a Google Maps native view under the map_canvas div.
	      var map = plugin.google.maps.Map.getMap(div);
	}

	



	return {
		init:init
	}
});