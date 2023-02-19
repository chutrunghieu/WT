const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
const models = require('../models/index');

dotenv.config();

const jwtOptions = {
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const jwtVerify = async (payload, done) => {
    try {
      const user = await models.users.findOne({ where: { id: payload.id } });
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  };

exports.jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
