/* eslint-disable no-unused-expressions */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { serverMsg } from './constants/constants.message-response.js';
import { httpStatus } from './constants/constants.http-status.code.js';
import indexRouters from './routes/index.js';
import initSchemaTables from './database-tables/index.js';
import initAdmin from './database-tables/init-admin.js';

dotenv.config();

const app = express();
initSchemaTables();
setTimeout(async () => {
  await initAdmin();
}, 200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(cors());
app.use('/api', indexRouters);
app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || httpStatus.serverInterval;
  err.message = err.message || serverMsg;
  res.status(err.statusCode).json({
    message: err.message
  });
});

const post = process.env.POST;
app.listen(post, () => console.log(`Server is running on port ${post}`));
