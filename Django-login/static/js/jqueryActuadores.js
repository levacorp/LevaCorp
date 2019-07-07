function handlerActuador(element, ipDispositivo, idDispositivo) {

      var name = element.name;
      var option = "";
      if(element.checked) {
          element.checked = false;
            option= "on"
      }else if(!element.checked) {
          element.checked = true;
            option= "off"
      }
      html='<div id="cargando">cargando...</div>'
      document.getElementById("contenedor"+element.id).insertAdjacentHTML('afterend',html);
      $.ajax({
            type : 'GET',
            url: "/dispositivos/changeValue",
            data: {
                  'option': option,
                  'name': name,
                  'ip': ipDispositivo,
                  'id': idDispositivo
            },
            dataType: 'json',
            success: function (data) {
                  if(data.cambio == 1) {
                      if (element.checked) {
                          element.checked = false;
                          option = "on"
                      } else if (!element.checked) {
                          element.checked = true;
                          option = "off"
                      }
                  }
                      var a=document.getElementById("contenedor"+element.id);
      var cargando=document.getElementById("cargando");
      padre = cargando.parentNode;
      padre.removeChild(cargando);
            }
      });

}