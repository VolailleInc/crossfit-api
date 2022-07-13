//Import record service from recordService
const recordService = require("../services/recordsService.js");

const getRecordForWorkout = (req, res) => {
  //Assign the request object with parameters you want to retrieve
  const {
    params: { workoutId },
  } = req;
  //Determine errors if there any with workoutId
  if (!workoutId) {
    res.status(400).send({
      status: "Not Found",
      data: { error: "Parameter ' :workId' can not be empty" },
    });
  }
  try {
    const allRecords = recordService.getRecordForWorkout(workoutId);
    res.send({ status: "OK", data: allRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};
module.exports = { getRecordForWorkout };
