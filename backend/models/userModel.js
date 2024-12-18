const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"],
  },
});

// static sign up method
userSchema.statics.signUp = async function (name, email, password, role) {
  if (!validator.isEmail(email)) {
    throw Error("The provided email is not a valid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "The password must be of length at least eight and contain at least one number, one lowercase, one uppercase, and one special character."
    );
  }

  if (role !== "customer" && role !== "admin") {
    throw Error("User's role must be either customer or admin.");
  }

  if (await this.findOne({ email })) {
    throw Error("The provided email is already in use.");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
};

// static sign in method
userSchema.statics.signIn = async function (email, password) {
  const errorMessage = "Incorrect email or password.";

  const user = await this.findOne({ email });
  if (!user) {
    throw Error(errorMessage);
  }

  const doPasswordsMatch = await bcrypt.compare(password, user.password);
  if (!doPasswordsMatch) {
    throw Error(errorMessage);
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
