btnTabla = document.getElementById("btnTabla")

// Obtiene los elementos del DOM 
var alphabeto = document.getElementById("inpAlpha")
var estados = document.getElementById("inpEstados")
var estadosfin = document.getElementById("inpEstadosFin")

var elementoFilaAlphabeto = document.getElementById("FilaAlphabeto")

var bodyTabla = document.getElementById("BodyTabla")

// Funcion que obtiene las cadaenas ingresadas de los inputs, elimina las comas y transforma a arreglos
function stand(){
    alphabetoArray = alphabeto.value.replaceAll(",","")
    estadosArray = estados.value.replaceAll(",","")
    estadosfinArray = estadosfin.value.replaceAll(",","")
}


// Actualiza la notificacion a partir si la cadena es valida o invalida
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

// Crea la tabla de transiciones en la interfaz grafica
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

//Funcion de boton comprobar
btnComprobar.addEventListener("click",()=>{

    
    //Obtiene la longitud del arreglo estados y del arregloAlphabeto
    var col = estadosArray.length
    var fil = alphabetoArray.length

    // Crea un arreglo bidimensional a partir de las dimensiones de la tabla de transicion
    let tablaTransiciones = new Array(col)
    for(var i = 0 ;i<col;i++){
        tablaTransiciones[i] = new Array(fil)
    }

    //Obtiene los elementos ingresados en los inputs de la tabla grafica y pobla el arreglo bidimencional anteriormente creado
    for(let f = 0; f < estadosArray.length;f++){
        for(let c = 0; c < alphabetoArray.length;c++){
            tablaTransiciones[f][c] = document.getElementById(f+"."+c).value
        }
    }
    //Obtiene la cadena ingresada en el DOM
    var cadena = document.getElementById("inpCadena").value

    //Variables de control de arreglo
    var fT = 0 
    var cT = 0

    // Recorre la tabla de transisciones , validando la cadena ingresada
    //----------------FUNCION DE AFD----------------// 
    for(let i = 0; i < cadena.length;i++){
        fT = alphabetoArray.indexOf(cadena[i])
        cT = tablaTransiciones[cT][fT]

    }

    // Manda a llamar el estado correspondiente de alerta dependiendo si el estado en el que concluyo el recorrido de la tabla corresponde a uno de los estados finales
    if(estadosfinArray.includes(cT)){
        UpdateAlert(true,cadena)
    }else{
        UpdateAlert(false,cadena)
    }
 
})

// Funcion de boton reinicio 
btnReload.addEventListener("click",()=>{
    location.reload()
})