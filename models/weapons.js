const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WeaponsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

WeaponsSchema.virtual("url").get(function () {
  return `/menu/weapon/${this._id}`;
});

module.exports = mongoose.model("Weapons", WeaponsSchema);
