import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userPhoto: { type: String },
  userFollowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "usuarios" }],
  verified: {
    type: Boolean,
    default: false,
  }
});


export const authUserSchemaDB = mongoose.model("usuarios", schema);