import mongoose from "mongoose";
import ProfileSchema from "../models/Profile";
import AnimalSchema from "../models/Animal";
import OrgSchema from "../models/OrgProfile";
import FavoriteSchema from "../models/Favorite";

class DbContext {
  Profile = mongoose.model("Profile", ProfileSchema);
  Animals = mongoose.model("Animal", AnimalSchema);
  OrgProfile = mongoose.model("Org", OrgSchema);
  Favorites = mongoose.model("Favorite", FavoriteSchema);
}

export const dbContext = new DbContext();
