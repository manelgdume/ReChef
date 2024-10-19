import mongoose from 'mongoose';
 

const UserSchema = new mongoose.Schema({

    recipesGenerated: { type: Number, required: true },
    idClerk: {type:String, required: true },
    subActive: {type:Boolean, default: false},
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;