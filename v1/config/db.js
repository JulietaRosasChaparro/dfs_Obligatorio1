import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.NODE_ENV === 'development' ?
        process.env.MONGO_URI_DEV : process.env.MONGO_URI)
        .then(() => console.log('Base de datos conectada'))
        .catch(err => {
            console.error('Error de conexión', err)
            process.exit(1);
        });
};

export default connectDB;