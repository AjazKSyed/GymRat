const models = require("../models");
const pod_pic = models.pod_pics;
const { Op } = require("sequelize");
const fs = require("fs");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const spacesEndpoint = new aws.Endpoint("sfo3.digitaloceanspaces.com");

var accessKeyId = "DAZVTUDIFUQUKM2DODNZ";
var secretAccessKey = "PNIdDnE+jHQ6oYxcPpobMEwMvt6p7KpogNFGqJXdHSE";

var s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});
// new multer storage for digital ocean spaces

const s3_storage = multerS3({
  s3: s3,
  bucket: "gymrat-images",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (request, file, cb) {
    console.log("inner key function: ", request.query.type);
    const timestamp = new Date().toISOString();
    const ref = `${request.query.type}/${file.fieldname}-${timestamp}.jpg`;
    cb(null, ref);
  },
});

const upload = multer({ storage: s3_storage }).single("main_image");

// ADMIN PANEL CALLS
async function getAllPodImages(limit, offset) {
  const pod_pics = await pod_pic.findAll({
    where: {
      status: "pending",
    },
    order: [["createdAt", "ASC"]],
    offset: offset, // initial = 0
    limit: limit, // initial = 10
  });
  return pod_pics;
}

async function updatePodPicStatus(imgId, status) {
  let statusType = "approved";
  if (status == "rejected") {
    statusType = "rejected";
  }
  const updatedImg = await pod_pic.update(
    {
      status: statusType,
    },
    {
      where: {
        id: imgId,
      },
    }
  );
  return updatedImg;
}

async function removePic(imgId) {
  const currentImg = await pod_pic.findOne({
    where: {
      id: imgId,
    },
  });

  const deletedImg = pod_pic.destroy({
    where: {
      id: imgId,
    },
  });
  var params = {
    Bucket: "gymrat-images",
    Key: currentImg.dataValues.imgUrl,
  };
  s3.deleteObject(params, function (err, data) {
    if (!err) {
      console.log(data); // sucessfull response
    } else {
      console.log(err); // an error ocurred
    }
  });
  return currentImg;
}

async function getBatchPic(batchId) {
  const batchPic = await pod_pic.findOne({
    where: {
      BatchGroupId: batchId,
    },
  });
  return batchPic;
}

async function getEventPic(eventId) {
  const eventPic = await pod_pic.findOne({
    where: {
      EventId: eventId,
    },
  });
  return eventPic;
}

async function getGroupchatPic(groupchatId) {
  const groupchatPic = await pod_pic.findOne({
    where: {
      groupchatId: groupchatId,
    },
  });
  return groupchatPic;
}

