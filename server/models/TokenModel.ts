import {Schema, model} from 'mongoose'


interface TokenType {
    user: Schema.Types.ObjectId;
    refreshToken: string;
}

const Token = new Schema<TokenType>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
    
})

export default model<TokenType>( 'Token', Token )