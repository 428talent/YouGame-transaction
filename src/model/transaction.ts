import { Document, model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const transactionSchema = new Schema({
  debit: {
    type: Schema.Types.Number,
    required: true,
  },
  debit_type: {
    type: Schema.Types.String,
    required: true,
  },

  credit: {
    type: Schema.Types.Number,
    required: true,
  },

  credit_type: {
    type: Schema.Types.String,
    required: true,
  },
  transaction_time: {
    type: Schema.Types.Date,
    required: true,
  },
  transaction_type: {
    type: Schema.Types.String,
    required: true,
  },
  created: {
    type: Schema.Types.Date,
    required: true,
  },
  extra:{
    type:Schema.Types.Mixed,
    required:true,
  },
});
transactionSchema.plugin(mongoosePaginate);
export interface Transaction extends Document {
  debit: number;
  debit_type: string;
  credit: number;
  credit_type: string;
  transaction_time: Date;
  transaction_type: string;
  created: Date;
  extra: any;
}

export const transactionModel = model<Transaction>('Transactions', transactionSchema);
