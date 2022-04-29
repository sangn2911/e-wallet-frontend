import React from 'react'
// import useForm from '../../../hooks/useForm'
// import validate from '../../../validations/validateInfo'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()

    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password2, setPassword2] = React.useState("")
    const [isExist, setIsExist] = React.useState(false)

    // const { register, handleSubmit, watch, formState: { errors } } = useForm(validate: validate);
    const formPreventDefault = (e) => {
        e.preventDefault();
    }

    const handleSignup = async () => {
        console.log("Send: ", username, email, password)
        if (password !== password2) return

        let item = { username, email, password }
        fetch('http://localhost:8082/api/user/register', {
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
                navigate("../login", { replace: true });
            } else if (result.error === "ExistUser") {
                setIsExist("ExistUser")
            }
        }).catch(err => {
            console.log("Err: ", err)
        });
    }


    return (
        <>
            <div className="form-container">
                <span className="close-btn"></span>
                <div className="form-content-left">
                    <img src="img/img-2.svg" alt="spaceship" className="form-img" />
                </div>
                <div className="form-content-right">
                    <form className="form" method='post' onSubmit={formPreventDefault}>
                        <h1>Get started with us today! Create your account by filling out the information below.</h1>
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
                        <div className="form-inputs">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {/* {errors.email && <p>{errors.email}</p>} */}
                        </div>
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
                        <div className="form-inputs">
                            <label htmlFor="password2" className="form-label">Confirm password</label>
                            <input
                                id="password2"
                                type="password"
                                name="password2"
                                className="form-input"
                                placeholder="Enter your confirm password"
                                value={password2}
                                onChange={e => setPassword2(e.target.value)}
                            />
                            {/* {errors.password2 && <p>{errors.password2}</p>} */}
                        </div>
                        {password !== password2 && <div style={{
                            color: 'red'
                        }}>Passwords are not the same</div>}
                        {isExist && <div style={{
                            color: 'red'
                        }}>Username is exist</div>}
                        <button
                            className="form-input-btn"
                            type="submit"
                            onClick={handleSignup}
                        >
                            Sign up
                        </button>
                        <span className="form-input-login">
                            Already have an account? Login
                            <a
                                style={{
                                    color: 'aqua',
                                    paddingLeft: '3px',
                                }}
                                href="/login">
                                Open
                            </a>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
