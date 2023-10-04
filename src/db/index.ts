import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

/* Defining the connection */
const uri = process.env.MONGODB_URI;
console.log(uri);
/* Check if the URI exists before trying to connect */
if (!uri) {
  throw new Error("MONGODB_URI environment variable not set");
}

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

/* Exporting the connection */
export default mongoose.connection;
