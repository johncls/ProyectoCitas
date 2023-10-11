﻿import { React } from "react";
import { Link } from "react-router-dom";
const Layout = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">Citas Medicas</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Contacto</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Doctor">Doctor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Cita">Citas Medicas</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
   )
}

export default Layout;