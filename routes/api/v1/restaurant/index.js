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
 * @api {get} /api/v1/restaurant ? query Request Restaurants List by query
 */
 Restaurant.get("/", getRestaurants);



export default Restaurant;
