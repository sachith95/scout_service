import to from "await-to-js";
import UserModel from "../../../../schemas/user-model";

/**
 * Login
 * @description Login user
 */

export const loginUser = async (requestBody) => {
  const [error, user] = await to(
    UserModel.findByCredentials(requestBody.email, requestBody.password)
  );

  let accessToken = "";
  if (user) {
    const [onerror, token] = await to(user.generateAuthToken());
    if (onerror) {
      throw error;
    }
    accessToken = token;
  }

  if (error) {
    throw new Error(error);
  }

  user.log({
    action: "Login",
    category: "user",
    createdBy: user.email,
    message: "User Login",
  });

  return {
    User: {
      name: user.name,
      email: user.email,
      token: user.token,
      status: user.status,
    },
    accessToken,
  };
};

/**
 * Logout
 * @description Logout user
 */

export const logout = async (UserObject) => {
  const [error, user] = await to(
    UserModel.findOneAndUpdate({ email: UserObject.email }, { token: null })
  );
  if (error) {
    throw error;
  }

  user.log({
    action: "Logout",
    category: "user",
    createdBy: user.email,
    message: "User Logout",
  });

  return true;
};
