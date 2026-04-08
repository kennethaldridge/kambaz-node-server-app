import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao(db) {
  const findAllCourses = () => model.find({}, { name: 1, description: 1 });
  const createCourse = (course) => {
    const _id = uuidv4();
    return model.create({ ...course, _id });
  };
  const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
  const updateCourse = (courseId, courseUpdates) =>
    model.updateOne({ _id: courseId }, { $set: courseUpdates });
  return { findAllCourses, createCourse, deleteCourse, updateCourse };
}
