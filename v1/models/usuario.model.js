import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ["plus", "premium"], default: "plus" }
}, { timestamps: true });

export default mongoose.models.Usuario || mongoose.model("Usuario", userSchema);