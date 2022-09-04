import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

export const ClientsIndex = () => {
    const [query, setQuery] = useState({
        page: 1,
        search: '',
        order_column: 'id',
        order_direction: 'desc'
    });
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, [query]);

    const fetchClients = () => {
        axios.get('/api/client', {params: query})
            .then(response => {
                setClients(response.data)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleSearch = (event) => {
        setQuery(prevState => ({
            ...prevState,
            search: event.target.value
        }));
    }

    const deleteClient = (event) => {
        Swal.fire({
            title: 'Delete this client?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#EF4444',
            cancelButtonText: 'No',
            cancelButtonColor: '#A3A3A3',
            reverseButtons: true,
            focusCancel: true
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete('/api/client/' + event.target.value)
                    .then(() => fetchClients())
                    .catch(() => Swal.fire({icon: 'error', title: 'Something went wrong'}));
            }
        })

    }

    const orderColumnIcon = (column) => {
        let icon = 'fa-sort';
        if (query.order_column === column) {
            if (query.order_direction === 'asc') {
                icon = 'fa-sort-up';
            } else {
                icon = 'fa-sort-down';
            }
        }

        return (
            <i className={`fa ${icon} ms-1 px-1 pointer`}></i>
        )

    }

    const orderChanged = (column) => {
        let direction = 'asc';
        if (column === query.order_column) {
            direction = query.order_direction === 'asc' ? 'desc' : 'asc'
        }
        setQuery(prevState => ({
            ...prevState,
            page: 1,
            order_column: column,
            order_direction: direction
        }));
    }

    const renderClients = () => {

        if (!clients || !clients.data || clients.data.length <= 0)
            return (
                <tr>
                    <td colSpan="6">
                        No clients ...
                    </td>
                </tr>
            );

        return clients.data.map(client =>
            <tr key={client.id}>
                <td>{client.id}</td>
                <td className="text-center">
                    <img src={client.profile} alt={client.name} style={{
                        width: 40
                    }}/>
                </td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.created_at}</td>
                <td>
                    <Link to={`/client/edit/${client.id}`} className="btn btn-sm btn-success me-1">
                        Edit
                    </Link>
                    <button value={client.id} onClick={deleteClient} type="button"
                            className="btn btn-sm btn-danger">
                        Delete
                    </button>
                </td>
            </tr>);
    }

    const pageChanged = (url) => {
        const fullUrl = new URL(url);
        setQuery(prevState => ({
            ...prevState,
            page: fullUrl.searchParams.get('page')
        }));
    }

    const renderPaginatorLinks = () => {
        return clients.meta.links.map((link, index) =>
            <li className="page-item" key={index} onClick={() => pageChanged(link.url)}>
                <a className="page-link" href="#" dangerouslySetInnerHTML={{__html: link.label}}/>
            </li>
        );
    }

    const renderPagination = () => {
        if (!clients || !clients.data || clients.data.length <= 0)
            return (
                <span>&nbsp;</span>
            );

        return (
            <nav role="navigation" aria-label="Pagination Navigation">
                <div className="d-md-flex mb-3">
                    <div className="p-2">
                        <p className="text-sm">
                            Showing
                            <span> {clients.meta.from} </span>
                            to
                            <span> {clients.meta.to} </span>
                            of
                            <span> {clients.meta.total} </span>
                            results
                        </p>
                    </div>
                    <div className="ms-auto p-2">
                        <ul className="pagination">
                            {renderPaginatorLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <div className="card">
            <div className="card-header d-flex">
                <div className="card-title mb-0">
                    Clients
                </div>
                <Link to={`/client/create`} className="card-link ms-auto text-decoration-none">
                    <i className="fas fa-plus me-1 fa-xs"></i>
                    Create New
                </Link>
            </div>
            <div className="card-body table-responsive">
                <div className="row mb-2">
                    <div className="col-md-5">
                        <input type="text" value={query['search']} onChange={handleSearch}
                               placeholder="Search..." className="form-control"/>
                    </div>
                </div>
                <table className="table table-striped table-bordered">
                    <thead className="table-header">
                    <tr>
                        <td>
                            <span>ID</span>
                            <span onClick={() => orderChanged('id')}
                                  className="column-sort">
                                {orderColumnIcon('id')}
                            </span>
                        </td>
                        <td>
                            <span>Profile</span>
                        </td>
                        <td>
                            <span>Name</span>
                            <span onClick={() => orderChanged('name')}
                                  className="column-sort">
                                {orderColumnIcon('name')}
                            </span></td>
                        <td>
                            <span>Email</span>
                            <span onClick={() => orderChanged('email')}
                                  className="column-sort">
                                {orderColumnIcon('email')}
                            </span>
                        </td>
                        <td>
                            <span>Created At</span>
                            <span onClick={() => orderChanged('created_at')}
                                  className="column-sort">
                                {orderColumnIcon('created_at')}
                            </span>
                        </td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    {renderClients()}
                    </tbody>
                </table>
                <div className="mt-0">
                    {renderPagination()}
                </div>
            </div>
        </div>
    );
}