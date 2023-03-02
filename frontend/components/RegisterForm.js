import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { register } from "@/modules/auth/api";

const RegisterForm = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [phone, setPhone] = useState('')
  
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
    event.preventDefault()
    if(password != confirm) return

    const newUser = {
        name: name,
        email: email,
        password: password,
        phone: phone
    }

    register(newUser)
      .then((response) => {
        console.log(response)
        router.push('/login')
      }) 
      .catch((error) => {
        console.log(error)
        //TODO 
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
    <>
      <h1 className="text-center my-5">Create Your Account</h1>
      <Container className="rounded mb-5 py-5 w-50 d-flex justify-content-center shadow">
        <form onSubmit={submitHandler} className="w-100 px-5">
          <div className="mb-4">
            <label className="mb-1">Name</label>
            <input
              id="name"
              type="name"
              className="form-control"
              placeholder="Enter your name..."
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email..."
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-4" style={{ width: "310px" }}>
              <label className="mb-1">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password..."
                value={password}
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="mb-4" style={{ width: "310px" }}>
              <label className="mb-1">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                className="form-control"
                placeholder="Confirm your password..."
                value={confirm}
                onChange={confirmChangeHandler}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-1">Phone Number</label>
            <input
              id="phone"
              type="text"
              className="form-control"
              placeholder="Enter your phone number..."
              value={phone}
              onChange={phoneChangeHandler}
            />
          </div>
          <div className="d-grid mb-4">
            <button type="submit" className="btn btn-primary py-2">
              Create Account
            </button>
          </div>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a className="forgot-password text-right" href="/login">
                Sign In Here!
              </a>
            </p>
          </div>
        </form>
      </Container>
    </>
  );
};

export default RegisterForm;