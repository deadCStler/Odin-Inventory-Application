const express = require("express");
const router = express.Router();

const weapon_controller = require("../controllers/weaponController");
const category_controller = require("../controllers/categoryController");

// Routes for categories
router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);
router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);
router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);
router.get("/category/:id", category_controller.category_detail);
router.get("/categories", category_controller.category_list);
router.get("/", category_controller.index);

// Routes for weapons
router.get("/weapon/create", weapon_controller.weapon_create_get);
router.post("/weapon/create", weapon_controller.weapon_create_post);
router.get("/weapon/:id/delete", weapon_controller.weapon_delete_get);
router.post("/weapon/:id/delete", weapon_controller.weapon_delete_post);
router.get("/weapon/:id/update", weapon_controller.weapon_update_get);
router.post("/weapon/:id/update", weapon_controller.weapon_update_post);
router.get("/weapon/:id", weapon_controller.weapon_detail);
router.get("/weapons", weapon_controller.weapon_list);

module.exports = router;
