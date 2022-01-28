import { Router } from "express";

import {
  getRestaurants
} from "./restaurant-controller";
import auth from "../../../../middleware/auth";

const Restaurant = Router();

Restaurant.use((req, res, next) => {
  next();
});

/**
 * @api {get} /api/v1/restaurants ? query Request Restaurants List by query
 */
 Restaurant.get("/", auth, getRestaurants);



export default Restaurant;
