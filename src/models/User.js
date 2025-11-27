import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["SUPERADMIN", "ADMIN", "USER"],
    default: "USER",
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: "Profile",
    default: [],
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const User = models.User || model("User", userSchema);

export default User;
