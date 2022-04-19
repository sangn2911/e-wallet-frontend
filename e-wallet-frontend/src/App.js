import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Customers from './pages/components/Customer/Customers';
import Home from './pages/components/Home/Home';
import Profile from './pages/components/Profile/Profile';
import Transactions from './pages/components/Transactions/Transactions';
import Affiliates from './pages/components/Affiliates/Affiliates';
import Form from './pages/components/AuthenForm/Form';
import Login from './pages/components/AuthenForm/Login'
import './App.css';

function App() {

    const initState = {
        isLoading: true,
        userName: null,
        userToken: null,
    }

    const reducer = (prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'SIGN_UP':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: null,
                    isLoading: false,
                }
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initState);

    const authContext = React.useMemo(() => ({
        // signIn: async (username, phoneNumber, password) => {
        //     let userToken = null;
        //     if (username !== null && phoneNumber !== null && password !== null) {
        //         try {
        //             await fetch('http://192.168.1.2:8082/api/user/login', {
        //                 method: 'POST',
        //                 headers: {
        //                     'Accept': '*/*',
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({
        //                     username: username,
        //                     phoneNumber: phoneNumber,
        //                     password: password
        //                 })
        //             })
        //                 .then(res => res.text())
        //                 .then(data => {
        //                     console.log(data)
        //                     if (data !== "Tài khoản hoặc số điện thoại hoặc mật khẩu không chính xác") {
        //                         userToken = data;
        //                         localStorage.setItem('userToken', data)
        //                     }

        //                     // fetch('http://192.168.1.2:8082/hello', {
        //                     //     method: 'GET',
        //                     //     headers: {
        //                     //         'Authorization': `Token ${data}`
        //                     //     }
        //                     // })
        //                     //     .then(res => res.text())
        //                     //     .then(message => {
        //                     //         console.log(message)
        //                     //     })
        //                     //     .catch(error => console.log(error))
        //                 })
        //                 .catch(error => console.log(error));
        //         } catch (e) {
        //             console.log(e)
        //         }
        //         dispatch({ type: 'LOGIN', id: username, token: userToken })
        //     }
        // },
        // signOut: async () => {
        //     try {
        //         await localStorage.removeItem('userToken')
        //     } catch (e) {
        //         console.log(e)
        //     }
        //     dispatch({ type: 'LOGOUT' })
        // },
        signUp: async (username, phoneNumber, password) => {
            if (username !== null && phoneNumber !== null && password !== null) {
                try {
                    const body = JSON.stringify({
                        username: username,
                        phoneNumber: phoneNumber,
                        password: password
                    })
                    console.log(body)
                    await fetch('http://192.168.1.2:8082/api/user/register', {
                        method: 'POST',
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                        },
                        body: body
                    })
                        .then(res => res.text())
                        .then(data => {
                            console.log(data)
                            // fetch('http://192.168.1.2:8082/hello', {
                            //     method: 'GET',
                            //     headers: {
                            //         'Authorization': `Token ${data}`
                            //     }
                            // })
                            //     .then(res => res.text())
                            //     .then(message => {
                            //         console.log(message)
                            //     })
                            //     .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error));
                } catch (e) {
                    console.log(e)
                }
                dispatch({ type: 'SIGN_UP', id: username });
            }
        },
    }), [])

    React.useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            try {
                userToken = await localStorage.getItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken })
        }, 1000)
    }, [])

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">E-WALLET</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/customers">Customers</Nav.Link>
                            <Nav.Link href="/transactions">Transactions</Nav.Link>
                            <Nav.Link href="/affiliates">Affiliates</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </Navbar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/profile/:id" element={<Profile />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/affiliates" element={<Affiliates />} />
                <Route path="/signup" element={<Form />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
