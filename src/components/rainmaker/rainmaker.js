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
    this.connected = false;
    this.refreshToken = null;
  }

  get nodes() {
    return this.getUserNodes();
  }
  get userGroups() {
    return this.getUserGroups();
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
      this.refreshToken = this.RMaker.refreshToken;
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
  async getUserGroups() {
    const response = await this.RMaker.getUserGroupDetails(true);
    if (this.isSuccess(response.status)) {
      return response.result;
    } else {
      return {};
    }
  }
  async getUserGroupDetails(groupID) {
    const response = await this.RMaker.getUserGroupDetails(true, groupID, true);
    if (this.isSuccess(response.status)) {
      return response.result;
    } else {
      return {};
    }
  }
}

export default RainMaker;
