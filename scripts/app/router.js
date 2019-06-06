define(function() {
	
	/**
	 * Init router, that handle page events
	 */
    function init() {
		$$(document).on('pageBeforeInit', function (e) {
		    var page = e.detail.page;
		    console.log(page.fromPage.name);
			load(page.name, page.query);
		});


    }

	/**
	 * Load (or reload) controller from js code (another controller) - call it's init function
	 * @param controllerName
	 * @param query
	 */
    function load(controllerName, query) {
        if(controllerName !=null)
            require(['scripts/app/controllers/' + controllerName + 'Controller'], function (controller) {
                controller.init(query);
		    });
	}

	return {
        init: init,
		load: load
    };
});