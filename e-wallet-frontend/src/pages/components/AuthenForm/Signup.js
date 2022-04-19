import React from 'react'
import useForm from '../../../hooks/useForm'
import validate from '../../../validations/validateInfo'
import './Form.css'

const Signup = ({ submitForm }) => {

    const { handleSubmit, errors } = useForm(submitForm, validate);

    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password2, setPassword2] = React.useState("")

    const handleSignup = async () => {
        console.log(username, email, password)
        let item = { username, email, password }
        let result = await fetch('http://localhost:8082/api/user/register', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result))
        // history.push("/login")
    }

    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
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
                    {errors.username && <p>{errors.username}</p>}
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
                    {errors.email && <p>{errors.email}</p>}
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
                    {errors.password && <p>{errors.password}</p>}
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
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <button
                    className="form-input-btn"
                    type="submit"
                    onClick={handleSignup}
                >
                    Sign up
                </button>
                <span className="form-input-login">
                    Already have an account? Login <a href="/login">Open</a>
                </span>
            </form>
        </div>
    )
}

export default Signup

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