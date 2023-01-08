require("dotenv").config();
const mongoose = require("mongoose");
// const app = require("./app");
const app = require("./src/socket/chat");

// Connect to DB and start server
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
