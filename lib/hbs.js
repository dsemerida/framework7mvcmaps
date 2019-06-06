define(["handlebars"], function (Handlebars) {
  Handlebars = Handlebars || this.Handlebars;
  var templateExtension = ".hbs";

/*determina el label del status del servicio en cliente*/
Handlebars.registerHelper("statusserviceclient", function(status, options) {
      var template="";
      if(status ==0)
          template ="Cola de espera";
      if(status ==1)
          template ="Solicitado";
      else if(status==2)
          template ="Confirmado";
      else if(status==3)
          template ="Confirmado";
      else if(status==4)
          template ="Iniciado";
          else if(status==5)
          template ="Terminado";
      return new Handlebars.SafeString(template);
  });

/*muestra los botones del servicio en cleaners*/
Handlebars.registerHelper("buttoncleaners", function(status, options) {
      var template="";
      var cancel="<a class='btncancel' style='width: 50%; margin: 0 auto; display: table-cell;'><div style='display: flex;'><div style='margin: 0 auto; text-align: center; border-radius: 35px; background: red; color: #fff;'><div style='padding: 10px; padding-left: 40px; padding-right: 40px;'>Cancelar</div></div></div></a>"
      //#0090C6
      //"<a style='width: 47%;float: left;margin-right: 20px' href='#' class='button button-fill  btncancel back-red marg-top-20'>Cancelar</a>";
       if(status ==2)
          template ="<a class='btncancel' style='width: 50%; margin: 0 auto; display: table-cell;'><div style='display: flex;'><div style='margin: 0 auto; text-align: center; border-radius: 35px; background: red; color: #fff;'><div style='padding: 10px; padding-left: 40px; padding-right: 40px;'>Cancelar</div></div></div></a>"
        //"<a style='width:100%;float: left;margin-right: 20px' href='#' class='button button-fill  btncancel back-red marg-top-20'>Cancelar</a>";
      else if(status ==3)
          template =cancel+"<a class='btniniciar' style='width: 50%; margin: 0 auto; display: table-cell;'><div style='display: flex;'><div style='margin: 0 auto; text-align: center; border-radius: 35px; background: #0090C6; color: #fff;'><div style='padding: 10px; padding-left: 50px; padding-right: 50px;'>Iniciar</div></div></div></a>"
        //"<a style='width: 46%' href='#' class='button button-fill  btniniciar marg-top-20'>Iniciar</a>";
      else if(status==4)
          template="<a class='btnterminar' style='width: 50%; margin: 0 auto; display: table-cell;'><div style='display: flex;'><div style='margin: 0 auto; text-align: center; border-radius: 35px; background: #0090C6; color: #fff;'><div style='padding: 10px; padding-left: 50px; padding-right: 50px;'>Terminar</div></div></div></a>"
        //"<a style='width: 100%' href='#' class='button button-fill  btnterminar marg-top-20'>Terminar</a>";
    
      return new Handlebars.SafeString(template);
  });

/*indica si la confirmacion puede verse en cliente*/
Handlebars.registerHelper('ifshowconfirmation', function(status,leido, options) {
  if(status >1 && leido) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/*indica si el boton de cancelar servicio es visible en cliente*/
Handlebars.registerHelper('btncancelclienteshow', function(status, options) {
  if(status < 4) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

/*indica si un servicio es solicitado*/
Handlebars.registerHelper('ifrequestservice', function(status,name,leido, opts) {
  if(status > 1 && leido)
      return new Handlebars.SafeString("<h3 class='margin-0'>"+name+"</h3>");
  else
    return new Handlebars.SafeString("")
});


/* importe*/
Handlebars.registerHelper("importe_service", function(importe,cantidad, options) {
      var total=0;
      total=importe*cantidad;
      return new Handlebars.SafeString(total);
  });

/*costo total de los elementos del carrito*/
Handlebars.registerHelper("totalservices", function(detalles, options) {
      var total=0;
      for(var i=0;i < detalles.length;i++)
      {
         var detalle=detalles[i];
         total+=(detalle.Cantidad*detalle.TipoServicio.Precio.Valor);
      }
      return new Handlebars.SafeString(total);
  });

/*HISTORICOS*/
Handlebars.registerHelper("img_historicocliente", function(img, options) {
    var urlimg="";
    if(img ==null || img.length==0)
        urlimg="img/perfile2.png";
      else
        urlimg=urlthings+"uses/"+img;
    return new Handlebars.SafeString(urlimg);
  });
/*END HISTORICOS*/


/*Muestra la imagen del tipo de tarjeta segun sea el caso*/
Handlebars.registerHelper("img_tipotarjeta", function(tipo, options) {
    var urlimg="";
    switch (tipo) {
        case 'VISA':
          urlimg="img/visa.png";
          break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
        case 'MASTERCARD':  
          urlimg="img/mastercard.png";
          break;
        default:
          urlimg="img/visa.png";
      }
    return new Handlebars.SafeString(urlimg);
  });


  /*Muestra el tipo de pago*/
Handlebars.registerHelper("formapago", function(tipo, options) {
  var texto="";
  switch (tipo) {
      case 1:
        texto="Tarjeta";
        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
      case 2:  
        texto="Efectivo";
        break;
      default:
        texto="Efectivo";
    }
  return new Handlebars.SafeString(texto);
});
 

  return {

    pluginBuilder: "./hbs-builder",

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Get the template extension.
      var ext = (config.hbs && config.hbs.templateExtension ? config.hbs.templateExtension : templateExtension);

      // In browsers use the text-plugin to the load template. This way we
      // don't have to deal with ajax stuff
      parentRequire(["text!" + name + ext], function (raw) {
        // Just return the compiled template
        onload(Handlebars.compile(raw));
      });

    }

  };
});
