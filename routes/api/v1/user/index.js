import { Router } from "express";
import auth from "../../../../middleware/auth";

import {
  deleteUser,
  getUsers,
  putUser,
  getUser,
  postUser,
} from "./user-controller";

const User = Router();

User.use((req, res, next) => {
  next();
});

/**
 * @api {get} /api/v1/user/ Get all users
 * @apiName GetUsers
 */
User.get("/", auth, getUsers);

/**
 * @api {get} /api/v1/user/profile Get user profile
 * @apiName GetUser
 */
User.get("/profile", auth, getUser);

/**
 * @api {put} /api/v1/user/:id Update user
 * @apiName UpdateUser
 */
User.put("/", auth, putUser);

/**
 * @api {delete} /api/v1/user/ Delete user
 * @apiName DeleteUser
 */
User.delete("/", auth, deleteUser);

/**
 * @api {create} /api/v1/user/ Create user
 * @apiName CreateUser
 */
User.post("/register", postUser);

export default User;
