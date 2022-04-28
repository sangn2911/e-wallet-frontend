import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Form, Col, Row } from 'react-bootstrap';

function Transactions() {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:8082/api/transactions', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()
        ).then(data => {
            setTransactions(data.data)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const [senderName, setSenderName] = React.useState('');
    const [receiverName, setReceiverName] = React.useState('');
    const [date, setDate] = React.useState('');
    const [money, setMoney] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleCreate = () => {
        fetch('http://localhost:8082/api/transactions', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderName: senderName,
                receiverName: receiverName,
                date: date,
                money: money,
                message: message
            })
        })
            .then(res => res.json())
            .then(data => {
                transactions.push(data.data)
                setTransactions(transactions);
                setShow(false)
            })
    }

    const handleDel = (id) => {
        fetch('http://localhost:8082/api/transactions', {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: id
        })
            .then(() => {
                const pos = transactions.findIndex(transaction => transaction.id === id);
                transactions.splice(pos, 1);
                setTransactions([]);
                setTransactions(transactions);
            })
    }

    return (
        <>
            <Button variant="info m-1" onClick={handleShow}>
                New Transactions
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Transactions ID</th>
                        <th>Sender Name</th>
                        <th>Receiver Name</th>
                        <th>Date</th>
                        <th>Amount of Money</th>
                        <th>Message</th>
                        <th>Open</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.id}</td>
                            <td>{transaction.senderName}</td>
                            <td>{transaction.receiverName}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.money}</td>
                            <td>{transaction.message}</td>
                            <td><a href="/transactions/#">Open</a></td>
                            <td>
                                <Button
                                    style={{ backgroundColor: 'red', border: 'none', color: 'white' }}
                                    onClick={e => handleDel(transaction.id)}>Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Transactions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Sender Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputSenderName"
                                    placeholder="Sender Name"
                                    value={senderName}
                                    onChange={e => setSenderName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Receiver Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputReceiverName"
                                    placeholder="Receiver Name"
                                    value={receiverName}
                                    onChange={e => setReceiverName(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputDate"
                                    placeholder="Date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Money</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputMoney"
                                    placeholder="Amount of Money"
                                    value={money}
                                    onChange={e => setMoney(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputMessage"
                                placeholder="Message"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create Transactions
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Transactions