const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    bmi: {
      type: Number,
      required: true,
    },

    bmiStatus: {
      type: String,
      required: true,
    },

    dosha: {
      type: String,
      default: "",
    },

    calories: {
      type: Number,
      default: 0,
    },

    dietPlan: {
      breakfast: String,
      lunch: String,
      snacks: String,
      dinner: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);