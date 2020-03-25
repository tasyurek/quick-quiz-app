const express = require("express");
require("./src/db/mongoose");
const userRouter = require("./src/routers/user");
const courseRouter = require("./src/routers/course");
const assignmentRouter = require("./src/routers/assignment");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(courseRouter);
app.use(assignmentRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));

/*
            Teacher -> Create class -> Push quiz -> Look statistic 
          /
  user -> 
          \
            Student -> Register to class -> Submit quiz -> 

*/
