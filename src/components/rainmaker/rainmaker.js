import client from "rainmaker-client";

class RainMaker {
  RMaker;
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.RMaker = new client(
      this.username,
      this.password,
      "https://raw.githubusercontent.com/sahilkhanna/rainmaker-iot-dashboard/master/public/data/Rainmaker_Swagger.yaml"
    );
  }

  get nodes() {
    return this.getUserNodes();
  }
  isSuccess(params) {
    if (typeof params != "number") {
      throw new Error("Argument is not a number");
    }
    return params.toString()[0] === "2";
  }
  async authenticate() {
    return await this.RMaker.authenticate();
  }
  async getUserNodes() {
    const response = await this.RMaker.getUserNodes(true);
    if (this.isSuccess(response.status)) {
      return response.result;
    } else {
      return {};
    }
  }
}

export default RainMaker;
