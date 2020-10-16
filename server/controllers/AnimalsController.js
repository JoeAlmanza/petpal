import express from "express";
import BaseController from "../utils/BaseController";
import { animalsService } from "../services/AnimalsService.js";
import auth0Provider from "@bcwdev/auth0provider";

export class AnimalsController extends BaseController {
  constructor() {
    super("api/animals");
    this.router
      .get("", this.getAllAnimals)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.editAnimal)
      .delete("/:id", this.deleteAnimal);
  }
  async getAllAnimals(req, res, next) {
    try {
      // req.query.page = req.query.page || 1;
      let data = await animalsService.findAll(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await animalsService.findById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async editAnimal(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      // REVIEW put all this data into the object being edited
      // req.body.id = req.params.id
      let data = await animalsService.edit(
        req.params.id,
        req.body.creatorEmail,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // REVIEW do we still want this (seperate route)
      if (req.body == []) {
        let data = await animalsService.createMany(req.body);
        return res.status(201).send(data);
      }
      let data = await animalsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteAnimal(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      await animalsService.deleteById(req.params.id, req.body.creatorEmail);
      return res.send("Successfully Deleted!");
    } catch (error) {
      next(error);
    }
  }
}
