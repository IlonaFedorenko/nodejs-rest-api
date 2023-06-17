const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://IlonaFedorenko:alisa6798il@cluster0.0wqpcrs.mongodb.net/contacts_reader";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
