import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Esto carga las variables de entorno desde tu .env

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Base de datos conectada a:', db.connection.name);
    } catch (err) {
        console.error('❌ Error de conexión a MongoDB:', err.message);
        process.exit(1); // Sale del proceso si no se puede conectar
    }
};

export default connectDB;
