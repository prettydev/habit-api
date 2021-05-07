const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const { func } = require("joi");
const nodemailer = require("nodemailer");

module.exports = {
  authenticate,
  signInWithSocial,
  getAll,
  getById,
  create,
  update,
  verify,
  delete: _delete,
};

async function signInWithSocial(params) {
  const email = params.email;
  const user = await db.User.findOne({ where: { email } });

  if (user) {
    //if user already exist
    return authSuccessful(user);
  } else {
    //register
    params.isValid = true;
    params.password = "";
    console.log("params:", params);
    const user = await db.User.create(params);
    return authSuccessful(user);
  }
}

async function authenticate({ email, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {code:"error", message:"Email or password is incorrect"}
  }
    
  return authSuccessful(user);
}

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate

  console.log("params:", params);

  const email = params.email;
  const uniqueString = randString();
  const isValid = false;
  
    const _user = await db.User.findOne({ where: { email } });

    console.log("old user:", _user);

    if (_user) {
      console.log('Email "' + params.email + '" is already taken');
      return {code:'error', message:'Email "' + params.email + '" is already taken'};
    }  
  
  // hash password
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }
  // save user
  params.uniqueString = uniqueString;
  params.isValid = isValid;

  console.log("before creating new user:", params);

  const newUser = await db.User.create(params);

  console.log("new user:", newUser);

  sendEmail(email, uniqueString);

  return { code:'success', message: 'Registration successful' }
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const emailChanged = params.email && user.email !== params.email;
  if (
    emailChanged &&
    (await db.User.findOne({ where: { email: params.email } }))
  ) {
    return {code:"error", message:'email "' + params.email + '" is already taken'};
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { password, ...userWithoutHash } = user;
  return userWithoutHash;
}

function authSuccessful(user) {
  // authentication successful
  const token =
    "Bearer " + jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return { code:"success", data:{...omitHash(user.get()), token} };
}

const randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};

async function sendEmail(email, uniqueString) {

  console.log("mail, pass:", process.env.EMAIL, process.env.PASSWORD);

  var Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions;
  let sender = "Habio";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Emial confirmation",
    html: `Press <a href="http://108.61.172.48/users/verify/${uniqueString}">here </a> to verify your email`,
  };

  Transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log("Message Error:", error);
    } else {
      console.log("Message sent");
    }
  });
}

async function verify(params) {
  let user = await db.User.findOne({where:{uniqueString:params.uniqueString }});
  if (user) {
    user.isValid = true;
    await user.save();
    return "Success!"
  } else {
    return "User not found";
  }
}
