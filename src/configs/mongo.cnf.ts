import { MongooseModuleOptions } from "@nestjs/mongoose";

const connectUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/test';

const connectOptions: MongooseModuleOptions = {
    auth: {
        username: process.env.MONGODB_USERNAME || 'root',
        password: process.env.MONGODB_PASSWORD || 'root'
    },
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
    }
}

export { connectUrl, connectOptions };