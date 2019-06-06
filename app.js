var user={};
require.config({
    paths: {
        handlebars: "lib/handlebars",
        text: "lib/text",
        hbs: "lib/hbs",
        jquery:"lib/jquery-1.11.3.min"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app', ['scripts/router', 'scripts/utils',"scripts/templateController"], function(Router, utils,tmp) {
    Router.init();
    var f7 = new Framework7({
        modalTitle: 'CleanMyRide',
        material: true,
        animateNavBackIcon: true,
    });
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: false
    });
    function ui(options){

        var us=  jQuery.parseJSON(localStorage.getItem("context_cn"));
        $.ajax({
                method: "POST",
                url: urlServer + "profile/getus?g=" + us.Token,
                success: function (userserver) {
                    user=userserver;
                    //localStorage.setItem("context_cn",JSON.stringify(user));
                    //console.log("GET US SERVER "+JSON.stringify(user));
                    loaduicomponents(options);
                },
                error: function (error) {
                   
                }
        });
       
    }

    
    function loaduicomponents(options){
        if(!options)
            options={
                menuevents:[],
                j:{}
            };
        var clickpanic=0;
        $("#msgContent").hide();
        
    }



    var notificationShow=false;
    function notification(message)
    {
        if(notificationShow)
            return;
        notificationShow=true;
        //console.log("CALLED notification");
        f7.addNotification({
                    message: message,
                    button: { text: "No" },
                    hold: 4000
        });
        $(".modal-overlay").remove();
        setTimeout(function(){
            notificationShow=false;
        },4200);
        
    }


    return {
        notification:notification,
        f7: f7,
        mainView: mainView,
        router: Router,
        utils: utils,
        template:tmp,
        ui:ui
    };
});