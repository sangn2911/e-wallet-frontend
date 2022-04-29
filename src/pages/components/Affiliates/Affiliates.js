import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Form, Col, Row } from 'react-bootstrap';

function Affiliates() {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [affiliates, setAffiliates] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8082/api/affiliates')
            .then(res => res.json())
            .then(data => {
                setAffiliates(data.data)
            })
    }, [])

    const [affiliateName, setAffiliateName] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [fax, setFax] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleCreate = () => {

        fetch('http://localhost:8082/api/affiliates', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                affiliateName: affiliateName,
                district: district,
                address: address,
                phoneNumber: phoneNumber,
                fax: fax,
                email: email
            })
        })
            .then(res => res.json())
            .then(data => {
                affiliates.push(data.data);
                setAffiliates(affiliates);
                setShow(false)
            })
    }

    const handleDel = (id) => {

        fetch('http://localhost:8082/api/affiliates', {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: id
        })
            .then(() => {
                const pos = affiliates.findIndex(transaction => transaction.id === id);
                affiliates.splice(pos, 1);
                setAffiliates(affiliates);
            })
    }

    return (
        <>
            <Button variant="info m-1" onClick={handleShow}>
                Add New Affiliate
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Affiliate Name</th>
                        <th>District</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Open/Edit</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {affiliates.map((affiliate, index) => (
                        <tr key={index}>
                            <td>{affiliate.id}</td>
                            <td>{affiliate.affiliateName}</td>
                            <td>{affiliate.district}</td>
                            <td>{affiliate.address}</td>
                            <td>Active</td>
                            <td><a href={"/affiliates/info/" + affiliate.id}>Open</a></td>
                            <td><Button style={{backgroundColor: 'red', border: 'none', color: 'white'}} onClick={e => handleDel(affiliate.id)}>Delete</Button></td>
                        </tr>
                    ))}

                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Affiliate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Affiliate Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputAffiliateName"
                                    placeholder="Affiliate Name"
                                    value={affiliateName}
                                    onChange={e => setAffiliateName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>District</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputDistrict"
                                    placeholder="District"
                                    value={district}
                                    onChange={e => setDistrict(e.target.value)}
                                />
                            </Form.Group>
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

                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputPhoneNumber"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Fax</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputFax"
                                    placeholder="Fax"
                                    value={fax}
                                    onChange={e => setFax(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="inputEmail"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create Affiliate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Affiliates