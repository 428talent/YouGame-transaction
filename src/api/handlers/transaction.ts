import { RequestHandlerType } from 'restify';
import { Transaction, transactionModel } from '../../model/transaction';
import { PaginateResult } from 'mongoose';
import { abortError, abortResourceNotFound, ErrorCodes } from '../error';

export const getTransaction : RequestHandlerType = (req, res, next) => {
  const { id } = req.params;
  transactionModel.find({
    _id:id,
  }).then((result:Transaction[]) => {
    if (result.length === 0) {
      abortResourceNotFound(res);
    }else {
      res.send(result[0]);
    }
  }).catch((err) => {
    console.error(err);
    abortError(res, {
      error:'ServerError',
      detail:'server get error!',
      code:ErrorCodes.ServerError,
    },         500);
  });

  return next();
};
