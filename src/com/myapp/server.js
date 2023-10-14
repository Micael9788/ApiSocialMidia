import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { mongodbAPI } from "./db/mongo_db.js";

dotenv.config()

const APP = express();
const apiPORT = process.env.API_PORT || 3000;

APP.use(cors());
APP.use(express.json());

APP.listen(apiPORT, async () => {
  try {
    await mongodbAPI();
    APP.emit("online");
  } catch(error) {
    console.log("error ao iniciar a api no listener " + error);
  }
});


APP.on("online", () => {
  console.log("api rodando na porta " + apiPORT);
});