import React, {useState} from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Reset = (props) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()) {
            setError("Escribe un email")
          return
        }
        setError(null)

        recuperarContraseña()
    }


    const recuperarContraseña = async () => {
            try {
                await auth.sendPasswordResetEmail(email)
                props.history.push('/login')
                
            } catch (error) {
                setError(error.message)            
            }
    }



    return (
        <div className="mt-5">
            <h3 className="text-center">
                Formulario para recuperar contraseña
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                 <form onSubmit={procesarDatos}>
                    {
                        error && (
                            <div className="alert alert-danger">{error}</div>
                        )
                    }
                    <input 
                        type="email" 
                        className="form-control mb-2"
                        placeholder="Introduce el email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                    />

                    <button 
                        className="btn btn-lg btn-dark w-100  mb-2"
                        type="submit"
                    >
                        Recuperar contraseña
                        
                    </button>


                     
                </form>   
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)
