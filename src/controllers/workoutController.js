/*Lets require the workoutService module */
const workoutServices = require("../services/workoutService.js");

/*These are methods for each endpoint */
const getAllWorkouts = (req, res) => {
  //Retrieve allworkout from workoutService module
  try {
    const allWorkouts = workoutServices.getAllWorkouts();
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

//Retrieve a single workout from the workOutservice
const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res.status(400).send({
      status: "Not Found",
      data: { error: "Parameter ' :workId' can not be empty" },
    });
  }
  try {
    const singleWorkout = workoutServices.getOneWorkout(workoutId);
    res.send({ status: "OK", data: singleWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};

const createNewWorkout = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res.status(400).send({
      status: "Internal Server Error",
      data: {
        error:
          "One of the following keys is missing or empty in request body:'name','mode','equipment' ,'trainerTips'",
      },
    });
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  //Creates a new workout from the workOutservice
  try {
    const createdWorkout = workoutServices.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
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
  //Update an existing workout with workOutservice module
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
      data: { error: "Parameter ' :workoutId can not be empty" },
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
