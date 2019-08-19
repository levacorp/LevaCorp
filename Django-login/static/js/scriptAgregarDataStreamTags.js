//Se encargara de modificar los id de los dataStreams y tags dinamicamente

var cantidadTags = 0; //cantidad de tags del dispositivo
var cantidadDataStreams=0; // cantidad de dataStreams del dispositivo
var listaCantTagsDataStream=[0];//Se inicializa la cantidad de tags en 0 para el dataStream0 ya que este debe estar de forma obligatoria

//Cambiara los id de los tags al cargarlos del indice semanticos 
function cambiarIdsTags(){
    var contadorEspañol = 1;
    var contadorIngles = 1;
     //Cambiara todos los id de los tags obtenidos
    while(true){
        //Busca el elemento que contiene la informacion de los tag
        if(document.getElementById("formTag")){
            elemento = document.getElementById("formTag");         //Busca el contenedor de los tags
            elemento.id = "formTag" + contadorEspañol;       //cambia el id del contenedor de los tag al siguiente
            elemento = document.getElementById("inputTagEspañol"); //busca el tag español actual
            elemento.id = "inputTagEspañol" + contadorEspañol;   //Cambia el id al tagSiguiente
            elemento.name = "tagEspañol" + contadorEspañol;     //Cambia el nombre al tagSiguiente
            elemento = document.getElementById("inputTagIngles"); //busca el tag ingles actual
            elemento.id = "inputTagIngles" + contadorIngles;    //cambia el id al tagSiguiente
            elemento.name = "tagIngles" + contadorIngles;       //cambia el nombre del tagSiguiente
            botonEliminar = document.getElementById("eliminarTag");  //busca el boton eliminar del tag actual
            botonEliminar.id = ""+contadorEspañol;              //cambia el id del boton eliinar al tagSiguiente
            contadorEspañol++;
            contadorIngles++;
            cantidadTags++;
        }
        else{
            break;
        }
    }
}
//Cambiara los id de los dataStreams al cargarlos del indice semanticos 
function cambiarIdsDataSreams()
{
    var contDataStream = 0;
    //Cambiara todos los id de los tags obtenidos
    while(true){  
        if(document.getElementById("dataStream00")){
            //cambia el id de el contenedor de la informacion del dataStream
            elemento = document.getElementById("dataStream00");
            elemento.id = "dataStream" + contDataStream;
            //cambia el id de el titulo del datastream
            h2=document.getElementById("dataStreamH200");
            h2.id = "dataStreamH2" + contDataStream;
            //cambia el id y el nombre de el nombre del dataStream
            inputNombre=document.getElementById("inputNombre00")
            inputNombre.id = "inputNombre" + contDataStream;
            inputNombre.name = "inputNombre" + contDataStream;
            //cambia el id y el nombre de el dataStreamFormat del dataStream
            selectDataStreamFormat=document.getElementById("selectDataStreamFormat00");
            selectDataStreamFormat.id = "selectDataStreamFormat" + contDataStream;
            selectDataStreamFormat.name = "selectDataStreamFormat" + contDataStream;
            //cambia el id y el nombre de el valorMaximo del dataStream
            inpuValorMaximo=document.getElementById("inputValorMaximo00")
            inpuValorMaximo.id = "inputValorMaximo" + contDataStream;
            inpuValorMaximo.name = "inputValorMaximo" + contDataStream;
            //cambia el id y el nombre de el valor minimo del dataStream
            inpuValorMinimo=document.getElementById("inputValorMinimo00")
            inpuValorMinimo.id = "inputValorMinimo" + contDataStream;
            inpuValorMinimo.name = "inputValorMinimo" + contDataStream;
            //cambia el id y el nombre de el simbolo del dataStream
            inputSimbolo=document.getElementById("inputSimbolo00")
            inputSimbolo.id = "inputSimbolo" + contDataStream;
            inputSimbolo.name = "inputSimbolo" + contDataStream;
            //cambia el id y el nombre de la etiqueta del dataStream
            inputEtiqueta=document.getElementById("inputEtiqueta00")
            inputEtiqueta.id = "inputEtiqueta" + contDataStream;
            inputEtiqueta.name = "inputEtiqueta" + contDataStream;
            //cambia el id y el nombre de el tipo del dataStream
            inputTipo=document.getElementById("inputTipo00")
            inputTipo.id = "inputTipo" + contDataStream;
            inputTipo.name = "inputTipo" + contDataStream;
            //cambia el id del contenedor de los tags del dataStream
            tagsDataStream=document.getElementById("tagsDataStream00");
            tagsDataStream.id = "tagsDataStream" + contDataStream;
            //cambia el id del boton de agregar tag del dataStream actual
            buttonAgregarTagDataStream=document.getElementById("buttonAgregarTagDataStream00");
            buttonAgregarTagDataStream.id = "buttonAgregarTagDataStream" + contDataStream;
            //cambia el id del input del tag en español del dataStream actual
            inputTagDataStreamEspanol=document.getElementById("inputTagDataStreamEspanol00");
            inputTagDataStreamEspanol.id="inputTagDataStreamEspanol"+contDataStream;
            //cambia el id del input del tag en ingles del dataStream actual
            inputTagDataStreamIngles=document.getElementById("inputTagDataStreamIngles00");
            inputTagDataStreamIngles.id="inputTagDataStreamIngles"+contDataStream;
            //cambia el id del input del boton eleminar del tag actual en el dataStream actual
            buttonEliminardataStream=document.getElementById('buttonEliminardataStream00');
            buttonEliminardataStream.id="buttonEliminardataStream"+contDataStream;

            var contTags=1;
            // cambiar los id de los tags del datastreamActual
            while(true)
            {   //Mientras existan tags sin modificar
                if(document.getElementById("Tag0DataStream00")){
                    //Se verifica que el tag actual sea hijo del contenedor de los tags actual del datastream ctual
                if(document.getElementById("Tag0DataStream00").parentElement===document.getElementById("tagsDataStream"+contDataStream))
                    {
                       //Se cambia el id del contenedor del tagAcutal
                       TagnDataStreamN=document.getElementById("Tag0DataStream00");
                       TagnDataStreamN.id="Tag"+contTags+"DataStream"+contDataStream;
                       //Se cambia el id del boton de agregar del tagAcutal
                       buttonTagNDataStreamN=document.getElementById("buttonTag0DataStream00");
                       buttonTagNDataStreamN.id="buttonTag"+contTags+"DataStream"+contDataStream;
                       //Se cambia el id y el nombre del inputEspañolTag del tagAcutal 
                       inputEspanolTagNDataStreamN=document.getElementById("inputEspanolTag0DataStream00");
                       inputEspanolTagNDataStreamN.name="inputEspanolTag"+contTags+"DataStream"+contDataStream;
                       inputEspanolTagNDataStreamN.id="inputEspanolTag"+contTags+"DataStream"+contDataStream;
                       //Se cambia el id y el nombre del inputEspañolIngles del tagAcutal 
                       inputInglesTagNDataStreamN=document.getElementById("inputInglesTag0DataStream00");
                       inputInglesTagNDataStreamN.name="inputInglesTag"+contTags+"DataStream"+contDataStream;
                       inputInglesTagNDataStreamN.id="inputInglesTag"+contTags+"DataStream"+contDataStream;
                       contTags++;
                    }
                    else{
                        break;
                    }
                }
                else{break;}
            }
            // si solo hay un dataStream se cambia la cantidad de tags previamente inicializada
            if(contDataStream==0){
                listaCantTagsDataStream[0]=contTags-1;
            }
            else{
                //Se inserta la cantidad de tags para el siguiente dataStream
                listaCantTagsDataStream.push(contTags-1);
            }
            contDataStream++;
        }
        else{
            break;
        }
    }
    if(contDataStream!=0)
        {
            cantidadDataStreams=contDataStream-1;
        }
}
//Agrega un tag Dinamicamente
function agregartag() {
    cantidadTags++;
    // obtiene el contenedor de los tags
    var tags = document.getElementById("tags");
    //obtiene el valor de los inputs ingresados
    var valueInputEspanol = document.getElementById("tagEspañol").value;
    var valueInputIngles = document.getElementById("tagIngles").value;
    // reinicia los inputs
    document.getElementById("tagEspañol").value = "";
    document.getElementById("tagIngles").value = "";
    //crea el html para añadir un nuevo tag
    var htmlForm = '<div class="form-row" id="formTag' + cantidadTags + '"><div class="col col-6 col-md-3"><div class="row col-md-4 mb-3"><button id="' + cantidadTags + '" type="button" onclick="eliminarTag(this)" class="rounded-circle btn btn-outline-danger">-</button></div></div>'
    var htmlTagEspañol = '<div class="col col-12 col-md-8"><div class="row"><div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputEspanol' + cantidadTags + '"name="tagEspanol' + cantidadTags + '" placeholder="Español" value="' + valueInputEspanol + '" required></div>';
    var htmlTagIngles = '<div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputIngles' + cantidadTags + '" name="tagIngles' + cantidadTags + '" placeholder="English" value="' + valueInputIngles + '" required> </div></div></div></div>'
    html = htmlForm + htmlTagEspañol + htmlTagIngles;
    //Inserta al final del contenedor el nuevo html para la creacion del tag
    tags.insertAdjacentHTML('beforeend', html);
}
//Eliminar un tag dinamicamente
function eliminarTag(comp) {
    // obtiene el id del boton seleccionado
    var id = comp.id;
    id = id.replace(/ /g, "");
    //obtiene el id del contenedor de los tags
    var node = document.getElementById("formTag" + id);
    //se elimina el tag
    node.parentNode.removeChild(node);
    cantidadTags--;
    idActual = parseInt(id, 8);
    // cambia el id de los tagSiguientes
    for (idActual; idActual <= cantidadTags; idActual++) {
        // cambia el id del contenedor del tag actual al contenedor siguiente
        tagSig = document.getElementById("formTag" + (idActual + 1));
        tagSig.id = "formTag" + idActual;
        // cambia el id del  boton agregar del tag actual al tag siguiente
        bottonSig = document.getElementById("" + (idActual + 1));
        bottonSig.id = idActual;
        // cambia el id y el nombre del inputEspañol del tag actual al tag siguiente
        inputEspanolSig = document.getElementById("inputEspanol" + (idActual + 1));
        inputEspanolSig.setAttribute("name", ("tagEspanol" + idActual));
        inputEspanolSig.id = "inputEspanol" + idActual;
        // cambia el id y el nombre del inputIngles del tag actual al tag siguiente
        inputInglesSig = document.getElementById("inputIngles" + (idActual + 1));
        inputInglesSig.setAttribute("name", ("tagIngles" + idActual));
        inputInglesSig.id = "inputIngles" + idActual;
    }
}
//agrega un datastream dinamicamente
function agregarDataStream()
{
    //obtiene el elemento que contiene los dataStreams
    var dataStreams = document.getElementById("dataStreams");
    cantidadDataStreams++;
    //crea el html del dataStream
    nombre='<div class="div-principal" id="dataStream'+cantidadDataStreams+'"><h2 id="dataStreamH2'+cantidadDataStreams+'">Nuevo datastream</h2><div class="form-row"><div class="col-md-7 mb-3"><label><strong>Nombre</strong></label><input type="text" class="form-control inputs" name="inputNombre'+cantidadDataStreams+'"id="inputNombre'+cantidadDataStreams+'" onchange="changeNameDataStream(this);" placeholder="Nombre"required></div>'
    dataStreamFormat='<div class="col-md-5 mb-3"><label><strong>Datastream format</strong></label><select class="form-control" name="selectDataStreamFormat'+cantidadDataStreams+'" id="selectDataStreamFormat'+cantidadDataStreams+'"><option>None</option><option>int</option><option>float</option><option>string</option><option>char</option><option>bool</option><option>boolean</option><option>serializable</option></select></div></div>'
    valorMaximo='<div class="form-row"><div class="col-md-4 mb-3"><label><strong>Valor maximo</strong></label><input type="text" class="form-control inputs" name="inputValorMaximo'+cantidadDataStreams+'"id="inputValorMaximo'+cantidadDataStreams+'" placeholder="Valor Maximo"required></div>'
    valorMinimo='<div class="col-md-4 mb-3"><label><strong>Valor minimo</strong></label><input type="text" class="form-control inputs" name="inputValorMinimo'+cantidadDataStreams+'"id="inputValorMinimo'+cantidadDataStreams+'" placeholder="Valor Minimo"required></div></div>'
    unidades='<div class="form-row"><div class="col col-6 col-md-3"><label><strong>Unidad</strong></label></div></div><div class="form-row"><div class="col-md-4 mb-3"><input type="text" class="form-control inputs" name="inputSimbolo'+cantidadDataStreams+'"id="inputSimbolo'+cantidadDataStreams+'" placeholder="Símbolo"></div><div class="col-md-4 mb-3"><input type="text" class="form-control inputs" name="inputEtiqueta'+cantidadDataStreams+'" id="inputEtiqueta'+cantidadDataStreams+'" placeholder="Etiqueta"></div><div class="col-md-4 mb-3"><input type="text" class="form-control inputs" name="inputTipo'+cantidadDataStreams+'"id="inputTipo'+cantidadDataStreams+'" placeholder="Tipo"></div></div>'
    tagsDataStream='<div class="form-row"><div class="container border rounded-lg" id="tagsDataStream'+cantidadDataStreams+'"><div class="row"><div class="col-md-4 mb-3"><label><strong>Añadir</strong></label></div></div><div class="row"><div class="col col-6 col-md-1"><div class="row col-md-4 mb-3"><button type="button" id="buttonAgregarTagDataStream'+cantidadDataStreams+'" onclick="agregarTagDataStream(this)"class="rounded-circle btn btn-outline-success">+</button></div></div><div class="col col-12 col-md-8"><div class="row"><div class="col-md-6 mb-3"><input type="text" class="form-control inputs"id="inputTagDataStreamEspanol'+cantidadDataStreams+'" name="inputTagDataStreamEspanol'+cantidadDataStreams+'" placeholder="Español"></div><div class="col-md-6 mb-3"><input type="text" class="form-control inputs"id="inputTagDataStreamIngles'+cantidadDataStreams+'" name="inputTagDataStreamIngles'+cantidadDataStreams+'"placeholder="English"></div></div></div></div></div></div>'
    opcionDataStream='<div class="container p-3"><div class="row"><div class="col col-6"><button id="buttonEliminardataStream'+cantidadDataStreams+'"onclick="EliminarDataStream(this)" type="button" class="btn btn-outline-secondary">Eliminar datastream</button></div><button onclick="agregarDataStream()" type="button" class="btn btn-outline-secondary">Añadir otro datastream</button></div></div></div>'
    html=nombre+dataStreamFormat+valorMaximo+valorMinimo+unidades+tagsDataStream+opcionDataStream;
    // instar el html del nuevoDataStream al final de el contenedor de los dataStream
    dataStreams.insertAdjacentHTML('beforeend',html);
    //inicializa la cantidad de tags en 0 a la lista de la cantidad de tags del dataStream
    listaCantTagsDataStream.push(0);
}
// elimina un dataStream dinamicamente
function EliminarDataStream(comp)
{
    //obtiene el id del boton eliminar seleccionado
    var id = comp.id;
    id=id.replace(/ |buttonEliminar/g, "");
    //obtiene el contenedor de los dataStream
    var node = document.getElementById(id);
    //elimina el dataStream del contenedor
    node.parentNode.removeChild(node);
    id=id.replace(/ |dataStream/g, "");
    var idDataStreamActual=parseInt(id,10);
    cantidadDataStreams--;
    //elimna la cantidad de tags del dataStream de la lista
    listaCantTagsDataStream.splice(idDataStreamActual,1);
    // cambiara el id de todos los dataStream
    for(idDataStreamActual;idDataStreamActual<=cantidadDataStreams;idDataStreamActual++)
    {
        // cambia el id del contenedor del dataStream al contenedor Siguiente
        dataStreamSiguiente=document.getElementById("dataStream"+(idDataStreamActual+1));
        dataStreamSiguiente.id="dataStream"+idDataStreamActual;
        // cambia el id del titulo del dataStream al titulo Siguiente
        dataStreamSiguiente=document.getElementById("dataStreamH2"+(idDataStreamActual+1));
        dataStreamSiguiente.id="dataStreamH2"+idDataStreamActual;
        // cambia el id y el nombre del nombre del dataStream al nombre Siguiente
        inputNombreSiguiente=document.getElementById("inputNombre"+(idDataStreamActual+1));
        inputNombreSiguiente.setAttribute("name",("inputNombre"+idDataStreamActual));
        inputNombreSiguiente.id="inputNombre"+idDataStreamActual;
        // cambia el id y el nombre del dataStreamFormat del dataStream al dataStreamFormat Siguiente
        selectDataStreamFormatSiguiente=document.getElementById("selectDataStreamFormat"+(idDataStreamActual+1));
        selectDataStreamFormatSiguiente.setAttribute("name",("selectDataStreamFormat"+idDataStreamActual));
        selectDataStreamFormatSiguiente.id="selectDataStreamFormat"+idDataStreamActual;
        // cambia el id y el nombre del valorMaximo del dataStream al valorMaximo Siguiente
        inputValorMaximoSiguiente=document.getElementById("inputValorMaximo"+(idDataStreamActual+1));
        inputValorMaximoSiguiente.setAttribute("name",("inputValorMaximo"+idDataStreamActual));
        inputValorMaximoSiguiente.id="inputValorMaximo"+idDataStreamActual;
        // cambia el id y el nombre del valor minimo del dataStream al valor minimo Siguiente
        inputValorMinimoSiguiente=document.getElementById("inputValorMinimo"+(idDataStreamActual+1));
        inputValorMinimoSiguiente.setAttribute("name",("inputValorMinimo"+idDataStreamActual));
        inputValorMinimoSiguiente.id="inputValorMinimo"+idDataStreamActual;
        // cambia el id y el nombre del simbolo del dataStream al simbolo Siguiente
        inputSimboloSiguiente=document.getElementById("inputSimbolo"+(idDataStreamActual+1));
        inputSimboloSiguiente.setAttribute("name",("inputSimbolo"+idDataStreamActual));
        inputSimboloSiguiente.id="inputSimbolo"+idDataStreamActual;
        // cambia el id y el nombre de la etiqueta del dataStream a la etiqueta Siguiente
        inputEtiquetaSiguiente=document.getElementById("inputEtiqueta"+(idDataStreamActual+1));
        inputEtiquetaSiguiente.setAttribute("name",("inputEtiqueta"+idDataStreamActual));
        inputEtiquetaSiguiente.id="inputEtiqueta"+idDataStreamActual;
        // cambia el id y el nombre del tipo del dataStream al tipo Siguiente
        inputTipoSiguiente=document.getElementById("inputTipo"+(idDataStreamActual+1));
        inputTipoSiguiente.setAttribute("name",("inputTipo"+idDataStreamActual));
        inputTipoSiguiente.id="inputTipo"+idDataStreamActual;
        // cambia el id y el nombre del boton eliminar dataStream del dataStream al boton Siguiente
        buttonEliminardataStreamSiguiente=document.getElementById("buttonEliminardataStream"+(idDataStreamActual+1));
        buttonEliminardataStreamSiguiente.setAttribute("name",("buttonEliminardataStream"+idDataStreamActual));
        buttonEliminardataStreamSiguiente.id="buttonEliminardataStream"+idDataStreamActual;
        // cambia el id del contenedor de los tags del datastream al contenedor siguiente
        contenedorTagsDataStreamSiguiente=document.getElementById("tagsDataStream"+(idDataStreamActual+1));
        contenedorTagsDataStreamSiguiente.id="tagsDataStream"+idDataStreamActual;
        // cambia el id del boton agregar tag del dataStream al boton siguiente
        buttonAgregarTagDataStreamSiguiente=document.getElementById("buttonAgregarTagDataStream"+(idDataStreamActual+1));
        buttonAgregarTagDataStreamSiguiente.setAttribute("name",("buttonAgregarTagDataStream"+idDataStreamActual));
        buttonAgregarTagDataStreamSiguiente.id="buttonAgregarTagDataStream"+idDataStreamActual;
        // cambia el id del inputEspañol del tag del dataStream al inputEspañol siguiente
        inputTagDataStreamEspanolSiguiente=document.getElementById("inputTagDataStreamEspanol"+(idDataStreamActual+1));
        inputTagDataStreamEspanolSiguiente.setAttribute("name",("inputTagDataStreamEspanol"+idDataStreamActual));
        inputTagDataStreamEspanolSiguiente.id="inputTagDataStreamEspanol"+idDataStreamActual;
        // cambia el id del inputIngles del tag del dataStream al inputIngles siguiente
        inputTagDataStreamInglesSiguiente=document.getElementById("inputTagDataStreamIngles"+(idDataStreamActual+1));
        inputTagDataStreamInglesSiguiente.setAttribute("name",("inputTagDataStreamIngles"+idDataStreamActual));
        inputTagDataStreamInglesSiguiente.id="inputTagDataStreamIngles"+idDataStreamActual;
        //cambia el id de todos los tags de cada dataStream            
        for(var i=1;i<=listaCantTagsDataStream[idDataStreamActual];i++)
        {
            //cambia el id del tagN del dataStreamActual al tagN siguiente del dataStream siguiente
            TagnDataStreamN=document.getElementById("Tag"+i+"DataStream"+(idDataStreamActual+1));
            TagnDataStreamN.id="Tag"+i+"DataStream"+idDataStreamActual;
            //cambia el id del boton agregar del dataStreamActual al botonAgregar siguiente del dataStreamSiguiente
            buttonTagnDataStreamnSiguiente=document.getElementById("buttonTag"+i+"DataStream"+(idDataStreamActual+1));
            buttonTagnDataStreamnSiguiente.id="buttonTag"+i+"DataStream"+idDataStreamActual;
            //cambia el id y el nombre del inputEspañol del dataStreamActual al inputEspañol siguiente del dataStreamSiguiente
            inputEspanolTagnDataStreamnSiguiente=document.getElementById("inputEspanolTag"+i+"DataStream"+(idDataStreamActual+1));
            inputEspanolTagnDataStreamnSiguiente.setAttribute("name",("inputEspanolTag"+i+"DataStream"+idDataStreamActual));
            inputEspanolTagnDataStreamnSiguiente.id="inputEspanolTag"+i+"DataStream"+idDataStreamActual;
            //cambia el id y el nombre del inputIngles del dataStreamActual al inputIngles siguiente del dataStreamSiguiente
            inputInglesTagnDataStreamnSiguiente=document.getElementById("inputInglesTag"+i+"DataStream"+(idDataStreamActual+1));
            inputInglesTagnDataStreamnSiguiente.setAttribute("name",("inputInglesTag"+i+"DataStream"+idDataStreamActual));
            inputInglesTagnDataStreamnSiguiente.id="inputInglesTag"+i+"DataStream"+idDataStreamActual;
        }
    }
}
//agrega un tag dinamicamente al dataStream seleccionado
function agregarTagDataStream(comp)
{
    // obtiene el id del dataStream actual
   var id = comp.id;   
   id=id.replace(/ |buttonAgregarTagDataStream/g, "");   
   var dataStreamActual=id;
   // obtiene los valores de los tags del dataStream seleccionado
   var tagsDataStreamEspanol=document.getElementById(("inputTagDataStreamEspanol"+dataStreamActual)).value;
   var tagsDataStreamIngles=document.getElementById("inputTagDataStreamIngles"+dataStreamActual).value;
   // se reinician los valores
   ocument.getElementById(("inputTagDataStreamEspanol"+dataStreamActual)).value="";
   document.getElementById("inputTagDataStreamIngles"+dataStreamActual).value="";
   //obtiene el contenedor de los tags del dataSteam seleccionado
   var  tagsDataStream=document.getElementById("tagsDataStream"+dataStreamActual);   
   listaCantTagsDataStream[dataStreamActual]++;
   // obtiene la cantidad de tags del dataStream
   var tagActual='Tag'+listaCantTagsDataStream[dataStreamActual]+'DataStream'+dataStreamActual;
   // crea el html de añadir tag en un dataStream
   var button='<div class="row" id="'+tagActual+'"><div class="col col-6 col-md-1"><div class="row col-md-4 mb-3"><button onclick="eliminarTagDataStream(this)" id="button'+tagActual+'" "type="button" class="rounded-circle btn btn-outline-danger">-</button></div></div>'
   var espanol='<div class="col col-12 col-md-8"><div class="row"><div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputEspanol'+tagActual+'" name="inputEspanol'+tagActual+'" value="'+tagsDataStreamEspanol+'" placeholder="Español" required></div>'
   var ingles='<div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputIngles'+tagActual+'" name="inputIngles'+tagActual+'" value="'+tagsDataStreamIngles+'" placeholder="English" required></div></div></div></div>'
   var html=button+espanol+ingles;
   //insetar al final del contenedor de tags el nuevo tag
   tagsDataStream.insertAdjacentHTML('beforeend',html);
}
//elimina un tag dinamicamente del dataStram seleccionado
function eliminarTagDataStream(comp){
    //obtiene el id del tag seleccionado
    var id = comp.id;
    id=id.replace(/ |button/g, "");
    var node = document.getElementById(id);
    // se elimina el tag del dataStrean
    node.parentNode.removeChild(node);
    var ids=id.split("DataStream"); 
    // se obtiene el id del tag y del dataStream seleccionado
    var idTagActual=parseInt(ids[0].replace("Tag",""),8);
    var idDataStreamActual=parseInt(ids[1], 8);
    // se merma la cantidad de tags del dataStream
    listaCantTagsDataStream[idDataStreamActual]--;
    //cambia todos los id de los tags del dataStream
    for(idTagActual;idTagActual<=listaCantTagsDataStream[idDataStreamActual];idTagActual++)
    {
        //cambia el id del contenedor del tag al contedor siguiente
        tagSig=document.getElementById("Tag"+(idTagActual+1)+"DataStream"+idDataStreamActual);           
        tagSig.id="Tag"+idTagActual+"DataStream"+idDataStreamActual;
        //cambia el id del botonagregar del tag al boton siguiente
        bottonSig=document.getElementById("buttonTag"+(idTagActual+1)+"DataStream"+idDataStreamActual);
        bottonSig.id="buttonTag"+idTagActual+"DataStream"+idDataStreamActual;
        //cambia el id y nombre del inputEspalol del tag al inputEspañol siguiente
        inputEspanolSig=document.getElementById("inputEspanolTag"+(idTagActual+1)+"DataStream"+idDataStreamActual);
        inputEspanolSig.setAttribute("name",("inputEspanolTag"+idTagActual+"DataStream"+idDataStreamActual));
        inputEspanolSig.id="inputEspanolTag"+idTagActual+"DataStream"+idDataStreamActual;
        //cambia el id y nombre del inputIngles del tag al inputIngles siguiente
        inputInglesSig=document.getElementById("inputInglesTag"+(idTagActual+1)+"DataStream"+idDataStreamActual);
        inputInglesSig.setAttribute("name",("inputInglesTag"+idTagActual+"DataStream"+idDataStreamActual));
        inputInglesSig.id="inputInglesTag"+idTagActual+"DataStream"+idDataStreamActual;
    }
}
//cambia dinamicamente el titulo del dataStream
function changeNameDataStream(elem)
{
    var id=elem.id;
    id=id.replace(/ |inputNombre/g, "");
    var node = document.getElementById("dataStreamH2"+id);
    node.innerHTML=elem.value;
}
