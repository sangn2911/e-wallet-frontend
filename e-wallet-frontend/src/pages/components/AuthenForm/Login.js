import React from 'react'
import './Form.css'

const Login = () => {
    return (
        <div className="form-container">
            <span className="close-btn">x</span>
            <div className="form-content-left">
                <img src="img/img-2.svg" alt="spaceship" className="form-img" />
            </div>
            <div className="form-content-right">
                <form className="form">
                    <h1>Login</h1>
                    {/* ERROR! */}
                    <div className="form-inputs">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="form-input-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login