import mongoose from 'mongoose';

const connectDB = async () =>{
    // if (cached.conn){
    //     return cached.conn;
    // }

    // if(!cached.promise){
    //     const opts = {
    //         bufferCommands: false,
    //     };

    //     cached.promise = mongoose.connect(`mongodb+srv://manishjangir139:KQgseHHTxmwN0ExL@patreonclone.8syhxmp.mongodb.net/?retryWrites=true&w=majority&appName=patreonclone`, opts).then((mongoose) => {
    //         return mongoose;
    //     });
    // }
    // cached.conn = await cached.promise;
    // return cached.conn;
    try{
        const conn = await mongoose.connect(`mongodb+srv://manishjangir139:KQgseHHTxmwN0ExL@patreonclone.8syhxmp.mongodb.net/?retryWrites=true&w=majority&appName=patreonclone`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error){
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;