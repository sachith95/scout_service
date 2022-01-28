import { INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import to from "await-to-js";

import { loginUser, logout } from "./auth-service";

/**
 * login Users
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 * @memberof AuthController
 *
 */

export const authLogin = async (req, res) => {
  const [error, result] = await to(loginUser(req.body.user));

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
 * logout Users
 * @param {*} req
 * @param {*} res
 * @returns {object}
 * @memberof AuthController
 *
 */

export const authLogout = async (req, res) => {
  const [error, result] = await to(logout(req.body.user));

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
