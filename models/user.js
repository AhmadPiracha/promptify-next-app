import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Password must be between 8 and 20 characters long, and contain at least one special character, one uppercase letter, one lowercase letter, and one number",
    ],
  },
  image: {
    type: String,
  },
});

const user = models.User || model("User", UserSchema);

export default user;
