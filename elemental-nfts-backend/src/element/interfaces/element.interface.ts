import { Document } from 'mongoose';

export interface Element extends Document {
    readonly _id: string;
    readonly name: string;
    readonly nonce: Number;
    readonly discoveredBy: string;
    readonly parent1: String;
    readonly parent2: String;
    readonly created_at: Date;
}