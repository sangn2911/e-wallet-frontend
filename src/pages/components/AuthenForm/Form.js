import React from 'react'
import Signup from './Signup'
import FormSuccess from './FormSuccess'
import Login from './Login'
import './Form.css'

const Form = () => {

  const [casePage, setCase] = React.useState("signUpPage")

  function setLoginPage() {
    console.log("SesetLoginPaget")
    setCase("loginPage");
  }

  function setSuccessPage(page) {
    setCase(page);
  }

  return (
    <>
      <div className="form-container">
        <span className="close-btn"></span>
        <div className="form-content-left">
          <img src="img/img-2.svg" alt="spaceship" className="form-img" />
        </div>
        {casePage === "signUpPage" && (<Signup submitForm={setLoginPage} />)}
        {casePage === "loginPage" && (<Login submitForm={setSuccessPage} />)}
        {casePage === "SuccessPage" && (<FormSuccess/>)}
      </div>
    </>
  )
}

export default Form