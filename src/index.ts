import express from "express";
import userRouter from "./routes/userRoute";
import notFoundHandler from "./utils/notFoundHandler";
import errorHandler from "./utils/errorHandler";

const app = express();
const port = process.env.PORT || 5050;

//middleware
app.use(express.json());

//router
app.use("/api/v1", userRouter);

//handler undefined routes
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("server is runing on the port is 5050");
});
