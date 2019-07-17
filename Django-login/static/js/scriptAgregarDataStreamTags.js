var cantidadTags = 0;
var cantidadDataStreams=0;
var listaCantTagsDataStream=[0];



function cambiarIdsTags(){
    var contadorEspañol = 1;
    var contadorIngles = 1;
    while(true){
        if(document.getElementById("formTag")){

            elemento = document.getElementById("formTag");
            elemento.id = "formTag" + contadorEspañol; 
            elemento = document.getElementById("inputTagEspañol");
            elemento.id = "inputTagEspañol" + contadorEspañol;
            elemento.name = "tagEspañol" + contadorEspañol;
            elemento = document.getElementById("inputTagIngles");
            elemento.id = "inputTagIngles" + contadorIngles;
            elemento.name = "tagIngles" + contadorIngles;
            botonEliminar = document.getElementById("eliminarTag");
            botonEliminar.id = ""+contadorEspañol;
            contadorEspañol++;
            contadorIngles++;
            cantidadTags++;
        }
        else{
            break;
        }
    }
}

function cambiarIdsDataSreams()
{
    var contDataStream = 0;
    
    while(true){
        
        if(document.getElementById("dataStream00")){
            elemento = document.getElementById("dataStream00");
            elemento.id = "dataStream" + contDataStream;

            h2=document.getElementById("dataStreamH200");
            h2.id = "dataStreamH2" + contDataStream;
            h2.innerHTML="dataStream"+contDataStream;

            inputNombre=document.getElementById("inputNombre00")
            inputNombre.id = "inputNombre" + contDataStream;
            inputNombre.name = "inputNombre" + contDataStream;
            
            inpuValorMaximo=document.getElementById("inputValorMaximo00")
            inpuValorMaximo.id = "inputValorMaximo" + contDataStream;
            inpuValorMaximo.name = "inputValorMaximo" + contDataStream;

            inpuValorMinimo=document.getElementById("inputValorMinimo00")
            inpuValorMinimo.id = "inputValorMinimo" + contDataStream;
            inpuValorMinimo.name = "inputValorMinimo" + contDataStream;

            inputSimbolo=document.getElementById("inputSimbolo00")
            inputSimbolo.id = "inputSimbolo" + contDataStream;
            inputSimbolo.name = "inputSimbolo" + contDataStream;

            inputEtiqueta=document.getElementById("inputEtiqueta00")
            inputEtiqueta.id = "inputEtiqueta" + contDataStream;
            inputEtiqueta.name = "inputEtiqueta" + contDataStream;

            inputTipo=document.getElementById("inputTipo00")
            inputTipo.id = "inputTipo" + contDataStream;
            inputTipo.name = "inputTipo" + contDataStream;

            tagsDataStream=document.getElementById("tagsDataStream00");
            tagsDataStream.id = "tagsDataStream" + contDataStream;

            buttonAgregarTagDataStream=document.getElementById("buttonAgregarTagDataStream00");
            buttonAgregarTagDataStream.id = "buttonAgregarTagDataStream" + contDataStream;

            inputTagDataStreamEspanol=document.getElementById("inputTagDataStreamEspanol00");
            inputTagDataStreamEspanol.id="inputTagDataStreamEspanol"+contDataStream;

            inputTagDataStreamIngles=document.getElementById("inputTagDataStreamIngles00");
            inputTagDataStreamIngles.id="inputTagDataStreamIngles"+contDataStream;

            buttonEliminardataStream=document.getElementById('buttonEliminardataStream00');
            buttonEliminardataStream.id="buttonEliminardataStream"+contDataStream;

            var contTags=1;
            while(true)
            {
                if(document.getElementById("Tag0DataStream00")){
                if(document.getElementById("Tag0DataStream00").parentElement===document.getElementById("tagsDataStream"+contDataStream))
                    {
                       
                       TagnDataStreamN=document.getElementById("Tag0DataStream00");
                       TagnDataStreamN.id="Tag"+contTags+"DataStream"+contDataStream;

                       buttonTagNDataStreamN=document.getElementById("buttonTag0DataStream00");
                       buttonTagNDataStreamN.id="buttonTag"+contTags+"DataStream"+contDataStream;

                       inputEspanolTagNDataStreamN=document.getElementById("inputEspanolTag0DataStream00");
                       inputEspanolTagNDataStreamN.name="inputEspanolTag"+contTags+"DataStream"+contDataStream;
                       inputEspanolTagNDataStreamN.id="inputEspanolTag"+contTags+"DataStream"+contDataStream;

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
            if(contDataStream==0){
                listaCantTagsDataStream[0]=contTags-1;
            }
            else{
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
cambiarIdsTags();





function agregartag() {
    cantidadTags++;
    var tags = document.getElementById("tags");
    var valueInputEspanol = document.getElementById("tagEspañol").value;
    var valueInputIngles = document.getElementById("tagIngles").value;
    document.getElementById("tagEspañol").value = "";
    document.getElementById("tagIngles").value = "";

    var htmlForm = '<div class="form-row" id="formTag' + cantidadTags + '"><div class="col col-6 col-md-3"><div class="row col-md-4 mb-3"><button id="' + cantidadTags + '" type="button" onclick="eliminarTag(this)" class="rounded-circle btn btn-outline-danger">-</button></div></div>'
    var htmlTagEspañol = '<div class="col col-12 col-md-8"><div class="row"><div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputEspanol' + cantidadTags + '"name="tagEspanol' + cantidadTags + '" placeholder="Español" value="' + valueInputEspanol + '" required></div>';
    var htmlTagIngles = '<div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputIngles' + cantidadTags + '" name="tagIngles' + cantidadTags + '" placeholder="English" value="' + valueInputIngles + '" required> </div></div></div></div>'
    html = htmlForm + htmlTagEspañol + htmlTagIngles;
    tags.insertAdjacentHTML('beforeend', html);
}
function eliminarTag(comp) {
    var id = comp.id;
    id = id.replace(/ /g, "");
    var node = document.getElementById("formTag" + id);
    node.parentNode.removeChild(node);
    cantidadTags--;
    idActual = parseInt(id, 8);
    for (idActual; idActual <= cantidadTags; idActual++) {
        tagSig = document.getElementById("formTag" + (idActual + 1));
        tagSig.id = "formTag" + idActual;

        bottonSig = document.getElementById("" + (idActual + 1));
        bottonSig.id = idActual;

        inputEspanolSig = document.getElementById("inputEspanol" + (idActual + 1));
        inputEspanolSig.setAttribute("name", ("tagEspanol" + idActual));
        inputEspanolSig.id = "inputEspanol" + idActual;

        inputInglesSig = document.getElementById("inputIngles" + (idActual + 1));
        inputInglesSig.setAttribute("name", ("tagIngles" + idActual));
        inputInglesSig.id = "inputIngles" + idActual;
    }
}
function agregarDataStream()
{
    var dataStreams = document.getElementById("dataStreams");
    cantidadDataStreams++;
    nombre='<div class="div-principal" id="dataStream'+cantidadDataStreams+'"><h2 id="dataStreamH2'+cantidadDataStreams+'">dataStream'+cantidadDataStreams+'</h2><div class="form-row"><div class="col mb-3"><label>Nombre</label><input type="text" class="form-control inputs" name="inputNombre'+cantidadDataStreams+'"id="inputNombre'+cantidadDataStreams+'" placeholder="Nombre"required></div></div>'
    valorMaximo='<div class="form-row"><div class="col-md-4 mb-3"><label>Valor Maximo</label><input type="text" class="form-control inputs" name="inputValorMaximo'+cantidadDataStreams+'"id="inputValorMaximo'+cantidadDataStreams+'" placeholder="Valor Maximo"required></div>'
    valorMinimo='<div class="col-md-4 mb-3"><label>Valor Minimo</label><input type="text" class="form-control inputs" name="inputValorMinimo'+cantidadDataStreams+'"id="inputValorMinimo'+cantidadDataStreams+'" placeholder="Valor Minimo"required></div></div>'
    unidades='<div class="form-row"><div class="col col-6 col-md-3"><label>Unidad</label></div></div><div class="form-row"><div class="col-md-4 mb-3"><input type="text" class="form-control inputs" name="inputSimbolo'+cantidadDataStreams+'"id="inputSimbolo'+cantidadDataStreams+'" placeholder="Símbolo"></div><div class="col-md-4 mb-3"><input type="text" class="form-control inputs" name="inputEtiqueta'+cantidadDataStreams+'" id="inputEtiqueta'+cantidadDataStreams+'" placeholder="Etiqueta"></div><div class="col-md-4 mb-3"><input type="text" class="form-control inputs" name="inputTipo'+cantidadDataStreams+'"id="inputTipo'+cantidadDataStreams+'" placeholder="Tipo"></div></div>'
    tagsDataStream='<div class="form-row"><div class="container border rounded-lg" id="tagsDataStream'+cantidadDataStreams+'"><div class="row"><div class="col-md-4 mb-3"><label>Añadir Tags</label></div></div><div class="row"><div class="col col-6 col-md-1"><div class="row col-md-4 mb-3"><button type="button" id="buttonAgregarTagDataStream'+cantidadDataStreams+'" onclick="agregarTagDataStream(this)"class="rounded-circle btn btn-outline-success">+</button></div></div><div class="col col-12 col-md-8"><div class="row"><div class="col-md-6 mb-3"><input type="text" class="form-control inputs"id="inputTagDataStreamEspanol'+cantidadDataStreams+'" name="inputTagDataStreamEspanol'+cantidadDataStreams+'" placeholder="Español"></div><div class="col-md-6 mb-3"><input type="text" class="form-control inputs"id="inputTagDataStreamIngles'+cantidadDataStreams+'" name="inputTagDataStreamIngles'+cantidadDataStreams+'"placeholder="English"></div></div></div></div></div></div>'
    opcionDataStream='<div class="container p-3"><div class="row"><div class="col col-6"><button id="buttonEliminardataStream'+cantidadDataStreams+'"onclick="EliminarDataStream(this)" type="button" class="btn btn-outline-secondary">Eliminar datastream</button></div><button onclick="agregarDataStream()" type="button" class="btn btn-outline-secondary">Añadir otro datastream</button></div></div></div>'
    html=nombre+valorMaximo+valorMinimo+unidades+tagsDataStream+opcionDataStream;
    dataStreams.insertAdjacentHTML('beforeend',html);
    listaCantTagsDataStream.push(0);
}
function EliminarDataStream(comp)
{
    var id = comp.id;
    id=id.replace(/ |buttonEliminar/g, "");
    var node = document.getElementById(id);
    node.parentNode.removeChild(node);
    id=id.replace(/ |dataStream/g, "");
    alert(id);

    var idDataStreamActual=parseInt(id,10);
    cantidadDataStreams--;
    listaCantTagsDataStream.splice(idDataStreamActual,1);
    alert(idDataStreamActual);
    for(idDataStreamActual;idDataStreamActual<=cantidadDataStreams;idDataStreamActual++)
    {
        dataStreamSiguiente=document.getElementById("dataStream"+(idDataStreamActual+1));
        dataStreamSiguiente.id="dataStream"+idDataStreamActual;
        
        dataStreamSiguiente=document.getElementById("dataStreamH2"+(idDataStreamActual+1));
        dataStreamSiguiente.innerHTML="dataStream"+idDataStreamActual;
        dataStreamSiguiente.id="dataStreamH2"+idDataStreamActual;

        inputNombreSiguiente=document.getElementById("inputNombre"+(idDataStreamActual+1));
        inputNombreSiguiente.setAttribute("name",("inputNombre"+idDataStreamActual));
        inputNombreSiguiente.id="inputNombre"+idDataStreamActual;

        inputValorMaximoSiguiente=document.getElementById("inputValorMaximo"+(idDataStreamActual+1));
        inputValorMaximoSiguiente.setAttribute("name",("inputValorMaximo"+idDataStreamActual));
        inputValorMaximoSiguiente.id="inputValorMaximo"+idDataStreamActual;

        inputValorMinimoSiguiente=document.getElementById("inputValorMinimo"+(idDataStreamActual+1));
        inputValorMinimoSiguiente.setAttribute("name",("inputValorMinimo"+idDataStreamActual));
        inputValorMinimoSiguiente.id="inputValorMinimo"+idDataStreamActual;

        inputSimboloSiguiente=document.getElementById("inputSimbolo"+(idDataStreamActual+1));
        inputSimboloSiguiente.setAttribute("name",("inputSimbolo"+idDataStreamActual));
        inputSimboloSiguiente.id="inputSimbolo"+idDataStreamActual;

        inputEtiquetaSiguiente=document.getElementById("inputEtiqueta"+(idDataStreamActual+1));
        inputEtiquetaSiguiente.setAttribute("name",("inputEtiqueta"+idDataStreamActual));
        inputEtiquetaSiguiente.id="inputEtiqueta"+idDataStreamActual;

        inputTipoSiguiente=document.getElementById("inputTipo"+(idDataStreamActual+1));
        inputTipoSiguiente.setAttribute("name",("inputTipo"+idDataStreamActual));
        inputTipoSiguiente.id="inputTipo"+idDataStreamActual;

        buttonEliminardataStreamSiguiente=document.getElementById("buttonEliminardataStream"+(idDataStreamActual+1));
        buttonEliminardataStreamSiguiente.setAttribute("name",("buttonEliminardataStream"+idDataStreamActual));
        buttonEliminardataStreamSiguiente.id="buttonEliminardataStream"+idDataStreamActual;

        contenedorTagsDataStreamSiguiente=document.getElementById("tagsDataStream"+(idDataStreamActual+1));
        contenedorTagsDataStreamSiguiente.id="tagsDataStream"+idDataStreamActual;


        buttonAgregarTagDataStreamSiguiente=document.getElementById("buttonAgregarTagDataStream"+(idDataStreamActual+1));
        buttonAgregarTagDataStreamSiguiente.setAttribute("name",("buttonAgregarTagDataStream"+idDataStreamActual));
        buttonAgregarTagDataStreamSiguiente.id="buttonAgregarTagDataStream"+idDataStreamActual;
        
        inputTagDataStreamEspanolSiguiente=document.getElementById("inputTagDataStreamEspanol"+(idDataStreamActual+1));
        inputTagDataStreamEspanolSiguiente.setAttribute("name",("inputTagDataStreamEspanol"+idDataStreamActual));
        inputTagDataStreamEspanolSiguiente.id="inputTagDataStreamEspanol"+idDataStreamActual;

        inputTagDataStreamInglesSiguiente=document.getElementById("inputTagDataStreamIngles"+(idDataStreamActual+1));
        inputTagDataStreamInglesSiguiente.setAttribute("name",("inputTagDataStreamIngles"+idDataStreamActual));
        inputTagDataStreamInglesSiguiente.id="inputTagDataStreamIngles"+idDataStreamActual;
        
            
        for(var i=1;i<=listaCantTagsDataStream[idDataStreamActual];i++)
        {
            TagnDataStreamN=document.getElementById("Tag"+i+"DataStream"+(idDataStreamActual+1));
            TagnDataStreamN.id="Tag"+i+"DataStream"+idDataStreamActual;
            
            buttonTagnDataStreamnSiguiente=document.getElementById("buttonTag"+i+"DataStream"+(idDataStreamActual+1));
            buttonTagnDataStreamnSiguiente.id="buttonTag"+i+"DataStream"+idDataStreamActual;

            inputEspanolTagnDataStreamnSiguiente=document.getElementById("inputEspanolTag"+i+"DataStream"+(idDataStreamActual+1));
            inputEspanolTagnDataStreamnSiguiente.setAttribute("name",("inputEspanolTag"+i+"DataStream"+idDataStreamActual));
            inputEspanolTagnDataStreamnSiguiente.id="inputEspanolTag"+i+"DataStream"+idDataStreamActual;

            inputInglesTagnDataStreamnSiguiente=document.getElementById("inputInglesTag"+i+"DataStream"+(idDataStreamActual+1));
            inputInglesTagnDataStreamnSiguiente.setAttribute("name",("inputInglesTag"+i+"DataStream"+idDataStreamActual));
            inputInglesTagnDataStreamnSiguiente.id="inputInglesTag"+i+"DataStream"+idDataStreamActual;
        }

    }
    
}
function agregarTagDataStream(comp)
{
   var id = comp.id;   
   id=id.replace(/ |buttonAgregarTagDataStream/g, "");   
   var dataStreamActual=id;
   var tagsDataStreamEspanol=document.getElementById(("inputTagDataStreamEspanol"+dataStreamActual)).value;
   var tagsDataStreamIngles=document.getElementById("inputTagDataStreamIngles"+dataStreamActual).value;
   document.getElementById(("inputTagDataStreamEspanol"+dataStreamActual)).value="";
   document.getElementById("inputTagDataStreamIngles"+dataStreamActual).value="";

   var  tagsDataStream=document.getElementById("tagsDataStream"+dataStreamActual);   
   listaCantTagsDataStream[dataStreamActual]++;
   var tagActual='Tag'+listaCantTagsDataStream[dataStreamActual]+'DataStream'+dataStreamActual;
   var button='<div class="row" id="'+tagActual+'"><div class="col col-6 col-md-1"><div class="row col-md-4 mb-3"><button onclick="eliminarTagDataStream(this)" id="button'+tagActual+'" "type="button" class="rounded-circle btn btn-outline-danger">-</button></div></div>'
   var espanol='<div class="col col-12 col-md-8"><div class="row"><div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputEspanol'+tagActual+'" name="inputEspanol'+tagActual+'" value="'+tagsDataStreamEspanol+'" placeholder="Español" required></div>'
   var ingles='<div class="col-md-6 mb-3"><input type="text" class="form-control inputs" id="inputIngles'+tagActual+'" name="inputIngles'+tagActual+'" value="'+tagsDataStreamIngles+'" placeholder="English" required></div></div></div></div>'
   var html=button+espanol+ingles;
   tagsDataStream.insertAdjacentHTML('beforeend',html);
}
function eliminarTagDataStream(comp){
    var id = comp.id;
    id=id.replace(/ |button/g, "");
    var node = document.getElementById(id);
    node.parentNode.removeChild(node);
    var ids=id.split("DataStream"); 
    
    var idTagActual=parseInt(ids[0].replace("Tag",""),8);
    var idDataStreamActual=parseInt(ids[1], 8);
    
    listaCantTagsDataStream[idDataStreamActual]--;
   
    for(idTagActual;idTagActual<=listaCantTagsDataStream[idDataStreamActual];idTagActual++)
    {
        tagSig=document.getElementById("Tag"+(idTagActual+1)+"DataStream"+idDataStreamActual);           
        tagSig.id="Tag"+idTagActual+"DataStream"+idDataStreamActual;
        
        bottonSig=document.getElementById("buttonTag"+(idTagActual+1)+"DataStream"+idDataStreamActual);
        bottonSig.id="buttonTag"+idTagActual+"DataStream"+idDataStreamActual;
        
        inputEspanolSig=document.getElementById("inputEspanolTag"+(idTagActual+1)+"DataStream"+idDataStreamActual);
        inputEspanolSig.setAttribute("name",("inputEspanolTag"+idTagActual+"DataStream"+idDataStreamActual));
        inputEspanolSig.id="inputEspanolTag"+idTagActual+"DataStream"+idDataStreamActual;

        inputInglesSig=document.getElementById("inputInglesTag"+(idTagActual+1)+"DataStream"+idDataStreamActual);
        inputInglesSig.setAttribute("name",("inputInglesTag"+idTagActual+"DataStream"+idDataStreamActual));
        inputInglesSig.id="inputInglesTag"+idTagActual+"DataStream"+idDataStreamActual;
    }
    
}
