import { RegisterUser,loginUser } from "../Controller/UserController.js";
import express from "express";

const Router = express.Router();

Router.post("/register",RegisterUser);
Router.post("/login",loginUser);










export default Router;