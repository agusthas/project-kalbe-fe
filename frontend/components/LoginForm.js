import { signIn } from "next-auth/react";
import { useState } from "react";
import { Container } from "react-bootstrap";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <h1 className="text-center my-5">Sign In to Your Account</h1>
      <Container className="rounded mb-5 py-5 w-50 d-flex justify-content-center shadow">
        <form onSubmit={submitHandler} className="w-100 px-5">
          <div className="mb-4">
            <label className="mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email..."
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label className="mb-1">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password..."
              value={password}
              onChange={passwordChangeHandler}
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
            <button type="submit" className="btn btn-primary py-2">
              Sign In
            </button>
          </div>
          <div className="text-center">
            <p>
              Don't have an account yet?{" "}
              <a className="forgot-password text-right" href="/register">
                Register Here!
              </a>
            </p>
          </div>
        </form>
      </Container>
    </>
  );
};

export default LoginForm;
