import React, {useState, useEffect} from "react";




const Form = () => {

    
// DECLARACIONDE ESTADOS    
    const[tareaApi, setTareaApi] = useState("");
    const[listaApi, setListaApi] = useState([]);


// USEEFFECT HACE LAS VECES DE UN ONLOAD

useEffect(()=>{
    getList(); 
    
      
},[])
    

//  FORM SUBMIT 
    const handleSubmit = (e) => {
        if ((tareaApi != "") && (tareaApi != " ")){
        e.preventDefault();
        setListaApi((previousList) => [...previousList, tareaApi])     
        setTareaApi("");
        e.target.reset();
        
        }

        else { alert("Introduce una tarea no vacía")}
        
    }

    
// USEEFFECT que maneja los cambios de la lista  sirve para agregar un elemento o para eliminarlo

useEffect(()=>{      // Agregamos useEffect:  escucha los cambios de la lista y cuando haya un cambio llama
    saveList();      // a la función que hace el fetch para actualizarla.
     
},[listaApi])


    
    
   
    



 


// LISTA DE TAREAS

// let listaHTML = listaTareas.map(function(task, index) { 
    
//     return (<li className="tarea list-group-item  pb-3 pt-3" key={index}>{task}<button className="botonBorrado float-end" onClick={()=> borrarTarea(task)}><i className="cruz fa-regular fa-circle-xmark  mt-2 mb-2"></i></button></li>)     
// })

let listaHTMLApi = listaApi.map(function(item, index) {

    return (<li className="tarea list-group-item  pb-3 pt-3" key={index}>{item.label}<button className="botonBorrado float-end" onClick={()=> borrarTarea(item)}><i className="cruz fa-regular fa-circle-xmark  mt-2 mb-2"></i></button></li>)   


})




// TAREAS PENDIENTES 
let tareasPendientes = listaApi.length;


// BORRADO DE LISTADO

function borrarTarea(tarea){
    let tareaActual = tarea;
    let tareaBorrada = listaApi.filter((tarea) => tarea != tareaActual);
    setListaApi(tareaBorrada);
    console.log(listaApi);

}


// TRAER LISTA DE TAREAS DE LA API

function getList() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
        method:'GET'
    })//busca informacion a la url dada con el metodo especificado
    .then((response)=> { if (!response.ok) {crearUsuario()} return response.json()})// => convierto la respuesta buscada en un json y si no existe el usuario lo creo
    .then((data)=> setListaApi(data))// => guardo el json en un espacio de memoria
    .catch((error)=>console.log(error))// => te aviso si algo sale mal
}



// CREAR USUARIO DE LA API

function crearUsuario() {
    if (fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg') .then (resp => resp.status != 200)){
        fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([]), // body data type must match "Content-Type" header
        })//busca informacion a la url dada con el metodo especificado
        .then((response) => {
            if (response.ok) {
              getList() ; // LLAMA NUEVAMENTE A LA LISTA SI SE CREÓ EL USUARIO CORRECTAMENTE 
            }
            return response.json();
          })// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
        .then((data)=>console.log(data))// => guardo el json en un espacio de memoria
        .catch((error)=>console.log(error))// => te aviso si algo sale mal
    }
}










// GUARDAR LISTA EN LA API

function saveList() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(listaApi),
    })
    //busca informacion a la url dada con el metodo especificado
    .then((response)=>response.json())// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
    .then((data)=>console.log(data))// => guardo el json en un espacio de memoria
    .catch((error)=>console.log(error))// => te aviso si algo sale mal
}






  
    


function deleteList() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify([]),
})
.then((response) =>{if (response.ok) {crearUsuario()}; return response.json }) //   MANEJAMOS LO QUE QUEREMOS QUE SUCEDA SI SALE TODO BIEN, SI EL DELETE ES CORRECTO SE LLAMA A LA FUNCION QUE CREA EL USUARIO 
.catch((error) => console.log(error)); // NOS AVISA DEL ERROR 
}

const handleDelete = () => {
    deleteList()
    alert('Lista eliminada exitosamente, se ha creado una nueva lista') 
}



// <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>


                                                                                                                                                        // [{"label":"sample task","done":false}]                                                                                                                                 

    return (
    <>

        <h1 className="text-center mt-3">Lista de tareas</h1>
        <div className="libreta justify-content-center">
            <div className="contenedor container m-auto">
                
                <form className="formulario" id="Form" onSubmit={handleSubmit} >
                    <input type="text" className="float-left p-4 pb-0"  placeholder=" &#x1F589; Añade una nueva tarea " onChange={(e) => setTareaApi({label:  e.target.value, done: false})}></input>
                </form>
                <hr/>
                <ul className="p-4 pt-0 mb-0">
                
                     {/* {listaHTML}  */}
                     {listaHTMLApi}
                     
                </ul>
                <p className="tareasPendientes ps-4 pe-4">Quedan {tareasPendientes} tareas pendientes</p>
                
            </div>
            <div className="hojaAtras1 m-auto"></div>
            <div className="hojaAtras2 m-auto"></div>
            <button className="btn btn-danger rounded-circle d-flex m-auto mt-3 borrado justify-content-center" onClick={handleDelete} ><i className="fa-solid fa-trash-can"></i></button>
            
            
        </div>
    </>
	);
};


export default Form