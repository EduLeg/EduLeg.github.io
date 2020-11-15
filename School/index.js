btnTabla = document.getElementById("btnTabla")


var alphabeto = document.getElementById("inpAlpha")
var estados = document.getElementById("inpEstados")
var estadosfin = document.getElementById("inpEstadosFin")

var elementoFilaAlphabeto = document.getElementById("FilaAlphabeto")

var bodyTabla = document.getElementById("BodyTabla")


function stand(){
    alphabetoArray = alphabeto.value.replaceAll(",","")
    estadosArray = estados.value.replaceAll(",","")
    estadosfinArray = estadosfin.value.replaceAll(",","")
}

function CreacionTablaTransicion(filas){
    var tablaTransiciones = []
    for (var i = 0;i<filas;i++){
        tablaTransiciones[i]=[]
    }
    return tablaTransiciones
}

function UpdateAlert(valida,c){
    
    var alertElement = document.getElementById("alert")

    if(!!document.getElementById("alert")){
        alertElement.remove()
    }

    var divRow = document.getElementById("underRow")


    if(valida){
        divRow.insertAdjacentHTML("beforeEnd",'<div class="alert alert-success" role="alert" id="alert">Cadena: '+c+' valida!</div>')
    }else{
        divRow.insertAdjacentHTML("beforeEnd",'<div class="alert alert-warning" role="alert" id="alert">Cadena: '+c+' invalida!</div>')
    }
    
}


btnTabla.addEventListener("click",()=>{
    
    stand()

    for (let index = 0; index < alphabetoArray.length; index++) {
        elementoFilaAlphabeto.insertAdjacentHTML("beforeEnd",'<th scope="col">'+alphabetoArray[index]+'</th>')
    }
    
    for (let index = 0; index < estadosArray.length; index++) {
        bodyTabla.insertAdjacentHTML("beforeEnd",'<tr id="fil-'+index+'"><th scope="row">'+estadosArray[index]+'</th></tr>')
        var filaElemnt = document.getElementById('fil-'+index+'')
        for (let x = 0; x < alphabetoArray.length; x++) {
            filaElemnt.insertAdjacentHTML("beforeEnd",'<td><input id='+index+'.'+x+' type="text"></td>')
        }
    }


})

btnComprobar.addEventListener("click",()=>{


    // Creacion de Tabla de Transiciones
    var col = estadosArray.length
    var fil = alphabetoArray.length

    let tablaTransiciones = new Array(col)
    for(var i = 0 ;i<col;i++){
        tablaTransiciones[i] = new Array(fil)
    }

    for(let f = 0; f < estadosArray.length;f++){
        for(let c = 0; c < alphabetoArray.length;c++){
            tablaTransiciones[f][c] = document.getElementById(f+"."+c).value
        }
    }

    // Recorre la tabla de transisciones ingresada a partir de la cadea ingresada
    
    var cadena = document.getElementById("inpCadena").value


    var fT = 0 
    var cT = 0

    for(let i = 0; i < cadena.length;i++){
        fT = alphabetoArray.indexOf(cadena[i])
        cT = tablaTransiciones[cT][fT]

    }

    if(estadosfinArray.includes(cT)){
        UpdateAlert(true,cadena)
    }else{
        UpdateAlert(false,cadena)
    }
 
})


btnReload.addEventListener("click",()=>{
    location.reload()
})