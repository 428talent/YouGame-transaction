import restify from 'restify';
import { transactionModel } from './model/transaction';
import mongoose from 'mongoose';
import { connectRBMQ } from './queue/connection';
import { setRouter } from './api/router';
import { connectDatabase } from './database/connection';

const server = restify.createServer({
  name: 'yougame-transaction',
  version: '1.0.0',
});

connectDatabase();
connectRBMQ();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

setRouter(server);

server.listen(8080,  () => {
  console.log('%s listening at %s', server.name, server.url);
});
