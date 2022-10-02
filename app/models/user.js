const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 128,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 256,
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: 6,
      max: 1024,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