// add the two parameters. Also add the groupchat aspect for batches
/*
  parameters:
    -  batchId: batchId
    - imgUrl: the file.key
*/
async function addBatchPic(batchId, imgUrl) {
  const existingPicture = await pod_pic.findOne({
    where: {
      BatchGroupId: batchId,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await pod_pic.destroy({
      where: {
        BatchGroupId: batchId,
      },
    });
    var params = {
      Bucket: "gymrat-images",
      Key: previousImgUrl,
    };
    s3.deleteObject(params, function (err, data) {
      if (!err) {
        console.log("successful removeal"); // sucessfull response
      } else {
        console.log(err); // an error ocurred
      }
    });
    const replacedPicture = await pod_pic.create({
      BatchGroupId: batchId,
      imgUrl: imgUrl,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await pod_pic.create({
    BatchGroupId: batchId,
    imgUrl: imgUrl,
  });
  return newPicture;
}

/*
  parameters:
    -  groupchatId: groupchatId
    - imgUrl: the file.key
*/
async function addGroupchatPic(groupchatId, imgUrl) {
  const existingPicture = await pod_pic.findOne({
    where: {
      groupchatId: groupchatId,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await pod_pic.destroy({
      where: {
        groupchatId: groupchatId,
      },
    });
    var params = {
      Bucket: "gymrat-images",
      Key: previousImgUrl,
    };
    s3.deleteObject(params, function (err, data) {
      if (!err) {
        console.log("successful removeal"); // sucessfull response
      } else {
        console.log(err); // an error ocurred
      }
    });
    const replacedPicture = await pod_pic.create({
      groupchatId: groupchatId,
      imgUrl: imgUrl,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await pod_pic.create({
    groupchatId: groupchatId,
    imgUrl: imgUrl,
  });
  return newPicture;
}

/*
  parameters:
    -  eventId: eventId
    - imgUrl: the file.key
*/
async function addEventPic(eventId, imgUrl) {
  const existingPicture = await pod_pic.findOne({
    where: {
      EventId: eventId,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await pod_pic.destroy({
      where: {
        EventId: eventId,
      },
    });
    var params = {
      Bucket: "gymrat-images",
      Key: previousImgUrl,
    };
    s3.deleteObject(params, function (err, data) {
      if (!err) {
        console.log("successful removeal"); // sucessfull response
      } else {
        console.log(err); // an error ocurred
      }
    });
    const replacedPicture = await pod_pic.create({
      EventId: eventId,
      imgUrl: imgUrl,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await pod_pic.create({
    EventId: eventId,
    imgUrl: imgUrl,
  });
  return newPicture;
}

async function removeBatchPic(batchId, id) {
  const existingPicture = await pod_pic.findOne({
    where: {
      BatchGroupId: batchId,
      id: id,
    },
  });
  const deletedBatchPic = pod_pic.destroy({
    where: {
      BatchGroupId: batchId,
      id: id,
    },
  });
  var params = {
    Bucket: "gymrat-images",
    Key: existingPicture.dataValues.imgUrl,
  };
  s3.deleteObject(params, function (err, data) {
    if (!err) {
      console.log(data); // sucessfull response
    } else {
      console.log(err); // an error ocurred
    }
  });
  // fs.unlinkSync(existingPicture.dataValues.imgUrl);
  return deletedBatchPic;
}

async function removeEventPic(eventId, id) {
  const existingPicture = await pod_pic.findOne({
    where: {
      EventId: eventId,
      id: id,
    },
  });
  const deletedEventPic = pod_pic.destroy({
    where: {
      EventId: eventId,
      id: id,
    },
  });
  var params = {
    Bucket: "gymrat-images",
    Key: existingPicture.dataValues.imgUrl,
  };
  s3.deleteObject(params, function (err, data) {
    if (!err) {
      console.log(data); // sucessfull response
    } else {
      console.log(err); // an error ocurred
    }
  });
  // fs.unlinkSync(existingPicture.dataValues.imgUrl);
  return deletedEventPic;
}

async function removeGroupPic(groupchatId, id) {
  const existingPicture = await pod_pic.findOne({
    where: {
      groupchatId: groupchatId,
      id: id,
    },
  });
  const deletedGroupPic = pod_pic.destroy({
    where: {
      groupchatId: groupchatId,
      id: id,
    },
  });
  var params = {
    Bucket: "gymrat-images",
    Key: existingPicture.dataValues.imgUrl,
  };
  s3.deleteObject(params, function (err, data) {
    if (!err) {
      console.log(data); // sucessfull response
    } else {
      console.log(err); // an error ocurred
    }
  });
  // fs.unlinkSync(existingPicture.dataValues.imgUrl);
  return deletedGroupPic;
}

module.exports = {
  upload: upload, // main pod pic image

  getBatchPic: getBatchPic,
  getEventPic: getEventPic,
  getGroupchatPic: getGroupchatPic,

  addBatchPic: addBatchPic,
  addEventPic: addEventPic,
  addGroupchatPic: addGroupchatPic,

  removeBatchPic: removeBatchPic,
  removeEventPic: removeEventPic,
  removeGroupPic: removeGroupPic,

  // admin panel calls
  getAllPodImages: getAllPodImages,
  updatePodPicStatus: updatePodPicStatus,
  removePic: removePic,
};
