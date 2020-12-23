import mongoose from "mongoose"

const renter = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "default_avatar.jpeg",
    },
    fullName: {
        type: String,
    },
    location: {
        type: {
            no: {
                type: Number,
            },
            street: {
                type: String,
            },
            ward: {
                type: String,
            },
            district: {
                type: String,
            },
            city: {
                type: String,
            }
        },
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    twitter: {
        type: String,
    },
})

const Renter = mongoose.model("Renter", renter)
export default Renter
