import client from "rainmaker-client";

class RainMaker {
  RMaker;
  constructor(username, password) {
    this.username = username;
    this.password = password;
<<<<<<< HEAD
    this.RMaker = new client(this.username, this.password);
    this.connected = false;
=======
    this.RMaker = new client(
      this.username,
      this.password,
      "https://raw.githubusercontent.com/sahilkhanna/rainmaker-iot-dashboard/master/public/data/Rainmaker_Swagger.yaml"
    );
>>>>>>> 514e5809956f014d077582e93c6d90c7584e194c
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
    const res = await this.RMaker.authenticate();
    if (res.status === 200) {
      this.connected = true;
    } else {
      this.connected = false;
    }
    return res;
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
