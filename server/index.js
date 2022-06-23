import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import postRoutes from "./routes/postRoute.js";
import userRoutes from "./routes/userRoute.js";

const app = express();
//for bodyParser to properly send images large in size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Greetings!!!");
});

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_URI;

//useNewUrlParser, useUnifiedTopology and useFindAndModify are all for console warnings
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

//deprecated: mongoose.set('useFindAndModify', false);
