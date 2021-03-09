import React from 'react'
import {Link} from 'react-router-dom'

const Inicio = () => {
    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h2>Bienvenido!!!</h2>
            <p className="mt-5">En esta aplicación podrás crear tu propio bloc de notas, ¿a qué esperas para empezar?
            </p>
            <img className="mt-2" width="40%" src="assets/img/block-notas.jpg" alt="block de notas"></img>    
            <Link className="mt-2 btn btn-sm btn-info mb-2" to="/login">Empezar</Link>
        </div>
    )
}

export default Inicio
