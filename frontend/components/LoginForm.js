import { Container } from "react-bootstrap";

const LoginForm = () => {
  return (
    <>
      <h1 className="text-center my-5">Sign In to Your Account</h1>
      <Container className="rounded mb-5 py-5 w-50 d-flex justify-content-center shadow">
        <form className="w-100 px-5">
          <div className="mb-4">
            <label className="mb-1">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email..."
            />
          </div>
          <div className="mb-4">
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password..."
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
