import mongoose from 'mongoose';
import { appConfig } from '../conf/app';
export function connectDatabase() {
  mongoose.connect(appConfig.mongoAddress)
        .then(() => console.log('连接成功')).catch(
        e => console.log(e),
    );
}
