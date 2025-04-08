import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);