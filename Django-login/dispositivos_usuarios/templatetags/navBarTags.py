from dispositivos_usuarios.views import obtenerDispositivos
from django import template

register = template.Library()

@register.inclusion_tag('navBar.html', takes_context=True)      # Template tag que permite llamar un método cada que se
def listarDispositivos(context):                                # se llame a un template
                                                                # Método que permite listar los dispositivos de un
                                                                # usuario en el navBar
    listaDisp = obtenerDispositivos(context['request'].user.id)

    dictDisp = {}       #Diccionario de la forma {"Concepto1": [(idDisp, Lista de dispositivos)], "Concepto2": [(idDisp, Lista de dispositivos)]}

    for i in listaDisp:
        indices = [j for j, s in enumerate(i.getTags()) if 'Entidad' in s]
        if i.getTags()[indices[0]] in dictDisp:
            listAux = dictDisp.get(i.getTags()[indices[0]])
            listAux.append((i.getId(), i.getTitle()))
            dictDisp.update({i.getTags()[indices[0]]: listAux})
        else:
            listAux = [(i.getId(), i.getTitle())]
            dictDisp.update({i.getTags()[indices[0]]: listAux})
    context.update({'dispositivos': dictDisp})
    return {
        'context': context
    }
