import Swagger from "swagger-client";
const OPENAPI_URL = "/data/Rainmaker_Swagger.yaml";

class RainMaker {
  constructor(token) {
    this.token = token;
  }

  get nodes() {
    return this.getUserNodes();
  }
  async getUserNodes() {
    const apiClient = await Swagger({
      url: OPENAPI_URL,
      responseContentType: "application/json",
      authorizations: { AccessToken: this.token },
    });
    try {
      const response = await apiClient.apis[
        "User Node Association"
      ].getUserNodes({ version: "v1", node_details: true });
      console.log(response.body);
      return response.body;
    } catch (error) {
      console.log(error);
    }
  }
}

export default RainMaker;
