const models = require("../models");
const user_interest = models.user_interest;
const user = models.user;
const interest = models.interest;
const { literal, Op, query } = require("sequelize");
const { sequelize } = require("../models");
const pics = models.user_pic;

async function getAllUserInterests(userId) {
  const user_interests = await user_interest.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: interest,
      },
    ],
  });
  return user_interests;
}

async function getUsersbyInterestId(req) {
  const interests = JSON.parse(req.body.interests);

  const userId = JSON.parse(req.body.userId);
  const userLat = JSON.parse(req.body.userLat);
  const userLong = JSON.parse(req.body.userLong);
  const prefDist = JSON.parse(req.body.prefDist);
  const offset = JSON.parse(req.body.offset);

  const lower_age_bound = JSON.parse(req.body.lower_age_bound);
  const upper_age_bound = JSON.parse(req.body.upper_age_bound);
  const genders = JSON.parse(req.body.genders);

  console.log(
    "Interests: ",
    interests,
    "\nID: ",
    userId,
    "\nLocation: ",
    userLat,
    userLong,
    "\nDistance: ",
    prefDist,
    "\nAge Range: ",
    lower_age_bound,
    upper_age_bound,
    "\ngenders: ",
    genders
  );

  // console.log(typeof(interests));
  let arrayedInts = interests.join();
  let filterdGenders = [];
  for (let i = 0; i < genders.length; i++) {
    console.log(genders[i]);
    filterdGenders.push(`'${genders[i]}'`);
  }
  console.log(filterdGenders);

  // const usersFiltered = await sequelize.query(
  //   `SELECT * FROM ( SELECT *, ( ( ( acos( sin( ( ${userLat} * pi()/ 180 ) ) * sin( ( latitude * pi()/ 180 ) )+
  //     cos( ( ${userLat} * pi()/ 180 ) ) * cos( ( latitude * pi()/ 180 ) ) * cos( ( (${userLong} - longitude)* pi()/ 180 ) ) ) )* 180 / pi() )* 60 * 1.1515 * 1.609344 )
  //       as nearby FROM "user_interests" AS "user_interest" INNER JOIN "users" AS "user" ON "user_interest"."userId" = "user"."id" and "user"."status"='active' AND "user"."id" != ${userId}
  //        AND "user"."id" NOT IN (SELECT "friendUserId" FROM user_friends WHERE "userId" = ${userId})
  //       WHERE "user_interest"."interestId" IN (${arrayedInts}) ) t WHERE nearby <= ${prefDist} order BY nearby ASC OFFSET ${offset}`,
  //   { type: sequelize.QueryTypes.SELECT }
  // );

  const usersFiltered = await sequelize.query(
    `SELECT
    *
  FROM
    (
      SELECT
        *,
        (
          (
            (
              acos(
                sin(
                  (
                    ${userLat} * pi() / 180
                  )
                ) * sin(
                  (
                    latitude * pi() / 180
                  )
                ) + cos(
                  (
                    ${userLat} * pi() / 180
                  )
                ) * cos(
                  (
                    latitude * pi() / 180
                  )
                ) * cos(
                  (
                    (${userLong} - longitude)* pi() / 180
                  )
                )
              )
            )* 180 / pi()
          )* 60 * 1.1515 * 1.609344
        ) as nearby
      FROM
        "user_interests" AS "user_interest"
        INNER JOIN "users" AS "user" ON "user_interest"."userId" = "user"."id"
        and "user"."status" = 'active'
        AND "user"."id" != ${userId}
        AND "user"."age" BETWEEN ${lower_age_bound}
        AND ${upper_age_bound}
        AND "user"."gender" IN (${filterdGenders})
        AND "user"."id" NOT IN (
          SELECT
            "friendUserId"
          FROM
            user_friends
          WHERE
            "userId" = ${userId}
        )
      WHERE
        "user_interest"."interestId" IN (${arrayedInts})
    ) t
  WHERE
    nearby <= ${prefDist}
  order BY
    nearby ASC OFFSET ${offset}
  `,
    { type: sequelize.QueryTypes.SELECT }
  );

  console.log(usersFiltered);

  const userMapDeUni = usersFiltered.map(function name(usr, i) {
    return usr.id;
  });
  let uniqueId = [...new Set(userMapDeUni)];

  const finUsers = await user.findAll({
    where: {
      id: {
        [Op.in]: uniqueId,
      },
    },
    order: [["updatedAt"]],
    include: [
      {
        model: pics,
      },
      {
        model: interest,
      },
    ],
  });

  return finUsers;
}

async function addUserInterests(req) {
  const userId = JSON.parse(req.body.user_id);
  const interests = JSON.parse(req.body.interests);

  let arrayedInts = interests.join();

  if (arrayedInts == undefined) {
    return "no interests added";
  } else {
    Array.prototype.forEach.call(interests, async (interest) => {
      const existingUserInterests = await user_interest.findOne({
        where: {
          userId: userId,
          interestId: interest,
        },
      });

      if (existingUserInterests !== null) {
        return existingUserInterests;
      }

      const userInterestsData = await user_interest.create({
        userId: userId,
        interestId: interest,
      });
      return userInterestsData;
    });
  }
  return { interests };
}

async function removeUserInterests(userId, interestId) {
  const deleteduser_interest = user_interest.destroy({
    where: {
      userId: userId,
      interestId: interestId,
    },
  });
  return deleteduser_interest;
}

module.exports = {
  getAllUserInterests: getAllUserInterests,
  getUsersbyInterestId: getUsersbyInterestId,
  addUserInterests: addUserInterests,
  removeUserInterests: removeUserInterests,
};
