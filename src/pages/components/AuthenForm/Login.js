import React from 'react'
import FormSuccess from './FormSuccess'
// import useForm from '../../../hooks/useForm'
// import validate from '../../../validations/validateInfo'
import './Form.css'

const Login = () => {
    const [isSuccess, setSuccess] = React.useState(false)

    const [username, setUsername] = React.useState("")
    // const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isWrongPass, setIsWrongPass] = React.useState(false)

    const formPreventDefault = (e) => {
        e.preventDefault();
    }


    const handleLogin = async () => {
        console.log("Send: ", username, password)

        let item = { username, password }
        fetch('http://localhost:8082/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then(response => response.json()
        ).then(result => {
            if (result.error === "") {
                console.log("Response: ", result)
                localStorage.setItem("user-info", JSON.stringify(result))
                setSuccess(true)
            } else if (result.error === "WrongPasswd") {
                setIsWrongPass("WrongPasswd")
            }
            return
        }).catch(err => {
            console.log("Err: ", err)
        });
        return
    }

    // const [formSubmit, errors] = useForm(handleLogin, validate)

    return (
        <>
            <div className="form-container">
                <span className="close-btn"></span>
                <div className="form-content-left">
                <img src="img/img-2.svg" alt="spaceship" className="form-img" />
                </div>
               {!isSuccess ? <div className="form-content-right">
                    <form className="form" method='post' onSubmit={formPreventDefault}>
                    <h1>Welcome to our page!</h1>
                        <div className="form-inputs">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                className="form-input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            {/* {errors.username && <p>{errors.username}</p>} */}
                        </div>
                        {/* <div className="form-inputs">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            /> */}
                            {/* {errors.email && <p>{errors.email}</p>} */}
                        {/* </div> */}
                        <div className="form-inputs">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {/* {errors.password && <p>{errors.password}</p>} */}
                        </div>

                        {isWrongPass && <div style={{
                            color: 'red'
                        }}>Wrong Password</div>}
                        <button
                            className="form-input-btn"
                            type="submit"
                            onClick={handleLogin}
                        >
                        Login
                        </button>
                        <span className="form-input-login">
                            Don't have an account? Register
                            <a 
                                style={{
                                    color: 'aqua', 
                                    paddingLeft: '3px',
                                }}
                                href="/signup">
                            Open
                            </a>
                        </span>
                    </form>
                </div> : (<FormSuccess/>)}
            </div>
        </>
    )
}

export default Login