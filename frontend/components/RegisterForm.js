import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { register } from "@/modules/auth/api";
import Link from "next/link";
import { Alert } from "react-bootstrap";

const RegisterForm = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [phone, setPhone] = useState('')

  const [alertName, setAlertName] = useState('')
  const [alertPassword, setAlertPassword] = useState('')
  const [alertConfirm, setAlertConfrim] = useState('')
  const [alertPhone, setAlertPhone] = useState('')

  const [erorrAlert, setErrorAlert] = useState('');
  
  const nameChangeHandler = event => {
    setName(event.target.value)
  }

  const emailChangeHandler = event => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = event => {
    setPassword(event.target.value)
  }

  const confirmChangeHandler = event => {
    setConfirm(event.target.value)
  }

  const phoneChangeHandler = event => {
    setPhone(event.target.value)
  }

  const submitHandler = event => {
    setErrorAlert('');

    event.preventDefault()
    if(password != confirm) {
      setAlertConfrim('Confirm Password must be same with Password')
      return
    } else if(password == confirm){
      setAlertConfrim('')
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        phone: phone
    }

    if(name.length > 50){
      setAlertName('Name must be not exceed 50 characters')
    } else if (name.length < 50) {
      setAlertName('')
    }

    if (password.length < 8) {
      setAlertPassword('Password must be at least 8 characters')
    } else if (password.length > 8){
      setAlertPassword('')
    }

    if(phone.length < 10 || phone.length > 15){
      setAlertPhone('Phone length must be between 10 and 15')
    } else if (phone.length > 10 || phone.length < 15){
      setAlertPhone('')
    }
    
    register(newUser)
      .then((response) => {
        console.log(response)
        router.push('/login')
      }) 
      .catch((error) => {
        console.log(error)
        setErrorAlert(error)
      })
      .finally(() => {
        setName('')
        setEmail('')
        setPassword('')
        setConfirm('')
        setPhone('')
      })
  }

  return (
    <div style={{minHeight: '85vh'}}>
      <h1 className="text-center my-5" style={{fontWeight: 'bold'}}>Create Your Account</h1>
      <Container className="rounded mb-5 py-5 w-50 d-flex justify-content-center shadow">
        <form onSubmit={submitHandler} className="w-100 px-5">
          {erorrAlert && (
            <Alert variant="danger">
              <span>{erorrAlert.response.status}: {erorrAlert.response.data.message}</span>
            </Alert>
          )}
          <div className="mb-4">
            <label className="mb-1" style={{fontWeight: 'bold'}}>Name</label>
            <input
              id="name"
              type="name"
              className="form-control"
              placeholder="Enter your name..."
              value={name}
              onChange={nameChangeHandler}
              required
            />
            {alertName && <p className="d-flex flex-column text-danger mt-1"> {alertName} </p>}
          </div>
          <div className="mb-4">
            <label className="mb-1" style={{fontWeight: 'bold'}}>Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email..."
              value={email}
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-4" style={{ width: "310px" }}>
              <label className="mb-1" style={{fontWeight: 'bold'}}>Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                value={password}
                onChange={passwordChangeHandler}
                required
              />
              {alertPassword &&  <p className="d-flex flex-column text-danger mt-1"> {alertPassword} </p>}
            </div>
            <div className="mb-4" style={{ width: "310px" }}>
              <label className="mb-1" style={{fontWeight: 'bold'}}>Confirm Password</label>
              <input
                id="confirm"
                type="password"
                className="form-control"
                placeholder="Confirm your password..."
                value={confirm}
                onChange={confirmChangeHandler}
                required
              />
              {alertConfirm && <p className="d-flex flex-column text-danger mt-1"> {alertConfirm} </p>}
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-1" style={{fontWeight: 'bold'}}>Phone Number</label>
            <input
              id="phone"
              type="text"
              className="form-control"
              placeholder="Enter your phone number..."
              value={phone}
              onChange={phoneChangeHandler}
              required
            />
            {alertPhone && <p className="d-flex flex-column text-danger mt-1"> {alertPhone} </p>}
          </div>
          <div className="d-grid mb-4">
            <button type="submit" className="btn btn-primary py-2" style={{fontWeight: 'bold'}}>
              Create Account
            </button>
          </div>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link className="forgot-password text-right" href="/login" style={{fontWeight: 'bold'}}>
                Sign In Here!
              </Link>
            </p>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default RegisterForm;