import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Customers from './pages/components/Customer/Customers';
import Home from './pages/components/Home/Home';
import Profile from './pages/components/Profile/Profile';
import Transactions from './pages/components/Transactions/Transactions';
import Affiliates from './pages/components/Affiliates/Affiliates';
// import Form from './pages/components/AuthenForm/Form';
import './App.css';
import Login from './pages/components/AuthenForm/Login';
import Signup from './pages/components/AuthenForm/Signup';

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
            default:
                return 
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initState);

    React.useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            // console.log("state: ", state)
            try {
                userToken = await localStorage.getItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken })
        }, 1000)

        // return () => console.log("Clean up")
    }, [state])

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
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
        </div>
    );
}

export default App;
