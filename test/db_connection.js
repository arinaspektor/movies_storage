const mongoose = require("mongoose");

before(async () => {
  await mongoose.connect(require("config").get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

after(() => {
  mongoose.disconnect();
});