import { Container } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <>
      <h1 className="text-center mb-5">Create Your Account</h1>
      <Container className="rounded mb-5 py-5 w-50 d-flex justify-content-center shadow">
        <form className="w-100 px-5">
          <div className="mb-3">
            <label className="mb-1">Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter your name..."
            />
          </div>
          <div className="mb-3">
            <label className="mb-1">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email..."
            />
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-3" style={{ width: "325px" }}>
              <label className="mb-1">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password..."
              />
            </div>
            <div className="mb-3" style={{ width: "325px" }}>
              <label className="mb-1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password..."
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-1">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number..."
            />
          </div>
          <div className="d-grid mb-3">
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
