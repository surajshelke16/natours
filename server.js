process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN ❤');
  console.log(err.name, err.message);
  process.exit(1);
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

// console.log(process.env);
console.log(app.get('env'));
const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection ');
  server.close(() => {
    process.exit(1);
  });
});
