const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', newSchema);
