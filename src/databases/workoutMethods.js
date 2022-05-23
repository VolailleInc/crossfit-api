const DB = require("./db.json");
const { saveToDatabase } = require("./utils.js");

//The method below return all the data in the database
const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Cannot fetch workouts with the id ${workoutId} `,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//The method below post the created data in the database
const createdNewWorkouts = (newWorkout) => {
  try {
    const isAlreadyCreated =
      DB.workouts.findIndex((workout) => workout.name == newWorkout.name) > -1;
    if (isAlreadyCreated) {
      throw {
        status: 400,
        message: `Workout with the name ${newWorkout.name} already exists`,
      };
    }
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const itAlreadyExist =
      DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;

    if (itAlreadyExist) {
      throw {
        status: 400,
        message: `Workout with the name'${chnages.name}' already exists`,
      };
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDelete = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find workout with id ${workoutId}`,
      };
    }
    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createdNewWorkouts,
  updateOneWorkout,
  deleteOneWorkout,
};
