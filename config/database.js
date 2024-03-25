import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  //if the database is already connected , don`t connect again.
  if (connected) {
    console.log("Mongodb is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("Mongodb is Connnected...");
  } catch (err) {
    console.log("error", err);
  }
};

export default connectDB;
