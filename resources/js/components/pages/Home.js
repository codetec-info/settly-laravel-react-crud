import React from "react"
import admin from "../../helpers/admin"

export const Home = () => {

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        {
                            <div>
                                <div>Hi <b>{admin.name}</b>, welcome to your admin account</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};