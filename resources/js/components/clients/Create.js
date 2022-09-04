import React, {useState} from "react"
import {form} from "../../helpers/form"
import {useNavigate, Link} from "react-router-dom"
import Swal from 'sweetalert2'

export const ClientsCreate = () => {
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const {setErrors, renderFieldError} = form();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLoading)
            return;

        setIsLoading(true);
        setErrors(null);

        let formDate = new FormData();
        formDate.append('name', name);
        formDate.append('email', email);
        formDate.append('profile', profile);

        axios.post('/api/client', formDate)
            .then(() => {
                Swal.fire({
                    'icon': 'success',
                    'title': 'Client created successfully'
                });
                navigate('/client')
            })
            .catch(error => {
                Swal.fire({
                    'icon': 'error',
                    'title': error.response.data.message
                });
                setErrors(error.response.data.errors);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="card">
            <div className="card-header d-flex">
                <div className="card-title">
                    Add Client
                </div>
                <Link to={`/client`} className="card-link ms-auto text-decoration-none">
                    <i className="fas fa-chevron-left me-1 fa-xs"></i>
                    Back
                </Link>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={e => setName(e.target.value)} required/>
                        {renderFieldError('name')}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} required/>
                        {renderFieldError('email')}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profile" className="form-label">Profile</label>
                        <input type="file" className="form-control" onChange={e => setProfile(e.target.files[0])}/>
                        {renderFieldError('profile')}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        <div className={`spinner-border spinner-border-sm me-2 ${!isLoading ? 'd-none' : ''}`}
                             role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}