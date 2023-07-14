const bcryyptjs = require('bcryptjs');
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    loginType: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = new mongoose.model('tokenTable', tokenSchema);

module.exports = Token;
