import { Schema } from "mongoose";
import { UserType } from "../models/UserModel";

export interface UserDtoType{
    email: string;
    id: Schema.Types.ObjectId;
    isActivated: boolean;
}


export default class UserDto{
    email;
    id;
    isActivated;

    constructor(model :any){
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
    }
}