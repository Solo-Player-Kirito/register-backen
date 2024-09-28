const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  profileImg: String,
  multiImg: [String],
  Token: String,
});

const homePage = new Schema({
  headSection: {
    type: [String],
  },
  offerSection: {
    type: [String],
  },
  favourites: {
    type: [String],
  },
  repairSection: {
    type: [String],
  },
  repairOffers: {
    type: [String],
  },
});

const kidsSchema = new Schema({
  isAdopted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  story: String,
  gender: String,
  height: String,
  kidPhoto: [String],
  Videos: [String],
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orphanages", // Reference to the orphanage model name
  },
});

const orphanageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  orpPhotos: [String],
  kids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kidsInfo", // Reference to the kids model name
    },
  ],
  totalKids: Number,
});
const bannerSSchema = mongoose.Schema({
  MainBanner: [String],
});
const Banner = mongoose.model("banner", bannerSSchema);
const kidsModel = mongoose.model("kidsInfo", kidsSchema);
const orpModel = mongoose.model("Orphanages", orphanageSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  kidsModel,
  orpModel,
  User,
  Banner,
};
