import mongoose, {Schema, Document} from "mongoose";
//Document just bcoz of TS

//whenver we use ts-> we first define the type of the data and for defining it we use ->  interface (data type) -> we just write general info isndide it
//EXTENDS -> since these schema will go in DB ,part of mongoose used to create documents so we imported document
export interface Message extends Document{
    content: string;        //TS -> string -> smaller 
    createdAt: Date;
} 

//MS follows a schema konsa -> message -> it's a just giving a type safety wherevr it is used so it follows messgae
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,           //Mongoose -> String ->> Capital 
        required: true,
    },

    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})



export interface User extends Document{
    username: string;        //TS -> string -> smaller 
    email: string;
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean;
    isAcceptingMessages: boolean,
    messages: Message []      //har msgg ka alag document bnega , but we wabt to keep it in user also -> so array-> type of Message
    
} 

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,           //Mongoose -> String ->> Capital 
        required: [true, "Username is required"],
        trim: true,     //for removing the spaces in the name  
        unique: true,
},

    email:{
        type: String,
        required:[true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address'],  //we can ensure format -> match -> [regex, msgg] ->ask chatgpt to write a regex
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      verifyCode: {
        type: String,
        required: [true, 'Verify Code is required'],
      },
      verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      isAcceptingMessages: {
        type: Boolean,
        default: true,
      },
      messages: [MessageSchema],        //here specify message is of what type-> MessageSchema
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)
export default UserModel;