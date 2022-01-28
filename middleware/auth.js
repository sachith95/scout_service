import jwt from "jsonwebtoken";
import UserModel from "../schemas/user-model";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserModel.find({ email: data.email, token: token });
    if (!user) {
      return res.status(401).json({ error: "Token invalid" });
    }
    req.user = user[0];
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
