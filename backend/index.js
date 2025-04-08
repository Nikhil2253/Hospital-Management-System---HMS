import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
const PORT = 5000;

app.use(express.json()); 
app.use(cors());
app.use("/api", routes);

mongoose.connect("mongodb://localhost:27017/hms-negaproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");

    app.listen(PORT, async () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });
