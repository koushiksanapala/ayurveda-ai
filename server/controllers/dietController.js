const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      height,
      weight,
      bmi,
      bmiStatus,
      dosha,
    } = req.body;

    let dietPlan = [];

    if (dosha === "Vata") {
      dietPlan = [
        "🥛 Warm Milk",
        "🥣 Oats",
        "🍌 Banana",
        "🍚 Rice",
        "🥜 Almonds",
      ];
    } else if (dosha === "Pitta") {
      dietPlan = [
        "🥒 Cucumber",
        "🥥 Coconut Water",
        "🍉 Watermelon",
        "🥗 Salad",
        "🥛 Buttermilk",
      ];
    } else {
      dietPlan = [
        "🍎 Apple",
        "🥦 Broccoli",
        "🍵 Green Tea",
        "🥗 Mixed Vegetables",
        "🍲 Lentil Soup",
      ];
    }

    const calories =
      gender === "Male"
        ? Math.round(weight * 30)
        : Math.round(weight * 28);

    const user = await User.create({
      name,
      age,
      gender,
      height,
      weight,
      bmi,
      bmiStatus,
      dosha,
      calories,
      dietPlan,
    });

    res.status(201).json({
      success: true,
      user,
      dietPlan,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
};