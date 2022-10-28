import { connect } from "mongoose";
require("dotenv").config();

const connectDB = async () => {
  try {
    await connect(process.env.DATABASE!)
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error)
  }
};

export default connectDB