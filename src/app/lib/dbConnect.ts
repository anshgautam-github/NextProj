import mongoose from 'mongoose';

//when DB connection happends -> the object we are getting from that we are getting value of what type 
type ConnectionObject = {
  isConnected?: number;
};

//here we are mkaing a connectin variable of typpe -> ConnectionObject and -> keeping it empty
//we can keep it empty bcoz in ConnectionObject , isConnected is optional , if not optional -> can;t empty
const connection: ConnectionObject = {};


//When Db connection happends -> then in return we will get smrthing -> so here we assume that return thing will be a promise  
async function dbConnect(): Promise<void> { //here void means -> any type
  // Check if we have a connection to the database or if it's currently connecting
  //DB choking might happen -> reduce perfomance -> that's why we are checking 
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');

  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;