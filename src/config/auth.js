import 'dotenv/config';

export default {
  secret: process.env.JWT_SECRET,
  expiresin: process.env.JWT_EXPIRES_IN,
};
