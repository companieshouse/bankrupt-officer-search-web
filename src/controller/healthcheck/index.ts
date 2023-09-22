import { Handler} from "express";

const healthcheckEndpoint: Handler = (req, res) => {
  res.sendStatus(200);
};

export { healthcheckEndpoint };