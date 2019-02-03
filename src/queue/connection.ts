import amqplib, { Channel, Options } from 'amqplib';
import { Transaction, transactionModel } from '../model/transaction';
import { appConfig } from '../conf/app';

export function connectRBMQ() {
  amqplib.connect(appConfig.MQAddress).then(
        conn => conn.createChannel(),
    ).then(
        channel => onConnectSuccess(channel),
    );
}

function onConnectSuccess(channel: Channel) {
  channel.assertExchange('transaction', 'fanout');
  channel.assertQueue('', { exclusive: true }).then((q) => {
    channel.bindQueue(q.queue, 'transaction', '');
    channel.consume(q.queue, (msg) => {
      const content = JSON.parse(msg.content.toString());
      const doc : Transaction = {
        ...content,
        created:new Date(),
      };
      transactionModel.create(doc).then(d =>
          console.log(d.id),
      ).catch(err =>
          console.log(err),
      );
    });
  });
}
