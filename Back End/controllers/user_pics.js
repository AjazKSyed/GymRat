const models = require("../models");
const user_pic = models.user_pic;
const user = models.user;
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
    console.log("inner key function: ", request.params.userId);
    const timestamp = new Date().toISOString();
    const ref = `user_${request.params.userId}/${file.fieldname}-${timestamp}.jpg`;
    cb(null, ref);
  },
});

const uploadProfile = multer({ storage: s3_storage }).single("profile");
const uploadGen0 = multer({ storage: s3_storage }).single("general_0");
const uploadGen1 = multer({ storage: s3_storage }).single("general_1");
const uploadGen2 = multer({ storage: s3_storage }).single("general_2");
const uploadGen3 = multer({ storage: s3_storage }).single("general_3");

// const uploadArray = multer({ storage: s3_storage }).array("general", 4);
const uploadFull = multer({ storage: s3_storage }).fields([
  { name: "profile", maxCount: 1 },
  { name: "general_0", maxCount: 1 },
  { name: "general_1", maxCount: 1 },
  { name: "general_2", maxCount: 1 },
  { name: "general_3", maxCount: 1 },
]);

// ADMIN PANEL CALLS
async function getAllImages(limit, offset) {
  const user_pics = await user_pic.findAll({
    where: {
      status: "pending",
    },
    order: [["createdAt", "ASC"]],
    offset: offset, // initial = 0
    limit: limit, // initial = 10
  });
  return user_pics;
}

