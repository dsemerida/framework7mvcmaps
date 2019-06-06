define(["handlebars"],function (handlebs) {

    /// renderiza un template de cualquier tipo al selector
    function renderTemplate(params) {
        var s = params.s, bf = params.bclear;
        var hbs = 'hbs!scripts/templates/' + params.t;
        handlebs.registerHelper('trimString', function(passedString,id,tipo) {
            if(passedString.length< 200)
                return new Handlebars.SafeString(passedString);
            var theString = passedString.substring(0,150);
            return new Handlebars.SafeString(theString+"<a href='pages/publicaciondetail.html?id="+id+"&tipo="+tipo+"&tipodoc=1'>...Ver más</a>");
        });

         handlebs.registerHelper('detailpubdoc', function(passedString) {
            if(passedString.length==0)
                return new Handlebars.SafeString(passedString);
            return new Handlebars.SafeString("<p style='padding:8px;'>"+passedString+"</p>");
        });
        
        require([hbs], function (t) {
            var j = params.j;
            if (bf) {
                $(s).empty();
                $$(s).html(t(j));
            }
            else
                $$(s).append(t(j));

            if (params.bindings)
                bindEvents(params.bindings);
        });

    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: renderTemplate
    };
})