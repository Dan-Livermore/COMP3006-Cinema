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
        seats:{
            type: [[String]],
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