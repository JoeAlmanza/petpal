import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { FavoritesController } from "./FavoritesController";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .put("/:id", this.edit)
      .use("/favorites", new FavoritesController().router)
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      let data = await profilesService.updateProfile(req.userInfo, req.body)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async giveOrg(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      let data = await profilesService.updateOrg(req.userInfo, req.body)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async addFav(req, res, next) {
    try {
      req.body.creatorId = req.user.email
    } catch (error) {
      next(error)
    }
  }
}