async function updateStatus(imgId, status) {
  let statusType = "approved";
  if (status == "rejected") {
    statusType = "rejected";
  }
  const updatedImg = await user_pic.update(
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

async function removeImg(imgId) {
  const currentImg = await user_pic.findOne({
    where: {
      id: imgId,
    },
  });

  const deletedImg = user_pic.destroy({
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

//////

async function getAllUserPics(userId) {
  const user_pics = await user_pic.findAll({
    where: {
      userId: userId,
    },
  });
  return user_pics;
}

async function getProfilePic(userId) {
  const profile = await user_pic.findOne({
    where: {
      userId: userId,
      imgtype: "profile",
    },
  });
  return profile;
}

async function addProfilePic(req) {
  const user_id = req.params.userId;
  const imgUrl = req.file.key;
  const type_img = "profile";

  // sample call
  // (user id: 1, 42323.jpg, "profile")

  const existingPicture = await user_pic.findOne({
    where: {
      userId: user_id,
      imgtype: type_img,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await user_pic.destroy({
      where: {
        userId: user_id,
        imgtype: type_img,
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
    const replacedPicture = await user_pic.create({
      userId: user_id,
      imgUrl: imgUrl,
      imgtype: type_img,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await user_pic.create({
    userId: user_id,
    imgUrl: imgUrl,
    imgtype: type_img,
  });
  return newPicture;
}

async function addPic_General0(req) {
  console.log(req.file);
  const user_id = req.params.userId;
  const imgUrl = req.file.key;
  const type_img = "general0";

  // sample call
  // (user id: 1, 42323.jpg, "profile")

  const existingPicture = await user_pic.findOne({
    where: {
      userId: user_id,
      imgtype: type_img,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await user_pic.destroy({
      where: {
        userId: user_id,
        imgtype: type_img,
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
    const replacedPicture = await user_pic.create({
      userId: user_id,
      imgUrl: imgUrl,
      imgtype: type_img,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await user_pic.create({
    userId: user_id,
    imgUrl: imgUrl,
    imgtype: type_img,
  });
  return newPicture;
}

async function addPic_General1(req) {
  console.log(req.file);

  const user_id = req.params.userId;
  const imgUrl = req.file.key;
  const type_img = "general1";

  // sample call
  // (user id: 1, 42323.jpg, "profile")

  const existingPicture = await user_pic.findOne({
    where: {
      userId: user_id,
      imgtype: type_img,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await user_pic.destroy({
      where: {
        userId: user_id,
        imgtype: type_img,
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
    const replacedPicture = await user_pic.create({
      userId: user_id,
      imgUrl: imgUrl,
      imgtype: type_img,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await user_pic.create({
    userId: user_id,
    imgUrl: imgUrl,
    imgtype: type_img,
  });
  return newPicture;
}

async function addPic_General2(req) {
  console.log(req.file);

  const user_id = req.params.userId;
  const imgUrl = req.file.key;
  const type_img = "general2";

  // sample call
  // (user id: 1, 42323.jpg, "profile")

  const existingPicture = await user_pic.findOne({
    where: {
      userId: user_id,
      imgtype: type_img,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await user_pic.destroy({
      where: {
        userId: user_id,
        imgtype: type_img,
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
    const replacedPicture = await user_pic.create({
      userId: user_id,
      imgUrl: imgUrl,
      imgtype: type_img,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await user_pic.create({
    userId: user_id,
    imgUrl: imgUrl,
    imgtype: type_img,
  });
  return newPicture;
}

async function addPic_General3(req) {
  console.log(req.file);

  const user_id = req.params.userId;
  const imgUrl = req.file.key;
  const type_img = "general3";

  // sample call
  // (user id: 1, 42323.jpg, "profile")

  const existingPicture = await user_pic.findOne({
    where: {
      userId: user_id,
      imgtype: type_img,
    },
  });

  if (existingPicture !== null) {
    let previousImgUrl = existingPicture.dataValues.imgUrl;
    const removedPicture = await user_pic.destroy({
      where: {
        userId: user_id,
        imgtype: type_img,
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
    const replacedPicture = await user_pic.create({
      userId: user_id,
      imgUrl: imgUrl,
      imgtype: type_img,
    });
    return removedPicture, replacedPicture;
  }
  // if we don't have it then by default we create a new one
  const newPicture = await user_pic.create({
    userId: user_id,
    imgUrl: imgUrl,
    imgtype: type_img,
  });
  return newPicture;
}

// go through two arrrays of pictures to add each one.
async function addAllPics(req) {
  // console.log(req.body);
  // console.log(req.files);

  const files = req.files;
  const user_id = req.params.userId;

  // 5 items total
  const profile = files.profile;
  const general_0 = files.general_0;
  const general_1 = files.general_1;
  const general_2 = files.general_2;
  const general_3 = files.general_3;

  // previous Ids to delete (0 = new photo, 1+ = replace photo)
  console.log("gen0: ", req.body.prev_gen0_id);
  console.log("gen1: ", req.body.prev_gen1_id);
  console.log("gen2: ", req.body.prev_gen2_id);
  console.log("gen3: ", req.body.prev_gen3_id);
  console.log("prof: ", req.body.prev_prof_id);

  const prev_gen0_id = JSON.parse(req.body.prev_gen0_id);
  const prev_gen1_id = JSON.parse(req.body.prev_gen1_id);
  const prev_gen2_id = JSON.parse(req.body.prev_gen2_id);
  const prev_gen3_id = JSON.parse(req.body.prev_gen3_id);
  const prev_prof_id = JSON.parse(req.body.prev_prof_id);

  console.log(
    prev_gen0_id,
    prev_gen1_id,
    prev_gen2_id,
    prev_gen3_id,
    prev_prof_id
  );

  if (general_0 !== undefined) {
    const general_0_imageMap = general_0.map(function name(img, i) {
      return [img, prev_gen0_id[i]];
    });

    general_0_imageMap.forEach(async function (imgArr, i) {
      let prevId = imgArr[1];
      let imgUrl = imgArr[0].key;

      const existingPicture = await user_pic.findOne({
        where: {
          userId: user_id,
          imgtype: "general0",
        },
      });

      // if we have it then we should delete that one don't return anything
      if (existingPicture !== null) {
        const removePicture = await user_pic.destroy({
          where: {
            userId: user_id,
            imgtype: "general0",
          },
        });
        var params = {
          Bucket: "gymrat-images",
          Key: existingPicture.dataValues.imgUrl,
        };
        await s3.deleteObject(params, function (err, data) {
          if (!err) {
            console.log("removal data 0: ", data); // sucessfull response
          } else {
            console.log(err); // an error ocurred
          }
        });

        const replacedPicture = await user_pic.create({
          userId: user_id,
          imgUrl: imgUrl,
          imgtype: "general0",
        });
        return removePicture, replacedPicture;
      }
      // if we don't have it then by default we create a new one
      const newPicture = await user_pic.create({
        userId: user_id,
        imgUrl: imgUrl,
        imgtype: "general0",
      });
      return newPicture;
    });
  }

  if (general_1 !== undefined) {
    const general_1_imageMap = general_1.map(function name(img, i) {
      return [img, prev_gen1_id[i]];
    });

    general_1_imageMap.forEach(async function (imgArr, i) {
      let prevId = imgArr[1];
      let imgUrl = imgArr[0].key;

      const existingPicture = await user_pic.findOne({
        where: {
          userId: user_id,
          imgtype: "general1",
        },
      });

      // if we have it then we should delete that one don't return anything
      if (existingPicture !== null) {
        const removePicture = await user_pic.destroy({
          where: {
            userId: user_id,
            imgtype: "general1",
          },
        });
        var params = {
          Bucket: "gymrat-images",
          Key: existingPicture.dataValues.imgUrl,
        };
        await s3.deleteObject(params, function (err, data) {
          if (!err) {
            console.log("removal data 1: ", data); // sucessfull response
          } else {
            console.log(err); // an error ocurred
          }
        });

        const replacedPicture = await user_pic.create({
          userId: user_id,
          imgUrl: imgUrl,
          imgtype: "general1",
        });
        return removePicture, replacedPicture;
      }
      // if we don't have it then by default we create a new one
      const newPicture = await user_pic.create({
        userId: user_id,
        imgUrl: imgUrl,
        imgtype: "general1",
      });
      return newPicture;
    });
  }

  if (general_2 !== undefined) {
    const general_2_imageMap = general_2.map(function name(img, i) {
      return [img, prev_gen2_id[i]];
    });

    general_2_imageMap.forEach(async function (imgArr, i) {
      let prevId = imgArr[1];
      let imgUrl = imgArr[0].key;

      const existingPicture = await user_pic.findOne({
        where: {
          userId: user_id,
          imgtype: "general2",
        },
      });

      // if we have it then we should delete that one don't return anything
      if (existingPicture !== null) {
        const removePicture = await user_pic.destroy({
          where: {
            userId: user_id,
            imgtype: "general2",
          },
        });
        var params = {
          Bucket: "gymrat-images",
          Key: existingPicture.dataValues.imgUrl,
        };
        await s3.deleteObject(params, function (err, data) {
          if (!err) {
            console.log("removal data 2: ", data); // sucessfull response
          } else {
            console.log(err); // an error ocurred
          }
        });

        const replacedPicture = await user_pic.create({
          userId: user_id,
          imgUrl: imgUrl,
          imgtype: "general2",
        });
        return removePicture, replacedPicture;
      }
      // if we don't have it then by default we create a new one
      const newPicture = await user_pic.create({
        userId: user_id,
        imgUrl: imgUrl,
        imgtype: "general2",
      });
      return newPicture;
    });
  }

  if (general_3 !== undefined) {
    const general_3_imageMap = general_3.map(function name(img, i) {
      return [img, prev_gen3_id[i]];
    });

    general_3_imageMap.forEach(async function (imgArr, i) {
      let prevId = imgArr[1];
      let imgUrl = imgArr[0].key;

      const existingPicture = await user_pic.findOne({
        where: {
          userId: user_id,
          imgtype: "general3",
        },
      });

      // if we have it then we should delete that one don't return anything
      if (existingPicture !== null) {
        const removePicture = await user_pic.destroy({
          where: {
            userId: user_id,
            imgtype: "general3",
          },
        });
        var params = {
          Bucket: "gymrat-images",
          Key: existingPicture.dataValues.imgUrl,
        };
        await s3.deleteObject(params, function (err, data) {
          if (!err) {
            console.log("removal data 3: ", data); // sucessfull response
          } else {
            console.log(err); // an error ocurred
          }
        });

        const replacedPicture = await user_pic.create({
          userId: user_id,
          imgUrl: imgUrl,
          imgtype: "general3",
        });
        return removePicture, replacedPicture;
      }
      // if we don't have it then by default we create a new one
      const newPicture = await user_pic.create({
        userId: user_id,
        imgUrl: imgUrl,
        imgtype: "general3",
      });
      return newPicture;
    });
  }

  if (profile !== undefined) {
    const profile_imageMap = profile.map(function name(img, i) {
      return [img, prev_prof_id[i]];
    });

    profile_imageMap.forEach(async function (imgArr, i) {
      let prevId = imgArr[1];
      let imgUrl = imgArr[0].key;

      const existingPicture = await user_pic.findOne({
        where: {
          userId: user_id,
          imgtype: "profile",
        },
      });

      // if we have it then we should delete that one don't return anything
      if (existingPicture !== null) {
        const removePicture = await user_pic.destroy({
          where: {
            userId: user_id,
            imgtype: "profile",
          },
        });
        var params = {
          Bucket: "gymrat-images",
          Key: existingPicture.dataValues.imgUrl,
        };
        await s3.deleteObject(params, function (err, data) {
          if (!err) {
            console.log("removal data profile: ", data); // sucessfull response
          } else {
            console.log(err); // an error ocurred
          }
        });

        const replacedPicture = await user_pic.create({
          userId: user_id,
          imgUrl: imgUrl,
          imgtype: "profile",
        });
        return removePicture, replacedPicture;
      }
      // if we don't have it then by default we create a new one
      const newPicture = await user_pic.create({
        userId: user_id,
        imgUrl: imgUrl,
        imgtype: "profile",
      });
      return newPicture;
    });
  }

  return files;
}

async function removeUserPics(userId, id) {
  const existingPicture = await user_pic.findOne({
    where: {
      userId: userId,
      id: id,
    },
  });
  const deletedUser_Pic = user_pic.destroy({
    where: {
      userId: userId,
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
  return deletedUser_Pic;
}

async function removeByType(userId, type) {
  console.log(type);
  const existingPicture = await user_pic.findOne({
    where: {
      userId: userId,
      imgtype: type,
    },
  });
  const deletedUser_Pic = await user_pic.destroy({
    where: {
      userId: userId,
      imgtype: type,
    },
  });
  var params = {
    Bucket: "gymrat-images",
    Key: existingPicture.dataValues.imgUrl,
  };
  await s3.deleteObject(params, function (err, data) {
    if (!err) {
      console.log(data); // sucessfull response
    } else {
      console.log(err); // an error ocurred
    }
  });
  return deletedUser_Pic;
}

module.exports = {
  uploadProfile: uploadProfile, // prof
  uploadGen0: uploadGen0, // gen0
  uploadGen1: uploadGen1, // gen1
  uploadGen2: uploadGen2, // gen2
  uploadGen3: uploadGen3, // gen3
  addProfilePic: addProfilePic, // one at a time
  addPic_General0: addPic_General0, // one at a time
  addPic_General1: addPic_General1, // one at a time
  addPic_General2: addPic_General2, // one at a time
  addPic_General3: addPic_General3, // one at a time

  uploadFull: uploadFull, // all types
  addAllPics: addAllPics, // all at once

  getAllUserPics: getAllUserPics, // get all of them
  removeUserPics: removeUserPics, // removed by id
  removeByType: removeByType, // removed by type

  // admin panel calls
  getAllImages: getAllImages,
  updateStatus: updateStatus,
  removeImg: removeImg,
  getProfilePic: getProfilePic,
};
