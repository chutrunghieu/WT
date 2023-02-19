const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./config/passport');
const db = require('./models/index');
const routes = require('./routes');

const app = express();

// const whitelist = [
//   'http://localhost',
//   'http://localhost:3000',
//   'https://dwt-one.vercel.app',
//   'https://dwt.tbht.vn',
//   'http://localhost:3000/',
//   'https://dwt-one.vercel.app/',
//   'https://dwt.tbht.vn/',
// ];

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//     callback(null, originIsWhitelisted);
//   },
//   methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
//   allowedHeaders: '*',
// };
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
const whitelist = [
  'http://localhost',
  'http://localhost:3000',
  'https://dwt-one.vercel.app',
  'https://dwt-dev.vercel.app',
  'http://159.223.93.249:3002/',
  'http://159.223.93.249:3002',
  'https://dwt.tbht.vn',
  'http://localhost:3000/',
  'https://dwt-one.vercel.app/',
  'https://dwt.tbht.vn/',
  'https://dwt-dev.vercel.app/',
];

app.use(cors());
// app.use(cors({
//   origin(origin, callback) {
//     if (!origin) return callback(null, true);
//     if (whitelist.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
// }));

// connect database
const testDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
};
testDatabase();

app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const { method } = req.body;
      delete req.body.method;
      return method;
    }
    return null;
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// api routes
app.use('/api', routes);

app.use(passport.initialize());
passport.use('jwt', config.jwtStrategy);

const PORT = process.env.PORT || 3002;

app.listen(PORT);

module.exports = app;
