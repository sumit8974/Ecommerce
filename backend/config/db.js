const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successfull...");
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = connectDb;
