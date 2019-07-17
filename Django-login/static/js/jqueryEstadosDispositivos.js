function handlerConectar(ipDispositivo, idDispositivo) {

    $.ajax({
          type : 'GET',
          url: "/dispositivos/probarConexion",
          data: {
                'ipDisp': ipDispositivo,
                'idDisp': idDispositivo
          },
          dataType: 'json',
          success: function (data) {
              var mensaje=""
              if(data.conecto == 1) {
                  mensaje = "Conexión satisfactoria con la IP: "+ipDispositivo
              }else if(data.conecto == 0) {
                  mensaje = "No se pudo hacer la conexión. Ir a inicializar"
              }
              var buscar= idDispositivo
              document.getElementById(''+buscar).innerHTML = mensaje;
          }
    });
}