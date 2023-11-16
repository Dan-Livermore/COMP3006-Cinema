import mongoose from "mongoose";

const filmSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        director:{
            type: String,
            required: true,
        },
        releaseDate:{
            type: Number,
            required: true,
        },
        ageRating:{
            type: String,
            required: true,
        },
        runtime:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const Film = mongoose.model('Film', filmSchema);