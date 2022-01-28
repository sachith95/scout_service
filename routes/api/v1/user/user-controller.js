import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import to from "await-to-js";

import {
  fetchUsers,
  deleteUser as deleteUserFromDB,
  createUser as createUserInDB,
  PutUser as updateUserInDB,
  getUserById as getUserByIdFromDB,
} from "./user-service";

/**
 * Retrieve Users details
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof UserController
 */
export const getUsers = async (req, res) => {
  const [error, result] = await to(fetchUsers());

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
 * Get User profile
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof UserController
 */
export const getUser = async (req, res) => {
  const [error, result] = await to(getUserByIdFromDB({}, req.user));

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
 * Create Users
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof UserController
 */
export const postUser = async (req, res) => {
  const [error, result] = await to(createUserInDB(req.body.user));

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
 * Delete Users
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof UserController
 */
export const deleteUser = async (req, res) => {
  const { email } = req.query;
  const [error, result] = await to(deleteUserFromDB(email, req.user));

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
 * Update Users
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @returns {Object} - Express Response Object
 * @memberof UserController
 */
export const putUser = async (req, res) => {
  const [error, result] = await to(updateUserInDB(req.body.user, req.user));

  if (result) {
    return res.send({ data: result });
  }

  return res.status(INTERNAL_SERVER_ERROR).send({
    message: error,
    code: INTERNAL_SERVER_ERROR,
  });
};
