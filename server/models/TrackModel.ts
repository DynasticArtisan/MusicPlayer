import {Schema, model} from 'mongoose'

const Track = new Schema<TrackType>({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    picture: { type: String },
    audio: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    duration: {type: Number}
})


export interface TrackType {
    name :string;
    artist :string;
    picture :string;
    audio :string;
    user :Schema.Types.ObjectId;
    duration :number;
}

export default model<TrackType>( 'Track', Track )