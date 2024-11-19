import express from "express";
import { publicRouter } from "../route/public-route.js";
import { privateRouter } from "../route/private-api.js";
const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(publicRouter);
web.use(privateRouter);

export default web;
