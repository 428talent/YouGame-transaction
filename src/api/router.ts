import { transactionModel } from '../model/transaction';
import { Server } from 'restify';
import { getTransactionList } from './handlers/transactions';
import { getTransaction } from './handlers/transaction';

export function setRouter(server : Server) {
  server.get('/transactions', getTransactionList);
  server.get('/transaction/:id', getTransaction);
}
