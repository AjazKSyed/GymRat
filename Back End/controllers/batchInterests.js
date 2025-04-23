const models = require("../models");
const batchInterest = models.BatchInterests;
const interest = models.interest;
const { literal, Op, query, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

async function getAllBatchInterests(batchId) {
  const batch_ints = await sequelize.query(
    `
  SELECT "BatchInterests"."BatchGroupId", "BatchInterests"."interestId", "BatchInterests"."createdAt",
  "BatchInterests"."updatedAt", "interest"."id", "interest"."interestName", "interest"."createdAt", "interest"."updatedAt"
  FROM "BatchInterests" LEFT OUTER JOIN "interests" AS "interest"
  ON "BatchInterests"."interestId" = "interest"."id" WHERE "BatchInterests"."BatchGroupId" = ${batchId};
  `,
    { type: sequelize.QueryTypes.SELECT }
  );
  return batch_ints;
}
/* LATER ADDITION:
     (FIND BATCHES BY TOPICS)
     CHECK THE USER INTERESTS FIND BY INTERESTS ID METHOD
*/

async function addBatchInterest(req) {
  const batchId = JSON.parse(req.body.batchId);
  const interests = JSON.parse(req.body.interests);

  let arrayedInts = interests.join();

  if (arrayedInts == undefined) {
    return "no interests added";
  } else {
    Array.prototype.forEach.call(interests, async (interest) => {
      const existingBatchInterest = await sequelize.query(
        `
      SELECT "BatchGroupId", "interestId", "createdAt", "updatedAt"  FROM "BatchInterests"
      WHERE "BatchInterests"."BatchGroupId" = ${batchId} AND "BatchInterests"."interestId" = ${interest};
  `,
        { type: sequelize.QueryTypes.SELECT }
      );
      console.log(existingBatchInterest.length);
      if (existingBatchInterest.length != 0) {
        return existingBatchInterest;
      }

      const interestData = await sequelize.query(
        `
        INSERT INTO "BatchInterests"
        ("BatchGroupId", "interestId")
        VALUES
        (${batchId}, ${interest});
        `,
        { type: sequelize.QueryTypes.INSERT }
      );

      return interestData;
    });
  }
  return { interests };
}

async function removeBatchInterests(batchId, topicId) {
  const delete_interest = batchInterest.destroy({
    where: {
      BatchGroupId: batchId,
      interestId: topicId,
    },
  });
  return delete_interest;
}

module.exports = {
  getAllBatchInterests: getAllBatchInterests,
  addBatchInterest: addBatchInterest,
  removeBatchInterests: removeBatchInterests,
};
