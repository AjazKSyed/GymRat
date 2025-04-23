"use strict";
const bcrypt = require("bcrypt");
const normalizeEmail = require("normalize-email");
const { normalizeText } = require("normalize-text");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM("male", "female", "other", "prefer_not_to_say"),
    gym: DataTypes.STRING,
    instagram: DataTypes.STRING,
    spotify: DataTypes.STRING,
    tiktok: DataTypes.STRING,
    facebook: DataTypes.STRING,
    bio: DataTypes.TEXT,
    status: DataTypes.ENUM("active", "inactive", "flagged"),
    pushTokenKey: DataTypes.STRING,
  });
  User.associate = function (models) {
    User.hasMany(models.user_friend);
    User.hasMany(models.user_pic);
    User.belongsToMany(models.interest, { through: "user_interests" });
  };

  User.addHook("beforeCreate", async function (user, options) {
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    user.email = await normalizeEmail(user.email);
    user.firstName = user.firstName;
    user.lastName = user.lastName;
    user.fullName = user.fullName;
    user.city = user.city;
    user.state = user.state;
    user.longitude = user.longitude;
    user.latitude = user.latitude;
    user.age = user.age;
    user.gender = user.gender;
    user.gym = user.gym;
    user.instagram = user.instagram;
    user.spotify = user.spotify;
    user.tiktok = user.tiktok;
    user.facebook = user.facebook;
    user.bio = user.bio;
    user.status = "active";
    user.pushTokenKey = user.pushTokenKey;
  });

  User.prototype.validPassword = async function (password) {
    let valid = await bcrypt.compare(password, this.password);
    return valid;
  };

  return User;
};
