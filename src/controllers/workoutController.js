/*Lets require the workoutService module */
const workoutServices = require("../services/workoutService.js");

/*These are methods for each endpoint */

// Retrieve allworkout from workoutService module
const getAllWorkouts = (req, res) => {
  try {
    const allWorkouts = workoutServices.getAllWorkouts();
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

// Retrieve a single workout from the workOutservice
const getOneWorkout = (req, res) => {
  // Assign the request object with parameters you want to retrieve
  const {
    params: { workoutId },
  } = req;

  // Determine errors if there any with workoutId
  if (!workoutId) {
    res.status(400).send({
      status: "Not Found",
      data: { error: `Parameter  :'${workoutId}' can not be empty` },
    });
  }

  // If there are no errors with workoutId, retrieve a workout from services
  // by calling getOneWorkout method on workoutServices and pass on workoutId getOneWorkout
  try {
    // singleWorkout is assigned the retrieve workouts
    const singleWorkout = workoutServices.getOneWorkout(workoutId);

    // respond with status code and data if everything went well
    res.send({ status: "OK", data: singleWorkout });
  } catch (error) {
    // catch and respond with error if there are errors
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

// The function below will create a new instance of workout
const createNewWorkout = (req, res) => {
  // req is assigned the body of the request
  const { body } = req;

  // Test the schema of the new workouts excercise object and return
  // appropriate error if the test fails
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "Missing keys",
      data: {
        error:
          "One of the following keys is missing or empty in request body:'name','mode','equipment' ,'trainerTips'",
      },
    });
    return;
  }

  // If the test passes assign the newWorkout object
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  // Creates a new workout from the workOutservice
  try {
    // Create a workout from workaoutservices by calling creatNewWorkout method on
    // workoutServices and pass on newWorkout.

    const createdWorkout = workoutServices.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    // catch and report any error if there is anything
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: "Failed",
      data: { error: "Parameter ' :workoutId' can not be empty" },
    });
    return;
  }

  // Update an existing workout with workOutservice module
  try {
    const updatedWorkout = workoutServices.updateOneWorkout();
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workout) {
    res.status(400).send({
      status: "Failed",
      data: { error: `Parameter :${workoutId} can not be empty` },
    });
  }
  try {
    workoutServices.deleteOneWorkout();
    res.status(204).send({ status: "Successfully deleted" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
