import mongoose from "mongoose"

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const favAnimal = new Schema({
    creatorEmail: { type: String },
    animalId: { type: ObjectId, ref: 'Animal', required: true }
});

export default favAnimal;
