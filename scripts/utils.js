define(["app"], function (app) {
    
    
    var emailVal = function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    var gb={
        mapStyle:mapStyle
    };

    
    function getDateString(date) {
        var day = date.getDate(), mont = date.getMonth() + 1, year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        mont = mont < 10 ? "0" + mont : mont;
        return day + "/" + mont + "/" + year;
    }

    function validLocalStorage(lstore) {
        var localStorage = lstore;
        var loged = true;
        if (!localStorage || localStorage == null)
            return  false;
        if (localStorage.length == 0) {
            return false;
        }
        return true;
    }


   
    function geocodeinverse(coord,sl)
    {
            var latlng=coord.lat+","+coord.lng;
            /*
            $.ajax({
                  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latlng+"&key=AIzaSyB1hLLMm3OomBW_GnRPSLaJP2XG_9mJXrs",
                  success: function(data){
                    console.log(JSON.stringify(data));
                    var direction=data.results[0].address_components;
                    var real=direction[1].short_name+" "+direction[0].short_name;
                    

                  },
                  dataType: "json"
            });*/

            // Latitude, longitude -> address
            plugin.google.maps.Geocoder.geocode({
              "position": coord
            }, function(results) {

              if (results.length === 0) {
                // Not found
                return;
              }

              var address = [
                results[0].thoroughfare || "",
                results[0].subThoroughfare || "",
                results[0].locality || ""].join(", ");
                $(sl).val(address);
              
            });
    }

    function showmodal(sl,options){
        app.f7.popup(sl);
        $(".popup-overlay").remove();
    }
    
     function roundTo(n, digits) {
        if (digits === undefined) {
            digits = 0;
        }

        var multiplicator = Math.pow(10, digits);
        n = parseFloat((n * multiplicator).toFixed(11));
            return (Math.round(n) / multiplicator).toFixed(2);
    }

    function getDistance(lat1,lon1,lat2,lon2) {
      var R = 6371,dLat = deg2rad(lat2-lat1),dLon=deg2rad(lon2-lon1),a=0,c=0,d=0; // Radius of the earth in km
      a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      d =(R * c)+.2; // Distance in km
      return toFixed(d,2);
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    function toFixed(num, fixed) {
        var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
        return num.toString().match(re)[0];
    }

    //markers on the map
    function addMarkerroute(map,viaje,icon){
            
            // poolini and poolfin define from apart trip
            var locfrom = new plugin.google.maps.LatLng(viaje.poolIni.split(",")[0], viaje.poolIni.split(",")[1]);
            var locto = new plugin.google.maps.LatLng(viaje.poolFin.split(",")[0], viaje.poolFin.split(",")[1]);
            map.addMarker({
              position: locfrom,
              'title': viaje.geocodeini,
              'icon':{
                      url: 'img/'+icon+'.png',
                      size: { width: 11, height: 18 }
                    }
            }, function(marker1) {
                
                markerfrom=marker1;
                markerfrom.showInfoWindow();
                //executegps();
            });
            
            map.addMarker({
              position: locto,
              'title': viaje.geocodefin,
              'icon':{
                      url: 'img/final.png',
                      size: { width: 11, height: 18 }
                    }
            }, function(marker2) {
                markerfin=marker2;
                //markerto=marker;
                //executegps();
                setTimeout(function(){
                markerfin.showInfoWindow();

                },300);
            });
            
        
    }

    

    function isnothing(obj) {
        if (obj === null)
            return true;
        else if (obj === undefined)
            return true;
        else
            return false;
    }

    function getproduct(id){
        if(!validLocalStorage(localStorage.getItem("carcleanbuy")))
             return undefined;
        var cars=jQuery.parseJSON(localStorage.getItem('carcleanbuy'));
        if(cars==null)
        {
            cars=[];
            localStorage.setItem('carcleanbuy',JSON.stringify(cars))
        }
        for(var f=0;f< cars.length;f++)
        {
            if(cars[f].IdTipoServicio==id)
            {
               return {
                    obj:cars[f],
                    index:f
               };
            }
        }
        return undefined;
    }

    function addItemToCar(id,name,precio)
    {
        var cars=[];
        if(validLocalStorage(localStorage.getItem("carcleanbuy")))
            cars=jQuery.parseJSON(localStorage.getItem('carcleanbuy'));
        var ipro=getproduct(id);
        if(!ipro)
        {
            cars.push({
                IdSevicio:0,
                IdTipoServicio:id,
                Nombre:name,
                Precio:precio,
                Cantidad:1
            });
        }
        else
        {
            cars[ipro.index].Cantidad++;
        }
        localStorage.setItem("carcleanbuy",JSON.stringify(cars));
        loadBadgeCar();

    }

    function removeCar(id)
    {
        var exito=false;
        var carsrest=[];
        var prods=[];
        var cars=jQuery.parseJSON(localStorage.getItem('carcleanbuy'));
        for(var i=0;i<cars.length;i++)
        {
       
            if(cars[i].IdTipoServicio==id)
            {
                if(cars[i].Cantidad > 1)
                {
                    exito=true;
                    cars[i].Cantidad--;
                }
            }
            
        }
        localStorage.setItem('carcleanbuy',JSON.stringify(cars))
        loadBadgeCar();
        return exito;
    }


    function loadBadgeCar()
    {
        var $carempty=$(".carempty");
        var $carsome=$(".carsome");
        if(!validLocalStorage(localStorage.getItem("carcleanbuy")))
        {
            $carsome.hide();
            $carempty.show();
        }
        else
        {
            var quantitytotal=0;
            var cars=jQuery.parseJSON(localStorage.getItem('carcleanbuy'));
            if(cars.length ==0)
            {
                $carsome.hide();
                $carempty.show();
                return;
            }
            for(var i=0;i<cars.length;i++)
            {
                var item=cars[i];
                quantitytotal+=item.Cantidad;
            }
                $carsome.show();
                $carempty.hide();
                //var $i=$(".carsome i");
                $carsome.attr("data-count",quantitytotal);

        }
    }

    function forceTouch(){
        
        try {
          cordova.fireDocumentEvent('plugin_touch', {});
        }
        catch(error) {
          console.error(error);
          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }
    }

    function phonenumber(inputtxt)
    {
      var phoneno = /^\d{10}$/;
      if(inputtxt.match(phoneno))
      {
          return true;
      }
      else
      {
         return false;
      }
    }
    return {
        phonenumber:phonenumber,
        gb:gb,
        roundTo:roundTo,
        showmodal:showmodal,
        geocodeinverse:geocodeinverse,
        validContext:validLocalStorage,
        getDistance:getDistance,
        addMarkerroute:addMarkerroute,
        validateEmail:emailVal,
        isnothing:isnothing,
        addItemToCar:addItemToCar,
        loadBadgeCar:loadBadgeCar,
        removeCar:removeCar,
        forceTouch:forceTouch
    };


});

function passwordChanged(input, msg) {
var strength = document.getElementById(msg);
var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
var enoughRegex = new RegExp("(?=.{6,}).*", "g");
var pwd = document.getElementById(input);
if (pwd.value.length==0) {
    strength.innerHTML = "";
    } else if (false == enoughRegex.test(pwd.value)) {
    strength.innerHTML = "Pocos Caracteres";
    } else if (strongRegex.test(pwd.value)) {
    strength.innerHTML = "<span style='color:green'>Contraseña Fuerte</span>";
    } else if (mediumRegex.test(pwd.value)) {
    strength.innerHTML = "<span style='color:orange'>Contraseña Media</span>";
    } else {
    strength.innerHTML = "<span style='color:red'>Contraseña Débil</span>";
    }
}

function clearValue(nCampo, nLabel){
    $("#" + nCampo).val("");
};

function shakeIt(control1, msgError) {
      
  var label = document.getElementById(control1);

  $(label).empty();
  $(label).show();
  $(label).addClass('shake');
  $(label).append('<i class="f7-icons" style="font-size: 12px">info_round</i>');
  $(label).append('<span>&nbsp' + msgError + '</span>');

};

function creaCodigo(){
    var num = Math.floor(Math.random() * 900000) + 100000;
    return num;
}