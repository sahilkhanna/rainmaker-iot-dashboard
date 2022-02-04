import React, { Component } from "react";
import Swagger from "swagger-client";
const OPENAPI_URL = "/data/Rainmaker_Swagger.yaml";

async function getUser(token) {
  const apiClient = await Swagger({
    url: OPENAPI_URL,
    responseContentType: "application/json",
    authorizations: { AccessToken: token },
  });
  try {
    const response = await apiClient.apis.User.getUser({ version: "v1" });
    console.log(response.body);
    return response.body;
  } catch (error) {
    console.log(error);
  }
}

class Welcome extends Component {
  state = {
    user: "",
  };
  async componentDidMount() {
    const user = await getUser(this.props.auth);
    this.setState({ user: user.user_name });
  }
  render() {
    return (
      <div>
        <span>Welcome {this.state.user}</span>
      </div>
    );
  }
}

export default Welcome;
