import mongoose from "mongoose";

const connection = {};

const connectDb = async () => {
    if (connection.isConnected) {
        // Use existing DB Connection
        console.log('Using existing connection');
    }
    
  // Use new DB Connection
  const db = await mongoose.
  connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("DB Connected");

  connection.isConnected = db.connections[0].readyState;
};


export default connectDb;