const asyncHandler = require("express-async-handler");
const Weapon = require("../models/weapons");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

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
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("weapon_form", {
    title: "Create Weapon",
    categories: allCategories,
  });
});

exports.weapon_create_post = [
  body("name", "Weapon name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Weapon description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Invalid price").isNumeric(),
  body("category.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const weapon = new Weapon({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().exec();

      res.render("weapon_form", {
        title: "Create Weapon",
        categories: allCategories,
        weapon: weapon,
        errors: errors.array(),
      });
    } else {
      await weapon.save();
      res.redirect(weapon.url);
    }
  }),
];

exports.weapon_update_get = asyncHandler(async (req, res, next) => {
  const [weapon, allCategories] = await Promise.all([
    Weapon.findById(req.params.id).populate("category").exec(),
    Category.find().exec(),
  ]);

  if (weapon === null) {
    const error = new Error("Weapon not found");
    error.status = 404;
    return next(error);
  }
  res.render("weapon_form", {
    title: "Update Weapon",
    categories: allCategories,
    weapon: weapon,
  });
});

exports.weapon_update_post = [
  body("name", "Weapon name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Weapon description must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Invalid price").isNumeric(),
  body("category.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const weapon = new Weapon({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().exec();

      res.render("weapon_form", {
        title: "Create Weapon",
        categories: allCategories,
        weapon: weapon,
        errors: errors.array(),
      });
    } else {
      const updatedWeapon = await Weapon.findByIdAndUpdate(
        req.params.id,
        weapon
      );
      res.redirect(updatedWeapon.url);
    }
  }),
];

exports.weapon_delete_get = asyncHandler(async (req, res, next) => {
  const weapon = await Weapon.findById(req.params.id)
    .populate("category")
    .exec();

  if (weapon === null) {
    res.redirect("/menu/weapons");
  }
  res.render("weapon_delete", {
    title: "Delete Weapon",
    weapon: weapon,
  });
});

exports.weapon_delete_post = asyncHandler(async (req, res, next) => {
  const weapon = await Weapon.findById(req.params.id)
    .populate("category")
    .exec();

  if (weapon === null) {
    res.redirect("/menu/weapons");
  }

  await Weapon.findByIdAndDelete(req.body.weaponid);
  res.redirect("/menu/weapons");
});
