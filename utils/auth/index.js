const passport = require('passport');

//strategies
const { LocalStrategy } = require('./strategies/local.strategy');

passport.use(LocalStrategy);