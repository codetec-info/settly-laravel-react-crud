import React from "react"
import {Link, useNavigate} from "react-router-dom"
import admin from "../helpers/admin"

export const Navbar = () => {
    let navigate = useNavigate();

    const renderRightLinks = () => {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <a className="nav-link" href="#">Hi {admin.name}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                </li>
            </React.Fragment>
        )
    }

    const renderLeftLinks = () => {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/client">Clients</Link>
                </li>
            </React.Fragment>
        )
    }

    const afterUserDestroyed = () => {
        location.reload()
    }

    const handleLogout = () => {
        axios.post('/api/logout')
            .then(() => {
                admin.logout(afterUserDestroyed)
            })
            .catch(() => {
                admin.logout(afterUserDestroyed)
            })
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand">Laravel React</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        {renderLeftLinks()}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {renderRightLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}