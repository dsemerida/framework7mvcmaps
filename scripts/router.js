var $$ = Framework7.$;
    
    define(function(){
        /**
    * Init router, that handle page events
    */
    function init() {

        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            if (page.name == null)
                return;
            if (page.name == "panel-left")
            {
                return;
            }
            if (page.name == "noticias")
            {
                noticiascontroller.init(page.query);
                return;
            }
            if (page.name == "viewerpdf")
            {
                viewerpdfcontroller.init(page.query);
                return;
            }
             if (page.name == "vision")
            {
                visioncontroller.init(page.query);
                return;
            }
             
            
            load(page.name, page.query);
        });


        

    }

    /**
    * Load (or reload) controller from js code (another controller) - call it's init function
    * @param controllerName
    * @param query
    */
    function load(controllerName, query) {
        require(['scripts/controllers/' + controllerName + '/' + controllerName + 'Controller'], function (controller) {
            
            controller.init(query);
        });
    }

    return  {
        init: init,
        load: load
    };
});
    
