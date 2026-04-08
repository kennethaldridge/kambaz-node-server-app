import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function UsersDao(db) {
  const createUser = (user) => {
    const _id = uuidv4();
    return model.create({ ...user, _id });
  };
  const findAllUsers = () => model.find();
  const findUserById = (userId) => model.findById(userId);
  const findUserByUsername = (username) => model.findOne({ username });
  const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
  const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
  const deleteUser = (userId) => model.deleteOne({ _id: userId });
  const findUsersByRole = (role) => model.find({ role });
  const findUsersByPartialName = (partialName) =>
    model.find({
      $or: [
        { firstName: { $regex: partialName, $options: "i" } },
        { lastName: { $regex: partialName, $options: "i" } },
      ],
    });
  return {
    createUser,
    findAllUsers,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
    findUsersByRole,
    findUsersByPartialName,
  };
}
