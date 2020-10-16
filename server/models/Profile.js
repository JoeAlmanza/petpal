import mongoose from "mongoose";
const Schema = mongoose.Schema;

const searchSchema = new Schema({

  city: { type: String, default: null },
  state: { type: String, default: null },
  zip: { type: String, default: null },

  dog: { type: String, default: "" },
  cat: { type: String, default: "" },
});

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String },
    picture: { type: String },
    search: searchSchema,
    hasOrg: { type: Boolean, default: false },
    completedQuiz: { type: Boolean, default: false },

  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Profile;
