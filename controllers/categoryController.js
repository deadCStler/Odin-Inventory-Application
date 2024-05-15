const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Weapon = require("../models/weapons");
const { body, validationResult } = require("express-validator");
const { render } = require("../app");

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

exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};

exports.category_create_post = [
  body("name", "Categroy must conatain atleast three letter")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Categroy",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_form", { title: "Update Category", category: category });
});

exports.category_update_post = [
  body("name", "Categroy must conatain atleast three letter")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Categroy",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await Category.findByIdAndUpdate(req.params.id, category);
      res.redirect(category.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, allWeaponsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Weapon.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (category === null) {
    res.redirect("/menu/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
    category_weapons: allWeaponsByCategory,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, allWeaponsByCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Weapon.find({ category: req.params.id }, "name description").exec(),
  ]);

  if (allWeaponsByCategory.length > 0) {
    res.render("category_delete", {
      title: "Delete Category",
      category: category,
      category_weapons: allWeaponsByCategory,
    });
    return;
  } else {
    await Category.findByIdAndDelete(req.body.categoryid);
    res.redirect("/menu/categories");
  }
});
