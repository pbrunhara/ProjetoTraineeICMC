const mongoose = require('mongoose');

const uri = "mongodb+srv://teste:senha@cluster0.tqucf.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
});