import React, { useState, Component } from "react";
import Swagger from "swagger-client";
import PropTypes from "prop-types";
import "./login.css";
const OPENAPI_URL = "/data/Rainmaker_Swagger.yaml";
const requestInterceptor = (request) => {
  console.log(request);
  return request;
};
async function loginUser(credentials) {
  const apiClient = await Swagger({
    url: OPENAPI_URL,
    responseContentType: "application/json",
    authorizations: { AccessToken: "" },
  });
  try {
    const response = await apiClient.apis.User.login(
      { version: "v1" },
      {
        requestBody: credentials,
      }
    );
    return response.body.accesstoken;
  } catch (error) {
    console.log(error);
  }
}

export default function Login({ setToken }) {
  const [user_name, setUserName] = useState();
  const [password, setPassword] = useState();
  const btnClass = "m-4 btn btn-success";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      user_name,
      password,
    });
    setToken(token);
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
