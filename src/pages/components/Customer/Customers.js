import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Form, Col, Row } from 'react-bootstrap';


function Customers() {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8082/api/customer', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()
        ).then(data => {
            setCustomers(data.data)
        }).catch(e => {
            console.log(e)
        })
    }, [])


    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [nationality, setNationality] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleAdd = () => {
        fetch('http://localhost:8082/api/customer', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastName: lastName,
                firstName: firstName,
                dateOfBirth: dateOfBirth,
                email: email,
                nationality: nationality,
                address: address
            })
        })
            .then(res => res.json())
            .then(data => {
                customers.push(data.data);
                setCustomers(customers);
                setShow(false)
            })
    }

    const handleDel = (id) => {
        console.log(id)
        fetch('http://localhost:8082/api/customer', {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: id
        })
            .then(() => {
                const pos = customers.findIndex(customer => customer.id === id);
                customers.splice(pos, 1);
                setCustomers([]);
                setCustomers(customers);
            })
    }

    return (
        <>
            <Button variant="info m-1" onClick={handleShow}>
                Add Customer
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Date Of Birth</th>
                        <th>Email</th>
                        <th>Nationality</th>
                        <th>Address</th>
                        <th>Open</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.id}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.dateOfBirth}</td>
                            <td>{customer.email}</td>
                            <td>{customer.nationality}</td>
                            <td>{customer.address}</td>
                            <td>{<a href={"/customers/profile/" + customer.id}>Open</a>}</td>
                            <td>
                                <Button
                                    style={{ backgroundColor: 'red', border: 'none', color: 'white' }}
                                    onClick={e => handleDel(customer.id)}>Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputLastName"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputFirstName"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputDateOfBirth"
                                    placeholder="Date Of Birth"
                                    value={dateOfBirth}
                                    onChange={e => setDateOfBirth(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Nationality</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputNationality"
                                    placeholder="Nationality"
                                    value={nationality}
                                    onChange={e => setNationality(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="inputEmail"
                                placeholder="email@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputAddress"
                                placeholder="Address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Customers