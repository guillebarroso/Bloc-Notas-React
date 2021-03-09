import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {auth, firebase} from '../firebase'
import moment from 'moment';



const Admin = (props) => {

    const [user, setUser] = useState(null)


    useEffect(()=>{
        if (auth.currentUser) {
            console.log("si existe usuario")
            setUser(auth.currentUser)

        } else {
            console.log("no existe usuario")
            props.history.push('/login')
        }
    }, [props.history])



    const [tareas, setTareas] = useState([])
    const [tarea, setTarea] = useState("")
    const [modoEdicion, setmodoEdicion] = useState(false);
    const [id, setId] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        
        const obtenerDatos = async() => {
            const db = firebase.firestore()   
            try {
                debugger
                //Aqui abajo pongo auth.currentUser.email en vez de user.email porque a veces no me lo leía bien
                const data = await db.collection('usuarios').doc(auth.currentUser.email).collection('notas').get()
                const arrayData = data.docs.map(doc => ({id:doc.id,...doc.data() }))
                console.log(arrayData)
                setTareas(arrayData)
                
            } catch (error) {
                console.log(error)            
            }
        }
        obtenerDatos()
    }, [])
    

    const agregarTarea = async (e) =>{
        debugger
        e.preventDefault()
        if(!tarea.trim()){
            console.log("Escribe algo...")
            return
        }
        try {
            const db = firebase.firestore()

            const data = await db.collection('usuarios').doc(user.email).collection('notas').add({
                name:tarea,
                fecha:Date.now()
            })

            console.log(data)

            const nuevaTarea = {
                name:tarea,
                fecha:Date.now()
            }

            console.log(nuevaTarea)

            

            setTareas([
                ...tareas,
                {id:data.id, ...nuevaTarea}
            ])
            setTarea("")
        
        } catch (error) {
        console.log(error)
        
        }

    }

    const editarTarea = e=>{
        debugger
        e.preventDefault()
        if(!tarea.trim()){
          setError("Escribe algo...")
          return
        }

        const db = firebase.firestore()
        
        const arrayEditado = tareas.map(
          item=> item.id===id?{id:id,name:tarea}:item            
        )

        const data = db.collection('usuarios').doc(user.email).collection('notas').doc(id).set({name:tarea, fecha:Date.now()});


        setTareas(arrayEditado)
        setmodoEdicion(false)
        setTarea("")
        setId("")
        setError(null)
    
    }

    const activarModoEdicion = (item)=>{
        setmodoEdicion(true)
        setTarea(item.name)
        setId(item.id)
      }




    const eliminarTarea = async (id) => {
        debugger
        try {
        const db = firebase.firestore()
        const data = await db.collection('usuarios').doc(user.email).collection('notas').doc(id).delete()
        const arrayFiltrado = tareas.filter(item=>item.id!==id)
        setTareas(arrayFiltrado)

        
        } catch (error) {
        console.log(error)
        
        }

    }

    return (
        <div>
            <h2>Bienvenido {
                user && (
                    <span className="text-primary">{user.email}</span>
                )
            }</h2>
           



            <div className="container">
                <div className="container mt-5">
                    <h3 className="text-center">Listado de tareas</h3>
                    <hr/>
                    <div className="row mt-2">
                        <div className="col-8">
                            <h4 className="text-center">Lista de tarea</h4>
                            <ul className="list-group">   
                            {
                                tareas.map(item =>
                                <li className="list-group-item" key={item.id}>
                                <span className="lead">{item.name}</span><br/>
                                <span className="text-muted">Última modificación:{moment(item.fecha).fromNow()}</span>

                                <button className="btn btn-danger btn-sm float-end" data-toggle="modal" data-target= {"#id" + item.id}>
                                    Eliminar
                                </button>

                                {/* MODAL */}
                                {/* EN la id de aqui puse "id" al principio porque algunos id de las notas empezaban por números, y daba problemas */}
                                <div className="modal fade" id={"id" + item.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Atención!!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Estás seguro de eliminar esta nota?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger float-end " onClick={()=>eliminarTarea(item.id)} data-dismiss="modal">Eliminar tarea</button>
                                    </div>
                                    </div>
                                </div>
                                </div>


                                <button className="btn btn-warning btn-sm float-end mx-2" onClick={e=>activarModoEdicion(item)}>Editar tarea</button>            
                                </li>
                                )
                            }           
                            
                            </ul>


                        </div>


                        <div className="col-4">
                            <h4 className="text-center">{modoEdicion? "Editar tareas": "Agregar tareas"}</h4>
                            <form onSubmit={modoEdicion? editarTarea:agregarTarea}>
                                <input type="text" className="form-control" placeholder="Introduce la tarea" value={tarea} onChange={e=>setTarea(e.target.value)} />
                                {
                                    modoEdicion? (<button className="btn btn-warning w-100 mt-2">Guardar cambios</button>):
                                    (<button className="btn btn-dark w-100 mt-2">Agregar</button>)
                                }
                                {
                                    error? <span className="error">{error}</span>:null
                                }  
                            </form>
                        </div>
                    </div>     
                </div>
            </div>                    
        </div>
    )
}

export default withRouter(Admin)
