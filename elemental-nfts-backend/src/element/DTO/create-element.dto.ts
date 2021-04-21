export class CreateElementDTO {
    readonly _id: string;
    readonly name: string;
    readonly nonce: Number;
    readonly discoveredBy: string;
    readonly parent1: string;
    readonly parent2: string;
    readonly created_at: Date;
}