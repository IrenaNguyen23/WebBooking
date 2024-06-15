import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal, Table } from 'react-bootstrap';
import { deleteUser, getAllUsers } from '../../utils/ApiFunctions';

const Guest = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users', error);
            setErrorMessage('Failed to fetch users');
        }
    };

    const handleDeleteAccount = async (email) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(email)
				.then((response) => {
					setMessage(response.data)
                    fetchUsers()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Manager User</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Table striped bordered hover>
                <thead className="thead-dark bg-light rounded">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.roles.map((role) => role.name).join(', ')}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteAccount(user.email)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}

export default Guest
