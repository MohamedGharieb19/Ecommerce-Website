const UserServices = require("../services/user.js");

const signUp = async (req, res, next) => {
  console.log("Sign up");
  try {
    console.log(req.body);
    const newUser = req.body;
    const savedUser = await UserServices.createUser(newUser);

    res.status(200).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    next(new Error(error.message));
  }
};

const signIn = async (req, res, next) => {
  try {
    const payload = req.body;
    const token = await UserServices.signInUser(payload);
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(new Error(error.message));
  }
};

const addItems = async (req, res, next) => {
  try {
    const payload = req.body;
    const addRes = await UserServices.addItems(payload);
    res.status(200).json({
      success: true,
      res: addRes,
    });
  } catch (error) {
    console.log(error);
    next(new Error(error.message));
  }
};

const getItems = async (req, res, next) => {
  try {
    const payload = req.body;
    const getRes = await UserServices.getItems(payload);
    console.log(getRes);
    res.status(200).json({
      success: true,
      items: getRes[0].purchased,
    });
  } catch (error) {
    console.log(error);
    next(new Error(error.message));
  }
};

module.exports = {
  signIn,
  signUp,
  addItems,
  getItems,
};
