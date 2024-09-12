
import mongoose, { Mongoose } from "mongoose";
    
const MONGODB_URI = process.env.MONGO_URI as string 

if(!MONGODB_URI){
    console.log("Check your environment variable");
}

declare global{
    var mongoose:{
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    }
}

global.mongoose = global.mongoose || {conn: null , promise: null}

const cache = global.mongoose

async function dbConnect():Promise<Mongoose> {//ye function ek promise karega ki last me hm tumko mongoose return karenge
    
    if(cache.conn){
        console.log("Database is already connected");
        return cache.conn 
    }

    if(!cache.promise){
        cache.promise = mongoose.connect(MONGODB_URI).then((Mongoose)=>{
            return Mongoose
        }) 
    }
    console.log("Database Connected Successfully")
    cache.conn = await cache.promise
    return cache.conn

}
export default dbConnect