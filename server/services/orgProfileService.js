import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class OrgProfileService {

    async findAll(query = {}) {
        let all = await dbContext.OrgProfile.find(query).populate("profileId");
        return all;
    }

    async getOrgProfile(id) {
        let data = await dbContext.OrgProfile.findOne({ _id: id }).populate("profileId")
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this list")
        }
        return data
    }

    async createOrg(rawData) {
        let data = await dbContext.OrgProfile.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let org = await this.getOrgProfile(id)
        let data = null
        if (org.creatorEmail == userEmail) {
            data = await dbContext.OrgProfile.findOneAndUpdate({ _id: id }, update, { new: true })
        }
        if (!data) {
            throw new BadRequest("Invalid information or you do not own this Org");
        }
        return data;
    }


} export const orgProService = new OrgProfileService();