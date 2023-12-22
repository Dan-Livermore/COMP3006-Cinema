import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const showingSchema = mongoose.Schema(
    {
        filmID:{
            type: String,
            required: true,
        },
        startTime:{
            type: Date,
            required: true,
        },
        row1:{
            type: String,
            required: true,
        },
        row2:{
            type: String,
            required: true,
        },
        row3:{
            type: String,
            required: true,
        },
        row4:{
            type: String,
            required: true,
        },
        totalSeats:{
            type: Number,
            required: true,
        },
        seatsRemaining:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Showing = mongoose.model('Showing', showingSchema);