import { signIn } from "next-auth/react"
import { useState } from "react"
import { Container } from "react-bootstrap"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [alert, setAlert] = useState('')

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    if (password.length < 8) {
      setAlert('Password must be at least 8 characters')
    } else{
      await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/",
      })
    }

  }

  return (
    <div style={{minHeight: '85vh'}}>
      <h1 className="text-center my-5" style={{fontWeight: 'bold'}}>Sign In to Your Account</h1>
      <Container className="rounded mb-5 py-5 w-50 d-flex justify-content-center shadow">
        <form onSubmit={submitHandler} className="w-100 px-5">
          <div className="mb-4">
            <label className="mb-1" style={{fontWeight: 'bold'}}>Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email..."
              value={email}
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-1" style={{fontWeight: 'bold'}}>Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password..."
              value={password}
              onChange={passwordChangeHandler}
              required
            />
          </div>
          <div className="mb-4">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label
                className="custom-control-label mx-2"
                htmlFor="customCheck1"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid mb-4">
            <button type="submit" className="btn btn-primary py-2" style={{fontWeight: 'bold'}}>
              Sign In
            </button>
          </div>
          <div className="text-center">
            <p>
              Don't have an account yet?{" "}
              <a className="forgot-password text-right" href="/register" style={{fontWeight: 'bold'}}>
                Register Here!
              </a>
            </p>
          </div>
          {alert && <p className="d-flex flex-column text-center text-danger p-2" style={{borderRadius:'10px', backgroundColor: '#ffc7d0'}}> {alert} </p>}
        </form>
      </Container>
    </div>
  )
}

export default LoginForm
