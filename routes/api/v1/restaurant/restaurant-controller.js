import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import to from "await-to-js";

import {
  fetchRestaurants,
} from "./restaurant-service";

/**
 * Retrieve restaurants by user query
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof RestaurantController
 */
export const getRestaurants = async (req, res) => {
  const { query } = req.query;
  const [error, result] = await to(fetchRestaurants(query));

  if (result) {
    return res.send({ data: result, code: OK });
  }

  return res.status(INTERNAL_SERVER_ERROR).send({
    error: {
      message: error,
      code: INTERNAL_SERVER_ERROR,
    },
  });
};
