import mongoose from "mongoose";

// mongodb

export const mongodbAPI = () => {
   
   const mongodbPORT =  process.env.MONGO_PORT;

   mongoose.connect(mongodbPORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      return console.log("mongodb em execucao");
    })
    .catch((err) => {
      return console.log("mongodb offline");
    });

} 