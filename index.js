import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

import useRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/answers.js";

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/user", useRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

app.get("/", (req, res) =>{
    res.send("this  is stack overflow API");
});

const PORT = process.env.PORT || 5000 ;

const DATABASE_URL = "mongodb+srv://"+ process.env.CLIENT_ID +":"+ process.env.CLIENT_PW + "@stack-overflow.ewc84ae.mongodb.net/stackoverflowDB?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => {console.log(err.message)})