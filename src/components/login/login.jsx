import React, { useState, Component } from "react";
import RainMaker from "../rainmaker/rainmaker";
import PropTypes from "prop-types";
import { loadingSVG } from "../helper/helper";
import "./login.css";
const requestInterceptor = (request) => {
  console.log(request);
  return request;
};
async function loginUser(credentials) {
  const client = new RainMaker(credentials.user_name, credentials.password);
  const result = await client.authenticate();
  return { result: result, client: client };
}

export default function Login({ setToken, setClient }) {
  const [user_name, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const btnClass = "m-4 btn btn-success";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser({
      user_name,
      password,
    });
    setLoading(false);
    if ((response.result.status = 200)) {
      setClient(response.client);
      setToken(true);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="m-4 input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              Username
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="m-4 input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              Password
            </span>
          </div>
          <input
            type="password"
            className="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className={btnClass} type="submit">
            {loading ? loadingSVG : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setClient: PropTypes.func.isRequired,
};
