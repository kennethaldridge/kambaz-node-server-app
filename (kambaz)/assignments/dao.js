import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = (courseId) =>
    model.find({ course: courseId });
  const createAssignment = (assignment) => {
    const _id = uuidv4();
    return model.create({ ...assignment, _id });
  };
  const updateAssignment = (assignmentId, assignmentUpdates) =>
    model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
  const deleteAssignment = (assignmentId) =>
    model.deleteOne({ _id: assignmentId });
  const findAssignmentById = (assignmentId) => model.findById(assignmentId);
  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    findAssignmentById,
  };
}
