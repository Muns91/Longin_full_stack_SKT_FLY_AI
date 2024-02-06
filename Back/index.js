const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.route');

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server is listening on ${port}`);
});
