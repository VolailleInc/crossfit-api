//Import record service from recordService
const recordService = require("../services/recordsService.js");

const getRecordForWorkout = () => {
  try {
    const allRecords = recordService.getRecordForWorkout();
    res.send({ status: "OK", data: allRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "Failed", data: { error: error?.message || error } });
  }
};
module.exports = { getRecordForWorkout };
