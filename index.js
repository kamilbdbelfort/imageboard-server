const express = require("express");
const userRouter = require("./routers/image");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");
const app = express();
const jsonParser = express.json();
const PORT = process.env.PORT || 4000;

// parser middleware
app.use(jsonParser);

// registered routes
app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Listening to the port: ${PORT}`));
