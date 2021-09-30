import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as AWS from "aws-sdk";

// import dotenv from "dotenv";
// dotenv.config();

// AWS.config.update({
//   region: "ap-south-1",
//   endpoint: "https://dynamodb.ap-south-1.amazonaws.com",
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   accessKeyId: process.env.ACCESS_KEY_ID
// });
AWS.config.update({
  region: "ap-south-1",
  endpoint: "https://dynamodb.ap-south-1.amazonaws.com",
  secretAccessKey: "1jS/vibbOT/zyysvgCCdniCEGwNPp8eiXwbnAKmG",
  accessKeyId: "AKIASQE3RQQGR7VW2XOB"
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
