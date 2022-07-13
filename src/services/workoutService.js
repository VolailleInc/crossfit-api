//import the workMethod module

const { v4: uuid } = require("uuid");
const workMethods = require("../databases/workoutMethods");

const getAllWorkouts = () => {
  try {
    const allWorkouts = workMethods.getAllWorkouts();
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = workMethods.getOneWorkout(workoutId);
    return workout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = (newWorkout) => {
  // **ADD**
  const workoutToCreate = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "GMT" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "GMT" }),
  };
  //**ADD **/
  try {
    const createdWorkout = workMethods.createNewWorkout(workoutToCreate);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const updatedWorkout = workMethods.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error) {
    throw error;
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    workMethods.deleteOneWorkout(workoutId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
