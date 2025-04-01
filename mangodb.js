import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await connect((process.env.NODE_ENV !== 'production') ? process.env.DATABASE_URL : process.env.DATABASE_URL_DOCKER);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;