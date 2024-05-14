const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Weapon = require("../models/weapons");

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategory, numWeapons] = await Promise.all([
    Category.countDocuments({}).exec(),
    Weapon.countDocuments({}).exec(),
  ]);
  res.render("index", {
    title: "Valorant Inventory Home",
    category_count: numCategory,
    weapons_count: numWeapons,
  });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name").exec();
  res.render("category_list", {
    title: "Categories",
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, weapons] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Weapon.find({ category: req.params.id }, "name").exec(),
  ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category Detail",
    category: category,
    weapons: weapons,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Create get");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Create post");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Update get");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Update post");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Delete get");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Delete post");
});
