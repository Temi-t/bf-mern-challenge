import mongoose from "mongoose";
//schema
const userSchema = mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  id: { type: "string" },
});

//model
export default mongoose.model("UserModel", userSchema);
