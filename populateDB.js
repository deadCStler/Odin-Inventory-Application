#! /usr/bin/env node

console.log(
  'This script populates some test weapons and category to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Weapons = require("./models/weapons");

const categories = [];
const weapons = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createWeapons();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added Category: ${name}`);
}

async function weaponCreate(index, name, description, price, category) {
  const weapon = new Weapons({
    name: name,
    description: description,
    price: price,
    category: category,
  });
  await weapon.save();
  weapons[index] = weapon;
  console.log(`Added Weapon: ${name}`);
}

async function createCategories() {
  console.log("Adding Categories");
  await Promise.all([
    categoryCreate(
      0,
      "Side Arms",
      "These are secondary weapons typically used when players run out of ammunition for their primary weapons or need a lightweight option for close-quarters combat. They offer agility and versatility in combat scenarios."
    ),
    categoryCreate(
      1,
      "SMGs",
      "SMGs are fast-firing firearms with moderate damage output, ideal for close to mid-range engagements. They excel in rapid movement and are effective for flanking or aggressive playstyles."
    ),
    categoryCreate(
      2,
      "ShotGuns",
      "Shotguns deliver devastating close-range damage, capable of eliminating enemies with a single well-placed shot. They are favored for aggressive pushes and holding tight angles."
    ),
    categoryCreate(
      3,
      "Rifles",
      "Rifles are versatile weapons suitable for various ranges and playstyles. They offer accuracy, range, and moderate to high damage, making them essential for both offense and defense."
    ),
    categoryCreate(
      4,
      "SinperRifles",
      "Sniper rifles specialize in long-range precision shots, providing the ability to eliminate enemies from afar with a single, well-placed bullet. They require patience and precision but can turn the tide of a match with their high damage potential."
    ),
    categoryCreate(
      5,
      "Machine Guns",
      "Machine guns are heavy firearms designed for sustained fire, suppressing enemies and controlling choke points. While they lack mobility, they excel in providing cover fire and suppressing enemy movements."
    ),
    categoryCreate(
      6,
      "Melee",
      "Melee weapons are close-combat tools used as a last resort when ammunition runs out or for stealthy takedowns. They offer silent kills and can catch opponents off guard in close-quarters combat."
    ),
    categoryCreate(
      7,
      "Armor",
      "Armor provides additional protection against enemy fire, reducing damage taken from bullets and abilities. It's crucial for surviving encounters and staying alive longer in intense firefights."
    ),
  ]);
}

async function createWeapons() {
  console.log("Adding weapons");
  await Promise.all([
    weaponCreate(
      1,
      "Classic",
      "The Classic is a free pistol that you automatically receive at the start of a round. It is a viable Sidearm option, either as the weapon of choice in pistol rounds or a last resort if you run out of ammo in your primary weapon during full buy rounds. Its strengths lie in its versatility — it has a single-shot primary fire for short-to-medium range tapping, or a three-shot secondary fire for close combat shotgun damage.",
      0,
      categories[0]
    ),
    weaponCreate(
      2,
      "Shorty",
      "The Shorty is a compact, double-barreled shotgun that can only be fired twice before needing to reload. It is effective at very close range, dealing massive damage with its wide spread.",
      200,
      categories[0]
    ),
    weaponCreate(
      3,
      "Frenzy",
      "The Frenzy is a fully automatic pistol with a high rate of fire. It excels at close range, where its rapid fire can quickly overwhelm opponents.",
      400,
      categories[0]
    ),
    weaponCreate(
      4,
      "Ghost",
      "The Ghost is a silenced semi-automatic pistol with a high rate of accuracy and damage. It is effective at medium range, capable of headshots at longer distances.",
      500,
      categories[0]
    ),
    weaponCreate(
      5,
      "Sheriff",
      "The Sheriff is a high-damage revolver capable of one-shot headshots at medium range. Its powerful rounds can deal significant damage, but it has a slower rate of fire and limited ammo capacity.",
      800,
      categories[0]
    ),
    weaponCreate(
      6,
      "Stinger",
      "The Stinger is an SMG with a high rate of fire, effective at close to medium range. It has a small magazine but can deal significant damage quickly.",
      1000,
      categories[1]
    ),
    weaponCreate(
      7,
      "Spectre",
      "The Spectre is a silenced SMG that is effective at medium range. It has a good rate of fire and can deal consistent damage, making it a versatile weapon in various situations.",
      1600,
      categories[1]
    ),
    weaponCreate(
      8,
      "Bucky",
      "The Bucky is a pump-action shotgun with a large spread, effective at close range. It can deal massive damage up close, but its slow rate of fire makes it less effective at longer distances.",
      900,
      categories[2]
    ),
    weaponCreate(
      9,
      "Judge",
      "The Judge is a fully automatic shotgun that can quickly fire multiple rounds. It is devastating at close range, capable of dealing heavy damage to multiple opponents.",
      1500,
      categories[2]
    ),
    weaponCreate(
      10,
      "Bulldog",
      "The Bulldog is a versatile assault rifle with a burst-fire mode. It is effective at medium range and can deal consistent damage with its accurate bursts.",
      2100,
      categories[3]
    ),
    weaponCreate(
      11,
      "Guardian",
      "The Guardian is a semi-automatic rifle with high damage and accuracy. It is effective at long range, capable of one-shot headshots at a distance.",
      2400,
      categories[3]
    ),
    weaponCreate(
      12,
      "Phantom",
      "The Phantom is a fully automatic rifle with a high rate of fire and low recoil. It is effective at medium to long range and excels in close-quarter combat.",
      2900,
      categories[3]
    ),
    weaponCreate(
      13,
      "Vandal",
      "The Vandal is a fully automatic rifle that excels at long range. It has a higher damage per shot compared to the Phantom, making it effective for headshots.",
      2900,
      categories[3]
    ),
    weaponCreate(
      14,
      "Marshal",
      "The Marshal is a bolt-action sniper rifle with a high rate of fire. It is effective at long range and can deal significant damage with its precise shots.",
      1100,
      categories[4]
    ),
    weaponCreate(
      15,
      "Operator",
      "The Operator is a high-damage bolt-action sniper rifle. It is effective at very long range, capable of one-shot kills with a single bullet.",
      4500,
      categories[4]
    ),
    weaponCreate(
      16,
      "Ares",
      "The Ares is a fully automatic heavy machine gun with a high rate of fire. It is effective at suppressing enemies and can deal significant damage over a large area.",
      1600,
      categories[5]
    ),
    weaponCreate(
      17,
      "Odin",
      "The Odin is a fully automatic heavy machine gun with a high rate of fire and large magazine. It is effective at laying down suppressive fire and can deal massive damage in close quarters.",
      3200,
      categories[5]
    ),
  ]);
}
