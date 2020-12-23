import moment from "moment"
import mongoose, { Schema } from "mongoose"

const Post = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
        required: true,
    }],
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    nearby: {
        type: String,
    },
    type: {
        type: String,
    },
    numOfRoom: {
        type: Number,
    },
    price: {
        type: {
            category: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        },
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    ownerType: {
        type: String,
    },
    bathroom: {
        type: {
            category: {
                type: String,
            },
            hot: {
                type: String,
            }
        }
    },
    kitchen: {
        type: String,
    },
    airCondition: {
        type: String,
    },
    balcony: {
        type: String,
    },
    electric: {
        type: String,
        required: true,
    },
    water: {
        type: Number,
        required: true,
    },
    otherAmenity: {
        type: String,
    },
    // datePost: {
    //     type: Date,
    //     default: moment(Date.now(), "DD-MM-YYYY").add(7, 'days'),
    // },
    dateRemove: {
        type: Date,
        default: moment(Date.now(), "DD-MM-YYYY").add(7, 'days'),
    },
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorite",
    }],
    comments: [{
        type: {
            text: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Renter'
            }
        }
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Host",
    },
    pending: {
        
    }
}, { timestamps: { createdAt: 'createdAt' } })

export default Post

