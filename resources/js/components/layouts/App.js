import React, {useEffect} from "react"
import {Navbar} from "../Navbar"
import {Outlet, useNavigate} from "react-router-dom"
import admin from "../../helpers/admin"

// main layout for all pages
export const App = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (!admin.isLoggedIn()) {
            navigate('/login');
        }

        axios.get('/api/admin')
            .then()
            .catch(() => {
                admin.destroy()
                location.reload()
            })
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <Outlet/>
            </div>
        </div>
    );
};