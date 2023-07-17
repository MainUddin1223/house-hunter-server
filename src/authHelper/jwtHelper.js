import jwt from 'jsonwebtoken';

const createJwtToken = (
  payload,
  secret,
  expairy
)=> {
  return jwt.sign(payload, secret, { expiresIn: expairy });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
export const jwtHelpers = { createJwtToken, verifyToken };
