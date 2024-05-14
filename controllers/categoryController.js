const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("Test for index page");
});

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("Test for Category List");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("Test for Category Detail");
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
