import * as mongoose from 'mongoose';

export const ElementSchema = new mongoose.Schema({
    _id: String,
    name: String,
    nonce: Number,
    discoveredBy: String,
    parent1: String,
    parent2: String,
    created_at: { type: Date, default: Date.now }
})