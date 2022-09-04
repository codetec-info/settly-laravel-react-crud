import React, {useState} from "react"
import {form} from "../../helpers/form"
import {useNavigate, Link} from "react-router-dom"
import admin from "../../helpers/admin"
import ReCAPTCHA from "react-google-recaptcha"

export const Register = () => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [recaptcha_token, setRecaptchaToken] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const {setErrors, renderFieldError} = form();

    const authenticatedCallback = () => {
        navigate('/');
    }

    const makeRequest = (e) => {
        e.preventDefault();

        if (isLoading)
            return;

        setIsLoading(true);
        setErrors(null);

        axios.post('/api/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            recaptcha_token: recaptcha_token,
        })
            .then(response => {
                if (response.data.admin) {
                    admin.authenticated(response.data.admin, authenticatedCallback)
                }
            })
            .catch(error => {
                console.log(error);

                if (error.response) {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                    }
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onChangeRecaptcha = (value) => {
        setRecaptchaToken(value);
    }

    return (
        <div className="card login-card">
            <div className="card-header">
                <div className="card-title">
                    Create your account
                </div>
            </div>
            <div className="card-body px-5 py-3">
                <form method="POST" action="#" onSubmit={makeRequest}>

                    <div className="mb-4">
                        <input id="name" type="text" placeholder="Name"
                               className="form-control" name="name" required autoComplete="name"
                               autoFocus
                               value={name} onChange={e => setName(e.target.value)}/>
                        {renderFieldError('name')}
                    </div>

                    <div className="mb-4">
                        <input id="email" type="email" placeholder="Email"
                               className="form-control" name="email" required autoComplete="email"
                               value={email} onChange={e => setEmail(e.target.value)}/>
                        {renderFieldError('email')}
                    </div>

                    <div className="mb-4">
                        <input id="password" type="password" placeholder="Password"
                               className="form-control"
                               name="password" required autoComplete="new-password" value={password}
                               onChange={e => setPassword(e.target.value)}/>
                        {renderFieldError('password')}
                    </div>

                    <div className="mb-4">
                        <input id="password-confirm" type="password" className="form-control"
                               name="password_confirmation" required autoComplete="new-password"
                               value={passwordConfirmation} placeholder="Confirm Password"
                               onChange={e => setPasswordConfirmation(e.target.value)}/>
                        {renderFieldError('password_confirmation')}
                    </div>

                    <div className="mb-4">
                        <ReCAPTCHA
                            sitekey={window.RECAPTCHAV2_SITEKEY}
                            onChange={onChangeRecaptcha}
                        />
                        {renderFieldError('recaptcha_token')}
                    </div>

                    <div className="d-grid col-12 mb-4 mt-5">
                        <button type="submit" className="btn btn-primary p-3 fw-bolder" disabled={isLoading}>
                            <div
                                className={`spinner-border spinner-border-sm me-2 ${!isLoading ? 'd-none' : ''}`}
                                role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            CREATE ACCOUNT
                        </button>
                    </div>

                    <div className="row">
                        <b>
                            Have an account?
                            <Link to={`/login`} className="text-primary ps-1 login-color text-decoration-none">
                                Login now.
                            </Link>
                        </b>
                    </div>
                </form>
            </div>
        </div>
    );
};