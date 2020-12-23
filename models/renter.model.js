import moment from "moment"
import mongoose, { Schema } from "mongoose"

const Renter = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    
})