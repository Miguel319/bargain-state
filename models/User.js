import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The name field is required."],
      min: [3, "The username must have at least 3 characters."],
      max: [10, "The username can't have more than 25 characters."]
    },
    email: {
      type: String,
      required: [true, "The email field is required."],
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    password: {
      type: String,
      required: [true, "The password field is required."],
      min: [4, "The password must have at least 4 characters."],
      select: false
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"]
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
