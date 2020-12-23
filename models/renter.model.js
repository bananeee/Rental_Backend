import moment from "moment"
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
    }
});

const Renter = mongoose.model("Renter", renter);

export default Renter;