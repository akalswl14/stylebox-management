import { toast } from "react-toastify";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const ID = String(process.env.REACT_APP_ADMIN_ID);
const PW = String(process.env.REACT_APP_ADMIN_PASSWORD);
const secretKey = String(process.env.REACT_APP_SECRET);

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(PW, salt);
const users = [{ id: ID, pw: hash }];

export function signIn({ id }) {
  const user = users.find((user) => user.id === id);
  if (user === undefined) return false;
  return true;
}

export async function signInConfirm({ id, secret }) {
  const user = users.find(
    (user) => user.id === id && bcrypt.compareSync(secret, user.pw)
  );
  if (user === undefined) {
    toast.error("You dont access this admin page.");
    return;
  } else {
    const userInfo = { id: user.id };
    let token = await getToken(userInfo);
    return token;
  }
}

const getToken = (user) => {
  return new Promise((resolve, reject) => {
    let options = {
      expiresIn: "7d",
      subject: "userInfo",
    };
    jwt.sign(user, secretKey, options, function (err, token) {
      if (err) reject(err);
      else resolve(token);
    });
  });
};
