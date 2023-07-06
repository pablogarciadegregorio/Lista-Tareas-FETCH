import React, {useState, useEffect} from "react";




const Form = () => {

    
// DECLARACIONDE ESTADOS    
    const[tarea,setTarea] = useState("");
    const[listaTareas, setListaTareas] = useState([]);
    const[tareaApi, setTareaApi] = useState("");
    const[listaApi, setListaApi] = useState([]);
    

//  FORM SUBMIT 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setListaApi(listaApi.concat(tareaApi));
        setTareaApi("");
        document.getElementById("Form").reset();
        
        
    }

    console.log(tareaApi);
    
    console.log(listaApi);
    



 


// LISTA DE TAREAS

// let listaHTML = listaTareas.map(function(task, index) { 
    
//     return (<li className="tarea list-group-item  pb-3 pt-3" key={index}>{task}<button className="botonBorrado float-end" onClick={()=> borrarTarea(task)}><i className="cruz fa-regular fa-circle-xmark  mt-2 mb-2"></i></button></li>)     
// })

let listaHTMLApi = listaApi.map(function(item, index) {

    return (<li className="tarea list-group-item  pb-3 pt-3" key={index}>{item.label}<button className="botonBorrado float-end" onClick={()=> borrarTarea(item)}><i className="cruz fa-regular fa-circle-xmark  mt-2 mb-2"></i></button></li>)   


})

// {listaApi.map((item)=><li>{item.label}</li>)}


// TAREAS PENDIENTES 
let tareasPendientes = listaTareas.length;


// BORRADO DE LISTADO

function borrarTarea(tarea){
    let tareaActual = tarea;
    let tareaBorrada = listaApi.filter((tarea) => tarea != tareaActual);
    setListaApi(tareaBorrada);

}


// CREAR USUARIO DE LA API

function crearUsuario() {
    
    fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]), // body data type must match "Content-Type" header
    })//busca informacion a la url dada con el metodo especificado
    .then((response)=>response.json())// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
    .then((data)=>console.log(data))// => guardo el json en un espacio de memoria
    .catch((error)=>console.log(error))// => te aviso si algo sale mal
}


// TRAER LISTA DE TAREAS DE LA API

function getList() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
        method:'GET'
    })//busca informacion a la url dada con el metodo especificado
    .then((response)=>response.json())// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
    .then((data)=> setListaApi(data))// => guardo el json en un espacio de memoria
    .catch((error)=>console.log(error))// => te aviso si algo sale mal
}




// USEEFFECT HACE LAS VECES DE UN ONLOAD

useEffect(()=>{
    crearUsuario();
    getList();
    
    
    
},[])


// <<<<<<<<<<<<<<<<<<<<<<<<<<<ACTUALIZACION, HAY QUE DESAROLLARLO>>>>>>>>>>>>>>>>>>>

// function saveList() {
//     fetch('https://assets.breatheco.de/apis/fake/todos/user/pgdg',{
//         method:'PUT',
//         headers: {
//             "Content-Type": "application/json",
//           },
//           body:[],
//     })
//     //busca informacion a la url dada con el metodo especificado
//     .then((response)=>response.json())// => convierto la respuesta buscada en un json => {"info":{},"results":[]} "hola"
//     .then((data)=>console.log(data))// => guardo el json en un espacio de memoria
//     .catch((error)=>console.log(error))// => te aviso si algo sale mal
// }




// <<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>


                                                                                                                                            

    return (
    <>

        <h1 className="text-center mt-3">Lista de tareas</h1>
        <div className="libreta justify-content-center">
            <div className="contenedor container m-auto">
                
                <form className="formulario" id="Form" onSubmit={handleSubmit} >
                    <input type="text" className="float-left p-4 pb-0"  placeholder=" &#x1F589; Añade una nueva tarea " onChange={(e) => setTareaApi(`{label:  ${e.target.value}, done: false}`)}></input>
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
            {/* <button className="btn btn-success d-flex m-auto mt-3" onClick={crearUsuario}>Crear Usuario</button> */}
            
            
        </div>
    </>
	);
};


export default Form