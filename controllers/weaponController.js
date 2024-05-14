const asyncHandler = require("express-async-handler");
const Weapon = require("../models/weapons");

exports.weapon_list = asyncHandler(async (req, res, next) => {
  const allWeapons = await Weapon.find({}, "name").exec();
  res.render("weapon_list", {
    title: "Weapons List",
    weapon_list: allWeapons,
  });
});

exports.weapon_detail = asyncHandler(async (req, res, next) => {
  const weapon = await Weapon.findById(req.params.id)
    .populate("category")
    .exec();
  if (weapon === null) {
    const err = new Error("Weapon not found");
    err.status = 404;
    return next(err);
  }
  res.render("weapon_detail", {
    title: weapon.name,
    weapon: weapon,
  });
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
