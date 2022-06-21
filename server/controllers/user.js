import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    //create existingUser if user exists by email-filtering
    const existingUser = await UserModel.findOne({ email });
    //user does not exist
    if (!existingUser)
      return res.status(404).json({ message: "User not found!" });
    //if user exists check user password(return boolean value)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    //if password is NOT correct
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });
    //if user exists and password is correct get jwt token to be sent to the frontend
    //store secret in .env file
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret_test_key",
      { expiresIn: "1h" }
    );
    //send data to frontend
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Aww snap! Something went wrong." });
  }
};

export const signupController = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    // if existing user
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    //check password === confirmPassword
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });
    //if user doesn't exist and password is valid, hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create a new user
    const userResult = await UserModel.create({
      name: `${firstName}, ${lastName}`,
      email,
      password: hashedPassword,
    });
    //create token
    const token = jwt.sign(
      { email: userResult.email, id: result._id },
      "secret_test_key",
      { expiresIn: "1h" }
    );
    res.status(200).json({ userResult, token });
  } catch (error) {
    res.status(500).json({ message: "Aww snap! Something went wrong." });
  }
};
