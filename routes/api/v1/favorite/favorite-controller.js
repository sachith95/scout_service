import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import to from "await-to-js";

import {
  fetchFavoriteDetails,
  createFavoriteCollection,
  addFavoriteDetails,
} from "./favorite-service";

/**
 * Retrieve favorites by user query
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof FavoriteController
 */
export const getFavorites = async (req, res) => {
  console.log("resrse")
  const [error, result] = await to(fetchFavoriteDetails(req.user));

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

/**
 * Create favorites by user query
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof FavoriteController
 */

export const createFavorites = async (req, res) => {
  const [error, result] = await to(createFavoriteCollection(req.user, req.body));
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

/**
 * add  favorites details by user query
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof FavoriteController
 */

export const addFavorites = async (req, res) => {
  const [error, result] = await to(addFavoriteDetails(req.user, req.body));
  if (result) {
    return res.send({ data: result, code: OK });
  }

  return res.status(INTERNAL_SERVER_ERROR).send({
    error: {
      message: error,
      code: INTERNAL_SERVER_ERROR,
    },
  });
}
