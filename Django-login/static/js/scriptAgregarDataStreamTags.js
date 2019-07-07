/*function contarTagsAdicionales() {
    contador=0;
    for (i = 0; i < 1; i++) {
        if (document.getElementById("inputIngles"+ contador+1) ) {
            contador++;
            i--;
        }
    }
    return contador;
}

cantidadTags = contarTagsAdicionales();*/

cantidadTags = document.getElementById("contadorTags").value;

function agregar() {
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