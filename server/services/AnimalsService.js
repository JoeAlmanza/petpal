import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AnimalsService {
  async findAll(query = {}) {
    let values = await dbContext.Animals.find(query)
      .limit(100)
      .populate("creator", "name picture");

    // .limit(20)
    // .skip(query.page * 20)

    // REVIEW consider for api support of pages
    let animals = {
      page: query.page,
      resultCount: values.length,
      animals: values,
      next:
        values.length === 20 ? "/api/animals?page=" + (query.page + 1) : null,
      previous: query.page > 1 ? "/api/animals?page=" + (query.page - 1) : null,
    };
    return values;
  }
  async findById(id) {
    let animal = await dbContext.Animals.findById({
      _id: id,
    });
    if (!animal) {
      throw new BadRequest("Invalid Id");
    }
    return animal;
  }
  async createMany(array) {
    let data = await dbContext.Animals.insertMany(array);
    return data;
  }
  async create(rawData) {
    if (rawData.hasOrg) {
      let data = await dbContext.Animals.create(rawData);
      return data;
    }
    throw new BadRequest("Only Organizations may post new animals.");
  }
  async edit(id, creatorEmail, update) {
    let data = await dbContext.Animals.findOneAndUpdate(
      { _id: id, creatorEmail: creatorEmail },
      update,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID or you do not have permissions");
    }
    return data;
  }
  async deleteById(id, creatorEmail) {
    let data = await dbContext.Animals.findByIdAndDelete({
      _id: id,
      creatorEmail: creatorEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid Id or you are not Authorized");
    }
    await dbContext.Favorites.deleteMany({ animalId: id });
  }
}

export const animalsService = new AnimalsService();
