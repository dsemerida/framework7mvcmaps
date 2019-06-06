define(["app"], function(app) {

	

	function init(query){
					$(".page-on-left").remove();

				// Define a div tag with id="map_canvas"
				  var mapDiv = document.getElementById("googlemaps_cliente");

				  // Initialize the map plugin
				  var map = plugin.google.maps.Map.getMap(mapDiv);
	}

		
	
	return {
		init: init
	};
});