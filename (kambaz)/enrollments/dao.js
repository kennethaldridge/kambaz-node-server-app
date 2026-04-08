import model from "./model.js";

export default function EnrollmentsDao(db) {
  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((e) => e.course);
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((e) => e.user);
  };

  const enrollUserInCourse = (userId, courseId) =>
    model.create({ _id: `${userId}-${courseId}`, user: userId, course: courseId });

  const unenrollUserFromCourse = (user, course) =>
    model.deleteOne({ user, course });

  const unenrollAllUsersFromCourse = (courseId) =>
    model.deleteMany({ course: courseId });

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
