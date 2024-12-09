import express from "express";
import { publicRouter } from "../route/public-route.js";
import { privateRouter } from "../route/private-api.js";
import { errorHandler } from "../middleware/error-handler.js";
import cors from "cors";
const web = express();
web.set("trust proxy", 1); 

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(cors());
web.use(publicRouter);
web.use(privateRouter);
web.use(errorHandler);

export default web;
