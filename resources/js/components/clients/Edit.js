import React, {useState, useEffect} from "react"
import {form} from "../../helpers/form"
import {useNavigate, Link, useParams} from "react-router-dom"
import Swal from 'sweetalert2'

export const ClientsEdit = () => {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        fetchClient();
    }, []);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const {setErrors, renderFieldError} = form();

    const fetchClient = () => {
        setIsLoading(true)

        axios.get('/api/client/' + params.id)
            .then(response => {
                setId(response.data.data.id)
                setName(response.data.data.name)
                setEmail(response.data.data.email)
            })
            .catch(error => {
                if (error.response.status.toString().startsWith("4")) {
                    navigate('/client');
                }
            })
            .finally(() => setIsLoading(false));
    }

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
        formDate.append('_method ', 'PUT');

        axios.post('/api/client/' + id + '?_method=PUT', formDate)
            .then(() => {
                Swal.fire({
                    'icon': 'success',
                    'title': 'Client updated successfully'
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
                    Edit Client
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
                        <input type="text" className="form-control" value={name}
                               onChange={e => setName(e.target.value)} required/>
                        {renderFieldError('name')}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email}
                               onChange={e => setEmail(e.target.value)} required/>
                        {renderFieldError('email')}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profile" className="form-label">Profile</label>
                        <input type="file" className="form-control"
                               onChange={e => setProfile(e.target.files[0])}/>
                        {renderFieldError('profile')}
                    </div>

                    <button type="submit" className="btn btn-success" disabled={isLoading}>
                        <div className={`spinner-border spinner-border-sm me-2 ${!isLoading ? 'd-none' : ''}`}
                             role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}