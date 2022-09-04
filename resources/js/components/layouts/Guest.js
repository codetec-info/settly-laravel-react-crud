import React, {useEffect} from "react"
import {Outlet} from "react-router-dom"
import admin from "../../helpers/admin"
import {useNavigate} from "react-router-dom"
import './Guest.css'

export const Guest = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (admin.isLoggedIn()) {
            navigate('/');
        }
    }, []);

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center login-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-7">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}