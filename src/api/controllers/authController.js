const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const decodeAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const signConfirmEmailToken = (id) => {
  return jwt.sign({ id }, process.env.CONFIRM_EMAIL_SECRET, {
    expiresIn: process.env.CONFIRM_EMAIL_EXPIRES_IN,
  });
};

const decodeConfirmEmailToken = (token) => {
  return jwt.verify(token, process.env.CONFIRM_EMAIL_SECRET);
};

const createCookieOptions = () => {
  const cookieOptions = {
    httpOnly: true,
    secure: false, // production: true
    expires: new Date(
      Date.now() +
        process.env.ACCESS_TOKEN_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };

  return cookieOptions;
};

exports.register = async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    const err = new Error("All fields must be filled");
    err.statusCode = 400;
    throw err;
  }

  const newUser = await User.create({ email, password, name });

  // Send confirm account email
  const confirmEmailToken = signConfirmEmailToken(newUser._id);

  const confirmUrl = `${process.env.SERVER_URL}/api/users/confirmation/${confirmEmailToken}`;

  const message = `
        <h2>Hello ${newUser.name}</h2>
        <p>Please use the url below to activate your account</p>
        <p>This confirm link is valid for 7 days.</p>

        <a href=${confirmUrl} clicktracking=off>${confirmUrl}</a>

        <p>Regards...</p>
        <p>Realtime Learning Team</p>
    `;
  const subject = "Confirm Email";
  const send_to = newUser.email;
  const send_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, send_from);
    res.status(200).json({
      status: "success",
      message: "Confirm Email Sent",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
};

exports.confirmEmail = async (req, res, next) => {
  const { confirmEmailToken } = req.params;

  const decoded = decodeConfirmEmailToken(confirmEmailToken);

  await User.findByIdAndUpdate(decoded.id, { active: true });

  res.redirect(`${process.env.CLIENT_URL}`);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Please enter email and password");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password))) {
    const err = new Error("Incorrect email or password");
    err.statusCode = 401;
    throw err;
  }

  if (!user.active) {
    const err = new Error(
      "Not activated account. Please confirm your email to login"
    );
    err.statusCode = 400;
    throw err;
  }

  const accessToken = signAccessToken(user._id);

  const cookieOptions = createCookieOptions();

  res.cookie("jwt", accessToken, cookieOptions);

  res.status(200).json({
    status: "success",
    accessToken,
    data: { user },
  });
};

exports.socialLoginSuccess = (req, res) => {
  if (req.user) {
    const accessToken = signAccessToken(req.user._id || req.user.id);

    const cookieOptions = createCookieOptions();

    res.cookie("jwt", accessToken, cookieOptions);

    res.status(201).json({
      status: "success",
      accessToken,
      data: { user: req.user },
    });
  }
};

exports.socialLoginFailed = (req, res) => {
  res.status(401).json({
    status: "error",
  });
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1 * 1000),
  });

  if (req.user) {
    req.logout((err) => {
      if (err) next(err);
    });
  }

  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    accessToken = req.cookies.jwt;
  }

  if (!accessToken) {
    const err = new Error("Unauthorized, please login");
    err.statusCode = 403;
    throw err;
  }

  const decoded = decodeAccessToken(accessToken);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    const err = new Error("User not found");
    err.statusCode = 401;
    throw err;
  }

  req.user = currentUser;
  next();
};
