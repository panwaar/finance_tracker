const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

dotenv.config(); 

const app = express();

//! Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Connection Failed", e));

//! CORS Configuration
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};
app.use(cors(corsOptions));

//! Middleware
app.use(express.json());

//! Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//! Error Handler
app.use(errorHandler);

//! Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
