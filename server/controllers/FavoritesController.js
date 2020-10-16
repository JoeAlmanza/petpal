import express from "express";
import { favoritesService } from "../services/FavoritesService.js";

export class FavoritesController {
  constructor() {
    this.router = express.Router();
    // api/profile/favorites
    this.router
      .get("", this.getAllfavorites)
      .post("", this.addToFav)
      .delete("/:id", this.removeFav);
  }
  async getAllfavorites(req, res, next) {
    try {
      // req.query.page = req.query.page || 1;
      let data = await favoritesService.findAll({
        creatorEmail: req.userInfo.email,
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addToFav(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      let data = await favoritesService.addFav(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeFav(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      await favoritesService.remove(req.params.id, req.body.creatorEmail);
      return res.send("Successfully Removed Favorite");
    } catch (error) {
      next(error);
    }
  }
}
