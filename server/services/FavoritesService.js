import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class FavoritesService {
  async findAll(query = {}) {
    let all = await dbContext.Favorites.find(query).populate("animalId");
    return all;
  }

  async addFav(rawData) {
    if (rawData) {
      let found = await dbContext.Favorites.findOne({
        creatorEmail: rawData.creatorEmail,
        animalId: rawData.animalId,
      });
      if (!found) {
        let data = await dbContext.Favorites.create(rawData);
        return data;
      }
      throw new BadRequest("you already have it favorited");
    }
    throw new BadRequest("Invalid Information Sent");
  }

  async remove(id, creatorEmail) {
    let data = await dbContext.Favorites.findOneAndDelete({
      animalId: id,
      creatorEmail: creatorEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid Id or this Favorite does not exist.");
    }
  }
}
export const favoritesService = new FavoritesService();
