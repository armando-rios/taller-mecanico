import { connect } from 'mongoose'

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined")
  }

  try {
    await connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB
