import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const findEnrollmentsForUser = (userId) =>
    db.enrollments.filter((enrollment) => enrollment.user === userId);

  const enrollUserInCourse = (userId, courseId) => {
    const existingEnrollment = db.enrollments.find(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === courseId
    );

    if (existingEnrollment) {
      return existingEnrollment;
    }

    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };

    db.enrollments.push(newEnrollment);
    return newEnrollment;
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (enrollment) =>
        !(enrollment.user === userId && enrollment.course === courseId)
    );
  };

  return {
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}