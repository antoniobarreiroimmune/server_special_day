const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [false, 'A username is needed!'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [false, 'A name is needed!'],
      trim: true,
    },
    firstName: {
      type: String,
      required: [false, 'A first name is needed!'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [false, 'A last name is needed!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'An email is needed'],
      unique: true,
      minLength: 1,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'Choose a valid email',
      ],
    },
    password: {
      salt: { type: String, required: true },
      hash: { type: String, required: true },
    },
    role: {
      type: String,
      required: [true, 'Se necesita un rol'],
      lowercase: true,
      enum: ['novio', 'novia'] 
    },
    
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
