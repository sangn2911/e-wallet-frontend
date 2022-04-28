import React from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, Button, Modal, Form, Nav } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './style.module.css';

function Profile() {

    let params = useParams();

    
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showModalDocument, setShowModalDocument] = React.useState(false);

    const handleCloseModalEdit = () => setShowModalEdit(false);
    const handleShowModalEdit = () => setShowModalEdit(true);

    const handleCloseModalDocument = () => setShowModalDocument(false);
    const handleShowModalDocument = () => setShowModalDocument(true);

    const [customer, setCustomer] = React.useState({});
    const [document, setDocument] = React.useState({});
    const [documents, setDocuments] = React.useState([]);


    React.useEffect(() => {

        fetch('http://localhost:8082/api/customer/' + 1)
            .then(res => res.json())
            .then(customer => {
                setCustomer(customer)
            });
    }, [])

    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [nationality, setNationality] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleSubmitModalEdit = () => {

        fetch('http://localhost:8082/api/customer/' + params.id, {
            method: 'PUT',
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
            .then((data) => {
                setShowModalEdit(false);
                setCustomer(data);
            })
    }

    React.useEffect(() => {
        fetch('http://localhost:8082/api/document/' + 1)
            .then(res => res.json())
            .then(documents => {
                setDocuments(documents)
            })
    }, [])

    const [docType, setDocType] = React.useState('');
    const [docNumber, setDocNumber] = React.useState('');
    const [issuingAuthority, setIssuingAuthority] = React.useState('');
    const [expiryDate, setExpiryDate] = React.useState('');
    const [img, setImg] = React.useState('');

    const handleSubmitModalDocument = () => {

        fetch('http://localhost:8082/api/document/' + params.id, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                docType: docType,
                docNumber: docNumber,
                issuingAuthority: issuingAuthority,
                expiryDate: expiryDate,
                img: img
            })
        })
            .then(res => res.json())
            .then((data) => {
                setShowModalDocument(false);
                setDocument(data);
            })
    }

    const [status, setStatus] = React.useState("Pending");
    const riskLevelInit = clsx(styles.riskProfileAvailableLevel0);
    let [riskLevel, setRiskLevel] = React.useState(riskLevelInit);


    const handleCheck = () => {

        if (documents.length > 0) {

            if (documents.length === 1) {
                alert("Success")
                riskLevel = clsx(styles.riskProfileAvailableLevel1)
                setRiskLevel(riskLevel)
            }
            if (documents.length === 2) {
                alert("Success")
                riskLevel = clsx(styles.riskProfileAvailableLevel2)
                setRiskLevel(riskLevel)
            }
            if (documents.length === 3) {
                alert("Success")
                riskLevel = clsx(styles.riskProfileAvailableLevel3)
                setRiskLevel(riskLevel)
            }
            if (documents.length > 3) {
                alert("Success")
                riskLevel = clsx(styles.riskProfileAvailableLevel4)
                setRiskLevel(riskLevel)
            }
            // setStatus("Success")
        }
        else {
            alert("Failed")
            setStatus("Failed")
        }
    }

    const checkKYC = () => {
        
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

        return (
            <Row className={clsx(styles.bottomBlock, "mb-2", "p-3")}>
                <h6>KYC INFORMATION</h6>
                <span>Date: {date}</span>
                <span>By: {`${customer.firstName} ${customer.lastName}`}</span>
                <span>Ref: wb0xrn3q0sxx4kmt0rlc</span>
                <span>Status: {status}</span>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCheck}
                >
                    RUN KYC CHECK
                </button>
            </Row>
        )
    }

    return (
        <>
            <Container fluid>
                <Row className={clsx(styles.header, "p-2")}>
                    <Col>
                        <h5>RISK PROFILE</h5>
                        <div className={styles.riskProfile}>
                            <div id="risk" className={riskLevel}></div>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5>TOTAL LAST MONTH</h5>
                                <span>1.300.000 VND</span>
                            </Col>
                            <Col>
                                <h5>TOTAL LAST YEAR</h5>
                                <span>5.200.000 VND</span>
                            </Col>
                            <Col>
                                <h5>TXNS MONTH/YEAR</h5>
                                <span>2/2</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={styles.body}>
                    <Col xl={3}>
                        <Row className={clsx(styles.topBlock, "text-center", "p-3")}>
                            <img className={styles.avatar}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DeyZNqRdLF9WiyJOo7YQW5HxbSp3F6tNQQ&usqp=CAU" 
                            />
                            <h4>{customer.id}</h4>
                            <h5>INDIVIDUAL PROFILE</h5>
                            <Row>
                                <Col>
                                    <Button variant="primary" onClick={handleShowModalEdit}>
                                        Edit
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" onClick={handleShowModalDocument}>
                                        Document
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                        <Row className={clsx(styles.centerBlock, "mb-2", "p-3")}>
                            <h4>{`${customer.firstName} ${customer.lastName}`}</h4>
                            <h6>{customer.dateOfBirth}</h6>
                            <span>{customer.address}</span>
                        </Row>
                        {checkKYC()}
                    </Col>
                    <Col xl={9}>
                        <Row className={clsx(styles.firstBlock, "mb-2", "p-3")}>
                            <h4>ACCOUNT DETAILS</h4>
                            <Table striped bordered hover className={styles.accountDetails}>
                                <thead>
                                    <tr>
                                        <th>ACCOUNT BALANCE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>15.000.000 VND</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        <Row className={clsx(styles.secondBlock, "p-3")}>
                            <h4>TRANSACTION HISTORY</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Beneficiary</th>
                                        <th>Money</th>
                                        <th>Currency</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1/1/2021</td>
                                        <td>BaoLe</td>
                                        <td>100000</td>
                                        <td>VND</td>
                                        <td>Success</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>10/8/2021</td>
                                        <td>TuanTran</td>
                                        <td>200000</td>
                                        <td>VND</td>
                                        <td>Success</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModalEdit} onHide={handleCloseModalEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Customer</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseModalEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitModalEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalDocument} onHide={handleCloseModalDocument}>
                <Modal.Header closeButton>
                    <Modal.Title>Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Type of Identity Document</Form.Label>
                            <Form.Control
                                type="text"
                                id="inputDocType"
                                value={docType}
                                onChange={e => setDocType(e.target.value)}
                            />
                            {/* <Form.Select>
                                <option>--- Select ---</option>
                                <option value="1">Driver's License</option>
                                <option value="2">ID Card</option>
                                <option value="3">Passport</option>
                            </Form.Select> */}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Document Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputDocNumber"
                                    value={docNumber}
                                    onChange={e => setDocNumber(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Authority</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputIssuingAuthority"
                                    value={issuingAuthority}
                                    onChange={e => setIssuingAuthority(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputExpiryDate"
                                    value={expiryDate}
                                    onChange={e => setExpiryDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formFile" className="mb-3">
                                <Form.Label>File</Form.Label>
                                <Form.Control
                                    type="file"
                                    value={img}
                                    onChange={e => setImg(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Doc type</th>
                                <th>Number</th>
                                <th>Authority</th>
                                <th>Expiry</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((document, index) => (
                                <tr key={index}>
                                    <td>{document.docType}</td>
                                    <td>{document.docNumber}</td>
                                    <td>{document.issuingAuthority}</td>
                                    <td>{document.expiryDate}</td>
                                    <td>{document.img}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalDocument}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitModalDocument}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Profile;