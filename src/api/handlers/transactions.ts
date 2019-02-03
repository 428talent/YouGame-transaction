import { Transaction, transactionModel } from '../../model/transaction';
import { RequestHandlerType } from 'restify';
import { abortError, ErrorCodes } from '../error';
import { PaginateResult } from 'mongoose';

export const getTransactionList : RequestHandlerType = (req, res, next) => {
  let { page = 1, pageSize = 10 } = req.query;
  page = Number(page);
  pageSize = Number(pageSize);
  transactionModel.paginate({}, { page, limit:pageSize })
      .then((result : PaginateResult<Transaction>) => {
        res.send({
          count:result.total,
          page:result.page,
          pageSize:result.limit,
          result:result.docs,
        });
      })
      .catch((err) => {
        console.error(err);
        abortError(res, {
          error:'ServerError',
          detail:'server get error!',
          code:ErrorCodes.ServerError,
        },         500);
      },
  );
  return next();
};
