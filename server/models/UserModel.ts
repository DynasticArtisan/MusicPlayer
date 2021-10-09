import {Schema, model} from 'mongoose'

const User = new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    likesTracks: [{type: Schema.Types.ObjectId, ref: 'Track'}],    
})

export interface UserType {
    email: string;
    password: string;
    isActivated: boolean;
    activationLink: string;
    likesTracks: Schema.Types.ObjectId[];
}

export default model<UserType>( 'User', User )
