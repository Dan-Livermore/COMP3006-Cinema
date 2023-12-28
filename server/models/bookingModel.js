import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    {
        userID:{
            type: String,
            required: true,
        },
        showingID:{
            type: String,
            required: true,
        },
        seatNo:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Booking = mongoose.model('Booking', bookingSchema);