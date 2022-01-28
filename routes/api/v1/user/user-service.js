import to from "await-to-js";
import UserModel from "../../../../schemas/user-model";
import { addLog } from "../../../../utils/helper";

/**
 * Fetch Users List
 * @description Fetch Users List
 *
 */
export const fetchUsers = async () => {
  const [error, user] = await to(
    UserModel.find()
      .select({
        _id: 0,
        name: 1,
        email: 1,
        status: 1,
      })
      .lean()
  );

  if (error) {
    return Promise.reject(error);
  }

  return user;
};

/**
 * Fetch User by email
 * @description Fetch User
 *
 */
export const getUserById = async ({}, logUser) => {
  const [error, user] = await to(
    UserModel.find({ _id: logUser._id })
      .select({
        _id: 0,
        name: 1,
        email: 1,
        status: 1,
      })
  );

  if (error) {
    return Promise.reject(error);
  }
  return user;
};

/**
 * ADD User
 * @description ADD User
 *
 */
export const createUser = async (UserObject) => {
  const UserValue = new UserModel({
    name: UserObject.name,
    email: UserObject.email,
    password: UserObject.password,
  });

  const [error, user] = await to(UserValue.save());

  if (error) {
    return Promise.reject(error);
  }

  addLog(user, user, "create", "user", "created user");

  const sanitizedUser = sanitizeUser(user);
  return [sanitizedUser];
};

/**
 * DELETE User
 * @description DELETE User
 *
 */
export const deleteUser = async (email, logUser) => {
  const [error, user] = await to(
    UserModel.findOneAndUpdate({ email: email }, { status: false })
  );

  if (error) {
    return Promise.reject(error);
  }

  addLog(user, logUser, "delete", "user", "deleted user");

  const sanitizedUser = sanitizeUser(user);
  return [sanitizedUser];
};

function sanitizeUser(user) {
  return {
    name: user.name,
    email: user.email,
    status: user.status,
  };
}
