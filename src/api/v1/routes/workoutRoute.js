// In src/api/v1/routes/workoutRoutes.js
//Import express in our router
const express = require("express");

//Import workoutController into our app route to be able to controll our services
const workoutControllers = require("../../../controllers/workoutController.js");

//Import recordController into our application route to access record controls
const recordController = require("../../../controllers/recordController.js");

//Global importation of express router
const router = express.Router();

//This endpoint get all workouts from workoutController
router.get("/", workoutControllers.getAllWorkouts);

//This endpoint gets a single workout from workoutController
router.get("/:workoutId", workoutControllers.getOneWorkout);

//This endpoint gets records from recordController
router.get("/:workoutId/records", recordController.getRecordForWorkout);

//This endpoint creates a single workout into workoutController
router.post("/", workoutControllers.createNewWorkout);

//This endpoint updates a workout in workoutController
router.patch("/:workoutId", workoutControllers.updateOneWorkout);

//This endpoint delete a single workout from workoutController
router.delete("/:workoutId", workoutControllers.deleteOneWorkout);

module.exports = router;
