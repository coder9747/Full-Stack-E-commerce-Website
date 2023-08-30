import express from "express";
import Connect from "./Database/Database.js";
import Router from "./Routes/UserRoutes.js";
import dotenv from "dotenv";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


app.use("/api/user",Router);

app.listen(4500,()=>{
    console.log("App Running At port 4500");
    Connect();
})