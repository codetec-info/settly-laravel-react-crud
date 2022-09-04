import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";

import {ClientsIndex} from "./clients";
import {ClientsCreate} from "./clients/Create";
import {ClientsEdit} from "./clients/Edit";
import {App} from "./layouts/App";
import {Guest} from "./layouts/Guest";

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'))
    root.render(
        <BrowserRouter>
            <Routes>
                {/*Create group of routes of logged in admins*/}
                <Route path="/" element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/client" element={<ClientsIndex/>}/>
                    <Route path="/client/create" element={<ClientsCreate/>}/>
                    <Route path="/client/edit/:id" element={<ClientsEdit/>}/>
                </Route>

                {/*Create group of routes with guest layout*/}
                <Route path="login" element={<Guest/>}>
                    <Route index element={<Login/>}></Route>
                </Route>
                <Route path="register" element={<Guest/>}>
                    <Route index element={<Register/>}></Route>
                </Route>

                {/*Navigate any other routes to index page*/}
                <Route path="*" element={<Navigate to="/" replace/>}>

                </Route>
            </Routes>
        </BrowserRouter>
    );
}