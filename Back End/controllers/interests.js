const models = require("../models");
const interest = models.interest;
const users = models.user;

// Returns all interests
async function getAllInterests() {
  const interests = await interest.findAll();
  return interests;
}

// Creates Interest
async function createInterest(postData) {
  const existingInterest = await interest.findOne({
    where: {
      interestName: postData.interestName,
    },
  });
  if (existingInterest !== null) {
    return existingInterest;
  }

  const interestData = await interest.create({
    interestName: postData.interestName,
  });
  return interestData;
}

module.exports = {
  getAllInterests: getAllInterests,
  createInterest: createInterest,
};
