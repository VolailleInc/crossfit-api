const recordMethod = require("../databases/recordMethod.js");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = recordMethod.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

module.exports = { getRecordForWorkout };
