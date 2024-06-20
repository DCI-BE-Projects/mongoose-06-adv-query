import { Schema, model } from 'mongoose';

const prodcutSchem = new Schema(
    {
        name: String,
        price: Number,
    },
    { timestamps: true }
);

export default model('Product', prodcutSchem);