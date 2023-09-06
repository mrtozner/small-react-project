import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

config({ path: 'variables.env' });

const app = express();
const MongoStore = connectMongo.create({ mongoUrl: process.env.DATABASE });


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 horu
    }
}));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 10000,
});

app.set('port', process.env.PORT || 7777);

app.listen(app.get('port'), () => {
    console.log(`Server running on ${app.get('port')}`);
});
