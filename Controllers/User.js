const User = require('../modal/userModal');
const Token = require('../modal/tokenModal');
const { generateTocken } = require('../tokens/generateToken');

const userSignUp = async (req, res) => {
  const user = await User(req.body);
  // console.log(user);
  if (user.length) {
    res.status(200).json({ message: 'User Already Exists ' });
  } else {
    try {
      let insertData = await User(req.body);
      const result = await insertData.save();
      res.status(200).json({ message: 'SignUp SuccessFull', result });
    } catch (error) {
      console.log('error', error);
      res.status(400).json({ message: 'error', error });
    }
  }
};

const getUser = async (req, res) => {
  let user = await User.find({ email: req.params.email });
  if (user.email) {
    try {
      console.log(user);
      res.status(200).json({ message: 'user data fetched successfully', user });
    } catch (error) {
      res.status(400).json({ message: 'error' });
    }
  }
};

const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    try {
      let comparedResult = await user.matchPassword(req.body.password);
      if (comparedResult) {
        let x = String(user._id);
        console.log(x);
        let tocken = await generateTocken(user._id);
        let insertData = await Token({
          userId: x,
          token: tocken,
          active: true,
          loginType: 'emailLogin',
        });
        const result = await insertData.save();
        res.status(200).json({
          error: false,
          message: 'Successfully Loged In',
          user: req.user,
          tocken,
          result,
          user,
        });
      } else {
        console.log('first');
        res.status(200).json({ message: 'Password does Not Match' });
      }
    } catch (error) {
      res.status(400).json({ message: 'error', error });
    }
  } else {
    res.status(200).json({ message: 'User Not Found ' });
  }
};

const loginUserWithGoogle = async (req, res) => {
  if (req.user) {
    try {
      const findUserId = await Token.findOne({ userId: req.user.id });
      if (findUserId && findUserId.active) {
        res.status(200).json({
          error: false,
          message: 'Successfully Loged In Again',
          user: req.user,
        });
      } else {
        let tocken = await generateTocken(req.user.id);

        let insertData = await Token({
          userId: req.user.id,
          token: tocken,
          active: true,
          loginType: 'googleLogin',
        });
        const result = await insertData.save();
        res.status(200).json({
          error: false,
          message: 'Successfully Loged In',
          user: req.user,
          tocken,
          result,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ error: true, message: 'Not Authorized!' });
    }
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
};

const logoutUser = async (req, res) => {
  try {
    let token = req.body.token;
    const result = await Token.findByIdAndUpdate(
      token,
      { active: false },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'logout successfull', result });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  userSignUp,
  loginUser,
  loginUserWithGoogle,
  logoutUser,
  getUser,
};
