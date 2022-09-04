import React, {useState} from "react"
import {form} from "../../helpers/form"
import {useNavigate, Link} from "react-router-dom"
import admin from "../../helpers/admin"

export const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setErrors, renderFieldError, message, setMessage} = form();

    const makeRequest = (e) => {
        e.preventDefault();

        setErrors(null);

        setMessage('');

        // make request first to sanctum/csrf-cookie
        axios.get('/sanctum/csrf-cookie').then(() => {

            const payload = {
                email,
                password
            };

            const authenticatedCallback = () => {
                navigate('/');
            }

            axios.post('/api/login', payload, {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.data.admin) {
                    admin.authenticated(response.data.admin, authenticatedCallback)
                }
            }).catch(error => {
                console.log(error);

                if (error.response) {
                    if (error.response.data.message) {
                        setMessage(error.response.data.message);
                    }

                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            });
        });
    };

    return (
        <div className="card login-card">
            <div className="card-header">
                <div className="card-title">
                    Login
                </div>
            </div>
            <div className="card-body px-5 py-3">
                {
                    message && <div className="alert alert-danger">{message}</div>
                }
                <form method="POST" action="#" onSubmit={makeRequest}>

                    <div className="mb-4">
                        <input id="email" type="email" placeholder="Email Address"
                               className="form-control" name="email"
                               required autoComplete="email" autoFocus value={email}
                               onChange={e => setEmail(e.target.value)}/>
                        {renderFieldError('email')}
                    </div>

                    <div className="mb-4">
                        <input id="password" type="password" placeholder="Password"
                               className="form-control" name="password"
                               required autoComplete="current-password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        {renderFieldError('password')}
                    </div>

                    <div className="d-grid col-12 mb-4 mt-5">
                        <button type="submit" className="btn btn-primary p-3 fw-bolder">
                            LOGIN
                        </button>
                    </div>

                    <div className="row">
                        <b>
                            No account yet?
                            <Link to={`/register`} className="text-primary ps-1 login-color text-decoration-none">
                                Create one here.
                            </Link>
                        </b>
                    </div>
                </form>
            </div>
        </div>
    );
};