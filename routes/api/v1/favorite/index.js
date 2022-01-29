import { Router } from "express";

import {
  addFavorites,
  getFavorites,
  createFavorites,
} from "./favorite-controller";
import auth from "../../../../middleware/auth";

const Favorite = Router();

Favorite.use((req, res, next) => {
  next();
});

/**
 * @api {get} /api/v1/favorite ? query Request Restaurants List by query
 */
Favorite.get("/", auth, getFavorites);

/**
 * @api {post} /api/v1/favorite Request to add favorite
 */
Favorite.post("/", auth, createFavorites);

/**
 * @api {post} /api/v1/favorite Request to add favorite
 */
Favorite.post("/add", auth, addFavorites);

export default Favorite;
