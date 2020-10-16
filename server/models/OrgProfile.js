import mongoose from "mongoose";
import { dbContext } from "../db/DbContext"
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const orgLocationSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
});

const orgContactSchema = new Schema({
    email: { type: String, required: true, default: null },
    phone: { type: String, required: true, default: null },
});

const OrgProfile = new Schema(
    {
        profileId: { type: ObjectId, ref: 'Profile' },
        creatorEmail: { type: String, required: true },
        name: { type: String, required: true },
        picture: { type: String },
        orglocation: orgLocationSchema,
        description: { type: String, default: null },
        contact: orgContactSchema,
        animals: { type: Array, default: [] },
        activeOrg: { type: Boolean, default: true }

        // NOTE If you wish to add additional public properties for profiles do so here
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

OrgProfile.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true,
});

export default OrgProfile;