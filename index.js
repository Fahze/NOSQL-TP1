import express from "express";
import dotenv from "dotenv";
import router from "./profiles/index.js";
import connectDB from "./mangodb.js";

dotenv.config();

const app = express();
const port = parseInt("8000");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get("/", (req, res) => {
  res.send("Serveur op!");
});

app.use("/api/profiles/", router);

app.listen(port, () => {
  console.log(`Service tourne sur le port: ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Erreur serveur",
    message: err.message,
  });
});
