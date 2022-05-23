//Global imports
const express = require("express");
const bodyParser = require("body-parser");

// ! Add  the hook for v1.0
const v1WorkoutRouter = require("./api/v1/routes/workoutRoute.js");

const app = express();
const PORT = process.env.PORT || 3000;

//Link the app to the database for updates
app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API listening at port ${PORT}`);
});
