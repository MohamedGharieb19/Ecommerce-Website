const bcrypt = require("bcryptjs");

const User = require("../model/user");
const getSignedToken = require("../util/signedToken");

async function createUser(payload) {
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error("User already exist");
      }
      return bcrypt
        .hash(payload.password, 10)
        .then((hashed) => {
          const newUser = new User({
            email: payload.email,
            password: hashed,
          });
          return newUser.save();
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err.response);
        });
    });
}

function signInUser(payload) {
  return User.findOne({ email: payload.email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error("Please enter email or password");
      } else {
        return bcrypt
          .compare(payload.password, user.password)
          .then((res) => {
            if (res) {
              const token = getSignedToken(user._id);
              return token;
            } else {
              throw new Error("Incorrect password or email, try again");
            }
          })
          .catch((err) => {
            throw new Error("All field required");
          });
      }
    });
}

const addItems = (payload) => {
  return User.findOneAndUpdate(
    { _id: payload._id },
    { $push: { purchased: { $each: payload.purchased } } }
  );
};

const getItems = (payload) => {
  return User.find({ _id: payload._id });
};

module.exports = { createUser, signInUser, addItems, getItems };
