const asyncHandler = require("express-async-handler");

exports.weapon_list = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon List");
});

exports.weapon_detail = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Detail");
});

exports.weapon_create_get = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Create get");
});

exports.weapon_create_post = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Create post");
});

exports.weapon_update_get = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Update get");
});

exports.weapon_update_post = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Update post");
});

exports.weapon_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Delete get");
});

exports.weapon_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Test for Weapon Delete post");
});
