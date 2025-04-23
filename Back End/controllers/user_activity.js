const { sequelize } = require("../models");

async function addStatus(postData) {
  const createStatus = await sequelize.query(
    "Insert into type_of_status values (nextval('\"type_of_status_id_seq\"'::regclass),'" +
      postData.name +
      "') ;"
  );

  return "Succesfully added " + postData.name;
}

async function addUserStatus(postData) {
  console.log(postData);
  const add_user_status = await sequelize.query(
    "Insert into user_status values (nextval('user_status_id_seq'::regclass)," +
      postData.fromUserId +
      "," +
      postData.toUserId +
      "," +
      postData.statusId +
      ",'" +
      postData.body +
      "');",
    { type: sequelize.QueryTypes.INSERT }
  );
  console.log(add_user_status);

  if (postData.statusId == "2") {
    const delete_friend = await sequelize.query(
      'Delete from user_friends where "userId"=' +
        postData.fromUserId +
        ' and "friendUserId"=' +
        postData.toUserId +
        "; "
    );
  }

  return "Issue has been added";
}

async function getAllFlagged() {
  const flaggedRows = await sequelize.query(
    `SELECT * FROM user_status WHERE "statusId" = 1;`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return flaggedRows;
}

async function getBlockedByUserId(userId) {
  const blockedIds = await sequelize.query(
    `SELECT "toUserId", * FROM user_status, users WHERE "statusId" = 2 AND "fromUserId" =${userId} AND  users.id = "toUserId";`,
    { type: sequelize.QueryTypes.SELECT }
  );
  console.log(blockedIds);

  return blockedIds;
}

async function deleteRow(fromUserId, toUserId, statusId, reportId) {
  if (statusId == 1) {
    const flaggedRows = await sequelize.query(
      `DELETE FROM user_status WHERE "fromUserId" = ${fromUserId} AND "toUserId" = ${toUserId} AND "statusId" = ${statusId} AND id = ${reportId};`
    );
    return "Row has been deleted";
  } else {
    const blockedRows = await sequelize.query(
      `DELETE FROM user_status WHERE "fromUserId" = ${fromUserId} AND "toUserId" = ${toUserId} AND "statusId" = ${statusId};`
    );
    return "Row has been deleted";
  }
}

module.exports = {
  addStatus: addStatus,
  addUserStatus: addUserStatus,
  getAllFlagged: getAllFlagged,
  getBlockedByUserId: getBlockedByUserId,
  deleteRow: deleteRow,
};
