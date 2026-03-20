import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = (courseId) => {
    const { assignments } = db;
    return assignments.filter((assignment) => assignment.course === courseId);
  };

  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  };

  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter(
      (assignment) => assignment._id !== assignmentId
    );
  };

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    const { assignments } = db;
    const assignment = assignments.find(
      (assignment) => assignment._id === assignmentId
    );
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  };

  const findAssignmentById = (assignmentId) => {
    const { assignments } = db;
    return assignments.find((assignment) => assignment._id === assignmentId);
  };

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    findAssignmentById,
  };
}